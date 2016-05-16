# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import datetime


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='dailydata',
            name='timestamp',
            field=models.DateTimeField(default=datetime.datetime(2016, 5, 12, 16, 19, 10, 900876)),
        ),
        migrations.AlterField(
            model_name='friendrequest',
            name='date_sent',
            field=models.DateTimeField(default=datetime.datetime(2016, 5, 12, 16, 19, 10, 903545)),
        ),
        migrations.AlterField(
            model_name='home',
            name='date_added',
            field=models.DateTimeField(default=datetime.datetime(2016, 5, 12, 16, 19, 10, 897125)),
        ),
        migrations.AlterField(
            model_name='monthlydata',
            name='timestamp',
            field=models.DateTimeField(default=datetime.datetime(2016, 5, 12, 16, 19, 10, 900876)),
        ),
        migrations.AlterField(
            model_name='post',
            name='date_sent',
            field=models.DateTimeField(default=datetime.datetime(2016, 5, 12, 16, 19, 10, 904194)),
        ),
        migrations.AlterField(
            model_name='recentdata',
            name='timestamp',
            field=models.DateTimeField(default=datetime.datetime(2016, 5, 12, 16, 19, 10, 900876)),
        ),
        migrations.AlterField(
            model_name='sensor',
            name='date_created',
            field=models.DateTimeField(default=datetime.datetime(2016, 5, 12, 16, 19, 10, 898021)),
        ),
        migrations.AlterField(
            model_name='sensorstags',
            name='date_created',
            field=models.DateTimeField(default=datetime.datetime(2016, 5, 12, 16, 19, 10, 898607)),
        ),
        migrations.AlterField(
            model_name='tag',
            name='date_created',
            field=models.DateTimeField(default=datetime.datetime(2016, 5, 12, 16, 19, 10, 899131)),
        ),
        migrations.AlterField(
            model_name='usershomes',
            name='date_created',
            field=models.DateTimeField(default=datetime.datetime(2016, 5, 12, 16, 19, 10, 900067)),
        ),
        migrations.AlterField(
            model_name='yearlydata',
            name='timestamp',
            field=models.DateTimeField(default=datetime.datetime(2016, 5, 12, 16, 19, 10, 900876)),
        ),
    ]
