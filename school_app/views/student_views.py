import json
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from ..utils import ipp
from ..utils.data_handler import parse_request_data
from ..authentication import require_authorization
from school_app.models import Attendance, Student, Teacher


@api_view(['GET', 'POST'])
def default(request):
    if request.method == 'POST':
        pass
    elif request.method == "GET": # All students
        result = []
        all_students = Student.objects.all()

        for student in all_students:
            member = student.student_id.to_dict()

            result.append(member)

        return Response(result, status=200)
    

@api_view(['GET', 'POST'])
def student_information(request, student_id):
    if request.method == 'POST':
        pass
    elif request.method == "GET":
        try:
            student_member = Student.objects.get(student_id=student_id)

            return Response(student_member.student_id.to_dict(), status=200)
        except:
            return Response({}, status=404)


@api_view(['GET', 'POST'])
def student_attendance(request, student_id):
    if request.method == 'POST':
        pass
    elif request.method == "GET":
        result = []
        try:
            student_member = Student.objects.get(student_id=student_id)

            attendance_records = (Attendance.objects
                                  .filter(student=student_member)
                                  .values('class_number', 'section', 'teacherid', 'studentid', 'date', 'status'))

            for value in attendance_records:
                teacher = Teacher.objects.get(teacher_id=value['teacherid'])

                value['student'] = student_member.studentid.to_dict()
                value['teacher'] = teacher.teacherid.to_dict()

                del value['teacherid']
                del value['studentid']

                print(value)

                result.append(value)

            return Response(result, status=200)
        except:
            return Response([], status=404)


@api_view(['GET'])
def handle_ipp(request, student_id):
    result = ipp.get_student_ipp(student_id)

    return Response(result, status=200)

@api_view(['GET'])
def get_ipp(request, student_id, teacher_id):
    result = ipp.get_specific_ipp(student_id, teacher_id)

    return Response(result, status=200)

@api_view(['POST', 'PUT'])
@permission_classes([IsAuthenticated])
@require_authorization(['teacher'])
def create_ipp(request, user_type, student_id):
    data = parse_request_data(request)

    goals = data['goals']
    e_a = data['e_a']
    s_d = data['s_d']

    result = ipp.update_ipp(request.user.id, student_id, goals, e_a, s_d)

    return Response(result['message'], status=result['status'])



