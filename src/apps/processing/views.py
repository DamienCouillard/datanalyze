from django.shortcuts import render
from django.http import HttpResponse, HttpResponseNotFound, JsonResponse, HttpResponseBadRequest

import pandas as pd
from apps import dataset

from apps.dataset.models import Dataset
from apps.utils.processing import PreProcessedDataset
from apps.utils.variables import ANALYSIS_TOOLS, TOOLS_LIST, MLENGINE_TOOLS, ENGINE_LIST


DATASET = None

def initialize_analysis(request):
    global DATASET
    try:
        index = request.GET["index"]
    except KeyError:
        return HttpResponseBadRequest("None inndex was given")
    
    try:
        existing = Dataset.objects.get(index=index)
        DATASET = PreProcessedDataset(index)
        mapping = []
        for item in DATASET.mapping:
            mapping.append({"value":item, "label":item})
        data = {"mapping" : mapping}
        
        return JsonResponse(data=data)
    except Dataset.DoesNotExist:
        return HttpResponseNotFound("Cannot find the dataset with index {}".format(index))

def toolsList(request):
    return JsonResponse(TOOLS_LIST, safe=False)

def analysis(request):
    params = request.GET
    try:
        tool_name = params["tool"]
        tool = ANALYSIS_TOOLS[tool_name]
    except KeyError:
        return HttpResponseBadRequest("None inndex was given")
    dataset = DATASET.dataframe
    res = tool(dataset, params)
    return JsonResponse(res)

def mlList(request):
    return JsonResponse(ENGINE_LIST, safe=False)

def mlengine(request):
    params = request.GET
    try:
        engine_name = params["tool"]
        engine = MLENGINE_TOOLS[engine_name]
    except KeyError:
        return HttpResponseBadRequest("None inndex was given")
    dataset = DATASET.dataframe
    res = engine(dataset, params)
    return JsonResponse(res)
    
    