import pandas as pd
import json


def scatter(dataset, params):
    X = params["X"]
    Y = params["Y"]
    Y = Y.split(',')
    print(X, Y)
    df = dataset[[X] + Y]
    result = df.to_json(orient="records")
    parsed = json.loads(result)
    return {"data": parsed}
