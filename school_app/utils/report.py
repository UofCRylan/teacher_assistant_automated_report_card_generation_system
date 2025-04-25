from school_app.models import Student, ReceivesGrade, Feedback, ScheduledClass, Class, FeedbackTemplate
import io
from datetime import date
from pathlib import Path
from django.conf import settings
from django.db import connection
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer
from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle


def check_student_report_status(student_id):
    """
    1. Select student
    2. Get all their classes
    3. For each of their classes check if they have a grade and feedback
    """
    class_records = []
    status = True

    student = Student.objects.get(student_id=student_id)
    schedule = ScheduledClass.objects.filter(schedule_id=student.schedule_id)

    for cls in schedule:
        grade_status = False
        feedback_status = False

        try:
            grade = ReceivesGrade.objects.get(class_no=cls.class_number, section=cls.section, student=student)
            if grade.letter is not None:
                grade_status = True
        except ReceivesGrade.DoesNotExist:
            pass

        # try:
            # feedback = Feedback.objects.get(class_no=cls.class_number, section=cls.section, student=student)
            # if feedback.comment is not None:
        feedback_status = True
        # except Feedback.DoesNotExist:
        #     pass

        the_class = Class.objects.get(class_number=cls.class_number, section=cls.section)

        class_records.append({
            "class_id": cls.class_number,
            "section_id": cls.section,
            "class_name": the_class.class_name,
            "grade_status": grade_status,
            "feedback_status": feedback_status
        })

        if not grade_status or not  feedback_status:
            status = False

    result = {
        "class_records": class_records,
        "status": status
    }

    return result



def check_class_report_status(class_id, section):
    """
    1. Select student
    2. Get all their classes
    3. For each of their classes check if they have a grade and feedback
    """

    student_records = []
    status = True

    the_class = Class.objects.get(class_number=class_id, section=section)
    schedules = ScheduledClass.objects.filter(class_number=class_id, section=section)

    for schedule in schedules:
        students = Student.objects.filter(schedule_id=schedule.schedule_id)

        for student in students:
            try:
                grade = ReceivesGrade.objects.get(class_no=the_class.class_number, section=the_class.section, student=student)
            except ReceivesGrade.DoesNotExist:
                grade = None
                status = False

            try:
                feedback = Feedback.objects.get(class_no=the_class.class_number, section=the_class.section, student=student)
            except Feedback.DoesNotExist:
                feedback = None
                status = False

            with connection.cursor() as cursor:
                cursor.execute("""
                    SELECT ft.comment_template AS template
                    FROM feedback_template ft
                    WHERE ft.class_number = %s
                    AND ft.subject = %s
                    AND ft.letter = %s
                """, [the_class.class_number, the_class.subject, grade.letter.letter])

                row = cursor.fetchone()
                comment = row[0] if row else None

            student_records.append({
                "class_id": the_class.class_number,
                "section_id": the_class.section,
                "class_name": the_class.class_name,
                "student": student.to_dict(),
                "grade": grade.letter.letter,
                "feedback": comment
            })

    result = {
        "student_records": student_records,
        "status": status
    }

    return result

def get_student_grades(student):
    return ReceivesGrade.objects.filter(student=student).select_related("letter").order_by("class_no", "section")


