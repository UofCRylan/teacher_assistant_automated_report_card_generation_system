from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import(

SchoolMemberViewSet,
TeacherViewSet,
StudentViewSet,
ClassViewSet,
ScheduleViewSet,
ClassroomViewSet,
SubjectViewSet,
GradeViewSet,
FeedbackViewSet,
IndividualizedProgramPlanViewSet,
AttendanceViewSet
)

router = DefaultRouter()
router.register(r'school-members', SchoolMemberViewSet, basename='schoolmember')
router.register(r'teachers', TeacherViewSet, basename='teacher')
router.register(r'students', StudentViewSet, basename='student')
router.register(r'classes', ClassViewSet, basename='class')
router.register(r'schedules', ScheduleViewSet, basename='schedule')
router.register(r'classrooms', ClassroomViewSet, basename='classroom')
router.register(r'subjects', SubjectViewSet, basename='subject')
router.register(r'grades', GradeViewSet, basename='grade')
router.register(r'feedbacks', FeedbackViewSet, basename='feedback')
router.register(r'iips', IndividualizedProgramPlanViewSet, basename='iip')
router.register(r'attendance-records', AttendanceViewSet, basename='attendance')

urlpatterns = [
    path('',  include(router.urls)),

]