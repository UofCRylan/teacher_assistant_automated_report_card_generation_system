from django.shortcuts import render
from django.http import HttpResponse

##def say_hello(request):
    ##return HttpResponse('Hello World')
# school_app/views.py

from rest_framework import viewsets
from .models import (
    SchoolMember,
    Teacher,
    Student,
    Class,
    Schedule,
    Classroom,
    Subject,
    Grade,
    Feedback,
    IndividualizedProgramPlan,
    Attendance
)
from .serializers import (
    SchoolMemberSerializer,
    TeacherSerializer,
    StudentSerializer,
    ClassSerializer,
    ScheduleSerializer,
    ClassroomSerializer,
    SubjectSerializer,
    GradeSerializer,
    FeedbackSerializer,
    IndividualizedProgramPlanSerializer,
    AttendanceSerializer
)

class SchoolMemberViewSet(viewsets.ModelViewSet):
    queryset = SchoolMember.objects.all()
    serializer_class = SchoolMemberSerializer

class TeacherViewSet(viewsets.ModelViewSet):
    queryset = Teacher.objects.all()
    serializer_class = TeacherSerializer

class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

class ClassViewSet(viewsets.ModelViewSet):
    queryset = Class.objects.all()
    serializer_class = ClassSerializer

class ScheduleViewSet(viewsets.ModelViewSet):
    queryset = Schedule.objects.all()
    serializer_class = ScheduleSerializer

class ClassroomViewSet(viewsets.ModelViewSet):
    queryset = Classroom.objects.all()
    serializer_class = ClassroomSerializer

class SubjectViewSet(viewsets.ModelViewSet):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer

class GradeViewSet(viewsets.ModelViewSet):
    queryset = Grade.objects.all()
    serializer_class = GradeSerializer

class FeedbackViewSet(viewsets.ModelViewSet):
    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer

class IndividualizedProgramPlanViewSet(viewsets.ModelViewSet):
    queryset = IndividualizedProgramPlan.objects.all()
    serializer_class = IndividualizedProgramPlanSerializer

class AttendanceViewSet(viewsets.ModelViewSet):
    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer
