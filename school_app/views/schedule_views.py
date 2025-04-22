import json

from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from ..authentication import RequireAuthorization
from ..utils import schedule

def parse_request_data(request):
    try:
        return json.loads(request.body.decode('utf-8'))
    except:
        return request.POST.dict()


@api_view(['GET'])
@permission_classes([IsAuthenticated])
@RequireAuthorization(['student', 'teacher'])
def default(request, user_type):
    result = schedule.get_user_schedule(request.user.id, user_type)

    return Response(result, 200)

@api_view(['GET'])
def get_schedule(request, schedule_id):
    result = schedule.get_schedule(schedule_id)

    # print(result)

    return Response(result, 200)
