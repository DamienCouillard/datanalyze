"""
Django url mapping
"""

from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from apps.dataset.views import DatasetViewset
from apps.processing.views import initialize_analysis, analysis, toolsList

router = routers.DefaultRouter()
router.register(r'datasets', DatasetViewset, 'dataset')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/analyze', initialize_analysis),
    path('api/tools/', toolsList),
    path('api/analyze/tools', analysis)
]
