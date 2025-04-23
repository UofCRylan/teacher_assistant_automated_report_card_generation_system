from school_app.models import ClassRoom


def get_available_rooms():
    result = []
    classrooms = ClassRoom.objects.all()

    for classroom in classrooms:
        result.append(classroom.to_dict())

    return result