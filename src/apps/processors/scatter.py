import pandas as pd
import json


def scatter(dataset, params):
    X = params["X"]
    Y = params["Y"]
    df = dataset[[X, Y]]
    result = df.to_json(orient="records")
    parsed = json.loads(result)
    return {"data": parsed}
