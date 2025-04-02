from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json

# Import all your models:
from .models import (
    Address,
    Assigned,
    Attendance,
    AuthGroup,
    AuthGroupPermissions,
    AuthPermission,
    AuthUser,
    AuthUserGroups,
    AuthUserUserPermissions,
    Class,
    ClassRoom,
    DjangoAdminLog,
    DjangoContentType,
    DjangoMigrations,
    DjangoSession,
    Educates,
    Feedback,
    FinalGrade,
    Includes,
    IndividualProgressPlan,
    RecievesFeedback,
    RecievesGrade,
    Schedule,
    Scheduled,
    SchoolMember,
    Student,
    Teacher,
)


# A helper to parse JSON or fallback to request.POST for form data
def parse_request_data(request):
    try:
        return json.loads(request.body.decode('utf-8'))
    except:
        return request.POST.dict()



# 1) Address
@csrf_exempt
def address_view(request):
    """
    POST -> create (or update) an Address record
    GET  -> list all Address records
    """
    if request.method == 'POST':
        data = parse_request_data(request)

        address_obj = Address(
            # OneToOne primary key to SchoolMember => id_id
            id_id         = data.get('id_id'),
            street_name   = data.get('street_name'),
            street_number = data.get('street_number'),
            city          = data.get('city'),
            province      = data.get('province'),
            postal_code   = data.get('postal_code'),
        )
        address_obj.save(force_insert=True)  # For a brand-new row

        return JsonResponse({'message': 'Address created'}, status=201)

    elif request.method == 'GET':
        addresses = list(Address.objects.values())
        return JsonResponse(addresses, safe=False, status=200)

    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)



# 2) Assigned
@csrf_exempt
def assigned_view(request):
    """
    POST -> create an 'Assigned' record
    GET  -> list
    """
    if request.method == 'POST':
        data = parse_request_data(request)

        assigned_obj = Assigned(
            class_number_id = data.get('class_number_id'),
            section_id      = data.get('section_id'),
            student_id      = data.get('student_id'),
        )
        assigned_obj.save(force_insert=True)
        return JsonResponse({'message': 'Assigned created'}, status=201)

    elif request.method == 'GET':
        assigned_list = list(Assigned.objects.values())
        return JsonResponse(assigned_list, safe=False, status=200)

    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)



# 3) Attendance

@csrf_exempt
def attendance_view(request):
    """
    POST -> create attendance
    GET  -> list
    """
    if request.method == 'POST':
        data = parse_request_data(request)

        att_obj = Attendance(
            class_number_id = data.get('class_number_id'),
            section_id      = data.get('section_id'),
            teacherid_id    = data.get('teacherid_id'),
            studentid_id    = data.get('studentid_id'),
            date            = data.get('date'),
            status          = data.get('status'),
        )
        att_obj.save(force_insert=True)
        return JsonResponse({'message': 'Attendance row created'}, status=201)

    elif request.method == 'GET':
        all_att = list(Attendance.objects.values())
        return JsonResponse(all_att, safe=False, status=200)

    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)



# 4) AuthGroup

@csrf_exempt
def authgroup_view(request):
    """
    POST -> create an AuthGroup (name)
    GET  -> list
    """
    if request.method == 'POST':
        data = parse_request_data(request)

        grp = AuthGroup(name=data.get('name', 'default_group'))
        grp.save(force_insert=True)
        return JsonResponse({'message': 'AuthGroup created'}, status=201)

    elif request.method == 'GET':
        groups = list(AuthGroup.objects.values())
        return JsonResponse(groups, safe=False, status=200)

    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)


# 5) AuthGroupPermissions

@csrf_exempt
def authgrouppermissions_view(request):
    """
    POST -> create group-permission link
    GET  -> list
    """
    if request.method == 'POST':
        data = parse_request_data(request)

        grp_perm = AuthGroupPermissions(
            group_id      = data.get('group_id'),
            permission_id = data.get('permission_id'),
        )
        grp_perm.save(force_insert=True)
        return JsonResponse({'message': 'AuthGroupPermissions created'}, status=201)

    elif request.method == 'GET':
        gp = list(AuthGroupPermissions.objects.values())
        return JsonResponse(gp, safe=False, status=200)

    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)



# 6) AuthPermission

@csrf_exempt
def authpermission_view(request):
    """
    POST -> create permission
    GET  -> list
    """
    if request.method == 'POST':
        data = parse_request_data(request)

        perm = AuthPermission(
            name = data.get('name'),
            content_type_id = data.get('content_type_id'),
            codename = data.get('codename'),
        )
        perm.save(force_insert=True)
        return JsonResponse({'message': 'AuthPermission created'}, status=201)

    elif request.method == 'GET':
        perms = list(AuthPermission.objects.values())
        return JsonResponse(perms, safe=False, status=200)

    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)


