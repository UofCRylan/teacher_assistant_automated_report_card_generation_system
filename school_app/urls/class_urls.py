from django.urls import path
from ..views import class_views

urlpatterns = [
    path('', class_views.default, name='default'),
    path('attendance', class_views.get_attendance, name='get-student-attendance'),
    path('rooms', class_views.get_rooms, name='get-class-rooms'),
    path('<int:class_id>/section/<int:section_id>', class_views.get_class, name='get-class'),
    path('<int:class_id>/section/<int:section_id>/grade', class_views.get_grades, name='get-grades'),
    path('<int:class_id>/section/<int:section_id>/feedback', class_views.get_feedbacks, name='get-feedbacks'),
    path('<int:class_id>/section/<int:section_id>/students/<int:student_id>/grade', class_views.handle_grade,
         name='handle-grade'),
    path('<int:class_id>/section/<int:section_id>/students/<int:student_id>/feedback', class_views.handle_feedback,
         name='handle-feedback'),
    path('<int:class_id>/section/<int:section_id>/students/<int:student_id>/feedback/create',
         class_views.update_feedback,
         name='create-feedback'),
    path('<int:class_id>/section/<int:section_id>/attendance', class_views.handle_attendance,
         name='handle-attendance'),
    path('<int:class_id>/section/<int:section_id>/students', class_views.get_class_students,
         name='handle-students'),
]
