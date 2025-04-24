import json

from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from ..authentication import require_authorization
from ..utils import report
from school_app.models import Student
from pathlib import Path
from django.conf import settings
from django.http import FileResponse

@api_view(['GET'])
@permission_classes([IsAuthenticated])
@require_authorization(['student'])
def default(request, user_type):
    """
    GET /api/report/ → streams the generated PDF
    """
    # fetch grades
    student = Student.objects.get(student_id=request.user.id)
    grades_qs = report.get_student_grades(student)

    # generate and save the styled PDF, get URL
    public_url = report.generate_report_card(student, grades_qs)

    # convert the public media URL into an absolute file path
    relative_path = public_url.replace(settings.MEDIA_URL, "").lstrip("/")
    file_path = Path(settings.MEDIA_ROOT) / relative_path

    # return it as a streamed PDF file
    return FileResponse(open(file_path, 'rb'), content_type='application/pdf')

@api_view(['GET'])
@permission_classes([IsAuthenticated])
@require_authorization(['student', 'teacher'])
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
