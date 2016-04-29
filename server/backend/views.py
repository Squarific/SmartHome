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


def ParseConfig(data):
    for x in data:
        home = Home(id=x['id_household'], owner_id=1, date_added=timezone.now())
        home.save()
        for s in x['appliances']:
            tag = Tag.objects.get(name = s)
            sensor = Sensor(home=home, name=s, power_unit='Wh', date_created=timezone.now())
            sensor.save()

            relation = SensorsTags(sensor=sensor, tag=tag, date_created=timezone.now())
            relation.save()


def ParseData(csvreader):
    sensor_map = {}
    sensor_names = csvreader.next()[3:-1]
    sensor_count = len(sensor_names)
    sensors = Sensor.objects.filter(home_id=1, name__in=sensor_names)
    for i, sensor_name in enumerate(sensor_names):
        sensor_map[i] = sensors.get(name=sensor_name).id
    for row in csvreader:
        timestamp = dateparse.parse_datetime(row[0])
        for i, x in enumerate(row[3:-1]):
            datapoint = RecentData(sensor_id=sensor_map[i], timestamp=timestamp, usage=round(float(x)*1000), n_measurements=1)
            datapoint.save()


class FacebookLogin(SocialLoginView):
    adapter_class = FacebookOAuth2Adapter


class TwitterLogin(LoginView):
    serializer_class = TwitterLoginSerializer
    adapter_class = TwitterOAuthAdapter

#######################
# User API
#######################
class UserList(generics.ListAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_queryset(self):
        """
        Optionally restricts the returned purchases to a given user,
        by filtering against a `username` query parameter in the URL.
        """
        queryset = User.objects.all()
        username = self.request.query_params.get('username', None)
        if username is not None:
            queryset = queryset.filter(username__contains=username)
        return queryset

class UserDetail(APIView):
    permission_classes = (IsAuthenticated,)
    #queryset = User.objects.all()
    #serializer_class = UserSerializer

    def get_object(self, pk):
        if (pk == 'me'):
            return self.request.user
        try:
            return User.objects.get(pk=pk)
        except User.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        user = self.get_object(pk)
        serializer = UserSerializer(user)
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
                queryset = queryset.filter(sender_id = user_id)
            if received:
                queryset = queryset.filter(receiver_id = user_id)
        serializer = FriendRequestSerializer(queryset, many=True)
        return Response(serializer.data)

class FriendRequestDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = FriendRequest.objects.all()
    serializer_class = FriendRequestSerializer

class FriendList(generics.ListAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def list(self, request, user_id):
        # Note the use of `get_queryset()` instead of `self.queryset`
        if (user_id == 'me'):
            user_id = request.user.id
        queryset = User.objects.all().filter(Q(sent_requests__status = 1, sent_requests__receiver_id = user_id) | Q(received_requests__status = 1, received_requests__sender_id=user_id))
        serializer = UserSerializer(queryset, many=True)
        return Response(serializer.data)

class FriendPostList(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    def list(self, request, user_id):
        # Note the use of `get_queryset()` instead of `self.queryset`
        if (user_id == 'me'):
            user_id = request.user.id

        queryset = Post.objects.all().filter(Q(user__sent_requests__status = 1, user__sent_requests__receiver_id = user_id) | Q(user__received_requests__status = 1, user__received_requests__sender_id=user_id))
        serializer = PostSerializer(queryset, many=True)
        return Response(serializer.data)

class PostList(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    def list(self, request, user_id=None):
        # Note the use of `get_queryset()` instead of `self.queryset`
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
        # Note the use of `get_queryset()` instead of `self.queryset`
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
        # Note the use of `get_queryset()` instead of `self.queryset`
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

        now = datetime(2016, 3, 6) #datetime.now().replace(day=1, hour=0, minute=0, second=0, microsecond=0)
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

        print(queryset.values())

        content = [{'key':k, 'values':[{'timestamp':w['timestamp'], 'usage':w['usage']} for w in v]} for k,v in groupby(queryset, lambda x: x['key'])]
        return Response(content)

class DataList(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, user_id, format=None):
        user = User.objects.get(pk=user_id)
        home_data = []
        for home in user.owned_homes.all():
            sensor_data = {'home_id':home.id, 'data':[]}
            for sensor in home.sensor_set.all():
                now = datetime.now().replace(hour=0, minute=0, second=0, microsecond=0)
                recent_data = RecentData.objects.filter(sensor=sensor, timestamp__gte=(now - timedelta(days=2)))
                daily_data = DailyData.objects.filter(sensor=sensor, timestamp__lt=(now - timedelta(days=1)))

                for dataset in [daily_data, recent_data]:
                    sensor_data['data'].append( [{'timestamp':data.timestamp, 'sensor_id':sensor.id, 'usage':data.usage, 'n_measurements':data.n_measurements, 'interval':data.get_resolution()} for data in dataset] )

            home_data.append( sensor_data )

        return Response(home_data)


class UserDataList(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, user_id, format=None):
        now = datetime(2016, 3, 6) #datetime.now().replace(day=1, hour=0, minute=0, second=0, microsecond=0)
        from_date = self.get_from_date(now)
        data = self.get_class().objects.filter(sensor__home__owner_id=user_id, timestamp__gte=from_date).annotate(home_id=F('sensor__home_id'), home_name=F('sensor__home__name')).values('home_id', 'home_name', 'timestamp').annotate(usage=Sum('usage')).order_by('home_id', 'timestamp')
        content = [{'key':k, 'values':[{'timestamp':w['timestamp'], 'usage':w['usage']} for w in v]} for k,v in groupby(data, lambda x: x['home_name'])]
        return Response(content)


class RecentUserDataList(UserDataList):
    permission_classes = (IsAuthenticated,)

    def get_class(self):
        return RecentData

    def get_from_date(self, to_date):
        return to_date - timedelta(days=1)


class DailyUserDataList(UserDataList):
    permission_classes = (IsAuthenticated,)

    def get_class(self):
        return DailyData

    def get_from_date(self, to_date):
        return to_date - relativedelta(months=1)


class MonthlyUserDataList(UserDataList):
    permission_classes = (IsAuthenticated,)

    def get_class(self):
        return MonthlyData

    def get_from_date(self, to_date):
        return to_date - relativedelta(years=1)


class YearlyUserDataList(UserDataList):
    permission_classes = (IsAuthenticated,)

    def get_class(self):
        return YearlyData

    def get_from_date(self, to_date):
        return datetime.min


class HomeDataList(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, home_id, format=None):
        from_date = datetime.now() - relativedelta(years=1)
        recent_data = RecentData.objects.filter(sensor__home_id=home_id, timestamp__gte=from_date).annotate(sensor_name=F('sensor__name')).values('sensor_id', 'sensor_name', 'timestamp').annotate(usage=Sum('usage')).order_by('sensor_name', 'timestamp')
        content = [{'key':k, 'values':[{'timestamp':w['timestamp'], 'usage':w['usage']} for w in v]} for k,v in groupby(recent_data, lambda x: x['sensor_name'])]
        return Response(content)

    def put(self, request, home_id, format=None):
        serializer = DataSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
