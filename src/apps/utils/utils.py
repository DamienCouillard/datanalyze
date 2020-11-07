from datetime import date

PANDAS_TYPE = {
                    'int64' : int,
                    'float64' : float,
                    'object' : str,
                    'datetime64[ns]' : date
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
    index_id = label.lower()
    index_id = index_id.replace(" ", "_")
    return index_id