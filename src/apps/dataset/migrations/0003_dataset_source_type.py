# Generated by Django 3.1.1 on 2020-11-07 10:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dataset', '0002_dataset_source'),
    ]

    operations = [
        migrations.AddField(
            model_name='dataset',
            name='source_type',
            field=models.CharField(choices=[('CSV', 'CSV')], default=('CSV', 'CSV'), max_length=100),
        ),
    ]
