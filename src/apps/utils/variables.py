from apps.extractors import csv, xlsx

from apps.processors import scatter, linearreg, kmeans, SVMachine
from apps.mlengine.classification import neuralnetwork

EXTRACTORS = {
    'CSV': csv.CSVExtractor,
    'Excel' : xlsx.XLSXExtractor,

}

EXTRACTORS_LIST = [('CSV', 'CSV'), ('Excel', 'Excel')]

ANALYSIS_TOOLS = {
    'scatter': scatter.scatter,
    'linearreg': linearreg.linearreg,
    'kmeans': kmeans.kmeans,
    'SVM' : SVMachine.Svm
}
TOOLS_LIST = [
    {
        "label": 'Scatter plot',
        "value": "scatter"
    },
    {
        "label": 'Linear regression',
        "value": "linearreg"
    },
    {
        "label": 'K-means',
        "value": "kmeans"
    },
{
        "label": 'SVM',
        "value": "SVM"
    },


]

MLENGINE_TOOLS = {
    'classification_nn': neuralnetwork.exec,

}

ENGINE_LIST = [

    {
        "label" : "Classification",
        "option" :
        [

            {
                "label": 'Neural Network',
                "value": "classification_nn"
            },
        ]
    }


]
