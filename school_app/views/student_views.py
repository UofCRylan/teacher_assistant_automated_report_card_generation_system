import json
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from ..utils import ipp, feedback
from ..authentication import RequireAuthorization
from school_app.models import (
    Schedule,
    Attendance,
    Student,
    Teacher,
)

def parse_request_data(request):
    try:
        return json.loads(request.body.decode('utf-8'))
    except:
        return request.POST.dict()


@api_view(['GET', 'POST'])
def default(request):
    if request.method == 'POST':
        pass
    elif request.method == "GET": # All students
        result = []
        all_students = Student.objects.all()

        for person in all_students:
            member = person.studentid.to_dict()

            result.append(member)

        return Response(result, status=200)
    

@api_view(['GET', 'POST'])
def student_information(request, student_id):
    if request.method == 'POST':
        pass
    elif request.method == "GET":
        try:
            student_member = Student.objects.get(studentid=student_id)

            return Response(student_member.studentid.to_dict(), status=200)
        except:
            return Response({}, status=404)
        
@api_view(['GET', 'POST'])
def student_classes(request, student_id):
    if request.method == 'POST':
        pass
    elif request.method == "GET":
        try:
            student_member = Student.objects.get(studentid=student_id)
            schedule_id = student_member.scheduleid

            schedule = Schedule.objects.get()

            return Response(student_member.studentid.to_dict(), status=200)
        except:
            return Response({}, status=404)

@api_view(['GET', 'POST'])
def student_attendance(request, student_id):
    if request.method == 'POST':
        pass
    elif request.method == "GET":
        result = []
        try:
            student_member = Student.objects.get(studentid=student_id)

            print(student_member.studentid.to_dict())
            print(Attendance.objects.filter(studentid=student_member).count())

            attendance_records = Attendance.objects.filter(studentid=student_member).values('class_number', 'section',
                                                                                            'teacherid', 'studentid', 'date', 'status')

            for value in attendance_records:
                teacher = Teacher.objects.get(teacherid=value['teacherid'])

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
    print(student_id, teacher_id)
    result = ipp.get_specific_ipp(student_id, teacher_id)
    print(result)

    return Response(result, status=200)

@api_view(['POST', 'PUT'])
@permission_classes([IsAuthenticated])
@RequireAuthorization(['teacher'])
def create_ipp(request, user_type, student_id):
    print(user_type, student_id)
    data = parse_request_data(request)

    goals = data['goals']
    e_a = data['e_a']
    s_d = data['s_d']

    result = ipp.update_ipp(request.user.id, student_id, goals, e_a, s_d)

    return Response(result['message'], status=result['status'])



