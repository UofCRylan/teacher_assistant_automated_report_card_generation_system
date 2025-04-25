from school_app.models import IndividualProgressPlan
from django.db import connection

def update_ipp(teacher_id, student_id, goals, e_a, s_d):
    try:
        with connection.cursor() as cursor:
            # Check if record exists
            check_query = """
            SELECT 1 FROM individual_progress_plan 
            WHERE teacherid = %s AND studentid = %s
            """
            cursor.execute(check_query, [teacher_id, student_id])
            record_exists = cursor.fetchone()

            if record_exists:
                # Update the existing record
                update_query = """
                UPDATE individual_progress_plan 
                SET goals = %s, specified_disability = %s, educational_aids = %s
                WHERE teacherid = %s AND studentid = %s
                """
                cursor.execute(update_query, [goals, s_d, e_a, teacher_id, student_id])

                response = {
                    "message": "Successfully updated ipp",
                    "status": 200
                }
            else:
                # Insert a new record
                insert_query = """
                INSERT INTO individual_progress_plan 
                (teacherid, studentid, goals, specified_disability, educational_aids)
                VALUES (%s, %s, %s, %s, %s)
                """
                cursor.execute(insert_query, [teacher_id, student_id, goals, s_d, e_a])

                response = {
                    "message": "Successfully created ipp",
                    "status": 201
                }

        return response

    except Exception as e:
        return {"message": f"Error: {str(e)}", "status": 500}


def get_student_ipp(student_id):
    result = []
    ipps = IndividualProgressPlan.objects.filter(student=student_id)

    for ipp in ipps:
        result.append(ipp.to_dict())

    return result

def get_specific_ipp(student_id, teacher_id):
    try:
        ipp = IndividualProgressPlan.objects.get(student=student_id, teacher=teacher_id)
        return ipp.to_dict()

    except IndividualProgressPlan.DoesNotExist:
        return None


def get_teacher_ipp(teacher_id):
    result = []
    ipps = IndividualProgressPlan.objects.filter(teacher=teacher_id)

    for ipp in ipps:
        result.append(ipp.to_dict())

    return result