# 7) AuthUser

@csrf_exempt
def authuser_view(request):
    """
    POST -> create user
    GET  -> list users
    """
    if request.method == 'POST':
        data = parse_request_data(request)

        usr = AuthUser(
            password      = data.get('password'),
            last_login    = data.get('last_login'),
            is_superuser  = data.get('is_superuser', 0),
            username      = data.get('username'),
            first_name    = data.get('first_name'),
            last_name     = data.get('last_name'),
            email         = data.get('email'),
            is_staff      = data.get('is_staff', 0),
            is_active     = data.get('is_active', 1),
            date_joined   = data.get('date_joined')
        )
        usr.save(force_insert=True)
        return JsonResponse({'message': 'AuthUser created'}, status=201)

    elif request.method == 'GET':
        users = list(AuthUser.objects.values())
        return JsonResponse(users, safe=False, status=200)

    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)



# 8) AuthUserGroups

@csrf_exempt
def authusergroups_view(request):
    """
    POST -> user-group membership
    GET  -> list
    """
    if request.method == 'POST':
        data = parse_request_data(request)

        ug = AuthUserGroups(
            user_id  = data.get('user_id'),
            group_id = data.get('group_id'),
        )
        ug.save(force_insert=True)
        return JsonResponse({'message': 'AuthUserGroups created'}, status=201)

    elif request.method == 'GET':
        all_ug = list(AuthUserGroups.objects.values())
        return JsonResponse(all_ug, safe=False, status=200)

    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)



# 9) AuthUserUserPermissions

@csrf_exempt
def authuseruserpermissions_view(request):
    """
    POST -> link user to permission
    GET  -> list
    """
    if request.method == 'POST':
        data = parse_request_data(request)

        up = AuthUserUserPermissions(
            user_id       = data.get('user_id'),
            permission_id = data.get('permission_id'),
        )
        up.save(force_insert=True)
        return JsonResponse({'message': 'AuthUserUserPermissions created'}, status=201)

    elif request.method == 'GET':
        up_list = list(AuthUserUserPermissions.objects.values())
        return JsonResponse(up_list, safe=False, status=200)

    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)



# 10) Class

@csrf_exempt
def class_view(request):
    """
    POST -> create Class
    GET  -> list
    """
    if request.method == 'POST':
        data = parse_request_data(request)

        cl = Class(
            class_number = data.get('class_number'),
            section      = data.get('section'),
            subject      = data.get('subject'),
            time_start   = data.get('time_start'),
            time_end     = data.get('time_end'),
            class_name   = data.get('class_name'),
            room_id      = data.get('room_id'),
            teacher_id   = data.get('teacher_id'),
        )
        cl.save(force_insert=True)
        return JsonResponse({'message': 'Class created'}, status=201)

    elif request.method == 'GET':
        classes = list(Class.objects.values())
        return JsonResponse(classes, safe=False, status=200)

    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)



# 11) ClassRoom

@csrf_exempt
def classroom_view(request):
    """
    POST -> create ClassRoom
    GET  -> list
    """
    if request.method == 'POST':
        data = parse_request_data(request)

        cr = ClassRoom(
            roomid       = data.get('roomid'),
            capacity     = data.get('capacity'),
            building     = data.get('building'),
            room_number  = data.get('room_number')
        )
        cr.save(force_insert=True)
        return JsonResponse({'message': 'ClassRoom created'}, status=201)

    elif request.method == 'GET':
        rooms = list(ClassRoom.objects.values())
        return JsonResponse(rooms, safe=False, status=200)

    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)



# 12) DjangoAdminLog

@csrf_exempt
def djangoadminlog_view(request):
    """
    POST -> create log entry
    GET  -> list
    """
    if request.method == 'POST':
        data = parse_request_data(request)

        dal = DjangoAdminLog(
            action_time = data.get('action_time'),
            object_id   = data.get('object_id'),
            object_repr = data.get('object_repr'),
            action_flag = data.get('action_flag', 1),
            change_message = data.get('change_message'),
            content_type_id = data.get('content_type_id'),
            user_id = data.get('user_id'),
        )
        dal.save(force_insert=True)
        return JsonResponse({'message': 'DjangoAdminLog created'}, status=201)

    elif request.method == 'GET':
        logs = list(DjangoAdminLog.objects.values())
        return JsonResponse(logs, safe=False, status=200)

    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)



# 13) DjangoContentType

@csrf_exempt
def djangocontenttype_view(request):
    """
    POST -> create content type
    GET  -> list
    """
    if request.method == 'POST':
        data = parse_request_data(request)

        dct = DjangoContentType(
            app_label = data.get('app_label'),
            model     = data.get('model'),
        )
        dct.save(force_insert=True)
        return JsonResponse({'message': 'DjangoContentType created'}, status=201)

    elif request.method == 'GET':
        ct_list = list(DjangoContentType.objects.values())
        return JsonResponse(ct_list, safe=False, status=200)

    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)



