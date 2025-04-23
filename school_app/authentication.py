from xmlrpc.client import ResponseError

from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.response import Response
from school_app.models import SchoolMember, Student, Teacher
from functools import wraps


class SchoolMemberJWTAuthentication(JWTAuthentication):
    def get_user(self, validated_token):
        user_id = validated_token.get("user_id")

        try:
            return SchoolMember.objects.get(id=user_id)
        except SchoolMember.DoesNotExist:
            return None

def require_authorization(types):
    def decorator(func):
        @wraps(func)
        def wrapper(request, *args, **kwargs):
            user_type = None
            print("Requesting user id: ", request.user.id)

            if Student.objects.filter(student_id=request.user.id).exists():
                user_type = 'student'
            elif Teacher.objects.filter(teacher_id=request.user.id).exists():
                user_type = 'teacher'
            else:
                user_type = 'admin'

            if user_type in types:
                return func(request, user_type, *args, **kwargs)
            else:
                return Response("Unauthorized user", 400)
                # return func(request, None, *args, **kwargs)

        return wrapper
    return decorator