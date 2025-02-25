from rest_framework import serializers 
from .models import(
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


class SchoolMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = SchoolMember
        fields = '_all_'

class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = '_all_'

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '_all_'

class ClassSerializer(serializers.ModelSerializer):
    class Meta:
        model = Class
        fields = '_all_'

class ScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Schedule
        fields = '_all_'

class ClassroomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Classroom
        fields = '_all_'


class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = '_all_'

class GradeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Grade
        fields = '_all_'

class FeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feedback
        fields = '_all_'


class IndividualizedProgramPlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = IndividualizedProgramPlan
        fields = '_all_'

class AttendanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attendance
        fields = '_all_'
