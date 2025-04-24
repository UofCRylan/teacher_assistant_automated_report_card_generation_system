from django.db import models
from django.db import connection


class Address(models.Model):
    id = models.OneToOneField('SchoolMember', models.DO_NOTHING, db_column='id', primary_key=True)
    street_name = models.CharField(max_length=45, blank=True, null=True)
    street_number = models.IntegerField(blank=True, null=True)
    city = models.CharField(max_length=45, blank=True, null=True)
    province = models.CharField(max_length=45, blank=True, null=True)
    postal_code = models.CharField(max_length=45, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'address'


class Attendance(models.Model):
    id = None

    class_no = models.IntegerField(db_column='class_number')
    section = models.IntegerField()
    teacher = models.ForeignKey('Teacher', models.DO_NOTHING,db_column='teacherid')
    student = models.ForeignKey('Student', models.DO_NOTHING,  db_column='studentid', primary_key=True)
    date = models.DateField()
    status = models.CharField(max_length=45, blank=True, null=True)

    def to_dict(self):
        from school_app.models import Class

        try:
            class_obj = Class.objects.get(class_number=self.class_no, section=self.section)
            class_dict = class_obj.to_dict()
        except Class.DoesNotExist:
            class_dict = None

        return {
            "class": class_dict,
            "student": self.student.to_dict() if self.student else None,
            "teacher": self.teacher.to_dict() if self.teacher else None,
            "date": self.date,
            "status": self.status
        }
    

    class Meta:
        managed = False
        db_table = 'attendance'
        unique_together = (('class_no', 'section', 'teacher', 'student', 'date'),)


class auth_group(models.Model):
    name = models.CharField(unique=True, max_length=150)

    class Meta:
        managed = False
        db_table = 'auth_group'


class auth_group_permissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    group = models.ForeignKey(auth_group, models.DO_NOTHING)
    permission = models.ForeignKey('auth_permission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class auth_permission(models.Model):
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey('django_content_type', models.DO_NOTHING,blank=True, null=True)
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


class auth_user(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.IntegerField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.IntegerField()
    is_active = models.IntegerField()
    date_joined = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'auth_user'


class auth_user_groups(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(auth_user, models.DO_NOTHING)
    group = models.ForeignKey(auth_group, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user', 'group'),)


class auth_user_user_permissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(auth_user, models.DO_NOTHING)
    permission = models.ForeignKey(auth_permission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user', 'permission'),)

class Class(models.Model):
    class_number = models.IntegerField(primary_key=True)
    section = models.IntegerField(blank=True, null=False)
    subject = models.CharField(max_length=45, blank=True, null=True)
    time_start = models.CharField(max_length=45, blank=True, null=True)
    time_end = models.CharField(max_length=45, blank=True, null=True)
    class_name = models.CharField(max_length=45, blank=True, null=True)
    teacher = models.ForeignKey('Teacher', models.DO_NOTHING, db_column='teacher_id', blank=True, null=True)
    room_id = models.ForeignKey('ClassRoom', models.DO_NOTHING,db_column='room_id', blank=True, null=True)

    def to_dict(self):
        try:
            room = self.room_id.to_dict() if self.room_id else None
        except ClassRoom.DoesNotExist:
            room = None

        try:
            teacher = self.teacher.to_dict() if self.teacher_id else None
        except Teacher.DoesNotExist:
            teacher = None

        return {
            "class_number": self.class_number,
            "section": self.section,
            "subject": self.subject,
            "time_start": self.time_start,
            "time_end": self.time_end,
            "class_name": self.class_name,
            "teacher": teacher,
            "room": room
        }

    class Meta:
        managed = False
        db_table = 'Class'
        unique_together = (('class_number', 'section'),)


class ClassRoom(models.Model):
    room_id = models.IntegerField(primary_key=True, max_length=45, db_column='roomid')
    capacity = models.IntegerField(blank=True, null=True)
    building = models.CharField(max_length=45, blank=True, null=True)
    room_number = models.CharField(max_length=45, blank=True, null=True)

    def to_dict(self):
        return {
            "room_number": self.room_number,
            "capacity": self.capacity,
            "building": self.building,
            "room_id": self.room_id
        }

    class Meta:
        managed = False
        db_table = 'class_room'


class django_admin_log(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.PositiveSmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey('django_content_type', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(auth_user, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class django_content_type(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class django_migrations(models.Model):
    id = models.BigAutoField(primary_key=True)
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class django_session(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'


# app/models.py
from django.db import models


class Feedback(models.Model):
    """
    Stores the narrative comment that a teacher gives a student for a
    particular class & section.
    """
    teacher   = models.ForeignKey('Teacher', on_delete=models.DO_NOTHING, db_column='teacherid',)
    student   = models.ForeignKey('Student', on_delete=models.DO_NOTHING, db_column='studentid', primary_key=True)
    class_no  = models.IntegerField(db_column='classnumber')
    section   = models.IntegerField(db_column='section', help_text="Report‑card term / semester",)
    letter    = models.ForeignKey('FinalGrade',to_field='letter',on_delete=models.DO_NOTHING,db_column='letter',)

    class Meta:
        db_table = 'feedback'
        # one teacher can only comment once per student‑class‑section
        unique_together = (
            ('teacher', 'student', 'class_no', 'section'),
        )
        managed = False        # remove iff you want Django to own the table

    def to_dict(self):
        from school_app.models import Class

        # try:
        class_obj = Class.objects.get(class_number=self.class_no, section=self.section)
        class_dict = class_obj.to_dict()
        # except Class.DoesNotExist:
        #     class_dict = None

        print(self.class_no, class_obj.subject)
        with connection.cursor() as cursor:
            cursor.execute("""
                SELECT ft.comment_template AS template
                FROM feedback_template ft
                WHERE ft.class_number = %s
                AND ft.subject = %s
                AND ft.letter = %s
            """, [self.class_no, class_obj.subject, self.letter.letter])

            row = cursor.fetchone()
            comment = row[0] if row else None

        return {
            'grade': self.letter.to_dict(),
            'class': class_dict,
            'student': self.student.to_dict(),
            'teacher': self.teacher.to_dict(),
            'comment': comment
        }

    def __str__(self):
        return f'{self.student_id} – {self.class_no}:{self.section} ⇒ {self.letter_id}'


class FeedbackTemplate(models.Model):
    """
    Holds one reusable ‘boiler‑plate’ comment for a given subject & final grade.
    """
    letter    = models.ForeignKey('FinalGrade',models.DO_NOTHING,db_column="letter")
    class_no  = models.IntegerField(db_column='class_number', primary_key=True)
    subject   = models.CharField(max_length=60)          # e.g. “Math 2”
    template  = models.TextField(db_column='comment_template')                       # e.g. “{student} received …”

    class Meta:
        db_table = "feedback_template"    # ← must match the physical table
        verbose_name = "Feedback template"
        unique_together = (
            ('class_no', 'subject', 'letter'),
        )

    def __str__(self):
        return f"{self.subject} – {self.letter_id}"

class FinalGrade(models.Model):
    letter = models.CharField(primary_key=True, max_length=45)
    word = models.CharField(max_length=45, blank=True, null=True)

    def to_dict(self):
        return {
            'letter': self.letter,
            'word': self.word,
        }

    class Meta:
        managed = False
        db_table = 'final_grade'
        

class IndividualProgressPlan(models.Model):
    id = None

    teacher = models.OneToOneField('Teacher', models.DO_NOTHING, db_column='teacherid')
    student = models.ForeignKey('Student', models.DO_NOTHING, db_column='studentid', primary_key=True)
    goals = models.TextField(blank=True, null=True)
    specified_disability = models.CharField(max_length=45, blank=True, null=True)
    educational_aids = models.CharField(max_length=45, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'individual_progress_plan'
        unique_together = ('teacher', 'student')

    def to_dict(self):
        return {
            'teacher': Teacher.objects.get(teacher_id=self.teacher).to_dict(),
            'student': Student.objects.get(student_id=self.student).to_dict(),
            'goals': self.goals,
            's_d': self.specified_disability,
            'e_a': self.educational_aids,
        }


class ReceivesGrade(models.Model):
    id = None

    student = models.ForeignKey('Student', on_delete=models.DO_NOTHING, db_column='studentid', primary_key=True)
    class_no = models.IntegerField(db_column='class_number')
    section = models.IntegerField(db_column='section')
    letter = models.ForeignKey('FinalGrade', to_field='letter', on_delete=models.DO_NOTHING, db_column='letter')

    class Meta:
        managed = False
        db_table = 'recieves_grade'
        unique_together = (('letter', 'student', 'class_no', 'section'),)


    def to_dict(self):
        from school_app.models import Class

        try:
            class_obj = Class.objects.get(class_number=self.class_no, section=self.section)
            class_dict = class_obj.to_dict()
        except Class.DoesNotExist:
            class_dict = None

        return {
            'grade': self.letter.to_dict(),
            'class': class_dict,
            'student': self.student.to_dict()
        }

    def __str__(self):
        return f'{self.student_id} – {self.class_no}:{self.section} ⇒ {self.letter_id}'

class Schedule(models.Model):
    schedule_id = models.IntegerField(db_column='schedule_id', null=False, primary_key=True)
    grade_level = models.IntegerField(db_column='grade_level')

    class Meta:
        managed = False
        db_table = 'schedule'
        unique_together = ('schedule_id',)


class ScheduledClass(models.Model):
    schedule_id = models.IntegerField(db_column='schedule_id', null=False, primary_key=True)
    class_number = models.IntegerField(db_column='class_number', null=False)
    section = models.IntegerField(db_column='section', null=False)

    class Meta:
        managed = False
        db_table = 'scheduled_class'
        unique_together = (('schedule_id', 'class_number', 'section'),)

    def to_dict(self):
        from school_app.models import Class

        try:
            class_obj = Class.objects.get(class_number=self.class_number, section=self.section)
            class_dict = class_obj.to_dict()
        except Class.DoesNotExist:
            class_dict = None

        return {
            'schedule_id': int(self.schedule_id),
            'class': class_dict,
        }
        
class SchoolMember(models.Model):
    id = models.IntegerField(primary_key=True)
    phone_number = models.CharField(max_length=45, blank=True, null=True)
    first_name = models.CharField(max_length=45, blank=True, null=True)
    last_name = models.CharField(max_length=45, blank=True, null=True)
    date_of_birth = models.DateField(blank=True, null=True)
    email = models.CharField(max_length=45, blank=True, null=True)
    password = models.CharField(max_length=45, blank=True, null=True)

    def to_dict(self):
        return {
            "id": self.id,
            "full_name": self.first_name + " " + self.last_name,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "phone_number": self.phone_number,
            "email": self.email,
            "date_of_birth": self.date_of_birth
        }

    @property
    def is_authenticated(self):
        return True
    
    class Meta:
        managed = False
        db_table = 'school_member'

class Student(models.Model):
    student_id = models.OneToOneField(SchoolMember, models.DO_NOTHING, db_column='studentid', primary_key=True)
    schedule_id = models.IntegerField(db_column='scheduleid')

    def to_dict(self):
        return {
            'data': self.student_id.to_dict(),
            'schedule_id': self.schedule_id,
        }

    class Meta:
        managed = False
        db_table = 'student'


class Teacher(models.Model):
    teacher_id = models.OneToOneField(SchoolMember, models.DO_NOTHING, db_column='teacherid', primary_key=True)

    def to_dict(self):
        return {
            'data': self.teacher_id.to_dict(),
        }

    class Meta:
        managed = False
        db_table = 'teacher'
