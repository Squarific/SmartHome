#!/usr/bin/python

import os, django, glob, sys, shelve
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "SmartHome.settings")
django.setup()

from backend.views import ParseConfig
import json

filename = sys.argv[1] or 'conf.json'

with open(filename) as jsonfile:
    data = json.load(jsonfile)
    ParseConfig(data)