def build_pdf_bytes(student, grades_qs):
    """
    Manually builds a minimal single‐page PDF listing each class & letter grade.
    """
    buf = io.BytesIO()
    w = buf.write

    # PDF header
    w(b"%PDF-1.1\n%\xe2\xe3\xcf\xd3\n")
    offsets = []

    # 1) Catalog
    offsets.append(buf.tell())
    w(b"1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n")

    # 2) Pages
    offsets.append(buf.tell())
    w(b"2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n")

    # 3) Compose lines
    name = f"{student.student_id.first_name} {student.student_id.last_name}"
    lines = [
        f"Report Card - {name}",
        f"Issued: {date.today():%B %d, %Y}",
        "",
        "-------------------------------",
        "Subjects & Grades:",
        "",
    ]
    for g in grades_qs:
        try:
            class_obj = Class.objects.get(class_number=g.class_no, section=g.section)
            subj = class_obj.subject or "(no subject)"
            num = class_obj.class_number
        except Class.DoesNotExist:
            subj = "(unknown class)"
            num = g.class_no

        sect = g.section
        letter = g.letter.letter if g.letter else "(no grade)"
        lines.append(f"{subj} ({num}-{sect}): {letter}")

    # 4) Build text stream
    text = "BT\n/F1 12 Tf\n72 750 Td\n"
    for ln in lines:
        esc = ln.replace("(", "\\(").replace(")", "\\)")
        text += f"({esc}) Tj\n0 -14 Td\n"
    text += "ET\n"
    data = text.encode("latin1")

    # 5) Page object
    offsets.append(buf.tell())
    w(b"3 0 obj\n")
    w(b"<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] ")
    w(b"/Contents 4 0 R /Resources << /Font << /F1 5 0 R>> >> >>\n")
    w(b"endobj\n")

    # 6) Content stream
    offsets.append(buf.tell())
    w(f"4 0 obj\n<< /Length {len(data)} >>\nstream\n".encode("latin1"))
    w(data)
    w(b"\nendstream\nendobj\n")

    # 7) Font
    offsets.append(buf.tell())
    w(b"5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n")

    # 8) xref
    xref_pos = buf.tell()
    w(b"xref\n0 6\n0000000000 65535 f \n")
    for off in offsets:
        w(f"{off:010d} 00000 n \n".encode("latin1"))

    # 9) Trailer
    w(b"trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n")
    w(str(xref_pos).encode("latin1"))
    w(b"\n%%EOF")

    return buf.getvalue()


def save_pdf(pdf_bytes, student_id):
    """
    Writes PDF under MEDIA_ROOT/reports/ and returns its URL.
    """
    reports_dir = Path(settings.MEDIA_ROOT) / "reports"
    reports_dir.mkdir(parents=True, exist_ok=True)

    fname = f"reportcard_{student_id}_{date.today():%Y-%m-%d}.pdf"
    path  = reports_dir / fname
    path.write_bytes(pdf_bytes)

    return settings.MEDIA_URL.rstrip("/") + f"/reports/{fname}"


def generate_report_card(student, grades_qs):
    """
    Generates a clean tabular PDF version of a student's report card with feedback from templates.
    """
    output_path = Path(settings.MEDIA_ROOT) / "reports" / f"reportcard_{student.student_id}_{date.today():%Y-%m-%d}.pdf"
    output_path.parent.mkdir(parents=True, exist_ok=True)

    doc = SimpleDocTemplate(str(output_path), pagesize=letter)
    elements = []
    styles = getSampleStyleSheet()

    title = Paragraph(f"<b>{student.student_id.first_name} {student.student_id.last_name} – Report Card</b>", styles['Title'])
    issued = Paragraph(f"Issued: {date.today():%B %d, %Y}", styles['Normal'])
    elements += [title, issued, Spacer(1, 12)]

    data = [["Course", "Credit", "Final Grade", "Comments"]]
    comment_style = ParagraphStyle('CommentStyle', fontSize=10, leading=12)

    for g in grades_qs:
        try:
            class_obj = Class.objects.get(class_number=g.class_no, section=g.section)
            course = class_obj.subject or f"Class {g.class_no}"
        except Class.DoesNotExist:
            course = f"Class {g.class_no}"

        credit = "5.00"
        grade_letter = g.letter.letter if g.letter else "-"

        # Lookup comment from FeedbackTemplate using (letter, class_number)
        try:
            template = FeedbackTemplate.objects.get(letter=g.letter, class_no=g.class_no)
            comment = template.template
        except FeedbackTemplate.DoesNotExist:
            comment = ""

        wrapped_comment = Paragraph(comment, comment_style)
        data.append([course, credit, grade_letter, wrapped_comment])

    table = Table(data, colWidths=[
        doc.width * 0.2,   # Course
        doc.width * 0.1,   # Credit
        doc.width * 0.1,   # Final Grade
        doc.width * 0.6    # Comments
    ])

    table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.lightgrey),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.black),
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.grey),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
    ]))

    elements.append(table)
    doc.build(elements)

    return settings.MEDIA_URL.rstrip("/") + f"/reports/{output_path.name}"