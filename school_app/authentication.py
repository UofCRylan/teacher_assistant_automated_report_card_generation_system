from rest_framework_simplejwt.authentication import JWTAuthentication
from school_app.models import School_member, Student, Teacher
from functools import wraps


class SchoolMemberJWTAuthentication(JWTAuthentication):
    def get_user(self, validated_token):
        user_id = validated_token.get("user_id")

        try:
            return School_member.objects.get(id=user_id)
        except School_member.DoesNotExist:
            return None

def RequireAuthorization(types):
    def decorator(func):
        @wraps(func)
        def wrapper(request, *args, **kwargs):
            user_type = None
            print("Requesting user id: ", request.user.id)

            if Student.objects.filter(studentid=request.user.id).exists():
                user_type = 'student'
            elif Teacher.objects.filter(teacherid=request.user.id).exists():
                user_type = 'teacher'

            if user_type in types:
                return func(request, user_type, *args, **kwargs)
            else:
                raise Exception("Unauthorized user")
                # return func(request, None, *args, **kwargs)

        return wrapper
    return decorator