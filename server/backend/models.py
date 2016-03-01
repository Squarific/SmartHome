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
from django.db.models import Avg, Sum
from datetime import timedelta

class Home(models.Model):
    owner = models.ForeignKey(User, models.CASCADE, related_name='owned_homes')
    users = models.ManyToManyField(User, through='UsersHomes', related_name='homes')
    name = models.CharField(max_length=64)
    country = models.CharField(max_length=2)
    city = models.CharField(max_length=64)
    zipcode = models.CharField(max_length=16)
    street = models.CharField(max_length=64)
    house_number = models.CharField(max_length=8)
    date_added = models.DateTimeField()

    def __str__(self):
        return str(self.pk)

    class Meta:
        db_table = 'homes'


class Sensor(models.Model):
    home = models.ForeignKey(Home, models.DO_NOTHING)
    name = models.CharField(max_length=64)
    description = models.CharField(max_length=256)
    tags = models.ManyToManyField('Tag', through='SensorsTags')
    power_unit = models.CharField(max_length=3)
    date_created = models.DateTimeField()

    def __str__(self):
        return self.name

    class Meta:
        db_table = 'sensors'


class SensorsTags(models.Model):
    sensor = models.ForeignKey(Sensor, models.CASCADE)
    tag = models.ForeignKey('Tag', models.DO_NOTHING)
    date_created = models.DateTimeField()

    class Meta:
        db_table = 'sensors_tags'


class Tag(models.Model):
    name = models.CharField(max_length=64)
    description = models.CharField(max_length=256)
    date_created = models.DateTimeField()

    def __str__(self):
        return self.name

    class Meta:
        db_table = 'tags'


class UsersHomes(models.Model):
    user = models.ForeignKey(User, models.CASCADE)
    home = models.ForeignKey(Home, models.CASCADE)
    permission_flags = models.IntegerField()
    date_created = models.DateTimeField()

    class Meta:
        db_table = 'users_homes'
        

class YearlyData(models.Model):
    sensor = models.ForeignKey(Sensor, models.DO_NOTHING)
    timestamp = models.DateTimeField()
    usage = models.IntegerField()
    n_measurements = models.IntegerField()

    class Meta:
        db_table = 'yearly_data'


class MonthlyData(models.Model):
    sensor_id = models.IntegerField()
    timestamp = models.DateTimeField()
    usage = models.IntegerField()
    n_measurements = models.IntegerField()

    class Meta:
        db_table = 'monthly_data'

    def save(self, *args, **kwargs):
        MonthlyData.objects.filter(sensor_id = self.sensor_id, timestamp__lt = (self.timestamp - timedelta(days=366) )).delete() # old data cleanup

        super(MonthlyData, self).save(*args, **kwargs) # Call the "real" save() method.

        results = MonthlyData.objects.filter(sensor_id = self.sensor_id, timestamp__year = self.timestamp.year)
        usage = results.aggregate(Avg('usage'))['usage__avg'] or 0
        n_measurements = results.aggregate(Sum('n_measurements'))['n_measurements__sum'] or 0

        timestamp = self.timestamp.replace(month=1, day=1, hour=0, minute = 0, second=0, microsecond=0)
        
        try:
            existing = YearlyData.objects.get(sensor_id = self.sensor_id, timestamp__year = timestamp.year)
            YearlyData.objects.filter(id=existing.id).update(usage=usage, n_measurements=n_measurements)
        except ObjectDoesNotExist:
            YearlyData.objects.create(sensor_id = self.sensor_id, timestamp = timestamp, usage = usage, n_measurements = n_measurements) # data aggregation



