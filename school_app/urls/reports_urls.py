from django.urls import path
from ..views import reports_views

urlpatterns = [
    path('status', reports_views.status, name='reports-status'),
]
