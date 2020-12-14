from apps.extractors import csv, xlsx

from apps.processors import scatter

EXTRACTORS = {
    'CSV': csv.CSVExtractor,
    'Excel' : xslx.XLSXExtractor,

}

EXTRACTORS_LIST = [('CSV', 'CSV'), ('Excel', 'Excel')]

ANALYSIS_TOOLS = {
    'scatter': scatter.scatter

}
TOOLS_LIST = [
    {
        "name": 'Scatter plot',
        "label": "scatter"
    },

]
