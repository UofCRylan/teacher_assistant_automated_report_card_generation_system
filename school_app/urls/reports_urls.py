from django.urls import path
from ..views import reports_views

urlpatterns = [
    path('', reports_views.default, name='reports_default'),
    path('status', reports_views.status, name='reports-status'),
]
