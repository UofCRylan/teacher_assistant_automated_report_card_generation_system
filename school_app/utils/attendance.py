from school_app.models import Attendance
from django.db import connection

def get_attendance(student_id):
    result = []

    records = Attendance.objects.filter(student=student_id)

    for record in records:
        result.append(record.to_dict())

    return result

def get_all_attendance(class_id, section):
    result = []

    records = Attendance.objects.filter(class_no=class_id, section=section)

    for record in records:
        result.append(record.to_dict())

    return result

def update_attendance(class_id, section, records):
    try:
        cursor = connection.cursor()

        for record in records:
            student_id = record['student_id']
            teacher_id = record['teacher_id']
            date = record['date']
            status = record['status']

            # Check if record exists
            cursor.execute(
                """
                SELECT COUNT(*) FROM attendance 
                WHERE class_number = %s AND section = %s AND studentid = %s 
                AND teacherid = %s AND date = %s
                """,
                [class_id, section, student_id, teacher_id, date]
            )

            count = cursor.fetchone()[0]

            if count > 0:
                # Update existing record
                cursor.execute(
                    """
                    UPDATE attendance SET status = %s
                    WHERE class_number = %s AND section = %s AND studentid = %s 
                    AND teacherid = %s AND date = %s
                    """,
                    [status, class_id, section, student_id, teacher_id, date]
                )
            else:
                # Insert new record
                cursor.execute(
                    """
                    INSERT INTO attendance 
                    (class_number, section, studentid, teacherid, date, status)
                    VALUES (%s, %s, %s, %s, %s, %s)
                    """,
                    [class_id, section, student_id, teacher_id, date, status]
                )
        return { "message": "Attendance successfully updated", "status": 200}

    except Exception as e:
        return { "message" : str(e), "status": 400}