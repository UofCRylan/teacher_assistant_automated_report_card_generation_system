from school_app.models import ScheduledClass
from ..models import Class, Teacher, ClassRoom, Student

from django.db import connection

from ..models import Teacher, ClassRoom, Class


def update_class(class_id, section_id, class_name, subject, time_start, time_end, teacher_id, room_id, request_type):
    try:
        # Check that teacher and room exist
        try:
            teacher = Teacher.objects.get(teacher_id=teacher_id)
            room = ClassRoom.objects.get(room_id=room_id)
        except Teacher.DoesNotExist:
            return {
                "message": {"message": "Teacher not found"},
                "status": 400
            }
        except ClassRoom.DoesNotExist:
            return {
                "message": {"message": "Classroom not found"},
                "status": 400
            }

        # Check if the class exists
        with connection.cursor() as cursor:
            cursor.execute(
                "SELECT COUNT(*) FROM Class WHERE class_number = %s AND section = %s",
                [class_id, section_id]
            )
            class_exists = cursor.fetchone()[0] > 0

        if class_exists and request_type == 'POST':
            return {"message": "Unable to create class a class with the class id/section already exists", "status": 400}
        if not class_exists and request_type == 'PUT':
            return {"message": "Unable to update class because the class doesn't exist", "status": 400}

        data = {
            "time_start": time_start,
            "time_end": time_end,
            "teacher_id": teacher_id,
            "room_id": room_id,
            'class_id': class_id,
            'section': section_id,
        }

        status = validate_class(data)

        if status['status'] != 200:
            return status

        if request_type == 'PUT':
            # Edit class
            with connection.cursor() as cursor:
                cursor.execute(
                    """
                    UPDATE Class 
                    SET class_name = %s, 
                        subject = %s, 
                        time_start = %s, 
                        time_end = %s, 
                        teacher_id = %s, 
                        room_id = %s
                    WHERE class_number = %s AND section = %s
                    """,
                    [class_name, subject, time_start, time_end,
                     teacher.teacher_id.id, room.room_id, class_id, section_id]
                )

            return {
                "message": {"message": "Updated class"},
                "status": 200
            }

        elif request_type == 'POST':
            # Create new class
            with connection.cursor() as cursor:
                cursor.execute(
                    """
                    INSERT INTO Class 
                    (class_number, section, class_name, subject, time_start, time_end, teacher_id, room_id)
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
                    """,
                    [class_id, section_id, class_name, subject, time_start, time_end,
                     teacher.teacher_id.id, room.room_id]
                )

            return {
                "message": {"message": "Created class"},
                "status": 201
            }

    except Exception as e:
        return {
            "message": f"Could not update or create class: {str(e)}",
            "status": 500
        }

def get_class(class_id, section_id):
    try:
        the_class = Class.objects.get(class_number=class_id, section=section_id)
        return {
            "message": the_class.to_dict(),
            "status": 200,
        }

    except Class.DoesNotExist:
        return {
            "message": {"message": "Class could not be found"},
            "status": 404
        }

def get_classes():
    results = []

    classes = Class.objects.all()

    for cls in classes:
        results.append(cls.to_dict())

    return results

def get_students(class_id, section_id):
    result = []

    schedule = ScheduledClass.objects.get(class_number=class_id, section=section_id)

    students = Student.objects.filter(schedule_id=schedule.schedule_id)

    for student in students:
        result.append(student.to_dict())

    return result

def validate_class(data):
    """
    1. Check if cls has overlap with any class
    2. If so check to make sure teacher isn't the same
    3. Also make sure room isn't the same
    """
    if not validate_time(data['time_start'], data['time_end']):
        return {'message': 'Class start time must be before end time', 'status': 400}

    all_classes = Class.objects.all()

    for cls in all_classes:
        if cls.class_number != data['class_id'] or cls.section != data['section']:
            if overlap(data['time_start'], data['time_end'], cls.time_start, cls.time_end):
                if int(data['teacher_id']) == cls.teacher.teacher_id.id:
                    return {'message': 'Teacher is teaching another class during selected time', 'status': 400}
                elif int(data['room_id']) == cls.room_id.room_id:
                    return {'message': 'Room is in use during selected time', 'status': 400}

    return {'message': 'No overlap', 'status': 200}


def validate_time(time_start, time_end):
    """
    Check time_start < time_end
    """
    return time_start < time_end

def overlap(time1_start, time1_end, time2_start, time2_end):
    """
    (StartA <= EndB) and (EndA >= StartB)
    """
    return time1_start < time2_end and time1_end > time2_start
