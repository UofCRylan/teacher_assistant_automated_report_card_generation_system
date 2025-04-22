from school_app.models import ScheduledClass, School_member, Student, Teacher, Class


def create_schedule():
    pass

def edit_schedule(schedule_id):
    pass

def get_schedule(schedule_id):
    result = []
    schedule = ScheduledClass.objects.filter(schedule_id=schedule_id)

    for class_obj in schedule:
        result.append(class_obj.to_dict())

    return result


def get_user_schedule(user_id, user_type):
    if user_type == 'student':
        schedule_id = Student.objects.get(studentid=user_id).schedule_id
        return get_schedule(schedule_id)

    elif user_type == 'teacher':
        result = []

        schedule = Class.objects.filter(teacher_id=user_id)

        for class_obj in schedule:
            result.append(class_obj.to_dict())

        return result

    return None




