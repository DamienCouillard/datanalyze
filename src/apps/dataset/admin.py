from django.contrib import admin
from .models import Dataset

class DatasetAdmin(admin.ModelAdmin):
  list_display = ('label', 'index', 'description', 'created_at', 'source', 'source_type')


# Register your models here.
admin.site.register(Dataset, DatasetAdmin)
