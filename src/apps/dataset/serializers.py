from rest_framework import serializers
from .models import Dataset

from apps.utils.variables import EXTRACTORS

class DatasetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dataset
        fields = ('id', 'label', 'index', 'description', 'created_at', 'source', 'source_type')
    
    def create(self, validated_data):
        source_type = validated_data['source_type']
        print(source_type)
        return Dataset.objects.create(**validated_data)