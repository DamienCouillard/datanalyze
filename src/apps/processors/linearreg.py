from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error

import json
import pandas as pd

from .scatter import scatter

def linearreg(dataset, params):
    X = params["X"]
    Y = params["Y"]
    x = dataset[X].to_numpy().reshape(-1, 1)
    y = dataset[Y].to_numpy()
    #Linear regression
    reg = LinearRegression().fit(x, y)
    coef = reg.coef_[0]
    intercept = reg.intercept_
    pred = reg.predict(x)
    res = {}
    res["data"] = []
    for i, val in enumerate(dataset[X]):
        res["data"].append({X: val, Y: y[i], "Linear regression": pred[i]})
    #Get score and std error
    r2 = reg.score(x, y)
    square_err = mean_squared_error(y, pred)
    res["res"] = {"r2":round(r2, 2), "coef":coef, "intercept":intercept, "square_err":square_err}
    #Get data
    return res
