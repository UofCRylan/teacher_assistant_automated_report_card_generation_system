from school_app.models import ScheduledClass, Student, Class, Schedule
from django.db import connection, transaction


def update_schedule(schedule_id, data, request_type):
    # Extract data components
    grade_level = data.get('grade_level')
    classes = data.get('classes', [])

    # Validate required fields
    if grade_level is None:
        return {"message": "Grade level is required", "status": 400}

    if not classes:
        return {"message": "Classes array is required and cannot be empty", "status": 400}

    # First check if there are any time overlaps in the classes
    if has_time_overlap(classes):
        return {"message": "Invalid times - schedule has time conflicts", "status": 401}

    try:
        # Use a transaction to ensure all operations complete or none do
        with transaction.atomic():
            # Check if schedule with this ID exists in the schedule table
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

            # Handle the schedule record in the parent table
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

            # Now handle the scheduled classes
            # Delete all existing classes with this schedule_id if any exist
            with connection.cursor() as cursor:
                cursor.execute(
                    "DELETE FROM scheduled_class WHERE schedule_id = %s",
                    [schedule_id]
                )
                print(f"Deleted existing classes for schedule {schedule_id}")

            # Create new scheduled classes for each class in the list
            inserted_count = 0
            with connection.cursor() as cursor:
                for index, class_item in enumerate(classes):
                    class_number = class_item.get('class_id')
                    section = class_item.get('section')

                    if class_number is None or section is None:
                        print(f"Skipping class at index {index} due to missing required fields")
                        continue  # Skip invalid entries

                    try:
                        cursor.execute(
                            """
                            INSERT INTO scheduled_class (schedule_id, class_number, section)
                            VALUES (%s, %s, %s)
                            """,
                            [schedule_id, class_number, section]
                        )
                        inserted_count += 1
                        print(f"Inserted class {class_number}-{section} for schedule {schedule_id}")
                    except Exception as e:
                        print(f"Error inserting class {class_number}-{section}: {str(e)}")
                        raise

            print(f"Total classes inserted: {inserted_count}")

            # Verify data was inserted correctly
            with connection.cursor() as cursor:
                cursor.execute(
                    "SELECT COUNT(*) FROM scheduled_class WHERE schedule_id = %s",
                    [schedule_id]
                )
                final_count = cursor.fetchone()[0]
                print(f"Final count of classes for schedule {schedule_id}: {final_count}")

        return {
            "message": f"Schedule {'updated' if schedule_exists else 'created'} successfully with {inserted_count} classes",
            "status": 200
        }
    except Exception as e:
        # Handle exceptions that might occur during database operations
        print(f"Error in update_schedule: {str(e)}")
        return {
            "message": f"Error updating schedule: {str(e)}",
            "status": 500
        }

def get_schedule(schedule_id):
    classes = []
    schedule = Schedule.objects.get(schedule_id=schedule_id)
    schedule_classes = ScheduledClass.objects.filter(schedule_id=schedule_id)

    for class_obj in schedule_classes:
        classes.append(class_obj.to_dict())

    result = {
        'grade_level': schedule.grade_level,
        'classes': classes
    }

    return result


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
    Detects if there are any overlapping time slots in a class schedule

    Args:
        classes: List of dictionaries with class_id, section, time_start, time_end

    Returns:
        bool: True if there's at least one overlap, False otherwise
    """

    # Helper function to convert HH:MM to minutes since midnight
    def time_to_minutes(time_str):
        hours, minutes = map(int, time_str.split(':'))
        return hours * 60 + minutes

    # Check if two time slots overlap
    def do_times_overlap(class1, class2):
        start1 = time_to_minutes(class1['time_start'])
        end1 = time_to_minutes(class1['time_end'])
        start2 = time_to_minutes(class2['time_start'])
        end2 = time_to_minutes(class2['time_end'])

        # Check for overlap: one class starts before the other ends
        return start1 < end2 and start2 < end1

    # Compare each pair of classes
    for i in range(len(classes)):
        for j in range(i + 1, len(classes)):
            if do_times_overlap(classes[i], classes[j]):
                return True

    return False


