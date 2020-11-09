from rest_framework import serializers
from .models import Dataset

from apps.utils.variables import EXTRACTORS
from apps.utils.extractors import create_dataset

class DatasetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dataset
        fields = ('id', 'label', 'index', 'description', 'created_at', 'source', 'source_type')
    
    def create(self, validated_data):
        source_type = validated_data['source_type']
        source = validated_data["source"]
        index = validated_data["index"]
        extractorClasss = EXTRACTORS[source_type]
        extractor = extractorClasss(path=source, index=index)
        res = create_dataset(extractor=extractor)
        return Dataset.objects.create(**validated_data)