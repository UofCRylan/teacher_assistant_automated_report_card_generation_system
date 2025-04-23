from school_app.models import Feedback, Student
from django.db import connection


def update_feedback(class_id, section_id, student_id, teacher_id, comment):
    cursor = connection.cursor()

    # Check if student exists
    cursor.execute("SELECT COUNT(*) FROM student WHERE studentid = %s", [student_id])
    if cursor.fetchone()[0] == 0:
        return {"message": "Student does not exist", "status": 404}

    # Check if the student has a grade for this class/section
    cursor.execute(
        """
        SELECT letter FROM recieves_grade 
        WHERE studentid = %s AND class_number = %s AND section = %s
        """,
        [student_id, class_id, section_id]
    )

    grade_result = cursor.fetchone()
    if not grade_result:
        return {"message": "Student does not have a grade for this class", "status": 404}

    letter_value = grade_result[0]

    # Check if feedback already exists
    cursor.execute(
        """
        SELECT COUNT(*) FROM feedback 
        WHERE classnumber = %s AND section = %s AND studentid = %s AND teacherid = %s
        """,
        [class_id, section_id, student_id, teacher_id]
    )

    feedback_exists = cursor.fetchone()[0] > 0

    if feedback_exists:
        # Update existing feedback
        cursor.execute(
            """
            UPDATE feedback 
            SET letter = %s, comment = %s
            WHERE classnumber = %s AND section = %s AND studentid = %s AND teacherid = %s
            """,
            [letter_value, comment, class_id, section_id, student_id, teacher_id]
        )
        message = "updated"
        status = 200
    else:
        # Insert new feedback
        cursor.execute(
            """
            INSERT INTO feedback 
            (classnumber, section, studentid, teacherid, letter, comment)
            VALUES (%s, %s, %s, %s, %s, %s)
            """,
            [class_id, section_id, student_id, teacher_id, letter_value, comment]
        )
        message = "created"
        status = 201

    return {
        "message": f"Successfully {message} feedback",
        "status": status
    }


def get_feedback(class_id, section_id, student_id):
    try:
        student = Student.objects.get(student_id=student_id)
        feedback = Feedback.objects.get(class_no=class_id, section=section_id, student=student)
        return feedback.to_dict()

    except Feedback.DoesNotExist:
        return None

def get_feedbacks(class_id, section_id):
    result = []

    feedbacks = Feedback.objects.filter(class_no=class_id, section=section_id)
    for feedback in feedbacks:
        result.append(feedback.to_dict())

    return result
