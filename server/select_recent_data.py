#!/usr/bin/python

import os, django, glob, sys, shelve
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "SmartHome.settings")
django.setup()

from django.db import connection

from backend.models import *
from django.utils import timezone, dateparse
from django.contrib.auth.models import User

from django.db.models import F

user = User.objects.get(pk=1)

#recent_data = RecentData.objects.filter(sensor__home__owner=user, timestamp__gte='2016-02-28 00:00:00.000000').annotate(home_id=F('sensor__home_id')).values('home_id', 'timestamp').annotate(usage=Sum('usage')).order_by('timestamp')
#print(str(recent_data))
home_id = 1
recent_data = RecentData.objects.filter(sensor__home_id=home_id, timestamp__gte='2016-02-28 00:00:00.000000').annotate(sensor_name=F('sensor__name')).values('sensor_id', 'sensor_name', 'timestamp').annotate(usage=Sum('usage')).order_by('sensor_id', 'timestamp')
print(str(recent_data))
print connection.queries
