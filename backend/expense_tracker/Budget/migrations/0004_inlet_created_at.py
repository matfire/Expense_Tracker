# Generated by Django 2.1.1 on 2018-09-03 14:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Budget', '0003_inlet_category_color'),
    ]

    operations = [
        migrations.AddField(
            model_name='inlet',
            name='created_at',
            field=models.DateField(auto_now=True),
        ),
    ]