# 14) DjangoMigrations

@csrf_exempt
def djangomigrations_view(request):
    """
    POST -> create migration entry
    GET  -> list
    """
    if request.method == 'POST':
        data = parse_request_data(request)

        dm = DjangoMigrations(
            app     = data.get('app'),
            name    = data.get('name'),
            applied = data.get('applied'),
        )
        dm.save(force_insert=True)
        return JsonResponse({'message': 'DjangoMigrations created'}, status=201)

    elif request.method == 'GET':
        mig_list = list(DjangoMigrations.objects.values())
        return JsonResponse(mig_list, safe=False, status=200)

    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)



# 15) DjangoSession

@csrf_exempt
def djangosession_view(request):
    """
    POST -> create session row
    GET  -> list
    """
    if request.method == 'POST':
        data = parse_request_data(request)

        ds = DjangoSession(
            session_key  = data.get('session_key'),
            session_data = data.get('session_data'),
            expire_date  = data.get('expire_date'),
        )
        ds.save(force_insert=True)
        return JsonResponse({'message': 'DjangoSession created'}, status=201)

    elif request.method == 'GET':
        sess_list = list(DjangoSession.objects.values())
        return JsonResponse(sess_list, safe=False, status=200)

    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)



# 16) Educates

@csrf_exempt
def educates_view(request):
    """
    POST -> create record in 'educates'
    GET  -> list
    """
    if request.method == 'POST':
        data = parse_request_data(request)

        edu = Educates(
            teacherid_id = data.get('teacherid_id'),
            studentid_id = data.get('studentid_id'),
        )
        edu.save(force_insert=True)
        return JsonResponse({'message': 'Educates row created'}, status=201)

    elif request.method == 'GET':
        edu_list = list(Educates.objects.values())
        return JsonResponse(edu_list, safe=False, status=200)

    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)



# 17) Feedback

@csrf_exempt
def feedback_view(request):
    """
    POST -> create feedback
    GET  -> list
    """
    if request.method == 'POST':
        data = parse_request_data(request)

        fb = Feedback(
            teacherid_id    = data.get('teacherid_id'),
            studentid_id    = data.get('studentid_id'),
            classnumber_id  = data.get('classnumber_id'),
            section_id      = data.get('section_id'),
            letter_id       = data.get('letter_id'),
            comment         = data.get('comment'),
        )
        fb.save(force_insert=True)
        return JsonResponse({'message': 'Feedback created'}, status=201)

    elif request.method == 'GET':
        fb_list = list(Feedback.objects.values())
        return JsonResponse(fb_list, safe=False, status=200)

    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)



# 18) FinalGrade

@csrf_exempt
def finalgrade_view(request):
    """
    POST -> create final grade
    GET  -> list
    """
    if request.method == 'POST':
        data = parse_request_data(request)

        fg = FinalGrade(
            letter = data.get('letter'),
            word   = data.get('word'),
        )
        fg.save(force_insert=True)
        return JsonResponse({'message': 'FinalGrade created'}, status=201)

    elif request.method == 'GET':
        fg_list = list(FinalGrade.objects.values())
        return JsonResponse(fg_list, safe=False, status=200)

    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)



# 19) Includes

@csrf_exempt
def includes_view(request):
    """
    POST -> create includes
    GET  -> list
    """
    if request.method == 'POST':
        data = parse_request_data(request)

        inc = Includes(
            studentid_id   = data.get('studentid_id'),
            section_id     = data.get('section_id'),
            class_number_id= data.get('class_number_id'),
        )
        inc.save(force_insert=True)
        return JsonResponse({'message': 'Includes created'}, status=201)

    elif request.method == 'GET':
        inc_list = list(Includes.objects.values())
        return JsonResponse(inc_list, safe=False, status=200)

    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)



# 20) IndividualProgressPlan

@csrf_exempt
def individualprogressplan_view(request):
    """
    POST -> create IPP
    GET  -> list
    """
    if request.method == 'POST':
        data = parse_request_data(request)

        ipp = IndividualProgressPlan(
            teacherid_id         = data.get('teacherid_id'),
            studentid_id         = data.get('studentid_id'),
            goals                = data.get('goals'),
            specified_disability = data.get('specified_disability'),
            educational_aids     = data.get('educational_aids'),
        )
        ipp.save(force_insert=True)
        return JsonResponse({'message': 'IndividualProgressPlan created'}, status=201)

    elif request.method == 'GET':
        ipp_list = list(IndividualProgressPlan.objects.values())
        return JsonResponse(ipp_list, safe=False, status=200)

    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)


