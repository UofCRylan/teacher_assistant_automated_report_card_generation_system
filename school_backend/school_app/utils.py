# utils.py
import re
import pytesseract
from PIL import Image

def ocr_extract_text(image_path: str) -> str:
 
    with Image.open(image_path) as img:
        extracted = pytesseract.image_to_string(img)
    return extracted


#address_image_path = "path_to_address_image.jpg"
#address_data = parse_address_image(address_image_path)
def parse_address_image(image_path: str) -> dict:
    """
    id (OneToOne with SchoolMember), street_name, street_number,
    city, province, postal_code
    """
    text = ocr_extract_text(image_path)

    id_match       = re.search(r"ID:\s*(\d+)", text, re.IGNORECASE)
    street_match   = re.search(r"Street\s*Name:\s*([\w\s]+)", text, re.IGNORECASE)
    number_match   = re.search(r"Street\s*Number:\s*(\d+)", text, re.IGNORECASE)
    city_match     = re.search(r"City:\s*([\w\s]+)", text, re.IGNORECASE)
    province_match = re.search(r"Province:\s*([\w\s]+)", text, re.IGNORECASE)
    postal_match   = re.search(r"Postal\s*Code:\s*(\w+)", text, re.IGNORECASE)

    return {
        'id_id': int(id_match.group(1)) if id_match else None,  # for the OneToOneField's underlying column
        'street_name': street_match.group(1).strip() if street_match else "",
        'street_number': int(number_match.group(1)) if number_match else None,
        'city': city_match.group(1).strip() if city_match else "",
        'province': province_match.group(1).strip() if province_match else "",
        'postal_code': postal_match.group(1).strip() if postal_match else ""
    }


#2. Assigned
def parse_assigned_image(image_path: str) -> dict:
    """
    class_number (OneToOne to Class), section (FK to Class.section),
    student (FK to Student)
    """
    text = ocr_extract_text(image_path)

    cnum_match   = re.search(r"Class\s*Number:\s*(\d+)", text, re.IGNORECASE)
    sect_match   = re.search(r"Section:\s*(\d+)", text, re.IGNORECASE)
    studid_match = re.search(r"Student\s*ID:\s*(\d+)", text, re.IGNORECASE)

    return {
        # For the OneToOneField, the actual column is 'class_number_id'
        'class_number_id': int(cnum_match.group(1)) if cnum_match else None,
        # for the FK: 'section_id' to match how Django stores the column
        'section_id': int(sect_match.group(1)) if sect_match else None,
        # for 'student_id'
        'student_id': int(studid_match.group(1)) if studid_match else None
    }


#3. Attendance
def parse_attendance_image(image_path: str) -> dict:
    """
    class_number (OneToOne -> Class), section (FK -> Class),
    teacherid (FK->Teacher), studentid (FK->Student),
    date, status
    """
    text = ocr_extract_text(image_path)

    cnum_match  = re.search(r"Class\s*Number:\s*(\d+)", text, re.IGNORECASE)
    sect_match  = re.search(r"Section:\s*(\d+)", text, re.IGNORECASE)
    teach_match = re.search(r"Teacher\s*ID:\s*(\d+)", text, re.IGNORECASE)
    stud_match  = re.search(r"Student\s*ID:\s*(\d+)", text, re.IGNORECASE)
    date_match  = re.search(r"Date:\s*([\d\-]+)", text, re.IGNORECASE)
    stat_match  = re.search(r"Status:\s*(Present|Absent|Late|[\w]+)", text, re.IGNORECASE)

    return {
        'class_number_id': int(cnum_match.group(1)) if cnum_match else None,
        'section_id': int(sect_match.group(1)) if sect_match else None,
        'teacherid_id': int(teach_match.group(1)) if teach_match else None,
        'studentid_id': int(stud_match.group(1)) if stud_match else None,
        'date': date_match.group(1) if date_match else "2025-01-01",
        'status': stat_match.group(1) if stat_match else "Present"
    }


#4. AuthGroup
def parse_authgroup_image(image_path: str) -> dict:
    """
    name
    """
    text = ocr_extract_text(image_path)
    name_match = re.search(r"Group\s*Name:\s*(\w+)", text, re.IGNORECASE)
    return {
        'name': name_match.group(1) if name_match else "default_group"
    }


