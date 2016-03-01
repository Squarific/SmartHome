from backend.models import *
from backend.serializers import *
from django.utils import timezone, dateparse

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics

from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from rest_auth.registration.views import SocialLoginView

from allauth.socialaccount.providers.twitter.views import TwitterOAuthAdapter
from rest_auth.views import LoginView
from rest_auth.social_serializers import TwitterLoginSerializer


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


class HomeList(generics.ListCreateAPIView):
    """
    List all homes, or create a new home.
    """
    queryset = Home.objects.all()
    serializer_class = HomeSerializer


class HomeDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update or delete a home instance.
    """
    queryset = Home.objects.all()
    serializer_class = HomeSerializer


class SensorList(generics.ListCreateAPIView):
    """
    List all sensors, or create a new sensor.
    """
    queryset = Sensor.objects.all()
    serializer_class = SensorSerializer


class SensorDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update or delete a sensor instance.
    """
    queryset = Sensor.objects.all()
    serializer_class = SensorSerializer


class TagList(generics.ListCreateAPIView):
    """
    List all tags, or create a new tag.
    """
    queryset = Tag.objects.all()
    serializer_class = TagSerializer


class SensorDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update or delete a tag instance.
    """
    queryset = Tag.objects.all()
    serializer_class = TagSerializer


class DataList(APIView):
    def get(self, request, sensor_id, format=None):
        recent_data = RecentData.objects.filter(sensor_id=sensor_id)
        content = [{'timestamp':data.timestamp, 'sensor_id':sensor_id, 'usage':data.usage, 'n_measurements':data.n_measurements, 'interval':'daily'} for data in recent_data]
        return Response(content)
