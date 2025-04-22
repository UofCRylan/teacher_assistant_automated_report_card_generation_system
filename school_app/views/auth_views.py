import json
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from school_app.models import (
    School_member,
    Student,
    Teacher,
)

def parse_request_data(request):
    try:
        return json.loads(request.body.decode('utf-8'))
    except:
        return request.POST.dict()

@api_view(['POST'])
def auth(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        email = data.get('email')
        password = data.get('password')
        
        if not email or not password:
            return Response({'error': 'Email and password are required'}, status=400)
        
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
                user = {
                    'success': True,
                    'user_type': user_type,
                    'user_id': user_id,
                    'first_name': member.first_name,
                    'last_name': member.last_name
                }

                refresh_token = RefreshToken.for_user(member)

                user['refresh'] = str(refresh_token)
                user['access'] = str(refresh_token.access_token)

                return Response(user, status=200)
            else:
                return Response({'error': 'User is not registered as student or teacher'}, status=403)
                
        except School_member.DoesNotExist:
            return Response({'error': 'Invalid email or password'}, status=401)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def me(request):
    print(request.user)

    return Response(request.user.to_dict(), 200)