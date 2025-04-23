import json

from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from ..authentication import require_authorization
from ..utils import schedule
from ..utils.data_handler import parse_request_data


@api_view(['GET'])
@permission_classes([IsAuthenticated])
@require_authorization(['student', 'teacher'])
def default(request, user_type):
    result = schedule.get_user_schedule(request.user.id, user_type)

    return Response(result, 200)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
@require_authorization(['teacher', 'admin'])
def get_all_schedules(request, user_type):
    result = schedule.get_all_schedules()

    return Response(result, 200)

@api_view(['GET', 'POST', 'PUT'])
def get_schedule(request, schedule_id):
    if request.method == 'GET':
        result = schedule.get_schedule(schedule_id)

        return Response(result, 200)
    else:
        data = parse_request_data(request)
        result = schedule.update_schedule(schedule_id, data)

        return Response(result['message'], result['status'])
