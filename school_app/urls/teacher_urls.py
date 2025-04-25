from django.urls import path
from ..views import teacher_views

urlpatterns = [
    path('', teacher_views.default, name='teacher-default'),
    path('<int:teacher_id>/ipp', teacher_views.handle_ipp, name='handle-ipp'),
]