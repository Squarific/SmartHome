# -*- coding: utf-8 -*-
# Generated by Django 1.9.4 on 2016-05-03 16:41
from __future__ import unicode_literals

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0004_auto_20160503_1637'),
    ]

    operations = [
        migrations.AlterField(
            model_name='friendrequest',
            name='date_sent',
            field=models.DateTimeField(default=datetime.datetime(2016, 5, 3, 16, 41, 28, 785725)),
        ),
        migrations.AlterField(
            model_name='post',
            name='date_sent',
            field=models.DateTimeField(default=datetime.datetime(2016, 5, 3, 16, 41, 28, 786432)),
        ),
    ]
