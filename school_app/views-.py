from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json

# Import all your models:
from .models import (
    address,
    assigned,
    attendance,
    auth_group,
    auth_group_permissions,
    auth_permission,
    auth_user,
    auth_user_groups,
    auth_user_user_permissions,
    Class,
    class_room,
    django_admin_log,
    django_content_type,
    django_migrations,
    django_session,
    educates,
    feedback,
    final_grade,
    includes,
    individual_progress_plan,
    recieves_feedback,
    recieves_grade,
    schedule,
    scheduled,
    school_member,
    student,
    teacher,
)


# A helper to parse JSON or fallback to request.POST for form data
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json
from .models import address



def parse_request_data(request):
    try:
        return json.loads(request.body.decode('utf-8'))
    except:
        return request.POST.dict()

@csrf_exempt
def auth(request):
    if request.method == 'POST':
        data = parse_request_data(request)
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def auth(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        email = data.get('email')
        password = data.get('password')
        
        if not email or not password:
            return JsonResponse({'error': 'Email and password are required'}, status=400)
        
        # Check if user exists with this email and password
        try:
            member = school_member.objects.get(email=email, password=password)
            
            # Check if the member is a student or teacher
            user_type = None
            user_id = None
            
            try:
                student.objects.get(studentid=member.id)
                user_type = 'student'
                user_id = member.id
            except student.DoesNotExist:
                pass
            
            try:
                teacher.objects.get(teacherid=member.id)
                user_type = 'teacher'
                user_id = member.id
            except teacher.DoesNotExist:
                pass
            
            if user_type:
                return JsonResponse({
                    'success': True,
                    'user_type': user_type,
                    'user_id': user_id,
                    'first_name': member.first_name,
                    'last_name': member.last_name
                })
            else:
                return JsonResponse({'error': 'User is not registered as student or teacher'}, status=403)
                
        except school_member.DoesNotExist:
            return JsonResponse({'error': 'Invalid email or password'}, status=401)

@csrf_exempt
def address_view(request):
    if request.method == 'POST':
        data = parse_request_data(request)
        address_obj = address(
            id_id = data.get('id_id'),        
            street_name = data.get('street_name'),
            street_number = data.get('street_number'),
            city = data.get('city'),
            province = data.get('province'),
            postal_code = data.get('postal_code'),
        )
        address_obj.save()
        return JsonResponse({"message": "Address created"}, status=201)

    elif request.method == 'GET':
        all_addresses = list(address.objects.values())
        return JsonResponse(all_addresses, safe=False, status=200)

    return JsonResponse({"error": "Method not allowed"}, status=405)


# 2) Assigned
@csrf_exempt
def assigned_view(request):
    if request.method == 'POST':
        data = parse_request_data(request)

        assigned_obj = assigned(
            class_number_id = data.get('class_number_id'),  
            section_id = data.get('section_id'),       
            student_id = data.get('student_id'),       
        )
        assigned_obj.save(force_insert=True)
        return JsonResponse({'message': 'Assigned created'}, status=201)

    elif request.method == 'GET':
        assigned_list = list(assigned.objects.values())
        return JsonResponse(assigned_list, safe=False, status=200)

    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)

# 3) Attendance
def attendance_view(request):
    
    if request.method == 'POST':
        data = parse_request_data(request)
        section_val = data.get('section')
        if section_val is None:
            return HttpResponseBadRequest("Missing 'section'. This field cannot be null.")

        date_val = data.get('date') 
        if date_val is None:
            return HttpResponseBadRequest("Missing 'date'.")
        
        status_val = data.get('status')  

        att_obj = attendance(
            section=section_val,
            date=date_val,
            status=status_val )
        att_obj.save()  

        return JsonResponse({"message": "Attendance created"}, status=201)

    elif request.method == 'GET':
        all_attendance = list(attendance.objects.values())
        return JsonResponse(all_attendance, safe=False, status=200)

    return JsonResponse({"error": "Method not allowed"}, status=405)

# 4) AuthGroup

