import json
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from school_app.models import (
    Attendance,
    Schedule,
    School_member,
    Student,
    Teacher,
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
    elif request.method == "GET": # All teachers
        result = []
        all_teachers = Teacher.objects.all()

        for person in all_teachers:
            member = person.teacherid.to_dict()

            result.append(member)

        return JsonResponse(result, status=200, safe=False)