#5. AuthGroupPermissions
def parse_authgrouppermissions_image(image_path: str) -> dict:
    """
    group (FK->AuthGroup), permission (FK->AuthPermission)
    """
    text = ocr_extract_text(image_path)
    groupid_match = re.search(r"Group\s*ID:\s*(\d+)", text, re.IGNORECASE)
    permid_match  = re.search(r"Permission\s*ID:\s*(\d+)", text, re.IGNORECASE)

    return {
        'group_id': int(groupid_match.group(1)) if groupid_match else None,
        'permission_id': int(permid_match.group(1)) if permid_match else None
    }


#6. AuthPermission
def parse_authpermission_image(image_path: str) -> dict:
    """
    name, content_type (FK->DjangoContentType), codename
    """
    text = ocr_extract_text(image_path)

    name_match   = re.search(r"Permission\s*Name:\s*([\w\s]+)", text, re.IGNORECASE)
    ctype_match  = re.search(r"Content\s*Type\s*ID:\s*(\d+)", text, re.IGNORECASE)
    code_match   = re.search(r"Code\s*Name:\s*([\w]+)", text, re.IGNORECASE)

    return {
        'name': name_match.group(1).strip() if name_match else "Default Permission",
        'content_type_id': int(ctype_match.group(1)) if ctype_match else None,
        'codename': code_match.group(1) if code_match else "default_code"
    }


#7. AuthUser
def parse_authuser_image(image_path: str) -> dict:
    """
    password, last_login, is_superuser, username, first_name,
    last_name, email, is_staff, is_active, date_joined
    """
    text = ocr_extract_text(image_path)

    user_match     = re.search(r"Username:\s*(\w+)", text, re.IGNORECASE)
    pass_match     = re.search(r"Password:\s*([\S]+)", text, re.IGNORECASE)
    fname_match    = re.search(r"First\s*Name:\s*([\w]+)", text, re.IGNORECASE)
    lname_match    = re.search(r"Last\s*Name:\s*([\w]+)", text, re.IGNORECASE)
    email_match    = re.search(r"Email:\s*([\w@.]+)", text, re.IGNORECASE)
    staff_match    = re.search(r"Staff:\s*(\d+)", text, re.IGNORECASE)
    active_match   = re.search(r"Active:\s*(\d+)", text, re.IGNORECASE)
    super_match    = re.search(r"Superuser:\s*(\d+)", text, re.IGNORECASE)
    # last_login, date_joined can be derived or left as default
    # e.g., parse them or set them as needed

    return {
        'password': pass_match.group(1) if pass_match else "pbkdf2:blahblah",
        'last_login': None,      # or some default
        'is_superuser': int(super_match.group(1)) if super_match else 0,
        'username': user_match.group(1) if user_match else "defaultuser",
        'first_name': fname_match.group(1) if fname_match else "John",
        'last_name': lname_match.group(1) if lname_match else "Doe",
        'email': email_match.group(1) if email_match else "default@example.com",
        'is_staff': int(staff_match.group(1)) if staff_match else 0,
        'is_active': int(active_match.group(1)) if active_match else 1,
        'date_joined': "2025-01-01 00:00:00"
    }


#8. AuthUserGroups
def parse_authusergroups_image(image_path: str) -> dict:
    """
    user (FK->AuthUser), group (FK->AuthGroup)
    """
    text = ocr_extract_text(image_path)
    userid_match = re.search(r"User\s*ID:\s*(\d+)", text, re.IGNORECASE)
    groupid_match= re.search(r"Group\s*ID:\s*(\d+)", text, re.IGNORECASE)

    return {
        'user_id': int(userid_match.group(1)) if userid_match else None,
        'group_id': int(groupid_match.group(1)) if groupid_match else None
    }


#9. AuthUserUserPermissions
def parse_authuseruserpermissions_image(image_path: str) -> dict:
    """
    user (FK->AuthUser), permission (FK->AuthPermission)
    """
    text = ocr_extract_text(image_path)
    uid_match = re.search(r"User\s*ID:\s*(\d+)", text, re.IGNORECASE)
    pid_match = re.search(r"Permission\s*ID:\s*(\d+)", text, re.IGNORECASE)

    return {
        'user_id': int(uid_match.group(1)) if uid_match else None,
        'permission_id': int(pid_match.group(1)) if pid_match else None
    }


