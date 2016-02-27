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

class DailyData(models.Model):
    sensor = models.ForeignKey('Sensors', models.DO_NOTHING)
    timestamp = models.DateTimeField(unique=True)
    usage = models.IntegerField()
    n_measurements = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'daily_data'


class Homes(models.Model):
    owner = models.ForeignKey(User, models.CASCADE)
    name = models.CharField(max_length=64)
    country = models.CharField(max_length=2)
    city = models.CharField(max_length=64)
    zipcode = models.CharField(max_length=16)
    street = models.CharField(max_length=64)
    house_number = models.CharField(max_length=8)
    date_added = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'homes'


class HourlyData(models.Model):
    sensor = models.ForeignKey('Sensors', models.DO_NOTHING)
    timestamp = models.DateTimeField(unique=True)
    usage = models.IntegerField()
    n_measurements = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'hourly_data'


class MonthlyData(models.Model):
    sensor_id = models.IntegerField()
    timestamp = models.DateTimeField(unique=True)
    usage = models.IntegerField()
    n_measurements = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'monthly_data'


class RecentData(models.Model):
    sensor = models.ForeignKey('Sensors', models.DO_NOTHING)
    timestamp = models.DateTimeField(unique=True)
    usage = models.IntegerField()
    n_measurements = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'recent_data'


class Sensors(models.Model):
    home = models.ForeignKey(Homes, models.DO_NOTHING)
    name = models.CharField(max_length=64)
    description = models.CharField(max_length=256)
    power_unit = models.CharField(max_length=3)
    date_created = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'sensors'


class SensorsTags(models.Model):
    sensor = models.ForeignKey(Sensors, models.CASCADE)
    tag = models.ForeignKey('Tags', models.DO_NOTHING)
    date_created = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'sensors_tags'


class Tags(models.Model):
    name = models.CharField(max_length=64)
    description = models.CharField(max_length=256)
    date_created = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'tags'


class UsersHomes(models.Model):
    user = models.ForeignKey(User, models.CASCADE)
    home = models.ForeignKey(Homes, models.CASCADE)
    permission_flags = models.IntegerField()
    date_created = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'users_homes'


class YearlyData(models.Model):
    sensor = models.ForeignKey(Sensors, models.DO_NOTHING)
    timestamp = models.DateTimeField(unique=True)
    usage = models.IntegerField()
    n_measurements = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'yearly_data'
