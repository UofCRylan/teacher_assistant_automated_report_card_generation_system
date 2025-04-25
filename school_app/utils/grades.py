from django.db import connection
from school_app.models import ReceivesGrade, Student, FinalGrade


def update_grades(records):
    cursor = connection.cursor()
    results = []

    for record in records:
        student_id = record['student_id']
        letter_value = record['letter']

        class_id = record.get('class_id')
        section_id = record.get('section')

        # Check if student exists
        cursor.execute("SELECT COUNT(*) FROM student WHERE studentid = %s", [student_id])
        if cursor.fetchone()[0] == 0:
            results.append({"message": f"Student {student_id} does not exist", "status": 404})
            continue

        # Check if letter grade exists
        cursor.execute("SELECT COUNT(*) FROM final_grade WHERE letter = %s", [letter_value])
        if cursor.fetchone()[0] == 0:
            results.append({"message": f"Could not find letter grade '{letter_value}'", "status": 404})
            continue

        # Check if record exists
        cursor.execute(
            """
            SELECT COUNT(*) FROM recieves_grade 
            WHERE studentid = %s AND class_number = %s AND section = %s
            """,
            [student_id, class_id, section_id]
        )

        record_exists = cursor.fetchone()[0] > 0

        if record_exists:
            # Update existing record
            cursor.execute(
                """
                UPDATE recieves_grade 
                SET letter = %s
                WHERE studentid = %s AND class_number = %s AND section = %s
                """,
                [letter_value, student_id, class_id, section_id]
            )
            message = "updated"
            status = 200
        else:
            # Insert new record
            cursor.execute(
                """
                INSERT INTO recieves_grade 
                (studentid, class_number, section, letter)
                VALUES (%s, %s, %s, %s)
                """,
                [student_id, class_id, section_id, letter_value]
            )
            message = "created"
            status = 201

        results.append({
            "message": f"Successfully {message} grade for student {student_id}",
            "status": status,
            "student": {
                "id": student_id,
                "first_name": record.get('first_name'),
                "last_name": record.get('last_name')
            }
        })

    if not results:
        return {"message": "No grades were updated", "status": 400}
    elif len(results) == 1:
        return results[0]
    else:
        return {"message": f"Successfully processed updated grades", "status": 200, "details": results}

def get_grade(class_id, section_id, student_id):
    try:
        student = Student.objects.get(student_id=student_id)
        grade = ReceivesGrade.objects.get(class_no=class_id, section=section_id, student=student)

        return grade.to_dict()

    except ReceivesGrade.DoesNotExist:
        return None


def get_grades(class_id, section_id):
    result = []

    grades = ReceivesGrade.objects.filter(class_no=class_id, section=section_id)
    for grade in grades:
        result.append(grade.to_dict())

    return result
