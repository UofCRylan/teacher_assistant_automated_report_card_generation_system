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
    Class,
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
    if request.method == 'GET':
        class_id = request.GET.get('id')
        section_id = request.GET.get('section')

        if not class_id or not section_id:
            return JsonResponse({"message": "Missing class id and section id"}, status=400, safe=False)

        class_id = int(class_id)
        section_id = int(section_id)

        try:
            result = Class.objects.get(class_number=class_id, section=section_id)

            return JsonResponse(result.to_dict(), status=200, safe=False)

        except Class.DoesNotExist:
            return JsonResponse({}, status=404, safe=False)