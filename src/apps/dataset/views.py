from django.shortcuts import render

from .models import Dataset
from .serializers import DatasetSerializer
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from django.http import Http404
from elasticsearch import Elasticsearch

class DatasetViewset(viewsets.ModelViewSet):
    queryset = Dataset.objects.all()
    serializer_class = DatasetSerializer

    def perform_create(self, serializer):
        serializer.save()
    
    def destroy(self, request, *args, **kwargs):
        try:
            #delete django object
            instance = self.get_object()
            index = instance.index
            self.perform_destroy(instance)

            #delete elasticsearch index
            client = Elasticsearch(hosts=[{"host":'elasticsearch'}], retry_on_timeout = True)
            client.indices.delete(index=index)

        except Http404:
            pass
        return Response(status=status.HTTP_204_NO_CONTENT)