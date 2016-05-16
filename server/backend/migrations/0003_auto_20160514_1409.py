# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import datetime


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0002_auto_20160512_1619'),
    ]

    operations = [
        migrations.AlterField(
            model_name='dailydata',
            name='timestamp',
            field=models.DateTimeField(),
        ),
        migrations.AlterField(
            model_name='friendrequest',
            name='date_sent',
            field=models.DateTimeField(default=datetime.datetime(2016, 5, 14, 14, 9, 17, 279631)),
        ),
        migrations.AlterField(
            model_name='home',
            name='date_added',
            field=models.DateTimeField(default=datetime.datetime(2016, 5, 14, 14, 9, 17, 273235)),
        ),
        migrations.AlterField(
            model_name='monthlydata',
            name='timestamp',
            field=models.DateTimeField(),
        ),
        migrations.AlterField(
            model_name='post',
            name='date_sent',
            field=models.DateTimeField(default=datetime.datetime(2016, 5, 14, 14, 9, 17, 280235)),
        ),
        migrations.AlterField(
            model_name='recentdata',
            name='timestamp',
            field=models.DateTimeField(),
        ),
        migrations.AlterField(
            model_name='sensor',
            name='date_created',
            field=models.DateTimeField(default=datetime.datetime(2016, 5, 14, 14, 9, 17, 274220)),
        ),
        migrations.AlterField(
            model_name='sensorstags',
            name='date_created',
            field=models.DateTimeField(default=datetime.datetime(2016, 5, 14, 14, 9, 17, 274832)),
        ),
        migrations.AlterField(
            model_name='tag',
            name='date_created',
            field=models.DateTimeField(default=datetime.datetime(2016, 5, 14, 14, 9, 17, 275352)),
        ),
        migrations.AlterField(
            model_name='usershomes',
            name='date_created',
            field=models.DateTimeField(default=datetime.datetime(2016, 5, 14, 14, 9, 17, 275906)),
        ),
        migrations.AlterField(
            model_name='yearlydata',
            name='timestamp',
            field=models.DateTimeField(),
        ),
    ]
