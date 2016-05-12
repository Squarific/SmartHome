# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import datetime
import django.db.models.deletion
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='DailyData',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('timestamp', models.DateTimeField()),
                ('usage', models.IntegerField()),
                ('n_measurements', models.IntegerField()),
            ],
            options={
                'db_table': 'daily_data',
            },
        ),
        migrations.CreateModel(
            name='FriendRequest',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('status', models.IntegerField(choices=[(0, 'Pending'), (1, 'Approved'), (2, 'Denied')])),
                ('read', models.BooleanField(default=False)),
                ('date_sent', models.DateTimeField(default=datetime.datetime(2016, 5, 12, 13, 15, 24, 989647))),
                ('receiver', models.ForeignKey(related_name='received_requests', to=settings.AUTH_USER_MODEL)),
                ('sender', models.ForeignKey(related_name='sent_requests', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'friend_requests',
            },
        ),
        migrations.CreateModel(
            name='Home',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=64)),
                ('country', models.CharField(max_length=2)),
                ('city', models.CharField(max_length=64)),
                ('zipcode', models.CharField(max_length=16)),
                ('street', models.CharField(max_length=64)),
                ('house_number', models.CharField(max_length=8)),
                ('date_added', models.DateTimeField()),
                ('owner', models.ForeignKey(related_name='owned_homes', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'homes',
            },
        ),
        migrations.CreateModel(
            name='MonthlyData',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('timestamp', models.DateTimeField()),
                ('usage', models.IntegerField()),
                ('n_measurements', models.IntegerField()),
            ],
            options={
                'db_table': 'monthly_data',
            },
        ),
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('content', models.TextField(blank=True)),
                ('plot', models.TextField(blank=True)),
                ('read', models.BooleanField(default=False)),
                ('date_sent', models.DateTimeField(default=datetime.datetime(2016, 5, 12, 13, 15, 24, 990239))),
                ('user', models.ForeignKey(related_name='posts', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'messages',
            },
        ),
        migrations.CreateModel(
            name='RecentData',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('timestamp', models.DateTimeField()),
                ('usage', models.IntegerField()),
                ('n_measurements', models.IntegerField()),
            ],
            options={
                'db_table': 'recent_data',
            },
        ),
        migrations.CreateModel(
            name='Sensor',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=64)),
                ('description', models.CharField(max_length=256)),
                ('power_unit', models.CharField(max_length=3)),
                ('date_created', models.DateTimeField()),
                ('home', models.ForeignKey(to='backend.Home', on_delete=django.db.models.deletion.DO_NOTHING)),
            ],
            options={
                'db_table': 'sensors',
            },
        ),
        migrations.CreateModel(
            name='SensorsTags',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('date_created', models.DateTimeField()),
                ('sensor', models.ForeignKey(to='backend.Sensor')),
            ],
            options={
                'db_table': 'sensors_tags',
            },
        ),
        migrations.CreateModel(
            name='Tag',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=64)),
                ('description', models.CharField(max_length=256)),
                ('date_created', models.DateTimeField()),
            ],
            options={
                'db_table': 'tags',
            },
        ),
        migrations.CreateModel(
            name='UsersHomes',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('permission_flags', models.IntegerField()),
                ('date_created', models.DateTimeField()),
                ('home', models.ForeignKey(to='backend.Home')),
                ('user', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'users_homes',
            },
        ),
        migrations.CreateModel(
            name='YearlyData',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('timestamp', models.DateTimeField()),
                ('usage', models.IntegerField()),
                ('n_measurements', models.IntegerField()),
                ('sensor', models.ForeignKey(to='backend.Sensor', on_delete=django.db.models.deletion.DO_NOTHING)),
            ],
            options={
                'ordering': ['timestamp'],
                'abstract': False,
                'db_table': 'yearly_data',
            },
        ),
        migrations.AddField(
            model_name='sensorstags',
            name='tag',
            field=models.ForeignKey(to='backend.Tag', on_delete=django.db.models.deletion.DO_NOTHING),
        ),
        migrations.AddField(
            model_name='sensor',
            name='tags',
            field=models.ManyToManyField(to='backend.Tag', through='backend.SensorsTags'),
        ),
        migrations.AddField(
            model_name='recentdata',
            name='sensor',
            field=models.ForeignKey(to='backend.Sensor', on_delete=django.db.models.deletion.DO_NOTHING),
        ),
        migrations.AddField(
            model_name='monthlydata',
            name='sensor',
            field=models.ForeignKey(to='backend.Sensor', on_delete=django.db.models.deletion.DO_NOTHING),
        ),
        migrations.AddField(
            model_name='home',
            name='users',
            field=models.ManyToManyField(related_name='homes', through='backend.UsersHomes', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='dailydata',
            name='sensor',
            field=models.ForeignKey(to='backend.Sensor', on_delete=django.db.models.deletion.DO_NOTHING),
        ),
    ]
