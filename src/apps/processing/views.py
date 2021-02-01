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
    #Try to find the dataset
    try:
        index = request.GET["index"]
    except KeyError:
        return HttpResponseBadRequest("None inndex was given")
    
    #Try to return the mapping of the selected dataset and save into the global DATASET for futur use
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
    #return the list of graph and analysis tools
    return JsonResponse(TOOLS_LIST, safe=False)

def analysis(request):
    #Try to find the desired tool
    params = request.GET
    try:
        tool_name = params["tool"]
        tool = ANALYSIS_TOOLS[tool_name]
    except KeyError:
        return HttpResponseBadRequest("None inndex was given")
     #Trigger a given algorithm on the saved dataset in DATASET
    dataset = DATASET.dataframe
    res = tool(dataset, params)
    return JsonResponse(res)

def mlList(request):
    #Returns all ml algorithms
    return JsonResponse(ENGINE_LIST, safe=False)

def mlengine(request):
    #Try to find the desired algorithm
    params = request.GET
    try:
        engine_name = params["tool"]
        engine = MLENGINE_TOOLS[engine_name]
    except KeyError:
        return HttpResponseBadRequest("None inndex was given")
    #Apply the algorithm
    dataset = DATASET.dataframe
    res = engine(dataset, params)
    return JsonResponse(res)
    
    