@csrf_exempt
def authgroup_view(request):
    """
    POST -> create an auth_group row
    GET  -> list all auth_group rows
    """
    if request.method == 'POST':
        data = parse_request_data(request)
        grp = auth_group(name=data.get('name', 'DefaultGroup'))
        grp.save(force_insert=True)  # or just grp.save() if you like
        return JsonResponse({'message': 'AuthGroup created'}, status=201)

    elif request.method == 'GET':
        groups = list(auth_group.objects.values())
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

        grp_perm = auth_group_permissions(
            group_id = data.get('group_id'),
            permission_id = data.get('permission_id'),
        )
        grp_perm.save(force_insert=True)
        return JsonResponse({'message': 'AuthGroupPermissions created'}, status=201)

    elif request.method == 'GET':
        gp = list(auth_group_permissions.objects.values())
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

        perm = auth_permission(
            name = data.get('name'),
            content_type_id = data.get('content_type_id'),
            codename = data.get('codename'),
        )
        perm.save(force_insert=True)
        return JsonResponse({'message': 'AuthPermission created'}, status=201)

    elif request.method == 'GET':
        perms = list(auth_permission.objects.values())
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

        usr = auth_user(
            password = data.get('password'),
            last_login = data.get('last_login'),
            is_superuser = data.get('is_superuser', 0),
            username = data.get('username'),
            first_name = data.get('first_name'),
            last_name = data.get('last_name'),
            email = data.get('email'),
            is_staff = data.get('is_staff', 0),
            is_active = data.get('is_active', 1),
            date_joined = data.get('date_joined')
        )
        usr.save(force_insert=True)
        return JsonResponse({'message': 'AuthUser created'}, status=201)

    elif request.method == 'GET':
        users = list(auth_user.objects.values())
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

        ug = auth_user_groups(
            user_id = data.get('user_id'),
            group_id = data.get('group_id'),
        )
        ug.save(force_insert=True)
        return JsonResponse({'message': 'AuthUserGroups created'}, status=201)

    elif request.method == 'GET':
        all_ug = list(auth_user_groups.objects.values())
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

        up = auth_user_user_permissions(
            user_id = data.get('user_id'),
            permission_id = data.get('permission_id'),
        )
        up.save(force_insert=True)
        return JsonResponse({'message': 'AuthUserUserPermissions created'}, status=201)

    elif request.method == 'GET':
        up_list = list(auth_user_user_permissions.objects.values())
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
            section = data.get('section'),
            subject = data.get('subject'),
            time_start = data.get('time_start'),
            time_end = data.get('time_end'),
            class_name = data.get('class_name'),
            room_id = data.get('room_id'),
            teacher_id = data.get('teacher_id'),
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

        cr = class_room(
            roomid = data.get('roomid'),
            capacity = data.get('capacity'),
            building = data.get('building'),
            room_number = data.get('room_number')
        )
        cr.save(force_insert=True)
        return JsonResponse({'message': 'ClassRoom created'}, status=201)

    elif request.method == 'GET':
        rooms = list(class_room.objects.values())
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

        dal = django_admin_log(
            action_time = data.get('action_time'),
            object_id = data.get('object_id'),
            object_repr = data.get('object_repr'),
            action_flag = data.get('action_flag', 1),
            change_message = data.get('change_message'),
            content_type_id = data.get('content_type_id'),
            user_id = data.get('user_id'),
        )
        dal.save(force_insert=True)
        return JsonResponse({'message': 'DjangoAdminLog created'}, status=201)

    elif request.method == 'GET':
        logs = list(django_admin_log.objects.values())
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

        dct = django_content_type(
            app_label = data.get('app_label'),
            model = data.get('model'),
        )
        dct.save(force_insert=True)
        return JsonResponse({'message': 'DjangoContentType created'}, status=201)

    elif request.method == 'GET':
        ct_list = list(django_content_type.objects.values())
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

        dm = django_migrations(
            app = data.get('app'),
            name = data.get('name'),
            applied = data.get('applied'),
        )
        dm.save(force_insert=True)
        return JsonResponse({'message': 'DjangoMigrations created'}, status=201)

    elif request.method == 'GET':
        mig_list = list(django_migrations.objects.values())
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

        ds = django_session(
            session_key = data.get('session_key'),
            session_data = data.get('session_data'),
            expire_date = data.get('expire_date'),
        )
        ds.save(force_insert=True)
        return JsonResponse({'message': 'DjangoSession created'}, status=201)

    elif request.method == 'GET':
        sess_list = list(django_session.objects.values())
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

        edu = educates(
            teacherid_id = data.get('teacherid_id'),
            studentid_id = data.get('studentid_id'),
        )
        edu.save(force_insert=True)
        return JsonResponse({'message': 'Educates row created'}, status=201)

    elif request.method == 'GET':
        edu_list = list(educates.objects.values())
        return JsonResponse(edu_list, safe=False, status=200)

    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)



