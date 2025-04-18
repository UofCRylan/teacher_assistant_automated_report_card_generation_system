from django.urls import path
from ..views import class_views

urlpatterns = [
    path('', class_views.default, name='default'),
]