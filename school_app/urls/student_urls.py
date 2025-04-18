from django.urls import path
from ..views import student_views

urlpatterns = [
    path('', student_views.default, name='student-default'),
    path('<int:student_id>', student_views.student_information, name='student-information'),
    # path('<int:student_id>/classes', student_views, name='student-classes'),
    path('<int:student_id>/attendance', student_views.student_attendance, name='student-attendance'),
    # path('classes/<int:class_id>', student_views, name='students-in-class'),
    # path('/<int:student_id>/schedule', student_views, name='authentication'),

]