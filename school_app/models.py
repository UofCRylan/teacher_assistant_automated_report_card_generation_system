# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class address(models.Model):
    id = models.OneToOneField('school_member', models.DO_NOTHING, db_column='id', primary_key=True)
    street_name = models.CharField(max_length=45, blank=True, null=True)
    street_number = models.IntegerField(blank=True, null=True)
    city = models.CharField(max_length=45, blank=True, null=True)
    province = models.CharField(max_length=45, blank=True, null=True)
    postal_code = models.CharField(max_length=45, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'address'


class Assigned(models.Model):
    id = models.AutoField(primary_key=True)  
    class_number = models.ForeignKey('Class', models.DO_NOTHING, db_column='class_number')
    section = models.IntegerField(blank=True, null=True)
    student = models.ForeignKey('Student', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'assigned'


class Attendance(models.Model):
    id = models.AutoField(primary_key=True)  
    class_number = models.ForeignKey('Class', models.DO_NOTHING, db_column='class_number', blank=True, null=True)
    section = models.IntegerField(blank=True, null=False)
    teacherid = models.ForeignKey('Teacher', models.DO_NOTHING,db_column='teacherid', blank=True, null=True)
    studentid = models.ForeignKey('Student', models.DO_NOTHING,  db_column='studentid', blank=True, null=True)
    date = models.DateField()
    status = models.CharField(max_length=45, blank=True, null=True)

    def to_dict(self):
        return {
            "id": self.id,
            "class": self.class_number.to_dict() if self.class_number else None,
            "section": self.section,
            "student": self.studentid.to_dict() if self.studentid else None,
            "teacher": self.teacherid.to_dict() if self.teacherid else None,
            "date": self.date,
            "status": self.status
        }
    

    class Meta:
        managed = False
        db_table = 'attendance'


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
    time_start = models.IntegerField(blank=True, null=True)
    time_end = models.IntegerField(blank=True, null=True)
    class_name = models.CharField(max_length=45, blank=True, null=True)
    teacher_id = models.ForeignKey('Teacher', models.DO_NOTHING, db_column='teacher_id', blank=True, null=True)
    room_id = models.ForeignKey('class_room', models.DO_NOTHING,db_column='room_id', blank=True, null=True)

    def to_dict(self):
        try:
            room = self.room_id.to_dict() if self.room_id else None
        except class_room.DoesNotExist:
            room = None

        try:
            teacher = self.teacher_id.to_dict() if self.teacher_id else None
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


class class_room(models.Model):
    room_number = models.IntegerField(primary_key=True)
    capacity = models.IntegerField(blank=True, null=True)
    building = models.CharField(max_length=45, blank=True, null=True)
    roomid = models.CharField(max_length=45, blank=True, null=True)

    def to_dict(self):
        return {
            "room_number": self.room_number,
            "capacity": self.capacity,
            "building": self.building,
            "roomid": self.roomid
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


class educates(models.Model):
    teacherid = models.OneToOneField('Teacher', models.DO_NOTHING, db_column='teacherid', primary_key=True) 
    studentid = models.ForeignKey('Student', models.DO_NOTHING, db_column='studentid')

    class Meta:
        managed = False
        db_table = 'educates'
        unique_together = (('teacherid', 'studentid'),)


class feedback(models.Model):

    id = models.AutoField(primary_key=True)
    studentid = models.ForeignKey('Student',models.DO_NOTHING,db_column='studentid',blank=True,null=True)
    teacherid = models.ForeignKey('Teacher',models.DO_NOTHING,db_column='teacherid',  blank=True,null=True)
    class_number = models.ForeignKey('Class',models.DO_NOTHING,db_column='class_number',blank=True,null=True)
    section = models.IntegerField(blank=True, null=True)
    comment = models.TextField(blank=True, null=True)
    letter = models.ForeignKey('final_grade',models.DO_NOTHING,db_column='letter',blank=True,null=True)

    class Meta:
        managed = False
        db_table = 'feedback'
        unique_together = (('teacherid', 'class_number', 'section', 'studentid'),)


class final_grade(models.Model):
    letter = models.CharField(primary_key=True, max_length=45)
    word = models.CharField(max_length=45, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'final_grade'



class individual_progress_plan(models.Model):
    teacherid = models.OneToOneField('Teacher', models.DO_NOTHING, db_column='teacherid', primary_key=True)  # The composite primary key (teacherid, studentid) found, that is not supported. The first column is selected.
    studentid = models.ForeignKey('Student', models.DO_NOTHING, db_column='studentid')
    goals = models.TextField(blank=True, null=True)
    specified_disability = models.CharField(max_length=45, blank=True, null=True)
    educational_aids = models.CharField(max_length=45, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'individual_progress_plan'
        unique_together = (('teacherid', 'studentid'),)


class includes(models.Model):
        id = models.AutoField(primary_key=True)
        class_number = models.ForeignKey('Class', models.DO_NOTHING, db_column='class_number')
        section = models.IntegerField(blank=True, null=True)
        studentid = models.ForeignKey('Student', models.DO_NOTHING, db_column='studentid', blank=True, null=True)
        
        class Meta:
            managed = False
            db_table = 'includes'
            unique_together = (('class_number', 'section', 'studentid'),)


class recieves_feedback(models.Model):

    id = models.AutoField(primary_key=True)

    teacherid = models.ForeignKey('Teacher', models.DO_NOTHING, db_column='teacherid',blank=True, null=True )
    studentid = models.ForeignKey('Student',models.DO_NOTHING, db_column='studentid',blank=True, null=True)
    classnumber = models.ForeignKey( 'Class', models.DO_NOTHING, db_column='class_number',blank=True, null=True)
    section = models.ForeignKey('Class', models.DO_NOTHING, db_column='section', related_name='recievesfeedback_section_set',blank=True, null=True)
    letter = models.ForeignKey( 'final_grade', models.DO_NOTHING, db_column='letter', blank=True, null=True )

    class Meta:
        managed = False
        db_table = 'recieves_feedback'



class recieves_grade(models.Model):

    id = models.AutoField(primary_key=True)

    letter = models.ForeignKey('final_grade', models.DO_NOTHING, db_column='letter', blank=True, null=True)
    studentid = models.ForeignKey('Student',models.DO_NOTHING,db_column='studentid',blank=True, null=True)
    class_number = models.ForeignKey('Class',models.DO_NOTHING,db_column='class_number',blank=True, null=True)
    section = models.ForeignKey('Class',models.DO_NOTHING,db_column='section',related_name='recievesgrade_section_set',blank=True, null=True)

    class Meta: 
        managed = False,
        db_table = 'recieves_grade'


class Schedule(models.Model):
    schedule_id = models.IntegerField(primary_key=True)
    class_number_id = models.IntegerField(blank=True, null=True)
    section_id = models.IntegerField(blank=True, null=True)
    homeroom_id = models.IntegerField(blank=True, null=True)
    math_id  = models.IntegerField(blank=True, null=True)
    science_id  = models.IntegerField(blank=True, null=True)
    english_id  = models.IntegerField(blank=True, null=True)
    social_studies_id = models.IntegerField(blank=True, null=True)
    gym_id  = models.IntegerField(blank=True, null=True)
    music_id = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'schedule'


class scheduled(models.Model):

    roomid = models.OneToOneField('class_room', models.DO_NOTHING, db_column='roomid', primary_key=True)
    studentid = models.ForeignKey('Student',models.DO_NOTHING,db_column='studentid',blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'scheduled'
        unique_together = (('roomid', 'studentid'),)

        
class School_member(models.Model):
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
            "first_name": self.first_name,
            "last_name": self.last_name,
            "phone_number": self.phone_number,
            "email": self.email,
            "date_of_birth": self.date_of_birth
        }
    
    class Meta:
        managed = False
        db_table = 'school_member'

class Student(models.Model):
    studentid = models.OneToOneField(School_member, models.DO_NOTHING, db_column='studentid', primary_key=True)
    scheduleid = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'student'


class Teacher(models.Model):
    teacherid = models.OneToOneField(School_member, models.DO_NOTHING, db_column='teacherid', primary_key=True)

    def to_dict(self):
        return self.teacherid.to_dict()

    class Meta:
        managed = False
        db_table = 'teacher'
