# Generated by Django 3.2.13 on 2022-09-01 02:10

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todo', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='todo',
            name='deadline',
            field=models.DateField(default=datetime.datetime(2022, 9, 1, 10, 10, 9, 796806)),
        ),
    ]