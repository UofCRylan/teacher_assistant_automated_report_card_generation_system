from django.test import TestCase

# tests.py
from django.test import TestCase, Client
from django.urls import reverse
from .models import (
    Address, Assigned, Attendance, AuthGroup, AuthGroupPermissions,
    AuthPermission, AuthUser, AuthUserGroups, AuthUserUserPermissions, Class,
    ClassRoom, DjangoAdminLog, DjangoContentType, DjangoMigrations, DjangoSession,
    Educates, Feedback, FinalGrade, Includes, IndividualProgressPlan,
    RecievesFeedback, RecievesGrade, Schedule, Scheduled, SchoolMember,
    Student, Teacher
)
import json


class MyDatabaseTests(TestCase):
    """
    Tests each endpoint with a basic POST (create) and GET (list).
    Assumes you've set up URLs like:
      path('address/', views.address_view, name='address_view')
      path('assigned/', views.assigned_view, name='assigned_view')
      ... etc.
    And that your main urls.py includes them at /api/.
    """

    def setUp(self):
        self.client = Client()  # Django test client
        self.address_url = '/api/address/'
        self.assigned_url = '/api/assigned/'
        self.attendance_url = '/api/attendance/'
        self.authgroup_url = '/api/authgroup/'
        self.authgrouppermissions_url = '/api/authgrouppermissions/'
        self.authpermission_url = '/api/authpermission/'
        self.authuser_url = '/api/authuser/'
        self.authusergroups_url = '/api/authusergroups/'
        self.authuseruserpermissions_url = '/api/authuseruserpermissions/'
        self.class_url = '/api/class/'
        self.classroom_url = '/api/classroom/'

    def test_create_address(self):
        data = {
            "id_id": 100,            # Assuming this is the ID you want to set
            "street_name": "Main St",
            "street_number": 123,
            "city": "Calgary",
            "province": "AB",
            "postal_code": "T2N1N4"
        }
        response = self.client.post(
            self.address_url,
            data=json.dumps(data),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 201, msg=response.content)

        # Check the DB
        self.assertTrue(Address.objects.filter(id_id=100).exists())
        addr = Address.objects.get(id_id=100)
        self.assertEqual(addr.street_name, "Main St")
        self.assertEqual(addr.street_number, 123)

    def test_list_address(self):
        # Create a sample address
        Address.objects.create(id_id=200, street_name="Test Ave")
        response = self.client.get(self.address_url)
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.content)
        # Confirm the record is in the returned list
        self.assertTrue(any(d['id_id'] == 200 for d in data))


    # Assigned Tests

    def test_create_assigned(self):
        data = {
            "class_number_id": 10,
            "section_id": 1,
            "student_id": 5
        }
        response = self.client.post(
            '/api/assigned/',
            data=json.dumps(data),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 201, msg=response.content)
        self.assertTrue(Assigned.objects.filter(class_number_id=10, section_id=1, student_id=5).exists())

  
    # Attendance Tests

    def test_create_attendance(self):
        data = {
            "class_number_id": 30,
            "section_id": 2,
            "teacherid_id": 99,
            "studentid_id": 10,
            "date": "2025-04-01",
            "status": "Present"
        }
        response = self.client.post(
            '/api/attendance/',
            data=json.dumps(data),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 201)
        self.assertTrue(Attendance.objects.filter(class_number_id=30, section_id=2, teacherid_id=99, studentid_id=10).exists())

 
    # AuthGroup Tests

    def test_create_authgroup(self):
        data = {"name": "test_group"}
        response = self.client.post('/api/authgroup/', data=json.dumps(data), content_type='application/json')
        self.assertEqual(response.status_code, 201)
        self.assertTrue(AuthGroup.objects.filter(name="test_group").exists())


    def test_create_authpermission(self):
        data = {
            "name": "Test Permission",
            "content_type_id": 1,
            "codename": "test_permission_code"
        }
        response = self.client.post('/api/authpermission/', json.dumps(data), content_type='application/json')
        self.assertEqual(response.status_code, 201)
        self.assertTrue(AuthPermission.objects.filter(name="Test Permission").exists())

    def test_create_authuser(self):
        data = {
            "password": "testpass123",
            "last_login": None,
            "is_superuser": 0,
            "username": "john_doe",
            "first_name": "John",
            "last_name": "Doe",
            "email": "john@example.com",
            "is_staff": 1,
            "is_active": 1,
            "date_joined": "2025-01-01 00:00:00"
        }
        r = self.client.post('/api/authuser/', json.dumps(data), content_type='application/json')
        self.assertEqual(r.status_code, 201)
        self.assertTrue(AuthUser.objects.filter(username="john_doe").exists())

    def test_create_authusergroups(self):
        data = {
            "user_id": 1,
            "group_id": 1
        }
        r = self.client.post('/api/authusergroups/', json.dumps(data), content_type='application/json')
        self.assertEqual(r.status_code, 201)
        self.assertTrue(AuthUserGroups.objects.filter(user_id=1, group_id=1).exists())

    def test_create_authuseruserpermissions(self):
        data = {
            "user_id": 1,
            "permission_id": 2
        }
        r = self.client.post('/api/authuseruserpermissions/', json.dumps(data), content_type='application/json')
        self.assertEqual(r.status_code, 201)
        self.assertTrue(AuthUserUserPermissions.objects.filter(user_id=1, permission_id=2).exists())

    def test_create_class(self):
        data = {
            "class_number": 50,
            "section": 1,
            "subject": "Math",
            "time_start": "08:00",
            "time_end": "09:00",
            "class_name": "Grade 2A Math",
            "room_id": None,
            "teacher_id": None
        }
        r = self.client.post('/api/class/', json.dumps(data), content_type='application/json')
        self.assertEqual(r.status_code, 201)
        self.assertTrue(Class.objects.filter(class_number=50).exists())

    def test_create_classroom(self):
        data = {
            "roomid": 999,
            "capacity": 30,
            "building": "A",
            "room_number": "123"
        }
        r = self.client.post('/api/classroom/', json.dumps(data), content_type='application/json')
        self.assertEqual(r.status_code, 201)
        self.assertTrue(ClassRoom.objects.filter(roomid=999).exists())

    def test_create_djangoadminlog(self):
        data = {
            "action_time": "2025-04-01 12:00:00",
            "object_id": "123",
            "object_repr": "TestRepr",
            "action_flag": 1,
            "change_message": "Created via test",
            "content_type_id": None,
            "user_id": None
        }
        r = self.client.post('/api/djangoadminlog/', json.dumps(data), content_type='application/json')
        self.assertEqual(r.status_code, 201)
        self.assertTrue(DjangoAdminLog.objects.filter(object_id="123").exists())

    def test_create_djangocontenttype(self):
        data = {
            "app_label": "myapp",
            "model": "mymodel"
        }
        r = self.client.post('/api/djangocontenttype/', json.dumps(data), content_type='application/json')
        self.assertEqual(r.status_code, 201)
        self.assertTrue(DjangoContentType.objects.filter(app_label="myapp", model="mymodel").exists())

    def test_create_djangomigrations(self):
        data = {
            "app": "school_app",
            "name": "0002_auto",
            "applied": "2025-04-01 00:00:00"
        }
        r = self.client.post('/api/djangomigrations/', json.dumps(data), content_type='application/json')
        self.assertEqual(r.status_code, 201)
        self.assertTrue(DjangoMigrations.objects.filter(app="school_app", name="0002_auto").exists())

    def test_create_djangosession(self):
        data = {
            "session_key": "abc123",
            "session_data": "testdata",
            "expire_date": "2025-04-02 00:00:00"
        }
        r = self.client.post('/api/djangosession/', json.dumps(data), content_type='application/json')
        self.assertEqual(r.status_code, 201)
        self.assertTrue(DjangoSession.objects.filter(session_key="abc123").exists())

    def test_create_educates(self):
        data = {
            "teacherid_id": 10,
            "studentid_id": 20
        }
        r = self.client.post('/api/educates/', json.dumps(data), content_type='application/json')
        self.assertEqual(r.status_code, 201)
        self.assertTrue(Educates.objects.filter(teacherid_id=10, studentid_id=20).exists())

    def test_create_feedback(self):
        data = {
            "teacherid_id": 10,
            "studentid_id": 20,
            "classnumber_id": 50,
            "section_id": 1,
            "letter_id": "A",
            "comment": "Great job!"
        }
        r = self.client.post('/api/feedback/', json.dumps(data), content_type='application/json')
        self.assertEqual(r.status_code, 201)
        self.assertTrue(Feedback.objects.filter(teacherid_id=10, studentid_id=20, classnumber_id=50).exists())

    def test_create_finalgrade(self):
        data = {
            "letter": "B+",
            "word": "Good"
        }
        r = self.client.post('/api/finalgrade/', json.dumps(data), content_type='application/json')
        self.assertEqual(r.status_code, 201)
        self.assertTrue(FinalGrade.objects.filter(letter="B+").exists())

    def test_create_includes(self):
        data = {
            "studentid_id": 5,
            "section_id": 1,
            "class_number_id": 50
        }
        r = self.client.post('/api/includes/', json.dumps(data), content_type='application/json')
        self.assertEqual(r.status_code, 201)
        self.assertTrue(Includes.objects.filter(studentid_id=5, section_id=1, class_number_id=50).exists())

    def test_create_individualprogressplan(self):
        data = {
            "teacherid_id": 10,
            "studentid_id": 20,
            "goals": "Improve reading",
            "specified_disability": "Dyslexia",
            "educational_aids": "Audio books"
        }
        r = self.client.post('/api/individualprogressplan/', json.dumps(data), content_type='application/json')
        self.assertEqual(r.status_code, 201)
        self.assertTrue(IndividualProgressPlan.objects.filter(teacherid_id=10, studentid_id=20).exists())

    def test_create_recievesfeedback(self):
        data = {
            "teacherid_id": 10,
            "studentid_id": 20,
            "classnumber_id": 50,
            "section_id": 1,
            "letter_id": "A"
        }
        r = self.client.post('/api/recievesfeedback/', json.dumps(data), content_type='application/json')
        self.assertEqual(r.status_code, 201)
        self.assertTrue(RecievesFeedback.objects.filter(teacherid_id=10, studentid_id=20).exists())

    def test_create_recievesgrade(self):
        data = {
            "letter_id": "A",
            "studentid_id": 20,
            "class_number_id": 50,
            "section_id": 1
        }
        r = self.client.post('/api/recievesgrade/', json.dumps(data), content_type='application/json')
        self.assertEqual(r.status_code, 201)
        self.assertTrue(RecievesGrade.objects.filter(letter_id="A", studentid_id=20).exists())

    def test_create_schedule(self):
        data = {
            "schedule_id": 999,
            "class_number_id": 50,
            "section_id": 1,
            "homeroom_id": None,
            "math_id": None,
            "science_id": None,
            "english_id": None,
            "social_studies_id": None,
            "gym_id": None,
            "music_id": None
        }
        r = self.client.post('/api/schedule/', json.dumps(data), content_type='application/json')
        self.assertEqual(r.status_code, 201)
        self.assertTrue(Schedule.objects.filter(schedule_id=999).exists())

    def test_create_scheduled(self):
        data = {
            "roomid_id": 999,
            "studentid_id": 5
        }
        r = self.client.post('/api/scheduled/', json.dumps(data), content_type='application/json')
        self.assertEqual(r.status_code, 201)
        self.assertTrue(Scheduled.objects.filter(roomid_id=999, studentid_id=5).exists())

    def test_create_schoolmember(self):
        data = {
            "id": 1000,
            "phone_number": "555-1234",
            "first_name": "Jane",
            "last_name": "Doe",
            "date_of_birth": "2000-01-01",
            "email": "jane@example.com",
            "password": "mypassword"
        }
        r = self.client.post('/api/schoolmember/', json.dumps(data), content_type='application/json')
        self.assertEqual(r.status_code, 201)
        self.assertTrue(SchoolMember.objects.filter(id=1000).exists())

    def test_create_student(self):
        data = {
            "studentid_id": 1000,
            "scheduleid": 1
        }
        r = self.client.post('/api/student/', json.dumps(data), content_type='application/json')
        self.assertEqual(r.status_code, 201)
        self.assertTrue(Student.objects.filter(studentid_id=1000).exists())

    def test_create_teacher(self):
        data = {
            "teacherid_id": 1000
        }
        r = self.client.post('/api/teacher/', json.dumps(data), content_type='application/json')
        self.assertEqual(r.status_code, 201)
        self.assertTrue(Teacher.objects.filter(teacherid_id=1000).exists())
