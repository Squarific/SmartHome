#!/usr/bin/python
import numpy
import sys
import getopt
import time
import json
from datetime import datetime, timedelta
from dateutil.relativedelta import relativedelta
import re
from os.path import dirname
sys.path.append(dirname(__file__))
sys.path.append('../ElecSim/src')
import generate_data
import occsimread, appliance, activitydat, random, appsimfun, bulbdat, sys, csv
import os, sys

import os, django, glob, sys, shelve
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "SmartHome.settings")
django.setup()

from backend.models import *
from django.contrib.auth.models import User
from django.db.models import F

dateformat = '%Y-%m-%dT%H:%M'

config_file = 'homes_config.json'
from_date = datetime.strptime("2011-01-01T00:00", dateformat)   #default 2011
to_date = datetime.now()                                        #default now

if len(sys.argv) > 1:
    config_file = sys.argv[1]
if len(sys.argv) > 2:
    from_date = datetime.strptime(sys.argv[2], dateformat)
if len(sys.argv) > 3:
    to_date = datetime.strptime(sys.argv[3], dateformat)

home_names = ['Thuis', 'Vakantiehuis', 'Praktijk']

def generate_averages(household, appliance_status, from_date, to_date):
    raw_data = generate_data.generate_data_range(
        iResidents=household["no_residents"],
        Dwell=appliance_status,
        iIrradianceThreshold = household["lights_irradiance"],
        iRandomHouse = household["lights_house"],
        from_date=from_date,
        to_date=to_date)

    matrix = numpy.array(raw_data[1:])
    matrix = matrix[:, 3:]

    header = raw_data[0][3:]
    
    return [{'sensor_name': header[i], 'average': v*1000, 'count': (len(raw_data)-1)} for i, v in enumerate(numpy.mean(matrix, axis=0))]

def populate_config(config_file):
    json_file = open(config_file, "r")
    config = json.load(json_file)
    json_file.close()
    if not config:
        raise ValueError("Configuration not found")

    user_count = User.objects.count()

    for household in config:
        household_id = household['id_household']
        home = Home(id=household_id, owner_id=((household_id-1)%user_count)+1, name=home_names[(household_id-1)/user_count], date_added=datetime.now())
        home.save()
        for s in household['appliances']:
            tag = Tag.objects.get(name = s)
            sensor = Sensor(home=home, name=s, power_unit='Wh', date_created=datetime.now())
            sensor.save()
            
            relation = SensorsTags(sensor=sensor, tag=tag, date_created=datetime.now())
            relation.save()
    
    return config

def populate_data(config, from_date, to_date):
    data = {'yearly':[], 'monthly':[], 'daily':[], 'recent':[]}

    for household in config:
        household_id = household['id_household']
        print("Generating household " + str(household_id))
        appliance_status = []
        for row in appliance.appliances:
		    status = "NO"
		    if row[0] in household["appliances"]:
			    status = "YES"
		    appliance_status.append(status)

        sensor_list = Sensor.objects.filter(home=household_id).values('name', 'id')
        sensor_map = {v['name']:v['id'] for v in sensor_list}

        for year in range(from_date.year, to_date.year):
            start_date = datetime(year, 1, 1)
            averages = generate_averages( household, appliance_status, start_date, datetime(year+1, 1, 1) )
            data['yearly'] += [YearlyData(sensor_id=sensor_map[ v['sensor_name'] ], usage=v['average'], n_measurements=v['count'], timestamp=start_date) for v in averages]
        
        monthly_start = to_date.replace(day=1, hour=0, minute=0, second=0, microsecond=0) - relativedelta(years=1)
        for month in range(12):
            start_date = monthly_start + relativedelta(months=month)
            stop_date = monthly_start + relativedelta(months=month+1)
            if start_date < from_date:
                continue
            averages = generate_averages( household, appliance_status, start_date, stop_date )
            data['monthly'] += [MonthlyData(sensor_id=sensor_map[ v['sensor_name'] ], usage=v['average'], n_measurements=v['count'], timestamp=start_date) for v in averages]


        daily_start = to_date.replace(hour=0, minute=0, second=0, microsecond=0) - relativedelta(months=1)
        for day in range((to_date-daily_start).days):
            start_date = daily_start + timedelta(days=day)
            stop_date = daily_start + timedelta(days=day+1)
            if start_date < from_date:
                continue
            averages = generate_averages( household, appliance_status, start_date, stop_date )
            data['daily'] += [DailyData(sensor_id=sensor_map[ v['sensor_name'] ], usage=v['average'], n_measurements=v['count'], timestamp=start_date) for v in averages]


        start_date = max(to_date.replace(hour=0, minute=0, second=0, microsecond=0), from_date)
        raw_data = generate_data.generate_data_range(
            iResidents=household["no_residents"],
            Dwell=appliance_status,
            iIrradianceThreshold = household["lights_irradiance"],
            iRandomHouse = household["lights_house"],
            from_date=start_date,
            to_date=to_date)

        header = raw_data[0][3:]
        for v in raw_data[1:]:
            data['recent'] += [ RecentData(sensor_id=sensor_map[ header[i] ], usage=v[i]*1000, n_measurements=1, timestamp=v[0]) for i in range(3, len(header)) ]


    #data_count = len(data)
    #print("Saving " + str(data_count) + " objects...")
    #data_1000 = data_count/1000
    #for i, datum in enumerate(data):
    #    if ((i % data_1000) == 0):
    #        print(str(datetime.now()) + " - progress: " + str(float(i*100)/float(data_count)) + "%")
    #    super(SensorData, datum).save()

    print("Saving " + str(len(data['yearly'])) + " yearly data entries...")
    YearlyData.objects.bulk_create(data['yearly'])

    print("Saving " + str(len(data['monthly'])) + " monthly data entries...")
    MonthlyData.objects.bulk_create(data['monthly'])

    print("Saving " + str(len(data['daily'])) + " daily data entries...")
    DailyData.objects.bulk_create(data['daily'])

    print("Saving " + str(len(data['recent'])) + " recent data entries...")
    RecentData.objects.bulk_create(data['recent'])

    return data
        

if __name__ == "__main__":
    config = populate_config(config_file)
    populate_data(config, from_date, to_date)
