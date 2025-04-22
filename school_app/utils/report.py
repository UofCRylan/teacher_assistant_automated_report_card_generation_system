from pydoc import resolve

from school_app.models import Student, ReceivesGrade, Feedback, ScheduledClass, Class


def check_student_report_status(student_id):
    """
    1. Select student
    2. Get all their classes
    3. For each of their classes check if they have a grade and feedback
    """
    class_records = []
    status = True

    student = Student.objects.get(studentid=student_id)
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