#10. Class
def parse_class_image(image_path: str) -> dict:
    """
    class_number, section, subject, time_start, time_end,
    class_name, room (FK->ClassRoom), teacher (FK->Teacher)
    """
    text = ocr_extract_text(image_path)

    cnum_match  = re.search(r"Class\s*Number:\s*(\d+)", text, re.IGNORECASE)
    sect_match  = re.search(r"Section:\s*(\d+)", text, re.IGNORECASE)
    subj_match  = re.search(r"Subject:\s*([\w\s]+)", text, re.IGNORECASE)
    start_match = re.search(r"Time\s*Start:\s*([\d:]+)", text, re.IGNORECASE)
    end_match   = re.search(r"Time\s*End:\s*([\d:]+)", text, re.IGNORECASE)
    cname_match = re.search(r"Class\s*Name:\s*([\w\s]+)", text, re.IGNORECASE)
    roomid_match= re.search(r"Room\s*ID:\s*(\d+)", text, re.IGNORECASE)
    teachid_match= re.search(r"Teacher\s*ID:\s*(\d+)", text, re.IGNORECASE)

    return {
        'class_number': int(cnum_match.group(1)) if cnum_match else None,
        'section': int(sect_match.group(1)) if sect_match else None,
        'subject': subj_match.group(1).strip() if subj_match else "",
        'time_start': start_match.group(1) if start_match else "",
        'time_end': end_match.group(1) if end_match else "",
        'class_name': cname_match.group(1).strip() if cname_match else "",
        'room_id': int(roomid_match.group(1)) if roomid_match else None,
        'teacher_id': int(teachid_match.group(1)) if teachid_match else None
    }


#11. ClassRoom
def parse_classroom_image(image_path: str) -> dict:
    """
    roomid, capacity, building, room_number
    """
    text = ocr_extract_text(image_path)

    rid_match  = re.search(r"Room\s*ID:\s*(\d+)", text, re.IGNORECASE)
    cap_match  = re.search(r"Capacity:\s*(\d+)", text, re.IGNORECASE)
    bld_match  = re.search(r"Building:\s*([\w\s]+)", text, re.IGNORECASE)
    rnum_match = re.search(r"Room\s*Number:\s*([\w]+)", text, re.IGNORECASE)

    return {
        'roomid': int(rid_match.group(1)) if rid_match else None,
        'capacity': int(cap_match.group(1)) if cap_match else None,
        'building': bld_match.group(1).strip() if bld_match else "",
        'room_number': rnum_match.group(1).strip() if rnum_match else ""
    }


#12. DjangoAdminLog
def parse_djangoadminlog_image(image_path: str) -> dict:
    """
    action_time, object_id, object_repr, action_flag,
    change_message, content_type (FK->DjangoContentType), user (FK->AuthUser)
    """
    text = ocr_extract_text(image_path)

    # For illustration, we'll do minimal
    action_time_match  = re.search(r"Action\s*Time:\s*(\S+)", text, re.IGNORECASE)
    object_id_match    = re.search(r"Object\s*ID:\s*(\S+)", text, re.IGNORECASE)
    object_repr_match  = re.search(r"Object\s*Repr:\s*([\w\s]+)", text, re.IGNORECASE)
    flag_match         = re.search(r"Action\s*Flag:\s*(\d+)", text, re.IGNORECASE)
    msg_match          = re.search(r"Message:\s*(.+)", text, re.IGNORECASE)
    ctype_match        = re.search(r"Content\s*Type\s*ID:\s*(\d+)", text, re.IGNORECASE)
    user_match         = re.search(r"User\s*ID:\s*(\d+)", text, re.IGNORECASE)

    return {
        'action_time': action_time_match.group(1) if action_time_match else "2025-01-01 00:00:00",
        'object_id': object_id_match.group(1) if object_id_match else "",
        'object_repr': object_repr_match.group(1).strip() if object_repr_match else "",
        'action_flag': int(flag_match.group(1)) if flag_match else 1,
        'change_message': msg_match.group(1).strip() if msg_match else "",
        'content_type_id': int(ctype_match.group(1)) if ctype_match else None,
        'user_id': int(user_match.group(1)) if user_match else None
    }


#13. DjangoContentType
def parse_djangocontenttype_image(image_path: str) -> dict:
    """
    app_label, model
    """
    text = ocr_extract_text(image_path)
    app_match   = re.search(r"App\s*Label:\s*([\w]+)", text, re.IGNORECASE)
    model_match = re.search(r"Model:\s*([\w]+)", text, re.IGNORECASE)

    return {
        'app_label': app_match.group(1) if app_match else "default_app",
        'model': model_match.group(1) if model_match else "default_model"
    }


