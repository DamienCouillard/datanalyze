from apps.extractors import csv, xlsx

from apps.processors import scatter, linearreg

EXTRACTORS = {
    'CSV': csv.CSVExtractor,
    'Excel' : xlsx.XLSXExtractor,

}

EXTRACTORS_LIST = [('CSV', 'CSV'), ('Excel', 'Excel')]

ANALYSIS_TOOLS = {
    'scatter': scatter.scatter,
    'linearreg': linearreg.linearreg,

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


]
