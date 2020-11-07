
from django.contrib import admin
from django.urls import path, include                
from rest_framework import routers                    
from apps.dataset import views                            

router = routers.DefaultRouter()
router.register(r'datasets', views.DatasetListCreate, 'dataset')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls))
]