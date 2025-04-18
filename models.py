# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


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


class Assigned(models.Model):
    class_number = models.OneToOneField('Class', models.DO_NOTHING, db_column='class_number', primary_key=True)  # The composite primary key (class_number, section, student_id) found, that is not supported. The first column is selected.
    section = models.ForeignKey('Class', models.DO_NOTHING, db_column='section', to_field='section', related_name='assigned_section_set')
    student = models.ForeignKey('Student', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'assigned'
        unique_together = (('class_number', 'section', 'student'),)


class Attendance(models.Model):
    class_number = models.OneToOneField('Class', models.DO_NOTHING, db_column='class_number', primary_key=True)  # The composite primary key (class_number, section, teacherid, studentid, date) found, that is not supported. The first column is selected.
    section = models.ForeignKey('Class', models.DO_NOTHING, db_column='section', to_field='section', related_name='attendance_section_set')
    teacherid = models.ForeignKey('Teacher', models.DO_NOTHING, db_column='teacherid')
    studentid = models.ForeignKey('Student', models.DO_NOTHING, db_column='studentid')
    date = models.DateField()
    status = models.CharField(max_length=45, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'attendance'
        unique_together = (('class_number', 'section', 'teacherid', 'studentid', 'date'),)


class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=150)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


class AuthUser(models.Model):
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


class AuthUserGroups(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user', 'group'),)


class AuthUserUserPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user', 'permission'),)


class Class(models.Model):
    class_number = models.IntegerField(primary_key=True)  # The composite primary key (class_number, section) found, that is not supported. The first column is selected.
    section = models.IntegerField()
    subject = models.CharField(max_length=45, blank=True, null=True)
    time_start = models.CharField(max_length=45, blank=True, null=True)
    time_end = models.CharField(max_length=45, blank=True, null=True)
    class_name = models.CharField(max_length=45, blank=True, null=True)
    room = models.ForeignKey('ClassRoom', models.DO_NOTHING, blank=True, null=True)
    teacher = models.ForeignKey('Teacher', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'class'
        unique_together = (('class_number', 'section'),)


class ClassRoom(models.Model):
    roomid = models.IntegerField(primary_key=True)
    capacity = models.IntegerField(blank=True, null=True)
    building = models.CharField(max_length=45, blank=True, null=True)
    room_number = models.CharField(max_length=45, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'class_room'


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.PositiveSmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    id = models.BigAutoField(primary_key=True)
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'


class Educates(models.Model):
    teacherid = models.OneToOneField('Teacher', models.DO_NOTHING, db_column='teacherid', primary_key=True)  # The composite primary key (teacherid, studentid) found, that is not supported. The first column is selected.
    studentid = models.ForeignKey('Student', models.DO_NOTHING, db_column='studentid')

    class Meta:
        managed = False
        db_table = 'educates'
        unique_together = (('teacherid', 'studentid'),)


class Feedback(models.Model):
    teacherid = models.OneToOneField('Teacher', models.DO_NOTHING, db_column='teacherid', primary_key=True)  # The composite primary key (teacherid, studentid, classnumber, section, letter) found, that is not supported. The first column is selected.
    studentid = models.ForeignKey('Student', models.DO_NOTHING, db_column='studentid')
    classnumber = models.ForeignKey(Class, models.DO_NOTHING, db_column='classnumber')
    section = models.ForeignKey(Class, models.DO_NOTHING, db_column='section', to_field='section', related_name='feedback_section_set')
    letter = models.ForeignKey('FinalGrade', models.DO_NOTHING, db_column='letter')
    comment = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'feedback'
        unique_together = (('teacherid', 'studentid', 'classnumber', 'section', 'letter'),)


class FinalGrade(models.Model):
    letter = models.CharField(primary_key=True, max_length=45)
    word = models.CharField(max_length=45, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'final_grade'


class Includes(models.Model):
    studentid = models.OneToOneField('Student', models.DO_NOTHING, db_column='studentid', primary_key=True)  # The composite primary key (studentid, section, class_number) found, that is not supported. The first column is selected.
    section = models.ForeignKey(Class, models.DO_NOTHING, db_column='section', to_field='section')
    class_number = models.ForeignKey(Class, models.DO_NOTHING, db_column='class_number', related_name='includes_class_number_set')

    class Meta:
        managed = False
        db_table = 'includes'
        unique_together = (('studentid', 'section', 'class_number'),)


class IndividualProgressPlan(models.Model):
    teacherid = models.OneToOneField('Teacher', models.DO_NOTHING, db_column='teacherid', primary_key=True)  # The composite primary key (teacherid, studentid) found, that is not supported. The first column is selected.
    studentid = models.ForeignKey('Student', models.DO_NOTHING, db_column='studentid')
    goals = models.TextField(blank=True, null=True)
    specified_disability = models.CharField(max_length=45, blank=True, null=True)
    educational_aids = models.CharField(max_length=45, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'individual_progress_plan'
        unique_together = (('teacherid', 'studentid'),)


class RecievesFeedback(models.Model):
    teacherid = models.OneToOneField(Feedback, models.DO_NOTHING, db_column='teacherid', primary_key=True)  # The composite primary key (teacherid, studentid, classnumber, section, letter) found, that is not supported. The first column is selected.
    studentid = models.ForeignKey(Feedback, models.DO_NOTHING, db_column='studentid', to_field='studentid', related_name='recievesfeedback_studentid_set')
    classnumber = models.ForeignKey(Feedback, models.DO_NOTHING, db_column='classnumber', to_field='classnumber', related_name='recievesfeedback_classnumber_set')
    section = models.ForeignKey(Feedback, models.DO_NOTHING, db_column='section', to_field='section', related_name='recievesfeedback_section_set')
    letter = models.ForeignKey(Feedback, models.DO_NOTHING, db_column='letter', to_field='letter', related_name='recievesfeedback_letter_set')

    class Meta:
        managed = False
        db_table = 'recieves_feedback'
        unique_together = (('teacherid', 'studentid', 'classnumber', 'section', 'letter'),)


class RecievesGrade(models.Model):
    letter = models.OneToOneField(FinalGrade, models.DO_NOTHING, db_column='letter', primary_key=True)  # The composite primary key (letter, studentid, class_number, section) found, that is not supported. The first column is selected.
    studentid = models.ForeignKey('Student', models.DO_NOTHING, db_column='studentid')
    class_number = models.ForeignKey(Class, models.DO_NOTHING, db_column='class_number')
    section = models.ForeignKey(Class, models.DO_NOTHING, db_column='section', to_field='section', related_name='recievesgrade_section_set')

    class Meta:
        managed = False
        db_table = 'recieves_grade'
        unique_together = (('letter', 'studentid', 'class_number', 'section'),)


class Schedule(models.Model):
    schedule_id = models.AutoField(primary_key=True)
    class_number = models.ForeignKey(Class, models.DO_NOTHING, db_column='class_number')
    section = models.ForeignKey(Class, models.DO_NOTHING, db_column='section', to_field='section', related_name='schedule_section_set')
    homeroom = models.ForeignKey(Class, models.DO_NOTHING, db_column='Homeroom', related_name='schedule_homeroom_set', blank=True, null=True)  # Field name made lowercase.
    math = models.ForeignKey(Class, models.DO_NOTHING, db_column='Math', related_name='schedule_math_set', blank=True, null=True)  # Field name made lowercase.
    science = models.ForeignKey(Class, models.DO_NOTHING, db_column='Science', related_name='schedule_science_set', blank=True, null=True)  # Field name made lowercase.
    english = models.ForeignKey(Class, models.DO_NOTHING, db_column='English', related_name='schedule_english_set', blank=True, null=True)  # Field name made lowercase.
    social_studies = models.ForeignKey(Class, models.DO_NOTHING, db_column='Social_Studies', related_name='schedule_social_studies_set', blank=True, null=True)  # Field name made lowercase.
    gym = models.ForeignKey(Class, models.DO_NOTHING, db_column='Gym', related_name='schedule_gym_set', blank=True, null=True)  # Field name made lowercase.
    music = models.ForeignKey(Class, models.DO_NOTHING, db_column='Music', related_name='schedule_music_set', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'schedule'


class Scheduled(models.Model):
    roomid = models.OneToOneField(ClassRoom, models.DO_NOTHING, db_column='roomid', primary_key=True)  # The composite primary key (roomid, studentid) found, that is not supported. The first column is selected.
    studentid = models.ForeignKey('Student', models.DO_NOTHING, db_column='studentid')

    class Meta:
        managed = False
        db_table = 'scheduled'
        unique_together = (('roomid', 'studentid'),)


class SchoolMember(models.Model):
    id = models.IntegerField(primary_key=True)
    phone_number = models.CharField(max_length=45, blank=True, null=True)
    first_name = models.CharField(max_length=45, blank=True, null=True)
    last_name = models.CharField(max_length=45, blank=True, null=True)
    date_of_birth = models.DateField(blank=True, null=True)
    email = models.CharField(max_length=45, blank=True, null=True)
    password = models.CharField(max_length=45, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'school_member'


class Student(models.Model):
    studentid = models.OneToOneField(SchoolMember, models.DO_NOTHING, db_column='studentid', primary_key=True)
    scheduleid = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'student'


class Teacher(models.Model):
    teacherid = models.OneToOneField(SchoolMember, models.DO_NOTHING, db_column='teacherid', primary_key=True)

    class Meta:
        managed = False
        db_table = 'teacher'
