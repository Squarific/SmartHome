from django.db import connection

from backend.models import *
from backend.serializers import *
from django.utils import timezone, dateparse

from django.contrib.auth.models import User
from django.db.models import F, Q
from django.http import Http404

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics, status

from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny

from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from rest_auth.registration.views import SocialLoginView

from allauth.socialaccount.providers.twitter.views import TwitterOAuthAdapter
from rest_auth.views import LoginView
from rest_auth.social_serializers import TwitterLoginSerializer

from datetime import datetime
from dateutil.relativedelta import relativedelta
from itertools import chain, groupby

from math import *


def filterUsersByName(username):
    query = "SELECT id, username, first_name, last_name, email, is_staff, is_active, date_joined FROM auth_user"
    params = []
    if (username is not None):
        query += " WHERE username LIKE %s OR first_name LIKE %s OR last_name LIKE %s"
        params = ['%'+username+'%']*3

    return User.objects.raw(query, params)

def filterHomesByLocation(country, city=None, zipcode=None, street=None, housenumber=None):
    queryset = Home.objects.all()

    if (country is None):
        return queryset
    queryset = queryset.filter(country=country)

    if (city is None):
        return queryset
    queryset = queryset.filter(city=city)

    if (zipcode is None):
        return queryset
    queryset = queryset.filter(zipcode=zipcode)

    if (street is None):
        return queryset
    queryset = queryset.filter(street=street)

    if (housenumber is None):
        return queryset
    queryset = queryset.filter(housenumber=housenumber)

    return queryset

class FacebookLogin(SocialLoginView):
    adapter_class = FacebookOAuth2Adapter


class TwitterLogin(LoginView):
    serializer_class = TwitterLoginSerializer
    adapter_class = TwitterOAuthAdapter


