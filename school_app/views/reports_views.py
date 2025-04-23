import json

from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.http import HttpResponse
from ..authentication import require_authorization
from ..utils import report
from school_app.models import Student

@api_view(['GET'])
@permission_classes([IsAuthenticated])
@require_authorization(['student'])
def default(request, user_type):
    """
    GET  /api/reportcard/<student_id>/ → streams PDF
    POST /api/reportcard            → { "student_id": 123 }
                                         ↪ { "pdf_url": "/media/reports/..." }
    """
    # fetch grades
    student = Student.objects.get(student_id=request.user.id)
    grades_qs = report.get_student_grades(student)

    # build and save PDF
    pdf_bytes = report.build_pdf_bytes(student, grades_qs)
    public_url = report.save_pdf(pdf_bytes, request.user.id)

    if request.method == "GET":
        resp = HttpResponse(pdf_bytes, content_type="application/pdf")
        resp["Content-Disposition"] = f'inline; filename="reportcard_{request.user.id}.pdf"'
        return resp

    return Response({"pdf_url": public_url}, status=201)

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
