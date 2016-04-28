from rest_framework import serializers
from backend.models import *

class UserSerializer(serializers.ModelSerializer):
    owned_homes = serializers.PrimaryKeyRelatedField(many=True, queryset = Home.objects.all())
    homes = serializers.PrimaryKeyRelatedField(many=True, queryset = Home.objects.all())

    class Meta:
        model = User
        fields = ('id', 'last_login', 'username', 'first_name', 'last_name', 'email', 'is_staff', 'is_active', 'date_joined', 'owned_homes', 'homes')


class HomeSerializer(serializers.ModelSerializer):
    owner = serializers.PrimaryKeyRelatedField(many=False, queryset = User.objects.all())
    users = serializers.PrimaryKeyRelatedField(many=True, queryset = User.objects.all())

    class Meta:
        model = Home
        fields = ('name', 'owner', 'users', 'sensor_set', 'name', 'country', 'city', 'zipcode', 'street', 'house_number', 'date_added')


class SensorSerializer(serializers.ModelSerializer):
    home = serializers.PrimaryKeyRelatedField(many=False, queryset = Home.objects.all())
    tags = serializers.PrimaryKeyRelatedField(many=True, queryset = Tag.objects.all())

    class Meta:
        model = Sensor
        fields = ('name', 'home', 'description', 'tags', 'power_unit')

class FriendRequestSerializer(serializers.ModelSerializer):
    sender = serializers.PrimaryKeyRelatedField(many=False, queryset = User.objects.all())
    receiver = serializers.PrimaryKeyRelatedField(many=False, queryset = User.objects.all())

    class Meta:
        model = FriendRequest
        fields = ('sender', 'receiver', 'status', 'read', 'date_sent')

class PostSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(many=False, queryset = User.objects.all())

    class Meta:
        model = Post
        fields = ('user', 'content', 'plot', 'read', 'date_sent')

class TagSerializer(serializers.ModelSerializer):

    class Meta:
        model = Tag
        fields = ('name', 'description')

class DataSerializer(serializers.ModelSerializer):

    class Meta:
        model = SensorData
        fields = ('sensor', 'timestamp', 'usage', 'n_measurements')

