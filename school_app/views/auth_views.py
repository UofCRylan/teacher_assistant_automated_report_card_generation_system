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
def auth(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        email = data.get('email')
        password = data.get('password')
        
        if not email or not password:
            return JsonResponse({'error': 'Email and password are required'}, status=400)
        
        # Check if user exists with this email and password
        try:
            member = School_member.objects.get(email=email, password=password)
            
            # Check if the member is a student or teacher
            user_type = None
            user_id = None
            
            try:
                Student.objects.get(studentid=member.id)
                user_type = 'student'
                user_id = member.id
            except Student.DoesNotExist:
                pass
            
            try:
                Teacher.objects.get(teacherid=member.id)
                user_type = 'teacher'
                user_id = member.id
            except Teacher.DoesNotExist:
                pass
            
            if user_type:
                return JsonResponse({
                    'success': True,
                    'user_type': user_type,
                    'user_id': user_id,
                    'first_name': member.first_name,
                    'last_name': member.last_name
                })
            else:
                return JsonResponse({'error': 'User is not registered as student or teacher'}, status=403)
                
        except School_member.DoesNotExist:
            return JsonResponse({'error': 'Invalid email or password'}, status=401)