# 21) RecievesFeedback
@csrf_exempt
def recievesfeedback_view(request):
    """
    POST -> create recieves_feedback
    GET  -> list
    """
    if request.method == 'POST':
        data = parse_request_data(request)

        rf = RecievesFeedback(
            teacherid_id   = data.get('teacherid_id'),
            studentid_id   = data.get('studentid_id'),
            classnumber_id = data.get('classnumber_id'),
            section_id     = data.get('section_id'),
            letter_id      = data.get('letter_id'),
        )
        rf.save(force_insert=True)
        return JsonResponse({'message': 'RecievesFeedback created'}, status=201)

    elif request.method == 'GET':
        rf_list = list(RecievesFeedback.objects.values())
        return JsonResponse(rf_list, safe=False, status=200)

    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)



# 22) RecievesGrade
@csrf_exempt
def recievesgrade_view(request):
    """
    POST -> create recieves_grade
    GET  -> list
    """
    if request.method == 'POST':
        data = parse_request_data(request)

        rg = RecievesGrade(
            letter_id      = data.get('letter_id'),
            studentid_id   = data.get('studentid_id'),
            class_number_id= data.get('class_number_id'),
            section_id     = data.get('section_id'),
        )
        rg.save(force_insert=True)
        return JsonResponse({'message': 'RecievesGrade created'}, status=201)

    elif request.method == 'GET':
        rg_list = list(RecievesGrade.objects.values())
        return JsonResponse(rg_list, safe=False, status=200)

    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)


# 23) Schedule
@csrf_exempt
def schedule_view(request):
    """
    POST -> create schedule
    GET  -> list
    """
    if request.method == 'POST':
        data = parse_request_data(request)

        sch = Schedule(
            schedule_id     = data.get('schedule_id'),
            class_number_id = data.get('class_number_id'),
            section_id      = data.get('section_id'),
            homeroom_id     = data.get('homeroom_id'),
            math_id         = data.get('math_id'),
            science_id      = data.get('science_id'),
            english_id      = data.get('english_id'),
            social_studies_id = data.get('social_studies_id'),
            gym_id          = data.get('gym_id'),
            music_id        = data.get('music_id'),
        )
        sch.save(force_insert=True)
        return JsonResponse({'message': 'Schedule created'}, status=201)

    elif request.method == 'GET':
        sch_list = list(Schedule.objects.values())
        return JsonResponse(sch_list, safe=False, status=200)

    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)


# 24) Scheduled
@csrf_exempt
def scheduled_view(request):
    """
    POST -> create scheduled
    GET  -> list
    """
    if request.method == 'POST':
        data = parse_request_data(request)

        sc = Scheduled(
            roomid_id    = data.get('roomid_id'),
            studentid_id = data.get('studentid_id'),
        )
        sc.save(force_insert=True)
        return JsonResponse({'message': 'Scheduled created'}, status=201)

    elif request.method == 'GET':
        sc_list = list(Scheduled.objects.values())
        return JsonResponse(sc_list, safe=False, status=200)

    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)



# 25) SchoolMember
@csrf_exempt
def schoolmember_view(request):
    """
    POST -> create school_member
    GET  -> list
    """
    if request.method == 'POST':
        data = parse_request_data(request)

        sm = SchoolMember(
            id           = data.get('id'),
            phone_number = data.get('phone_number'),
            first_name   = data.get('first_name'),
            last_name    = data.get('last_name'),
            date_of_birth= data.get('date_of_birth'),
            email        = data.get('email'),
            password     = data.get('password'),
        )
        sm.save(force_insert=True)
        return JsonResponse({'message': 'SchoolMember created'}, status=201)

    elif request.method == 'GET':
        sm_list = list(SchoolMember.objects.values())
        return JsonResponse(sm_list, safe=False, status=200)

    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)


# 26) Student
@csrf_exempt
def student_view(request):
    """
    POST -> create student
    GET  -> list
    """
    if request.method == 'POST':
        data = parse_request_data(request)

        st = Student(
            studentid_id = data.get('studentid_id'),
            scheduleid   = data.get('scheduleid'),
        )
        st.save(force_insert=True)
        return JsonResponse({'message': 'Student created'}, status=201)

    elif request.method == 'GET':
        st_list = list(Student.objects.values())
        return JsonResponse(st_list, safe=False, status=200)

    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)


# 27) Teacher
@csrf_exempt
def teacher_view(request):
    """
    POST -> create teacher
    GET  -> list
    """
    if request.method == 'POST':
        data = parse_request_data(request)

        t = Teacher(
            teacherid_id = data.get('teacherid_id'),
        )
        t.save(force_insert=True)
        return JsonResponse({'message': 'Teacher created'}, status=201)

    elif request.method == 'GET':
        t_list = list(Teacher.objects.values())
        return JsonResponse(t_list, safe=False, status=200)

    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)

