import json
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from school_app.models import (
    Schedule,
    Attendance,
    Student, Teacher,
)

def parse_request_data(request):
    try:
        return json.loads(request.body.decode('utf-8'))
    except:
        return request.POST.dict()


@csrf_exempt
def default(request):
    if request.method == 'POST':
        pass
    elif request.method == "GET": # All students
        result = []
        all_students = Student.objects.all()

        for person in all_students:
            member = person.studentid.to_dict()

            result.append(member)

        return JsonResponse(result, status=200, safe=False)
    

@csrf_exempt
def student_information(request, student_id):
    if request.method == 'POST':
        pass
    elif request.method == "GET":
        try:
            student_member = Student.objects.get(studentid=student_id)

            return JsonResponse(student_member.studentid.to_dict(), status=200, safe=False)
        except:
            return JsonResponse({}, status=404)
        
@csrf_exempt
def student_classes(request, student_id):
    if request.method == 'POST':
        pass
    elif request.method == "GET":
        try:
            student_member = Student.objects.get(studentid=student_id)
            schedule_id = student_member.scheduleid

            schedule = Schedule.objects.get()

            return JsonResponse(student_member.studentid.to_dict(), status=200, safe=False)
        except:
            return JsonResponse({}, status=404)

@csrf_exempt
def student_attendance(request, student_id):
    if request.method == 'POST':
        pass
    elif request.method == "GET":
        result = []
        try:
            student_member = Student.objects.get(studentid=student_id)

            print(student_member.studentid.to_dict())
            print(Attendance.objects.filter(studentid=student_member).count())

            attendance_records = Attendance.objects.filter(studentid=student_member).values('class_number', 'section', 'teacherid', 'studentid', 'date', 'status')

            for value in attendance_records:
                teacher = Teacher.objects.get(teacherid=value['teacherid'])

                value['student'] = student_member.studentid.to_dict()
                value['teacher'] = teacher.teacherid.to_dict()

                del value['teacherid']
                del value['studentid']

                print(value)

                result.append(value)

            return JsonResponse(result, status=200, safe=False)
        except:
            return JsonResponse([], status=404, safe=False)
