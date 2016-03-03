#!/usr/bin/python

import os, django, glob, sys, shelve
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "SmartHome.settings")
django.setup()

from backend.views import ParseData
import csv

filename = sys.argv[1] or data_1_day.csv

with open(filename, 'rb') as csvfile:
    reader = csv.reader(csvfile, delimiter=';', quotechar='"')
    ParseData(reader)

