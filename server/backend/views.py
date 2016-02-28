from backend.models import *
from django.utils import timezone

import json

def ParseConfig(homes_data):
    #homes_data = json.loads(json_data)

    for x in homes_data:
        home = Home(id=x['id_household'], owner_id=1, date_added=timezone.now())
        home.save()
        for s in x['appliances']:
            tag = Tag.objects.get(name = s)
            sensor = Sensor(home=home, name=s, power_unit='kWh', date_created=timezone.now())
            sensor.save()
            
            relation = SensorsTags(sensor=sensor, tag=tag, date_created=timezone.now())
            relation.save()
    

def ParseData(json_data):
    pass
    
