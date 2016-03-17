#!/usr/bin/python
import sys
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
import string
import requests

import os, django, glob, sys, shelve
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "SmartHome.settings")
django.setup()

from backend.models import *
from django.db.models import Max
from django.contrib.auth.models import User
from django.db.models import F

config_file = 'homes_config.json'
households = range(1, 11)
speed = 1.0

if len(sys.argv) > 1:
    config_file = sys.argv[1]
if len(sys.argv) > 2:
    households = []
    for lst in string.split(sys.argv[2], ","):
        if len(lst) == 1:
            households.append(int(lst[0]))
        elif len(lst) == 2:
            [a, b] = map(int, lst)
            households += range(a, b+1)
        
if len(sys.argv) > 3:
    speed = float(argv[2])

def parse_config(config_file):
    json_file = open(config_file, "r")
    config = json.load(json_file)
    json_file.close()
    if not config:
        raise ValueError("Configuration not found")

    for household in config:
        household["appliance_status"] = []
            for row in appliance.appliances:
		        status = "NO"
		        if row[0] in household["appliances"]:
			        status = "YES"
		        household["appliance_status"].append(status)

    return config

def get_max_timestamp():
    return RecentData.objects.aggregate(Max('timestamp'))['timestamp__max']

def generate_data(household, start, end):
    raw_data = generate_data.generate_data_range(
        iResidents=household["no_residents"],
        Dwell=household["appliance_status"],
        iIrradianceThreshold = household["lights_irradiance"],
        iRandomHouse = household["lights_house"],
        from_date=start,
        to_date=end)
    
    header = raw_data[0][3:]
    
    return [{'sensor_name': header[i], 'usage': v*1000, 'n_measurements': 1, 'timestamp': start} for i, v in enumerate(raw_data[1][3:])]

def send_data(home_id, data):
    response = requests.put('http://localhost:8000/api/data/home/'+str(home_id)+'/?format=vnd.api%2Bjson', data=data) #, auth=('user', 'password'))

def simulate(config, households, speed):
    start = get_max_timestamp()
    while True:
        end = start + timedelta(minute=1)
        sensor_data = {}
        for household_id in households:
            household = config[household_id-1]
            # simulate for household for one minute
            sensor_data[household_id] = generate_data(household, start, end)
        # send sensor_data
        send_data(household_id, sensor_data)

        # increase time with one minute
        start = end
        

if __name__ == "__main__":
    config = parse_config(config_file)
    simulate(config, households, speed)
