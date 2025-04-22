from school_app.models import Schedule, ScheduledClass
from ..models import Class, Teacher, ClassRoom, Student

def create_class(class_id, section_id, class_name, subject, time_start, time_end, teacher_id, room_id):
    try:
        teacher = Teacher.objects.get(teacherid=teacher_id)
        print(room_id)
        room = ClassRoom.objects.get(roomid=room_id)

        new_class = Class(class_number=class_id, section=section_id, class_name=class_name, subject=subject,
                          time_start=time_start, time_end=time_end, teacher_id=teacher, room_id=room)

        new_class.save()

        print("Made")

        return {
            "message": {"message": "Made class"},
            "status": 201
        }

    except Teacher.DoesNotExist:
        return {
            "message": {"message": "Could not make the class"},
            "status": 400
        }

def edit_class(class_id, section_id, class_name, subject, time_start, time_end, teacher_id, room_id):
    try:
        the_class = Class.objects.get(class_number=class_id, section=section_id)
        teacher = Teacher.objects.get(teacherid=teacher_id)
        room = ClassRoom.objects.get(roomid=room_id)

        the_class.class_name = class_name
        the_class.subject = subject
        the_class.time_start = time_start
        the_class.time_end = time_end
        the_class.teacher_id = teacher
        the_class.room_id = room

        the_class.save()

        return {
            "message": {"message": "Updated class"},
            "status": 201
        }

    except Teacher.DoesNotExist:
        return {
            "message": {"message": "Could not make the class"},
            "status": 400
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

def get_classes(schedule_id):
    try:
        schedule = Class.objects.get(schedule_id=schedule_id)

        return None

    except Schedule.DoesNotExist:
        pass

    return None

def get_students(class_id, section_id):
    result = []

    schedule = ScheduledClass.objects.get(class_number=class_id, section=section_id)

    students = Student.objects.filter(schedule_id=schedule.schedule_id)

    for student in students:
        result.append(student.to_dict())

    return result