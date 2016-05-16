# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import datetime


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0003_auto_20160514_1409'),
    ]

    operations = [
        migrations.AddField(
            model_name='home',
            name='price_per_kwh',
            field=models.FloatField(null=True),
        ),
        migrations.AddField(
            model_name='sensor',
            name='usage_category',
            field=models.IntegerField(null=True, choices=[(0, 'Low'), (1, 'Medium'), (2, 'High')]),
        ),
        migrations.AlterField(
            model_name='friendrequest',
            name='date_sent',
            field=models.DateTimeField(default=datetime.datetime(2016, 5, 16, 18, 2, 35, 37591)),
        ),
        migrations.AlterField(
            model_name='home',
            name='date_added',
            field=models.DateTimeField(default=datetime.datetime(2016, 5, 16, 18, 2, 35, 31670)),
        ),
        migrations.AlterField(
            model_name='post',
            name='date_sent',
            field=models.DateTimeField(default=datetime.datetime(2016, 5, 16, 18, 2, 35, 38153)),
        ),
        migrations.AlterField(
            model_name='sensor',
            name='date_created',
            field=models.DateTimeField(default=datetime.datetime(2016, 5, 16, 18, 2, 35, 32499)),
        ),
        migrations.AlterField(
            model_name='sensorstags',
            name='date_created',
            field=models.DateTimeField(default=datetime.datetime(2016, 5, 16, 18, 2, 35, 33340)),
        ),
        migrations.AlterField(
            model_name='tag',
            name='date_created',
            field=models.DateTimeField(default=datetime.datetime(2016, 5, 16, 18, 2, 35, 33975)),
        ),
        migrations.AlterField(
            model_name='usershomes',
            name='date_created',
            field=models.DateTimeField(default=datetime.datetime(2016, 5, 16, 18, 2, 35, 34501)),
        ),
    ]
