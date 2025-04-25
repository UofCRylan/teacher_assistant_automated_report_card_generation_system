from school_app.models import ScheduledClass, Student, Class, Schedule, ReceivesGrade
from django.db import connection, transaction
from ..utils import manager


def update_schedule(schedule_id, data, request_type):
    try:
        grade_level = data.get('grade_level')
        classes = data.get('classes', [])

        if grade_level is None:
            return {"message": "Grade level is required", "status": 400}

        if not classes:
            return {"message": "Classes array is required and cannot be empty", "status": 400}

        if has_time_overlap(classes):
            return {"message": "Invalid times - schedule has time conflicts", "status": 400}

        if not validate_classes(classes, schedule_id):
            return {"message": "Unable to create schedule because a selected class is already in"
                               " another schedule", "status": 400}

        old_classes = get_schedule(schedule_id)

        if old_classes:
            new_schedule = convert_to_set(classes) # New schedule classes

            for cls in old_classes['classes']:
                cls_info = f"{cls['class']['class_number']}-{cls['class']['section']}"
                if cls_info not in new_schedule:
                    remove_grades(cls['class']['class_number'], cls['class']['section'])

        try:
            with transaction.atomic():
                with connection.cursor() as cursor:
                    cursor.execute(
                        "SELECT EXISTS(SELECT 1 FROM schedule WHERE schedule_id = %s)",
                        [schedule_id]
                    )
                    schedule_exists = cursor.fetchone()[0]

                if schedule_exists and request_type == 'POST':
                    return {"message": "Unable to create schedule the schedule id already exists", "status": 400}
                if not schedule_exists and request_type == 'PUT':
                    return {"message": "Unable to update schedule the schedule id doesn't exist", "status": 400}

                with connection.cursor() as cursor:
                    if schedule_exists:
                        # Update the existing schedule record
                        cursor.execute(
                            "UPDATE schedule SET grade_level = %s WHERE schedule_id = %s",
                            [grade_level, schedule_id]
                        )
                        print(f"Updated schedule {schedule_id} with grade level {grade_level}")
                    else:
                        # Create a new schedule record
                        cursor.execute(
                            "INSERT INTO schedule (schedule_id, grade_level) VALUES (%s, %s)",
                            [schedule_id, grade_level]
                        )
                        print(f"Created new schedule {schedule_id} with grade level {grade_level}")

                with connection.cursor() as cursor:
                    cursor.execute(
                        "DELETE FROM scheduled_class WHERE schedule_id = %s",
                        [schedule_id]
                    )
                    print(f"Deleted existing classes for schedule {schedule_id}")

                with connection.cursor() as cursor:
                    for index, class_item in enumerate(classes):
                        class_number = class_item.get('class_id')
                        section = class_item.get('section')
                        try:
                            cursor.execute(
                                """
                                INSERT INTO scheduled_class (schedule_id, class_number, section)
                                VALUES (%s, %s, %s)
                                """,
                                [schedule_id, class_number, section]
                            )
                        except Exception as e:
                            return {
                                    "message": f"Error inserting class {class_number}-{section}: {str(e)}",
                                    "status": 200
                                }

            return {
                "message": f"Schedule {'updated' if schedule_exists else 'created'} successfully",
                "status": 200
            }
        except Exception as e:
            return {
                "message": f"Error while updating schedule: {str(e)}",
                "status": 500
            }
    except Exception as e:
        print(f"Error in update_schedule: {str(e)}")
        return {
            "message": f"Error updating schedule: {str(e)}",
            "status": 500
        }

def get_schedule(schedule_id):
    classes = []
    try:
        schedule = Schedule.objects.get(schedule_id=schedule_id)
        schedule_classes = ScheduledClass.objects.filter(schedule_id=schedule_id)

        for class_obj in schedule_classes:
            classes.append(class_obj.to_dict())

        result = {
            'grade_level': schedule.grade_level,
            'classes': classes
        }

        return result
    except Exception as e:
        return None


def get_user_schedule(user_id, user_type):
    if user_type == 'student':
        schedule_id = Student.objects.get(student_id=user_id).schedule_id
        return get_schedule(schedule_id)

    elif user_type == 'teacher':
        result = []

        schedule = Class.objects.filter(teacher=user_id)

        for class_obj in schedule:
            result.append(class_obj.to_dict())

        return result

    return None

def get_all_schedules():
    result = {}
    schedule = ScheduledClass.objects.all()

    for class_obj in schedule:
        schedule_id = class_obj.schedule_id
        if schedule_id not in result:
            result[schedule_id] = []

        result[schedule_id].append(class_obj.to_dict())

    return result


def has_time_overlap(classes):
    """
    Check if there is an overlap between time of classes in the schedule
    """
    for i in range(len(classes)):
        for j in range(i + 1, len(classes)):
            if manager.overlap(classes[i]['time_start'], classes[i]['time_end'],
                               classes[j]['time_start'], classes[j]['time_end']):
                return True

    return False

def validate_classes(new_classes, schedule_id):
    for class_obj in new_classes:
        if ScheduledClass.objects.filter(
                class_number=class_obj['class_id'],
                section=class_obj['section']
        ).exclude(schedule_id=schedule_id).exists():
            return False

    return True

def convert_to_set(classes):
    result = set()

    for class_obj in classes:
        result.add(f"{class_obj['class_id']}-{class_obj['section']}")

    return result

def remove_grades(class_id, section):
    print("Removing grade for class: ", class_id, section)
    with connection.cursor() as cursor:
        cursor.execute(
            """
            DELETE FROM recieves_grade
            WHERE class_number = %s AND section = %s
            """,
            [class_id, section]
        )
