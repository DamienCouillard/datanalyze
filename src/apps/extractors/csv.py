from typing import Mapping
from apps.utils.extractors import Extractor, FieldMapping, Record, DatasetMapping, DatasetRecords
from apps.utils.utils import normalize_label, PANDAS_TYPE

import pandas as pd

class CSVExtractor(Extractor):
    
    def __init__(self, *args, **kwarg):
        self.source_path = kwarg["path"]
        data = pd.read_csv(self.source)
        self.data = pd.DataFrame(data)

    def extract_mapping(self) -> DatasetMapping:
        fields = []
        for col in self.data.columns:
            #get field label
            label = col
            #get field id
            id = normalize_label(col)
            #get field type
            col_type = self.data[col].dtype
            field_type = PANDAS_TYPE[col_type]
            #set field
            field = FieldMapping(id=id, label=label, type=field_type)
            fields.append(field)
        return DatasetMapping(fields=fields)
            

    
    def extract(self) -> DatasetRecords:
        mapping = self.extract_mapping()
        fields = mapping.get_mapping().keys()
        records = DatasetRecords()
        for row in self.data.iterrows():
            record = Record(mapping)
            for field in fields:
                record.add(field=field, value=row[field])
            records.append(record=record)
        return records