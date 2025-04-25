import json
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from school_app.models import SchoolMember
from ..utils import auth as auth_handler


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
            member = SchoolMember.objects.get(email=email, password=password)

            user_type = auth_handler.get_user_type(member.id)
            
            if user_type:
                user = {
                    'success': True,
                    'user_type': user_type,
                    'user_id': member.id,
                    'first_name': member.first_name,
                    'last_name': member.last_name
                }

                refresh_token = RefreshToken.for_user(member)

                user['refresh'] = str(refresh_token)
                user['access'] = str(refresh_token.access_token)

                return Response(user, status=200)
            else:
                return Response({'error': 'User is not registered as student or teacher'}, status=403)
                
        except SchoolMember.DoesNotExist:
            return Response({'error': 'Invalid email or password'}, status=401)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def me(request):
    result = request.user.to_dict()
    result['type'] = auth_handler.get_user_type(request.user.id)

    return Response(result, 200)