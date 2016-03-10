from rest_framework import serializers
from backend.models import *

class HomeSerializer(serializers.ModelSerializer):
    owner = serializers.PrimaryKeyRelatedField(many=False, read_only=True)
    users = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Home
        fields = ('owner', 'users')


class SensorSerializer(serializers.ModelSerializer):
    home = serializers.PrimaryKeyRelatedField(many=False, read_only=True)
    tags = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Sensor
        fields = ('home', 'tags', 'power_unit')

class TagSerializer(serializers.ModelSerializer):

    class Meta:
        model = Tag
        fields = ('name', 'description')

class DataSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = SensorData
        fields = ('sensor', 'timestamp', 'usage', 'n_measurements')


