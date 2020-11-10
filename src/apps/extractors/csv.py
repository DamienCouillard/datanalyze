from typing import Mapping
from apps.utils.extractors import Extractor, FieldMapping, Record, DatasetMapping, DatasetRecords
from apps.utils.utils import normalize_label, PANDAS_TYPE

import pandas as pd

class CSVExtractor(Extractor):
    
    def __init__(self, *args, **kwarg):
        self.index = kwarg["index"]
        self.source_path = kwarg["path"]
        self.mapping = []
        data = pd.read_csv(self.source_path)
        self.data = pd.DataFrame(data)

    def extract_mapping(self) -> DatasetMapping:
        fields = []
        for col in self.data.columns:
            #get field label
            label = col
            #get field type
            col_type = self.data[col].dtype
            field_type = PANDAS_TYPE[col_type]
            #set field
            field = FieldMapping(label=label, type=field_type)
            fields.append(field)
            self.mapping.append(label)
        return DatasetMapping(fields=fields)
            

    
    def extract(self) -> DatasetRecords:
        mapping = self.extract_mapping()
        fields = self.mapping
        records = DatasetRecords()
        l = len(self.data)
        for index in range(0, l):
            record = Record(mapping)
            for field in fields:
                value = self.data.at[index, field]
                record.add(field=field, value=value)
            records.append(record=record)
        return records