#14. DjangoMigrations
def parse_djangomigrations_image(image_path: str) -> dict:
    """
    app, name, applied
    """
    text = ocr_extract_text(image_path)

    app_match   = re.search(r"App:\s*([\w]+)", text, re.IGNORECASE)
    name_match  = re.search(r"Name:\s*([\w]+)", text, re.IGNORECASE)
    date_match  = re.search(r"Applied:\s*([\d-]+\s*[\d:]+)", text, re.IGNORECASE)

    return {
        'app': app_match.group(1) if app_match else "default_app",
        'name': name_match.group(1) if name_match else "default_migration",
        'applied': date_match.group(1) if date_match else "2025-01-01 00:00:00"
    }


#15. DjangoSession
def parse_djangosession_image(image_path: str) -> dict:
    """
    session_key, session_data, expire_date
    """
    text = ocr_extract_text(image_path)

    skey_match   = re.search(r"Session\s*Key:\s*([\w]+)", text, re.IGNORECASE)
    sdata_match  = re.search(r"Data:\s*(.+)", text, re.IGNORECASE)
    expire_match = re.search(r"Expire\s*Date:\s*([\d-]+\s*[\d:]+)", text, re.IGNORECASE)

    return {
        'session_key': skey_match.group(1) if skey_match else "abcdef1234",
        'session_data': sdata_match.group(1).strip() if sdata_match else "",
        'expire_date': expire_match.group(1) if expire_match else "2025-01-01 00:00:00"
    }


#16. Educates
def parse_educates_image(image_path: str) -> dict:
    """
    teacherid (OneToOne -> Teacher), studentid (FK -> Student)
    """
    text = ocr_extract_text(image_path)

    teach_match = re.search(r"Teacher\s*ID:\s*(\d+)", text, re.IGNORECASE)
    stud_match  = re.search(r"Student\s*ID:\s*(\d+)", text, re.IGNORECASE)

    return {
        'teacherid_id': int(teach_match.group(1)) if teach_match else None,
        'studentid_id': int(stud_match.group(1)) if stud_match else None
    }


#17. Feedback
def parse_feedback_image(image_path: str) -> dict:
    """
    teacherid (OneToOne->Teacher), studentid (FK->Student),
    classnumber (FK->Class), section (FK->Class.section),
    letter (FK->FinalGrade), comment
    """
    text = ocr_extract_text(image_path)

    teach_match  = re.search(r"Teacher\s*ID:\s*(\d+)", text, re.IGNORECASE)
    stud_match   = re.search(r"Student\s*ID:\s*(\d+)", text, re.IGNORECASE)
    cnum_match   = re.search(r"Class\s*Number:\s*(\d+)", text, re.IGNORECASE)
    sect_match   = re.search(r"Section:\s*(\d+)", text, re.IGNORECASE)
    letter_match = re.search(r"Letter:\s*([A-F][\+\-]?)", text, re.IGNORECASE)
    comm_match   = re.search(r"Comment:\s*(.+)", text, re.IGNORECASE)

    return {
        'teacherid_id': int(teach_match.group(1)) if teach_match else None,
        'studentid_id': int(stud_match.group(1)) if stud_match else None,
        'classnumber_id': int(cnum_match.group(1)) if cnum_match else None,
        'section_id': int(sect_match.group(1)) if sect_match else None,
        'letter_id': letter_match.group(1) if letter_match else "F",
        'comment': comm_match.group(1).strip() if comm_match else ""
    }


#18. FinalGrade
def parse_finalgrade_image(image_path: str) -> dict:
    """
    letter, word
    """
    text = ocr_extract_text(image_path)

    letter_match = re.search(r"Letter:\s*([A-F][+\-]?)", text, re.IGNORECASE)
    word_match   = re.search(r"Word:\s*([\w\s]+)", text, re.IGNORECASE)

    return {
        'letter': letter_match.group(1) if letter_match else "F",
        'word': word_match.group(1).strip() if word_match else "Failing"
    }


