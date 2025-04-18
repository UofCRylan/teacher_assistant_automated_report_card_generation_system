from django.urls import path
from ..views import teacher_views

urlpatterns = [
    path('', teacher_views.default, name='teacher-default'),
    # path('/attendance/<int:student_id>', teacher_views, name='authentication'),
    # path('/<int:teacher_id>', teacher_views, name='authentication'),
    # path('/<int:teacher_id>/classes', teacher_views, name='authentication'),
    # path('/<int:teacher_id>/schedule', teacher_views, name='authentication'),
]