# -*- coding: utf-8 -*-
# Generated by Django 1.9.4 on 2016-05-03 16:37
from __future__ import unicode_literals

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0003_auto_20160503_1633'),
    ]

    operations = [
        migrations.AlterField(
            model_name='friendrequest',
            name='date_sent',
            field=models.DateTimeField(default=datetime.datetime(2016, 5, 3, 16, 37, 19, 185715)),
        ),
        migrations.AlterField(
            model_name='post',
            name='date_sent',
            field=models.DateTimeField(default=datetime.datetime(2016, 5, 3, 16, 37, 19, 186368)),
        ),
    ]