#19. Includes
def parse_includes_image(image_path: str) -> dict:
    """
    studentid (OneToOne->Student), section (FK->Class.section),
    class_number (FK->Class.class_number)
    """
    text = ocr_extract_text(image_path)

    stud_match = re.search(r"Student\s*ID:\s*(\d+)", text, re.IGNORECASE)
    sect_match = re.search(r"Section:\s*(\d+)", text, re.IGNORECASE)
    cnum_match = re.search(r"Class\s*Number:\s*(\d+)", text, re.IGNORECASE)

    return {
        'studentid_id': int(stud_match.group(1)) if stud_match else None,
        'section_id': int(sect_match.group(1)) if sect_match else None,
        'class_number_id': int(cnum_match.group(1)) if cnum_match else None
    }


#20. IndividualProgressPlan
def parse_individualprogressplan_image(image_path: str) -> dict:
    """
    teacherid (OneToOne->Teacher), studentid (FK->Student),
    goals, specified_disability, educational_aids
    """
    text = ocr_extract_text(image_path)

    teach_match   = re.search(r"Teacher\s*ID:\s*(\d+)", text, re.IGNORECASE)
    stud_match    = re.search(r"Student\s*ID:\s*(\d+)", text, re.IGNORECASE)
    goals_match   = re.search(r"Goals:\s*(.+)", text, re.IGNORECASE)
    disab_match   = re.search(r"Disability:\s*([\w]+)", text, re.IGNORECASE)
    aids_match    = re.search(r"Aids:\s*(.+)", text, re.IGNORECASE)

    return {
        'teacherid_id': int(teach_match.group(1)) if teach_match else None,
        'studentid_id': int(stud_match.group(1)) if stud_match else None,
        'goals': goals_match.group(1).strip() if goals_match else "",
        'specified_disability': disab_match.group(1) if disab_match else "",
        'educational_aids': aids_match.group(1).strip() if aids_match else ""
    }


#21. RecievesFeedback
def parse_recievesfeedback_image(image_path: str) -> dict:
    """
    teacherid (OneToOne->Feedback), studentid (FK->Feedback),
    classnumber (FK->Feedback), section (FK->Feedback), letter (FK->Feedback)
    """
    text = ocr_extract_text(image_path)

    teach_match = re.search(r"Teacher\s*ID:\s*(\d+)", text, re.IGNORECASE)
    stud_match  = re.search(r"Student\s*ID:\s*(\d+)", text, re.IGNORECASE)
    cnum_match  = re.search(r"Class\s*Number:\s*(\d+)", text, re.IGNORECASE)
    sect_match  = re.search(r"Section:\s*(\d+)", text, re.IGNORECASE)
    let_match   = re.search(r"Letter:\s*([A-F][+\-]?)", text, re.IGNORECASE)

    return {
        'teacherid_id': int(teach_match.group(1)) if teach_match else None,
        'studentid_id': int(stud_match.group(1)) if stud_match else None,
        'classnumber_id': int(cnum_match.group(1)) if cnum_match else None,
        'section_id': int(sect_match.group(1)) if sect_match else None,
        'letter_id': let_match.group(1) if let_match else "F"
    }


#22`. RecievesGrade
def parse_recievesgrade_image(image_path: str) -> dict:
    """
    letter (OneToOne->FinalGrade), studentid (FK->Student),
    class_number (FK->Class), section (FK->Class.section)
    """
    text = ocr_extract_text(image_path)

    let_match   = re.search(r"Letter:\s*([A-F][+\-]?)", text, re.IGNORECASE)
    stud_match  = re.search(r"Student\s*ID:\s*(\d+)", text, re.IGNORECASE)
    cnum_match  = re.search(r"Class\s*Number:\s*(\d+)", text, re.IGNORECASE)
    sect_match  = re.search(r"Section:\s*(\d+)", text, re.IGNORECASE)

    return {
        'letter_id': let_match.group(1) if let_match else "F",
        'studentid_id': int(stud_match.group(1)) if stud_match else None,
        'class_number_id': int(cnum_match.group(1)) if cnum_match else None,
        'section_id': int(sect_match.group(1)) if sect_match else None
    }