# 17) Feedback
from django.shortcuts import render
from django.http import JsonResponse, HttpResponseBadRequest
from django.views.decorators.csrf import csrf_exempt
from .models import feedback, teacher, Class, final_grade
import json

def parse_request_data(request):
    """
    Helper to safely parse JSON or fallback to request.POST.
    """
    try:
        return json.loads(request.body.decode('utf-8'))
    except:
        return request.POST.dict()

@csrf_exempt
def feedback_view(request):
    if request.method == 'POST':
        data = parse_request_data(request)

        teacher_id = data.get('teacherid_id')
        if not teacher_id:
            return HttpResponseBadRequest("Missing teacherid_id")

        teacher_obj, _ = teacher.objects.get_or_create(teacherid=teacher_id)

        class_num = data.get('classnumber_id')
        if not class_num:
            return HttpResponseBadRequest("Missing classnumber_id")

        class_obj, _ = Class.objects.get_or_create(class_number=class_num)

        section_val = data.get('section_id')
        if section_val is None:
            return HttpResponseBadRequest("Missing section_id")

        section_obj, _ = Class.objects.get_or_create(section=section_val)

        letter_id = data.get('letter_id')
        letter_obj = None
        if letter_id:
            letter_obj, _ = final_grade.objects.get_or_create(letter=letter_id)

        # 5) Create the feedback row
        fb = feedback(
            teacherid=teacher_obj,
            classnumber=class_obj,
            section=section_obj,
            comment=data.get('comment', ''),    # Default to empty string if missing
            letter=letter_obj,                 # Could be None if not provided
        )
        fb.save(force_insert=True)

        return JsonResponse({'message': 'Feedback created'}, status=201)

    elif request.method == 'GET':
        fb_list = list(feedback.objects.values())
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

        fg = final_grade(
            letter = data.get('letter'),
            word   = data.get('word'),
        )
        fg.save(force_insert=True)
        return JsonResponse({'message': 'FinalGrade created'}, status=201)

    elif request.method == 'GET':
        fg_list = list(final_grade.objects.values())
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

        inc = includes(
            studentid_id = data.get('studentid_id'),
            section_id = data.get('section_id'),
            class_number_id= data.get('class_number_id'),
        )
        inc.save(force_insert=True)
        return JsonResponse({'message': 'Includes created'}, status=201)

    elif request.method == 'GET':
        inc_list = list(includes.objects.values())
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

        ipp = individual_progress_plan(
            teacherid_id = data.get('teacherid_id'),
            studentid_id = data.get('studentid_id'),
            goals = data.get('goals'),
            specified_disability = data.get('specified_disability'),
            educational_aids = data.get('educational_aids'),
        )
        ipp.save(force_insert=True)
        return JsonResponse({'message': 'IndividualProgressPlan created'}, status=201)

    elif request.method == 'GET':
        ipp_list = list(individual_progress_plan.objects.values())
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

        rf = recieves_feedback(
            teacherid_id = data.get('teacherid_id'),
            studentid_id = data.get('studentid_id'),
            classnumber_id = data.get('classnumber_id'),
            section_id  = data.get('section_id'),
            letter_id = data.get('letter_id'),
        )
        rf.save(force_insert=True)
        return JsonResponse({'message': 'RecievesFeedback created'}, status=201)

    elif request.method == 'GET':
        rf_list = list(recieves_feedback.objects.values())
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

        rg = recieves_grade(
            letter_id  = data.get('letter_id'),
            studentid_id = data.get('studentid_id'),
            class_number_id= data.get('class_number_id'),
            section_id = data.get('section_id'),
        )
        rg.save(force_insert=True)
        return JsonResponse({'message': 'RecievesGrade created'}, status=201)

    elif request.method == 'GET':
        rg_list = list(recieves_grade.objects.values())
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

        sch = schedule(
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
        sch_list = list(schedule.objects.values())
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

        sc = scheduled(
            roomid_id    = data.get('roomid_id'),
            studentid_id = data.get('studentid_id'),
        )
        sc.save(force_insert=True)
        return JsonResponse({'message': 'Scheduled created'}, status=201)

    elif request.method == 'GET':
        sc_list = list(scheduled.objects.values())
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

        sm = school_member(
            id = data.get('id'),
            phone_number = data.get('phone_number'),
            first_name= data.get('first_name'),
            last_name = data.get('last_name'),
            date_of_birth= data.get('date_of_birth'),
            email = data.get('email'),
            password = data.get('password'),
        )
        sm.save(force_insert=True)
        return JsonResponse({'message': 'SchoolMember created'}, status=201)

    elif request.method == 'GET':
        sm_list = list(school_member.objects.values())
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

        st = student(
            studentid_id = data.get('studentid_id'),
            scheduleid   = data.get('scheduleid'),
        )
        st.save(force_insert=True)
        return JsonResponse({'message': 'Student created'}, status=201)

    elif request.method == 'GET':
        st_list = list(student.objects.values())
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

        t = teacher(
            teacherid_id = data.get('teacherid_id'),
        )
        t.save(force_insert=True)
        return JsonResponse({'message': 'Teacher created'}, status=201)

    elif request.method == 'GET':
        t_list = list(teacher.objects.values())
        return JsonResponse(t_list, safe=False, status=200)

    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)
    


