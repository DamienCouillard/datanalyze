# Generated by Django 3.1.1 on 2020-11-07 11:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dataset', '0003_dataset_source_type'),
    ]

    operations = [
        migrations.AlterField(
            model_name='dataset',
            name='source_type',
            field=models.CharField(choices=[('CSV', 'CSV')], max_length=100),
        ),
    ]