#23. Schedule
def parse_schedule_image(image_path: str) -> dict:
    """
    schedule_id, class_number (FK->Class), section (FK->Class.section),
    homeroom, math, science, english, social_studies, gym, music
    """
    text = ocr_extract_text(image_path)

    sid_match      = re.search(r"Schedule\s*ID:\s*(\d+)", text, re.IGNORECASE)
    cnum_match     = re.search(r"Class\s*Number:\s*(\d+)", text, re.IGNORECASE)
    sect_match     = re.search(r"Section:\s*(\d+)", text, re.IGNORECASE)
    homeroom_match = re.search(r"Homeroom:\s*(\d+)", text, re.IGNORECASE)
    math_match     = re.search(r"Math:\s*(\d+)", text, re.IGNORECASE)
    sci_match      = re.search(r"Science:\s*(\d+)", text, re.IGNORECASE)
    eng_match      = re.search(r"English:\s*(\d+)", text, re.IGNORECASE)
    ss_match       = re.search(r"Social\s*Studies:\s*(\d+)", text, re.IGNORECASE)
    gym_match      = re.search(r"Gym:\s*(\d+)", text, re.IGNORECASE)
    music_match    = re.search(r"Music:\s*(\d+)", text, re.IGNORECASE)

    return {
        'schedule_id': int(sid_match.group(1)) if sid_match else None,
        'class_number_id': int(cnum_match.group(1)) if cnum_match else None,
        'section_id': int(sect_match.group(1)) if sect_match else None,
        'homeroom_id': int(homeroom_match.group(1)) if homeroom_match else None,
        'math_id': int(math_match.group(1)) if math_match else None,
        'science_id': int(sci_match.group(1)) if sci_match else None,
        'english_id': int(eng_match.group(1)) if eng_match else None,
        'social_studies_id': int(ss_match.group(1)) if ss_match else None,
        'gym_id': int(gym_match.group(1)) if gym_match else None,
        'music_id': int(music_match.group(1)) if music_match else None
    }


##24. Scheduled
def parse_scheduled_image(image_path: str) -> dict:
    """
    roomid (OneToOne->ClassRoom), studentid (FK->Student)
    """
    text = ocr_extract_text(image_path)

    rid_match = re.search(r"Room\s*ID:\s*(\d+)", text, re.IGNORECASE)
    sid_match = re.search(r"Student\s*ID:\s*(\d+)", text, re.IGNORECASE)

    return {
        'roomid_id': int(rid_match.group(1)) if rid_match else None,
        'studentid_id': int(sid_match.group(1)) if sid_match else None
    }


#25. SchoolMember
def parse_schoolmember_image(image_path: str) -> dict:
    """
    id, phone_number, first_name, last_name, date_of_birth,
    email, password
    """
    text = ocr_extract_text(image_path)

    id_match     = re.search(r"Member\s*ID:\s*(\d+)", text, re.IGNORECASE)
    phone_match  = re.search(r"Phone:\s*([\d-]+)", text, re.IGNORECASE)
    fname_match  = re.search(r"First\s*Name:\s*([\w]+)", text, re.IGNORECASE)
    lname_match  = re.search(r"Last\s*Name:\s*([\w]+)", text, re.IGNORECASE)
    dob_match    = re.search(r"DOB:\s*([\d-]+)", text, re.IGNORECASE)
    email_match  = re.search(r"Email:\s*([\w@.]+)", text, re.IGNORECASE)
    pass_match   = re.search(r"Password:\s*([\S]+)", text, re.IGNORECASE)

    return {
        'id': int(id_match.group(1)) if id_match else None,
        'phone_number': phone_match.group(1) if phone_match else "",
        'first_name': fname_match.group(1) if fname_match else "John",
        'last_name': lname_match.group(1) if lname_match else "Doe",
        'date_of_birth': dob_match.group(1) if dob_match else "2025-01-01",
        'email': email_match.group(1) if email_match else "",
        'password': pass_match.group(1) if pass_match else ""
    }


##26. SchoolMemberGroup
def parse_student_image(image_path: str) -> dict:
    """
    studentid (OneToOne->SchoolMember), scheduleid
    """
    text = ocr_extract_text(image_path)

    # 'studentid_id' is the actual field for the OneToOneField
    stud_match = re.search(r"Student\s*ID:\s*(\d+)", text, re.IGNORECASE)
    sched_match= re.search(r"Schedule\s*ID:\s*(\d+)", text, re.IGNORECASE)

    return {
        'studentid_id': int(stud_match.group(1)) if stud_match else None,
        'scheduleid': int(sched_match.group(1)) if sched_match else None
    }


##27. SchoolMemberGroup
def parse_teacher_image(image_path: str) -> dict:
    """
    teacherid (OneToOne->SchoolMember)
    """
    text = ocr_extract_text(image_path)
    tid_match = re.search(r"Teacher\s*ID:\s*(\d+)", text, re.IGNORECASE)

    return {
        'teacherid_id': int(tid_match.group(1)) if tid_match else None
    }
