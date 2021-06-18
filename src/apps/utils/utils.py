from datetime import date
from numpy import dtype
from django.db.models import Model
import re

PANDAS_TYPE = {
                    dtype('int64') : int,
                    dtype('float64') : float,
                    dtype('object') : str,
                    dtype('datetime64[ns]') : date
                }

ELASTIC_TYPE = {
                    str : "text",
                    bool : "boolean",
                    float : "double",
                    int : "long",
                    date : "date",
                    dict : "object",
                }
                
def normalize_label(label:str) -> str:
    """ 
    Convert upper case to lower case and spaces to underscore
    Ex : 'This is an Example' to 'this_is_an_example'
    """
    index_id = re.sub(r'[^A-Za-z0-9 ]+', '', label)
    index_id = index_id.lower()
    index_id = index_id.replace(" ", "_")
    return index_id

def generate_unique_index(index:str, model:Model) -> str :
    """Generate a unique normalized index for a dataset strored in django and elasticserach"""
    index = normalize_label(index)
    base_index = index
    is_unique = False
    count = 0
    while not is_unique:
        try:
            existing = model.objects.get(index=index)
        except model.DoesNotExist:
            is_unique = True
        if not is_unique:
            index = base_index + "_{}".format(count)
            count += 1
    return index
