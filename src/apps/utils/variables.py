from apps.extractors import csv

from apps.processors import scatter

EXTRACTORS = {
    'CSV': csv.CSVExtractor

}

EXTRACTORS_LIST = [('CSV', 'CSV'), ]

ANALYSIS_TOOLS = {
    'scatter': scatter.scatter

}
TOOLS_LIST = [
    {
        "name": 'Scatter plot',
        "label": "scatter"
    },

]
