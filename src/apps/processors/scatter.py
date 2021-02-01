import pandas as pd
import json


def scatter(dataset, params):
    X = params["X"]
    Y = params["Y"]
    Y = Y.split(',')
    #Get the Xs and Y from the dataset
    if not X in Y:
        df = dataset[[X] + Y]
    else:
        df = dataset[Y]
    result = df.to_json(orient="records")
    parsed = json.loads(result)
    return {"data": parsed}
