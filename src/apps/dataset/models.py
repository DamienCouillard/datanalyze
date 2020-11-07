from django.db import models

from apps.utils.variables import EXTRACTORS_LIST

class Dataset(models.Model):
    label = models.CharField(max_length=100)
    index = models.CharField(max_length=100)
    description = models.CharField(max_length=256)
    created_at = models.DateTimeField(auto_now_add=True)
    source = models.CharField(max_length=1000, default='')
    source_type = models.CharField(max_length=100, choices= EXTRACTORS_LIST)