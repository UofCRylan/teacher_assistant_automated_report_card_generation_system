from school_app.models import Student, ReceivesGrade, Feedback, ScheduledClass, Class
import io
from datetime import date
from pathlib import Path
from django.conf import settings


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

        try:
            feedback = Feedback.objects.get(class_no=cls.class_number, section=cls.section, student=student)
            if feedback.comment is not None:
                feedback_status = True
        except Feedback.DoesNotExist:
            pass

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

            print(grade.letter)

            student_records.append({
                "class_id": the_class.class_number,
                "section_id": the_class.section,
                "class_name": the_class.class_name,
                "student": student.to_dict(),
                "grade": grade.letter.letter,
                "feedback": feedback.comment if feedback else None
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
    Manually constructs a minimal PDF containing the student's report card.
    """
    buf = io.BytesIO()
    w = buf.write

    # 1) PDF header
    w(b"%PDF-1.1\n%\xE2\xE3\xCF\xD3\n")

    # 2) Objects
    offsets = []

    # obj 1: Catalog
    offsets.append(buf.tell())
    w(b"1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n")

    # obj 2: Pages
    offsets.append(buf.tell())
    w(b"2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n")

    # Prepare the content stream (page text)
    lines = [
        f"Report Card – {student.student_id.first_name} {student.student_id.last_name}",
        f"Issued: {date.today():%B %d, %Y}",
        "",
    ]
    for g in grades_qs:
        subj   = g.klass.subject or ""
        clsno  = g.klass.class_number
        sect   = g.klass.section
        letter = g.letter.letter if g.letter else ""
        comm   = (g.comment or "")[:60]
        lines.append(f"{subj} ({clsno}-{sect}): {letter} {comm}")

    # Build PDF text drawing commands
    text  = "BT\n/F1 12 Tf\n72 750 Td\n"
    for line in lines:
        # literal parentheses must be escaped
        esc = line.replace("(", "\\(").replace(")", "\\)")
        text += f"({esc}) Tj\n0 -14 Td\n"
    text += "ET\n"
    data_stream = text.encode("latin1")

    # obj 3: Page definition
    offsets.append(buf.tell())
    w(b"3 0 obj\n")
    w(b"<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] ")
    w(b"/Contents 4 0 R /Resources << /Font << /F1 5 0 R>> >> >>\n")
    w(b"endobj\n")

    # obj 4: Content stream
    offsets.append(buf.tell())
    w(f"4 0 obj\n<< /Length {len(data_stream)} >>\nstream\n".encode("latin1"))
    w(data_stream)
    w(b"\nendstream\nendobj\n")

    # obj 5: Font
    offsets.append(buf.tell())
    w(b"5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n")

    # 3) Cross-reference table
    xref_pos = buf.tell()
    w(b"xref\n0 6\n0000000000 65535 f \n")
    for off in offsets:
        w(f"{off:010d} 00000 n \n".encode("latin1"))

    # 4) Trailer
    w(b"trailer\n<< /Size 6 /Root 1 0 R >>\n")
    w(b"startxref\n")
    w(str(xref_pos).encode("latin1"))
    w(b"\n%%EOF")

    return buf.getvalue()


def save_pdf(pdf_bytes, student_id):
    """
    Saves the PDF into MEDIA_ROOT/reports/ and returns its public URL.
    """
    reports_dir = Path(settings.MEDIA_ROOT) / "reports"
    reports_dir.mkdir(parents=True, exist_ok=True)
    fname = f"reportcard_{student_id}_{date.today():%Y-%m-%d}.pdf"
    path  = reports_dir / fname
    path.write_bytes(pdf_bytes)
    return settings.MEDIA_URL.rstrip("/") + "/reports/" + fname