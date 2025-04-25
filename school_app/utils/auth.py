from school_app.models import Student, Teacher, SchoolMember


# Check if the member is a student or teacher or admin
def get_user_type(user_id):
    user_type = None

    if Student.objects.filter(student_id=user_id).exists():
        user_type = 'student'
    elif Teacher.objects.filter(teacher_id=user_id).exists():
        user_type = 'teacher'
    elif SchoolMember.objects.filter(id=user_id).exists():
        user_type = 'admin'

    return user_type