class UserList(generics.ListAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_queryset(self):
        """
        Optionally restricts the result to a given user,
        by filtering against a `username` query parameter in the URL.
        """
        return filterUsersByName( self.request.query_params.get('username', None) )

class UserDetail(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, pk, format=None):
        if (pk == 'me'):
            pk = self.request.user.id

        user = User.objects.raw("SELECT id, username, first_name, last_name, email, is_staff, is_active, date_joined FROM auth_user WHERE id = %s", [pk])
        serializer = UserSerializer(list(user)[0])
        return Response(serializer.data)

class FriendRequestList(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = FriendRequest.objects.all()
    serializer_class = FriendRequestSerializer

    def list(self, request, user_id=None, sent=True, received=True):
        # Note the use of `get_queryset()` instead of `self.queryset`
        queryset = FriendRequest.objects.all()
        if (user_id == 'me'):
            user_id = request.user.id
        if (user_id != None):
            if sent:
                queryset = FriendRequest.objects.raw("SELECT id, sender_id, receiver_id, status, read, date_sent FROM friend_requests WHERE sender_id = %s", [user_id])
            if received:
                queryset = FriendRequest.objects.raw("SELECT id, sender_id, receiver_id, status, read, date_sent FROM friend_requests WHERE receiver_id = %s", [user_id])
        serializer = FriendRequestSerializer(queryset, many=True)
        return Response(serializer.data)

class FriendRequestDetail(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, pk, format=None):
        friend_request = FriendRequest.objects.raw("SELECT id, sender_id, receiver_id, status, read, date_sent FROM friend_requests WHERE id = %s", [pk])
        serializer = FriendRequestSerializer(list(friend_request)[0])
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        p = request.data

        cursor = connection.cursor()
        cursor.execute("UPDATE friend_requests SET id = %s, status=%s, read=%s, date_sent=%s, receiver_id=%s, sender_id=%s WHERE id = %s", [p['id'], p['status'], p['read'], p['date_sent'], p['receiver_id'], p['sender_id'], pk])

        return Response()

class FriendList(generics.ListAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def list(self, request, user_id):
        # Note the use of `get_queryset()` instead of `self.queryset`
        if (user_id == 'me'):
            user_id = request.user.id

        queryset = User.objects.raw("SELECT auth_user.id, username, first_name, last_name, email, is_staff, is_active, date_joined FROM auth_user INNER JOIN friend_requests ON auth_user.id = friend_requests.sender_id WHERE (auth_user.id = %s) OR (friend_requests.status = 1 AND friend_requests.receiver_id = %s) OR (friend_requests.status = 1 AND friend_requests.sender_id = %s)", [user_id]*3)
        serializer = UserSerializer(queryset, many=True)
        return Response(serializer.data)

class FriendStats(APIView):
    permission_classes = (IsAuthenticated,)
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get(self, request, user_id, format=None):
        now = datetime(2016, 3, 6) #now = datetime.now().replace(day=1, hour=0, minute=0, second=0, microsecond=0)
        from_date = now - timedelta(days=1)

        if (user_id == 'me'):
            user_id = request.user.id

        queryset = User.objects.all().filter(Q(id=user_id) | Q(sent_requests__status = 1, sent_requests__receiver_id = user_id) | Q(received_requests__status = 1, received_requests__sender_id=user_id))

        friend_ids = queryset.values('id')

        period = self.request.query_params.getlist('period[]', ['today', 'last_month', 'last_year', 'past_years'])
        data = {}
        if 'today' in period:
                from_date = now - timedelta(days=1)
                data['today'] = queryset.filter(owned_homes__sensor__recentdata__timestamp__gte=from_date).annotate(user_id=F('id'), total_usage_today=Sum('owned_homes__sensor__recentdata__usage')).values('user_id', 'total_usage_today')
        if 'last_month' in period:
                from_date = now - relativedelta(months=1)
                data['last_month'] = queryset.filter(owned_homes__sensor__dailydata__timestamp__gte=from_date).annotate(user_id=F('id'), total_usage_last_month = Sum('owned_homes__sensor__dailydata__usage')).values('user_id', 'total_usage_last_month')
        if 'last_year' in period:
                from_date = now - relativedelta(years=1)
                data['last_year'] = queryset.filter(owned_homes__sensor__monthlydata__timestamp__gte=from_date).annotate(user_id=F('id'), total_usage_last_year = Sum('owned_homes__sensor__monthlydata__usage')).values('user_id', 'total_usage_last_year')
        if 'past_years' in period:
                from_date = datetime.min
                data['past_years'] = queryset.filter(owned_homes__sensor__yearlydata__timestamp__gte=from_date).annotate(user_id=F('id'), total_usage_past_years = Sum('owned_homes__sensor__yearlydata__usage')).values('user_id', 'total_usage_past_years')

        merged = {}

        for friend_id in friend_ids:
            merged[friend_id['id']] = {}

        for p in period:
            for entry in data[p]:
                merged[entry['user_id']].update(entry)

        return Response(merged)

class FriendPostList(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    def list(self, request, user_id):
        # Note the use of `get_queryset()` instead of `self.queryset`
        if (user_id == 'me'):
            user_id = request.user.id

        queryset = Post.objects.all().filter(Q(user_id = user_id) | Q(user__sent_requests__status = 1, user__sent_requests__receiver_id = user_id) | Q(user__received_requests__status = 1, user__received_requests__sender_id=user_id)).order_by('-date_sent')
        serializer = PostSerializer(queryset, many=True)
        return Response(serializer.data)

class PostList(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    def list(self, request, user_id=None):
        if (user_id == 'me'):
            user_id = request.user.id

        queryset = Post.objects.all()
        if (user_id != None):
            queryset = queryset.filter(user_id=user_id)

        serializer = PostSerializer(queryset, many=True)
        return Response(serializer.data)

class PostDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = Post.objects.all()
    serializer_class = PostSerializer

class HomeList(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = Home.objects.all()
    serializer_class = HomeSerializer

    def list(self, request, user_id=None):
        if (user_id == 'me'):
            user_id = request.user.id

        queryset = Home.objects.all()
        if (user_id != None):
            queryset = queryset.filter(owner_id=user_id)

        serializer = HomeSerializer(queryset, many=True)
        return Response(serializer.data)

class HomeDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update or delete a home instance.
    """
    permission_classes = (IsAuthenticated,)
    queryset = Home.objects.all()
    serializer_class = HomeSerializer


class SensorList(generics.ListCreateAPIView):
    """
    List all sensors, or create a new sensor.
    """
    permission_classes = (IsAuthenticated,)
    queryset = Sensor.objects.all()
    serializer_class = SensorSerializer

    def list(self, request, user_id=None, home_id=None):
        if (user_id == 'me'):
            user_id = request.user.id

        queryset = Sensor.objects.all()
        if (user_id != None):
            queryset = queryset.filter(home__owner_id=user_id)
        elif (home_id != None):
            queryset = queryset.filter(home_id=home_id)

        serializer = SensorSerializer(queryset, many=True)
        return Response(serializer.data)


class SensorDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update or delete a sensor instance.
    """
    permission_classes = (IsAuthenticated,)
    queryset = Sensor.objects.all()
    serializer_class = SensorSerializer


class TagList(generics.ListCreateAPIView):
    """
    List all tags, or create a new tag.
    """
    permission_classes = (IsAuthenticated,)
    queryset = Tag.objects.all()
    serializer_class = TagSerializer


class TagDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update or delete a tag instance.
    """
    permission_classes = (IsAuthenticated,)
    queryset = Tag.objects.all()
    serializer_class = TagSerializer

class DataView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, period, user_id=None, home_id=None, sensor_id=None, format=None):
        if (user_id == 'me'):
            user_id = request.user.id

        now = datetime(2016, 3, 6) #now = datetime.now().replace(day=1, hour=0, minute=0, second=0, microsecond=0)
        from_date = now - timedelta(days=1)
        data_class = RecentData
        if period == 'today':
            data_class = RecentData
            from_date = now - timedelta(days=1)
        elif period == 'last_month':
            data_class = DailyData
            from_date = now - relativedelta(months=1)
        elif period == 'last_year':
            data_class = MonthlyData
            from_date = now - relativedelta(years=1)
        elif period == 'past_years':
            data_class = YearlyData
            from_date = datetime.min

        queryset = data_class.objects.all().filter(timestamp__gte=from_date)
        if user_id != None:
            queryset = queryset.filter(sensor__home__owner_id=user_id).annotate(home_id=F('sensor__home_id'), key=F('sensor__home__name')).values('home_id', 'key', 'timestamp').annotate(usage=Sum('usage')).order_by('home_id', 'timestamp')
        if home_id != None:
            queryset = queryset.filter(sensor__home_id=home_id).annotate(sensor_id=F('sensor_id'), key=F('sensor__name')).values('sensor_id', 'key', 'timestamp').annotate(usage=Sum('usage')).order_by('sensor_id', 'timestamp')
        if sensor_id != None:
            queryset = queryset.filter(sensor_id=sensor_id).annotate(key=F('sensor__name')).values('key', 'timestamp', 'usage').order_by('timestamp')

        content = [{'key':k, 'values':[{'timestamp':w['timestamp'], 'usage':w['usage']} for w in v]} for k,v in groupby(queryset, lambda x: x['key'])]
        return Response(content)

    def put(self, request, period, user_id=None, home_id=None, sensor_id=None):
        usage = request.query_params.get('usage', None)
        timestamp = request.query_params.get('timestamp', datetime.now())
        if (usage != None):
            data_class = RecentData
            if period == 'today':
                data_class = RecentData
            elif period == 'last_month':
                data_class = DailyData
            elif period == 'last_year':
                data_class = MonthlyData
            elif period == 'past_years':
                data_class = YearlyData

            data_class(usage=usage, timestamp=timestamp).save()

        return Response()

class LocationStatsView(APIView):
    permission_classes = (IsAuthenticated,IsAdminUser,)

    def get(self, request, format=None):
        now = datetime(2016, 3, 6) #now = datetime.now().replace(day=1, hour=0, minute=0, second=0, microsecond=0)
        from_date = now - timedelta(days=1)

        country = self.request.query_params.get('country', None)
        city = self.request.query_params.get('city', None)
        zipcode = self.request.query_params.get('zipcode', None)
        street = self.request.query_params.get('street', None)
        housenumber = self.request.query_params.get('housenumber', None)

        check = True
        for i in [country, city, street, housenumber]:
            if i is None:
                check = False
            elif check == False:
                raise Http404

        queryset = filterHomesByLocation(country, city, zipcode, street, housenumber)

        if len(list(queryset)) == 0:
            raise Http404

        period = self.request.query_params.getlist('period[]', ['today', 'last_month', 'last_year', 'past_years'])
        data = {}
        if 'today' in period:
                data['today'] = {}
                from_date = now - timedelta(days=1)
                data['today']['data'] = queryset.filter(sensor__recentdata__timestamp__gte=from_date).annotate(timestamp=F('sensor__recentdata__timestamp'),usage=Sum('sensor__recentdata__usage')).values('timestamp', 'usage').order_by('timestamp')
                data['today']['average_usage'] = queryset.filter(sensor__recentdata__timestamp__gte=from_date).aggregate(Avg('sensor__recentdata__usage')).values()[0]
                data['today']['total_usage'] = queryset.filter(sensor__recentdata__timestamp__gte=from_date).aggregate(Sum('sensor__recentdata__usage')).values()[0]
        if 'last_month' in period:
                data['last_month'] = {}
                from_date = now - relativedelta(months=1)
                data['last_month']['data'] = queryset.filter(sensor__dailydata__timestamp__gte=from_date).annotate(timestamp=F('sensor__dailydata__timestamp'),usage=Sum('sensor__recentdata__usage')).values('timestamp', 'usage').order_by('timestamp')
                data['last_month']['average_usage'] = queryset.filter(sensor__dailydata__timestamp__gte=from_date).aggregate(Avg('sensor__dailydata__usage')).values()[0]
                data['last_month']['total_usage'] = queryset.filter(sensor__dailydata__timestamp__gte=from_date).aggregate(Sum('sensor__dailydata__usage')).values()[0]
        if 'last_year' in period:
                data['last_year'] = {}
                from_date = now - relativedelta(years=1)
                data['last_year']['data'] = queryset.filter(sensor__monthlydata__timestamp__gte=from_date).annotate(timestamp=F('sensor__monthlydata__timestamp'),usage=Sum('sensor__recentdata__usage')).values('timestamp', 'usage').order_by('timestamp')
                data['last_year']['average_usage'] = queryset.filter(sensor__monthlydata__timestamp__gte=from_date).aggregate(Avg('sensor__monthlydata__usage')).values()[0]
                data['last_year']['total_usage'] = queryset.filter(sensor__monthlydata__timestamp__gte=from_date).aggregate(Sum('sensor__monthlydata__usage')).values()[0]
        if 'past_years' in period:
                data['past_years'] = {}
                from_date = datetime.min
                data['past_years']['data'] = queryset.filter(sensor__yearlydata__timestamp__gte=from_date).annotate(timestamp=F('sensor__yearlydata__timestamp'),usage=Sum('sensor__recentdata__usage')).values('timestamp', 'usage').order_by('timestamp')
                data['past_years']['average_usage'] = queryset.filter(sensor__recentdata__timestamp__gte=from_date).aggregate(Avg('sensor__yearlydata__usage')).values()[0]
                data['past_years']['total_usage'] = queryset.filter(sensor__recentdata__timestamp__gte=from_date).aggregate(Sum('sensor__yearlydata__usage')).values()[0]

        return Response(data)

class ClusterView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, home_id, format=None):
        queryset = Sensor.objects.filter(home__id = home_id)
        data = {}
        data['low'] = queryset.filter(usage_category=0).values()
        data['medium'] = queryset.filter(usage_category=1).values()
        data['high'] = queryset.filter(usage_category=2).values()

        return Response(data)

    def put(self, request, home_id, format=None):
        persist_k_means(home_id, 3)
        return Response()

class ClusterMassUpdateView(APIView):
    permission_classes = (IsAuthenticated,IsAdminUser,)

    def put(self, request, format=None):
        homes = Home.objects.all().values('id')
        for home in homes:
            persist_k_means(home['id'], 3)
        return Response()

'''
Logarithmic weight function for the k-means algorithm.
This is to account for relative differences in sensor usages.
'''
def k_means_scale(value, max_value):
    return value*log(value*(exp(1)-1)/max_value + 1)

'''
The k-means algorithm. Takes a househould id and the number of clusters (should be 3 for the frontend) as parameters.
The clusters are placed weighted (see above) on 2/4, 3/4 and 4/4 of the maximum usage of the given sensors.
'''
def k_means(home_id, n_clusters=3):
    now = datetime(2016, 3, 6) #now = datetime.now().replace(day=1, hour=0, minute=0, second=0, microsecond=0)
    sensor_totals = DailyData.objects.filter(sensor__home__id = home_id, timestamp__gte = (now - relativedelta(months=1))).annotate(sensor_id=F('sensor__id')).values('sensor_id').annotate(total_usage=Sum('usage'))
    max_usage = DailyData.objects.filter(sensor__home__id = home_id, timestamp__gte = (now - relativedelta(months=1))).annotate(sensor_id=F('sensor__id'), total_usage=Sum('usage')).aggregate(max_usage=Max('total_usage'))['max_usage']

    # No data
    if (len(sensor_totals) == 0 or max_usage == None):
        return [{'category': d, 'mean': 0, 'sensors': []} for d in range(0, n_clusters)]


    clusters = [{'category': d, 'mean': k_means_scale((n_clusters+d*n_clusters/float(n_clusters-1))*max_usage/float(2*n_clusters), max_usage), 'sensors': []} for d in range(0, n_clusters)]
    print(clusters)
    converging = True
    while converging == True:
        # assignment step
        for cluster in clusters:
            cluster['sensors'] = []

        for s in sensor_totals:
            distances = [abs(k_means_scale(clusters[i]['mean'], max_usage) - k_means_scale(s['total_usage'], max_usage)) for i in range(0, n_clusters)]
            cluster_index = distances.index(min(distances))
            clusters[cluster_index]['sensors'].append(s)

        # update step
        locally_converging = False
        for cluster in clusters:
            n_sensors = len(cluster['sensors'])
            if (n_sensors > 0):
                new_mean = reduce(lambda x, y: x + y, [k_means_scale(c['total_usage'], max_usage) for c in cluster['sensors']])/n_sensors
                locally_converging |= (new_mean != cluster['mean'])
                cluster['mean'] = new_mean

        converging = (locally_converging == False)

    # finished
    return clusters

# simply store the clusters to the database
def persist_k_means(home_id, n_clusters=3):
    clusters = k_means(home_id, n_clusters)
    for cluster in clusters:
        for sensor_id in [ s['sensor_id'] for s in cluster['sensors'] ]:
            sensor = Sensor.objects.get(pk=sensor_id)
            sensor.usage_category=cluster['category']
            sensor.save()
