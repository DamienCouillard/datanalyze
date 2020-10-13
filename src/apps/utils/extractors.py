
from operator import index
from typing import List, Type
from datetime import date

from elasticsearch import Elasticsearch, helpers
import requests

ELASTIC_TYPE = {
                    str : "text",
                    bool : "boolean",
                    float : "double",
                    int : "long",
                    date : "date",
                    dict : "object",
                }

class FieldMapping(object):

    def __init__(self, id:str, label:str, type:Type) -> None:
        """
        Initiate a field for elasticsearch mapping
        """
        self.id = id
        self.label = label
        self.type = type


class DatasetMapping(object):

    def __init__(self, fields : List[FieldMapping]) -> None:
        self.fields = fields
    
    def get_mapping(self) -> dict:
        """Initiate a record mapping for dataset import
        
            Returns:
                    {
                    "field_1" : {"type" : "text"},
                    "field_2" : {"type" : "integer"}
                    }
        """
        mapping = {}
        for field in self.fields:
            key = field.id
            mapping[key] = field.type()      
        return mapping

    def get_elastic_mapping(self) -> dict:
        """Create the Elasticsearch mapping based on the FieldMapping list

            Raises:
                KeyError: [description]

            Returns:
                dict: Formatted elasticsearch mapping
                    {
                    "mappings" : 
                        {
                        "properties" :
                            {
                                "field_1" : {"type" : "text"},
                                "field_2" : {"type" : "integer"}
                            }
                        }
                    }
        """
        
        properties = {}
        for field in self.fields:
            key = field.label
            try:
                type = ELASTIC_TYPE[field.type]
            except KeyError:
                raise KeyError("Type {} is not supported.".format(field.type))
            properties[key] = {"type" : type}
        
        mapping = {"mappings" : {"properties" : properties}}
        mapping["settings"] = {"number_of_shards": 1}
        return mapping


class Record(object):
    """Create a formatted record for an Elasticsearch document"""

    def __init__(self, Mapping:DatasetMapping) -> None:
        self.record = Mapping.get_mapping()
    
    def add(self, field:str, value:str) -> None:
        try:
            self.record[field] = value
        except KeyError:
            raise KeyError("Field {} is missing in the dataset mapping".format(field))
    
    def to_doc(self):
        self.record["_index"] = ""
        return self.record

        
class DatasetRecords(object):
    """Prepare the Record list for bulk indexing"""

    def __init__(self) -> None:
        self.records = []
    
    def append(self, record:Record) -> bool:
        self.record.append(record.to_doc())


class Extractor(object):

    def __init__(self, *args, **kwargs) -> None:
        self.params = kwargs
    
    def extract_mapping(self) -> DatasetMapping:
        """Abstract method to extract mapping from source

        Returns:
            DatasetMapping: Mapping of the dataset to index
        """
        pass

    def extract(self) -> DatasetRecords:
        """Abstract method to extract data from source

        Returns:
            DatasetRecords: Data to extract
        """
        pass


def generate_actions(extractor:Extractor, index:str) -> dict:
    docs = extractor.extract()
    for doc in docs:
        doc["_index"] = index
        yield doc

    

def create_dataset(extractor:Extractor) -> bool:
    """Launch data extraction

    Args:
        extractor (Extractor): extractor type

    Returns:
        bool: true if the extraction process succeeded
    """
    
    #Create an Elastic search client
    client = Elasticsearch({"host":"localhost", "port":"9200"})

    #Create a new index 
    index = extractor.params["index"]
    mapping = extractor.extract_mapping()
    client.indices.create(index=index, body = mapping)
    
    #Add data
    data_response = helpers.bulk(client, generate_actions(extractor, index))



