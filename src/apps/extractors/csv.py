from typing import Mapping
from apps.utils.extractors import Extractor, FieldMapping, Record, DatasetMapping, DatasetRecords
from apps.utils.utils import normalize_label, PANDAS_TYPE

import pandas as pd

class CSVExtractor(Extractor):

    """ Define an CSV API extractor, does not work with CSV file yet """
    
    def __init__(self, *args, **kwarg):
        self.index = kwarg["index"]
        self.source_path = kwarg["path"]
        self.mapping = []
        data = pd.read_csv(self.source_path)
        self.data = pd.DataFrame(data)

    def extract_mapping(self) -> DatasetMapping:
        """ Extract mapping from the source using pandas"""
        # store fields
        fields = []
        for col in self.data.columns:
            #get field label
            label = col
            #get field type using PANDAS_TYPE (see apps.utils.utils)
            col_type = self.data[col].dtype
            field_type = PANDAS_TYPE[col_type]
            #set field
            field = FieldMapping(label=label, type=field_type)
            fields.append(field)
            self.mapping.append(label)
        return DatasetMapping(fields=fields)
            

    
    def extract(self) -> DatasetRecords:
        """ Extract data from source using pandas """
        # get mapping to associate value to field in each record
        mapping = self.extract_mapping()
        fields = self.mapping
        records = DatasetRecords()
        l = len(self.data)
        # read every line
        for index in range(0, l):
            record = Record(mapping)
            # read every column of the record
            for field in fields:
                #store values (with the associated field)
                value = self.data.at[index, field]
                record.add(field=field, value=value)
            records.append(record=record)
        return records