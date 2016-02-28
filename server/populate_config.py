#!/usr/bin/python

import os, django, glob, sys, shelve
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "SmartHome.settings")
django.setup()

from backend.views import ParseConfig
import json

with open('conf.json') as f:
    data = json.load(f)
    ParseConfig(data)