# 28) Feedback Template
import json
from django.http  import JsonResponse, HttpResponse, HttpResponseNotAllowed
from django.views.decorators.csrf import csrf_exempt

from .models import feedback_template, final_grade

@csrf_exempt
def feedback_template_view(request):
    """
    GET  /api/feedback‑template?letter=A&subject=Math%202
    POST /api/feedback‑template                (body = JSON)
    """
    if request.method == "GET":
        letter  = request.GET.get("letter")
        subject = request.GET.get("subject")

        qs = feedback_template.objects.all()
        if letter:
            qs = qs.filter(letter_id=letter)
        if subject:
            qs = qs.filter(subject=subject)

        data = [
            {
                "id":        ft.id,
                "letter":    ft.letter_id,
                "subject":   ft.subject,
                "template":  ft.template,
            }
            for ft in qs
        ]
        return JsonResponse(data, safe=False)

    if request.method == "POST":
        body = json.loads(request.body)
        ft   = feedback_template.objects.create(
            letter   = final_grade.objects.get(pk=body["letter"]),
            subject  = body["subject"],
            template = body["template"],
        )
        return JsonResponse(
            {"id": ft.id, "status": "created"},
            status=201
        )

    return HttpResponseNotAllowed(["GET", "POST"])

# 29) Enrol Class
from .models import Student, Class, Assigned 
@csrf_exempt
def enrol_class(request):
    """
    POST /api/enrol-class
    {
        "student_id": 123,
        "class_number": 42
    }
    ── RESPONSES ─────────────────────────────────────────────
    400 – bad JSON / missing keys
    404 – unknown student or class
    409 – section already full
    201 – enrolled ✓
    """
    if request.method != "POST":
        return HttpResponseNotAllowed(["POST"])


    try:
        body          = json.loads(request.body)
        student_id    = body["student_id"]
        class_number  = body["class_number"]
    except (json.JSONDecodeError, KeyError):
        return JsonResponse(
            {"error": "JSON body must contain student_id and class_number"},
            status=400
        )

    try:
        student = Student.objects.get(pk=student_id)
        classes   = (Class.objects
                         .select_related("room")   # need room.capacity
                         .get(pk=class_number))
    except (Student.DoesNotExist, Class.DoesNotExist):
        return JsonResponse({"error": "student or class not found"}, status=404)


    capacity = classes.room.capacity or 0              
    enrolled = (Assigned.objects
                           .filter(class_number=classes)  
                           .count())

    if capacity and enrolled >= capacity:
        return JsonResponse({"error": "class is full"}, status=409)


    Assigned.objects.create(
        class_number=classes,
        section=classes,        
        student=student
    )
    return JsonResponse({"status": "enrolled"}, status=201)

#30) Report Card Generation (This should work) Internal Python PDF Generation used    

#30) Report Card Generation (This should work) Internal Python PDF Generation used  import io
import io
import json
from datetime import date
from pathlib import Path

from django.conf     import settings
from django.shortcuts import get_object_or_404
from django.http     import JsonResponse, HttpResponse, HttpResponseNotAllowed
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

