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
            model_name='friendrequest',
            name='date_sent',
            field=models.DateTimeField(default=datetime.datetime(2016, 5, 6, 16, 15, 31, 381230)),
        ),
        migrations.AlterField(
            model_name='post',
            name='date_sent',
            field=models.DateTimeField(default=datetime.datetime(2016, 5, 6, 16, 15, 31, 381855)),
        ),
    ]
