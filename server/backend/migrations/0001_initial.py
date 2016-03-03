# -*- coding: utf-8 -*-
# Generated by Django 1.9.2 on 2016-03-03 16:20
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='DailyData',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('timestamp', models.DateTimeField()),
                ('usage', models.IntegerField()),
                ('n_measurements', models.IntegerField()),
            ],
            options={
                'db_table': 'daily_data',
            },
        ),
        migrations.CreateModel(
            name='Home',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=64)),
                ('country', models.CharField(max_length=2)),
                ('city', models.CharField(max_length=64)),
                ('zipcode', models.CharField(max_length=16)),
                ('street', models.CharField(max_length=64)),
                ('house_number', models.CharField(max_length=8)),
                ('date_added', models.DateTimeField()),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='owned_homes', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'homes',
            },
        ),
        migrations.CreateModel(
            name='MonthlyData',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('timestamp', models.DateTimeField()),
                ('usage', models.IntegerField()),
                ('n_measurements', models.IntegerField()),
            ],
            options={
                'db_table': 'monthly_data',
            },
        ),
        migrations.CreateModel(
            name='RecentData',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
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
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=64)),
                ('description', models.CharField(max_length=256)),
                ('power_unit', models.CharField(max_length=3)),
                ('date_created', models.DateTimeField()),
                ('home', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='backend.Home')),
            ],
            options={
                'db_table': 'sensors',
            },
        ),
        migrations.CreateModel(
            name='SensorsTags',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_created', models.DateTimeField()),
                ('sensor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend.Sensor')),
            ],
            options={
                'db_table': 'sensors_tags',
            },
        ),
        migrations.CreateModel(
            name='Tag',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
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
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('permission_flags', models.IntegerField()),
                ('date_created', models.DateTimeField()),
                ('home', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend.Home')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'users_homes',
            },
        ),
        migrations.CreateModel(
            name='YearlyData',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('timestamp', models.DateTimeField()),
                ('usage', models.IntegerField()),
                ('n_measurements', models.IntegerField()),
                ('sensor', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='backend.Sensor')),
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
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='backend.Tag'),
        ),
        migrations.AddField(
            model_name='sensor',
            name='tags',
            field=models.ManyToManyField(through='backend.SensorsTags', to='backend.Tag'),
        ),
        migrations.AddField(
            model_name='recentdata',
            name='sensor',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='backend.Sensor'),
        ),
        migrations.AddField(
            model_name='monthlydata',
            name='sensor',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='backend.Sensor'),
        ),
        migrations.AddField(
            model_name='home',
            name='users',
            field=models.ManyToManyField(related_name='homes', through='backend.UsersHomes', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='dailydata',
            name='sensor',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='backend.Sensor'),
        ),
    ]
