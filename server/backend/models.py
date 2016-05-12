# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey has `on_delete` set to the desired behavior.
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist
from django.db.models import Avg, Sum, Max
from datetime import datetime, timedelta

class Home(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='owned_homes')
    users = models.ManyToManyField(User, through='UsersHomes', related_name='homes')
    name = models.CharField(max_length=64)
    country = models.CharField(max_length=2)
    city = models.CharField(max_length=64)
    zipcode = models.CharField(max_length=16)
    street = models.CharField(max_length=64)
    house_number = models.CharField(max_length=8)
    date_added = models.DateTimeField(default=datetime.now())

    def __str__(self):
        return str(self.pk)

    class Meta:
        db_table = 'homes'


class Sensor(models.Model):
    home = models.ForeignKey(Home, on_delete=models.DO_NOTHING)
    name = models.CharField(max_length=64)
    description = models.CharField(max_length=256)
    tags = models.ManyToManyField('Tag', through='SensorsTags')
    power_unit = models.CharField(max_length=3)
    date_created = models.DateTimeField(default=datetime.now())

    def __str__(self):
        return self.name

    class Meta:
        db_table = 'sensors'


class SensorsTags(models.Model):
    sensor = models.ForeignKey(Sensor, on_delete=models.CASCADE)
    tag = models.ForeignKey('Tag', on_delete=models.DO_NOTHING)
    date_created = models.DateTimeField(default=datetime.now())

    class Meta:
        db_table = 'sensors_tags'


class Tag(models.Model):
    name = models.CharField(max_length=64)
    description = models.CharField(max_length=256)
    date_created = models.DateTimeField(default=datetime.now())

    def __str__(self):
        return self.name

    class Meta:
        db_table = 'tags'


class UsersHomes(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    home = models.ForeignKey(Home, on_delete=models.CASCADE)
    permission_flags = models.IntegerField()
    date_created = models.DateTimeField(default=datetime.now())

    class Meta:
        db_table = 'users_homes'


class SensorData(models.Model):
    sensor = models.ForeignKey('Sensor', on_delete=models.DO_NOTHING)
    timestamp = models.DateTimeField(default=datetime.now())
    usage = models.IntegerField()
    n_measurements = models.IntegerField()

    class Meta:
        abstract = True
        ordering = ['timestamp']

    def save(self, *args, **kwargs):
        sensors = type(self).objects.filter(sensor_id = self.sensor_id)
        max_timestamp = sensors.aggregate(Max('timestamp'))['timestamp__max'] or self.timestamp
        needs_rollup = self.needs_rollup(max_timestamp, self.timestamp)

        if needs_rollup == True:
            cleanup_time = self.get_cleanup_time(self.timestamp)
            sensors.filter(timestamp__lt = cleanup_time).delete()
            rollup_time = self.get_rollup_time(self.timestamp)
            RollupClass = self.get_rollup_class()

            print(str(self.sensor_id) + ", " + str(rollup_time))

            results = sensors.filter(timestamp__gte = rollup_time)

            usage = results.aggregate(Avg('usage'))['usage__avg'] or 0
            n_measurements = results.aggregate(Sum('n_measurements'))['n_measurements__sum'] or 0

            #try:
            #    existing = RollupClass.objects.get(sensor_id = self.sensor_id, timestamp = rollup_time)
            #    RollupClass.objects.filter(id=existing.id).update(usage=usage, n_measurements=n_measurements)
            #except ObjectDoesNotExist:
            RollupClass.objects.create(sensor_id = self.sensor_id, timestamp = rollup_time, usage = usage, n_measurements = n_measurements) # data aggregation

        super(SensorData, self).save(*args, **kwargs) # Call the "real" save() method.


class YearlyData(SensorData):

    def needs_rollup(self, max_timestamp, timestamp):
        return False

    def get_cleanup_time(self, timestamp):
        pass

    def get_rollup_time(self, timestamp):
        pass

    def get_rollup_class(self):
        return None

    def get_resolution(self):
        return 'yearly'

    class Meta(SensorData.Meta):
        db_table = 'yearly_data'


class MonthlyData(SensorData):

    def needs_rollup(self, max_timestamp, timestamp):
        return max_timestamp.year < timestamp.year

    def get_cleanup_time(self, timestamp):
        return timestamp.replace(month=1)

    def get_rollup_time(self, timestamp):
        return timestamp.replace(month=1)

    def get_rollup_class(self):
        return YearlyData

    def get_resolution(self):
        return 'monthly'

    class Meta:
        db_table = 'monthly_data'


#class WeeklyData(SensorData):
#
#    def needs_rollup(self, max_timestamp, timestamp):
#        return max_timestamp.month <> timestamp.month
#
#    def get_cleanup_time(self, timestamp):
#        return timestamp.replace(day=1)
#
#    def get_rollup_time(self, timestamp):
#        return timestamp.replace(day=1)
#
#    def get_rollup_class(self):
#        return MonthlyData
#
#    class Meta:
#        db_table = 'weekly_data'


class DailyData(SensorData):

    def needs_rollup(self, max_timestamp, timestamp):
        return max_timestamp.month <> timestamp.month

    def get_cleanup_time(self, timestamp):
        return timestamp.replace(day=1)

    def get_rollup_time(self, timestamp):
        return timestamp.replace(day=1)

    def get_rollup_class(self):
        return MonthlyData

    def get_resolution(self):
        return 'daily'

    class Meta:
        db_table = 'daily_data'


class RecentData(SensorData):

    def needs_rollup(self, max_timestamp, timestamp):
        return max_timestamp.day <> timestamp.day

    def get_cleanup_time(self, timestamp):
        return timestamp.replace(hour=0, minute=0, second=0, microsecond=0) - timedelta(days=1)

    def get_rollup_time(self, timestamp):
        return timestamp.replace(hour=0, minute=0, second=0, microsecond=0) - timedelta(days=1)

    def get_rollup_class(self):
        return DailyData

    def get_resolution(self):
        return 'minutely'

    class Meta:
        db_table = 'recent_data'


class FriendRequest(models.Model):
    REQUEST_STATUS = (
        (0, 'Pending'),
        (1, 'Approved'),
        (2, 'Denied'),
    )
    sender = models.ForeignKey(User, related_name='sent_requests')
    receiver = models.ForeignKey(User, related_name='received_requests')
    status = models.IntegerField(choices=REQUEST_STATUS)
    read = models.BooleanField(default=False)
    date_sent = models.DateTimeField(default=datetime.now())

    def __str__(self):
        return str(self.pk)

    class Meta:
        db_table = 'friend_requests'


class Post(models.Model):
    user = models.ForeignKey(User, related_name='posts')
    content = models.TextField(blank=True)
    plot = models.TextField(blank=True)
    read = models.BooleanField(default=False)
    date_sent = models.DateTimeField(default=datetime.now())

    def __str__(self):
        return str(self.pk)

    class Meta:
        db_table = 'messages'