from .models import Student, receives_grade


def get_student_grades(student):
    """
    Returns this student’s final grades ordered by class_number.
    """
    return (
        receives_grade.objects
        .filter(student=student)
        .select_related("class_no", "letter")
        .order_by("class_no__class_number")
    )


def build_pdf_bytes(student, grades_qs):
    """
    Manually builds a minimal single‐page PDF listing each class & letter grade.
    """
    buf = io.BytesIO()
    w   = buf.write

    # PDF header
    w(b"%PDF-1.1\n%\xe2\xe3\xcf\xd3\n")
    offsets = []

    # 1) Catalog
    offsets.append(buf.tell())
    w(b"1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n")

    # 2) Pages
    offsets.append(buf.tell())
    w(b"2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n")

    # 3) Compose lines
    name = f"{student.studentid.first_name} {student.studentid.last_name}"
    lines = [
        f"Report Card – {name}",
        f"Issued: {date.today():%B %d, %Y}",
        ""
    ]
    for g in grades_qs:
        cls    = g.class_no
        subj   = cls.subject or "(no subject)"
        num    = cls.class_number
        sect   = g.section
        letter = g.letter.letter if g.letter else "(no grade)"
        lines.append(f"{subj} ({num}-{sect}): {letter}")

    # 4) Build text stream
    text = "BT\n/F1 12 Tf\n72 750 Td\n"
    for ln in lines:
        esc = ln.replace("(", "\\(").replace(")", "\\)")
        text += f"({esc}) Tj\n0 -14 Td\n"
    text += "ET\n"
    data = text.encode("latin1")

    # 5) Page object
    offsets.append(buf.tell())
    w(b"3 0 obj\n")
    w(b"<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] ")
    w(b"/Contents 4 0 R /Resources << /Font << /F1 5 0 R>> >> >>\n")
    w(b"endobj\n")

    # 6) Content stream
    offsets.append(buf.tell())
    w(f"4 0 obj\n<< /Length {len(data)} >>\nstream\n".encode("latin1"))
    w(data)
    w(b"\nendstream\nendobj\n")

    # 7) Font
    offsets.append(buf.tell())
    w(b"5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n")

    # 8) xref
    xref_pos = buf.tell()
    w(b"xref\n0 6\n0000000000 65535 f \n")
    for off in offsets:
        w(f"{off:010d} 00000 n \n".encode("latin1"))

    # 9) Trailer
    w(b"trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n")
    w(str(xref_pos).encode("latin1"))
    w(b"\n%%EOF")

    return buf.getvalue()


def save_pdf(pdf_bytes, student_id):
    """
    Writes PDF under MEDIA_ROOT/reports/ and returns its URL.
    """
    reports_dir = Path(settings.MEDIA_ROOT) / "reports"
    reports_dir.mkdir(parents=True, exist_ok=True)

    fname = f"reportcard_{student_id}_{date.today():%Y-%m-%d}.pdf"
    path  = reports_dir / fname
    path.write_bytes(pdf_bytes)

    return settings.MEDIA_URL.rstrip("/") + f"/reports/{fname}"


@csrf_exempt
@require_http_methods(["POST"])
def reportcard_generate(request):
    """
    POST /api/reportcard/   { "student_id": 321 }
    → 201 { "pdf_url": "/media/reports/reportcard_321_2025-04-19.pdf" }
    """
    try:
        payload    = json.loads(request.body or "{}")
        student_id = int(payload["student_id"])
    except Exception:
        return JsonResponse({"error": "student_id (int) required"}, status=400)

    student   = get_object_or_404(Student, pk=student_id)
    grades_qs = get_student_grades(student)

    pdf_bytes = build_pdf_bytes(student, grades_qs)
    url       = save_pdf(pdf_bytes, student_id)
    return JsonResponse({"pdf_url": url}, status=201)


@require_http_methods(["GET"])
def reportcard_view(request, student_id):
    """
    GET /api/reportcard/<student_id>/  → inline PDF
    """
    student   = get_object_or_404(Student, pk=student_id)
    grades_qs = get_student_grades(student)

    pdf_bytes = build_pdf_bytes(student, grades_qs)
    resp = HttpResponse(pdf_bytes, content_type="application/pdf")
    resp["Content-Disposition"] = f'inline; filename="reportcard_{student_id}.pdf"'
    return resp
