import json
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from ..authentication import require_authorization
from ..utils import ipp
from school_app.models import Teacher


@api_view(['GET', 'POST'])
def default(request):
    if request.method == 'POST':
        pass
    elif request.method == "GET": # All teachers
        result = []
        all_teachers = Teacher.objects.all()

        for person in all_teachers:
            member = person.teacher_id.to_dict()

            result.append(member)

        return Response(result, status=200)

@api_view(['GET'])
def handle_ipp(request, teacher_id):
    result = ipp.get_teacher_ipp(teacher_id)

    return Response(result, status=200)