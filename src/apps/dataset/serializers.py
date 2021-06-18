from rest_framework import serializers
from .models import Dataset

from apps.utils.variables import EXTRACTORS
from apps.utils.extractors import create_dataset
from apps.utils.utils import normalize_label, generate_unique_index

class DatasetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dataset
        fields = ('label', 'index', 'description', 'created_at', 'source', 'source_type')
    
    def create(self, validated_data):
        """ Create a Dataset on post from API"""
        #get data source
        source_type = validated_data['source_type']
        source = validated_data["source"]
        #set dataset index and check unicity
        index = validated_data["label"]
        index = generate_unique_index(index=index, model=Dataset)
        validated_data["index"] = index

        extractorClasss = EXTRACTORS[source_type]
        extractor = extractorClasss(path=source, index=index)
        res = create_dataset(extractor=extractor)
        return Dataset.objects.create(**validated_data)