class WeeklyData(models.Model):
    sensor = models.ForeignKey('Sensor', models.DO_NOTHING)
    timestamp = models.DateTimeField()
    usage = models.IntegerField()
    n_measurements = models.IntegerField()

    class Meta:
        db_table = 'weekly_data'

    def save(self, *args, **kwargs):
        WeeklyData.objects.filter(sensor_id = self.sensor_id, timestamp__lt = (self.timestamp - timedelta(days=7) )).delete() # old data cleanup

        super(WeeklyData, self).save(*args, **kwargs) # Call the "real" save() method.

        results = WeeklyData.objects.filter(sensor_id = self.sensor_id, timestamp__month = self.timestamp.month, timestamp__day = self.timestamp.day)
        usage = results.aggregate(Avg('usage'))['usage__avg'] or 0
        n_measurements = results.aggregate(Sum('n_measurements'))['n_measurements__sum'] or 0

        timestamp = self.timestamp.replace(day = 1, hour=0, minute = 0, second=0, microsecond=0)

        try:
            existing = MonthlyData.objects.get(sensor_id = self.sensor_id, timestamp__year = timestamp.year, timestamp__month = timestamp.month)
            MonthlyData.objects.filter(id=existing.id).update(usage=usage, n_measurements=n_measurements)
        except ObjectDoesNotExist:
            MonthlyData.objects.create(sensor_id = self.sensor_id, timestamp = timestamp, usage = usage, n_measurements = n_measurements) # data aggregation



class DailyData(models.Model):
    sensor = models.ForeignKey('Sensor', models.DO_NOTHING)
    timestamp = models.DateTimeField()
    usage = models.IntegerField()
    n_measurements = models.IntegerField()

    class Meta:
        db_table = 'daily_data'

    def save(self, *args, **kwargs):
        DailyData.objects.filter(sensor_id = self.sensor_id, timestamp__lt = (self.timestamp - timedelta(days=7) )).delete() # old data cleanup

        super(DailyData, self).save(*args, **kwargs) # Call the "real" save() method.

        results = DailyData.objects.filter(sensor_id = self.sensor_id, timestamp__week = self.timestamp.isocalendar()[1])
        usage = results.aggregate(Avg('usage'))['usage__avg'] or 0
        n_measurements = results.aggregate(Sum('n_measurements'))['n_measurements__sum'] or 0

        timestamp = self.timestamp - timedelta( self.timestamp.weekday() )

        try:
            existing = WeeklyData.objects.get(sensor_id = self.sensor_id, timestamp__week = self.timestamp.isocalendar()[1])
            WeeklyData.objects.filter(id=existing.id).update(usage=usage, n_measurements=n_measurements)
        except ObjectDoesNotExist:
            WeeklyData.objects.create(sensor_id = self.sensor_id, timestamp = timestamp, usage = usage, n_measurements = n_measurements) # data aggregation



class RecentData(models.Model):
    sensor = models.ForeignKey('Sensor', models.DO_NOTHING)
    timestamp = models.DateTimeField()
    usage = models.IntegerField()
    n_measurements = models.IntegerField()

    class Meta:
        db_table = 'recent_data'

    def save(self, *args, **kwargs):
        RecentData.objects.filter(sensor_id = self.sensor_id, timestamp__lt = (self.timestamp - timedelta(minutes=1440) )).delete() # old data cleanup

        super(RecentData, self).save(*args, **kwargs) # Call the "real" save() method.

        results = RecentData.objects.filter(sensor_id = self.sensor_id, timestamp__day = self.timestamp.day, timestamp__hour = self.timestamp.hour)
        usage = results.aggregate(Avg('usage'))['usage__avg'] or 0
        n_measurements = results.aggregate(Sum('n_measurements'))['n_measurements__sum'] or 0

        timestamp = self.timestamp.replace(hour = 0, minute = 0, second=0, microsecond=0)
        
        try:
            existing = DailyData.objects.get(sensor_id = self.sensor_id, timestamp__day = timestamp.day, timestamp__hour = timestamp.hour)
            DailyData.objects.filter(id=existing.id).update(usage=usage, n_measurements=n_measurements)
        except ObjectDoesNotExist:
            DailyData.objects.create(sensor_id = self.sensor_id, timestamp = timestamp, usage = usage, n_measurements = n_measurements) # data aggregation

