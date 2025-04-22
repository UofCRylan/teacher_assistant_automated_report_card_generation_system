import json

from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from ..authentication import RequireAuthorization
from ..utils import report

def parse_request_data(request):
    try:
        return json.loads(request.body.decode('utf-8'))
    except:
        return request.POST.dict()


@api_view(['GET'])
@permission_classes([IsAuthenticated])
@RequireAuthorization(['student', 'teacher'])
def status(request, user_type):
    if user_type == 'student':
        result = report.check_student_report_status(request.user.id)

        return Response(result, 200)
    else:
        class_id = request.GET.get('class_id')
        section_id = request.GET.get('section')

        if class_id and section_id:
            result = report.check_class_report_status(class_id, section_id)
            return Response(result, 200)
        else:
            return Response("Missing required parameters", 400)
