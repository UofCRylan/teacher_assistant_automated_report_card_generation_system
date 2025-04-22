from django.urls import path
from ..views import student_views

urlpatterns = [
    path('', student_views.default, name='student-default'),
    # path('grade', student_views.student_grade, name='student-grade'),
    # path('feedback', student_views.student_feedback, name='student-feedback'),
    path('<int:student_id>', student_views.student_information, name='student-information'),
    path('<int:student_id>/attendance', student_views.student_attendance, name='student-attendance'),
    path('<int:student_id>/ipp', student_views.handle_ipp, name='student-ipp'),
    path('<int:student_id>/ipp/<int:teacher_id>', student_views.get_ipp, name='student-get-ipp'),
    path('<int:student_id>/ipp/create', student_views.create_ipp, name='student-create-ipp'),
    # path('<int:student_id>/classes', student_views, name='student-classes'),
    # path('classes/<int:class_id>', student_views, name='students-in-class'),
    # path('/<int:student_id>/schedule', student_views, name='authentication'),

]