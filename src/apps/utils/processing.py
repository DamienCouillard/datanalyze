import pandas as pd
from pandasticsearch import Select
from elasticsearch import Elasticsearch

class PreProcessedDataset(object):

    def __init__(self, index:str) -> None:
        self.index = index
        self.mapping = []
        self.dataframe = pd.DataFrame()
        self.set_dataframe()
        self.set_mapping()
    
    def set_dataframe(self) -> None:
        es = Elasticsearch(hosts=[{"host":'elasticsearch'}], retry_on_timeout = True)
        doc = {
        'size' : 10000,
        'query': {
            'match_all' : {}
            }
        }
        documents = es.search(index=self.index, body=doc, scroll="1m")
        self.get_hits(documents)
        while documents["hits"]["hits"] != []:
            scrollId = documents["_scroll_id"]
            documents = es.scroll(scroll_id=scrollId, scroll="1m")
            self.get_hits(documents)


    def get_hits(self, response:dict) -> None:
        """extract data from response hits and add them to the dataframe"""
        if not self.dataframe.empty:
            df_concat = Select.from_dict(response).to_pandas()
            frames = [self.dataframe, df_concat]
            self.dataframe = pd.concat(frames)
        else:
            self.dataframe = Select.from_dict(response).to_pandas()

    
    def set_mapping(self) -> None:
        unused = ["_index", "_type", "_id", "_score"]
        columns = list(self.dataframe.columns)
        self.mapping = [field for field in columns if not field in unused]