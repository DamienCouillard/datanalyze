from django.shortcuts import render

from .models import Dataset
from .serializers import DatasetSerializer
from rest_framework import viewsets

class DatasetListCreate(viewsets.ModelViewSet):
    queryset = Dataset.objects.all()
    serializer_class = DatasetSerializer

    def perform_create(self, serializer):
        serializer.save()