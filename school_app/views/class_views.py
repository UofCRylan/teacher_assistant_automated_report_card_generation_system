import json
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from ..authentication import require_authorization
from rest_framework.permissions import IsAuthenticated
from ..utils import manager, grades, feedback, attendance, class_room
from ..utils.data_handler import parse_request_data


@api_view(['GET', 'POST', 'PUT'])
@permission_classes([IsAuthenticated])
@require_authorization(['teacher', 'admin'])
def default(request, user_type):
    if request.method != "GET":
        data = parse_request_data(request)
        class_id = data['class_id']
        section_id = data['section_id']
        class_name = data['class_name']
        subject = data['subject']
        time_start = data['time_start']
        time_end = data['time_end']
        teacher_id = data['teacher_id']
        room_id = data['room_id']


        if class_id and section_id and class_name and subject and time_start and time_end and teacher_id and room_id:
            print("IN")
            result = manager.update_class(class_id, section_id, class_name,
                                          subject, time_start, time_end, teacher_id, room_id)
            print(result)

            return Response(result['message'], status=result['status'])
        else:
            return Response({"message": "Missing required fields"}, status=400)

    else:
        return Response(manager.get_classes(), status=200)

@api_view(['GET'])
def get_class(request, class_id, section_id):
    result = manager.get_class(class_id, section_id)

    return Response(result['message'], status=result['status'])

@api_view(['GET', 'POST', 'PUT'])
def get_grades(request, class_id, section_id):
    if request.method == 'GET':
        result = grades.get_grades(class_id, section_id)

        return Response(result, status=200)
    else:
        data = parse_request_data(request)
        result = grades.update_grades(data)

        return Response(result['message'], status=result['status'])

@api_view(['GET'])
def get_feedbacks(request, class_id, section_id):
    result = feedback.get_feedbacks(class_id, section_id)

    return Response(result, status=200)

@api_view(['GET', 'POST', 'PUT'])
def handle_grade(request, class_id, section_id, student_id):
    if request.method == 'GET':
        result = grades.get_grade(class_id, section_id, student_id)
        print("RESULT: ", result)
        if result:
            return Response(result, status=200)
        else:
            return Response(data=None, status=200)

    else:
        pass
        # data = parse_request_data(request)
        # letter = data['letter']
        #
        # if letter:
        #     result = grades.update_grade(class_id, section_id, student_id, letter)
        #     return Response(result['message'], status=result['status'])
        # else:
        #     return Response({"message": "Missing required fields"}, status=400)

@api_view(['GET', 'POST', 'PUT'])
def handle_feedback(request, class_id, section_id, student_id):
    if request.method == 'GET':
        result = feedback.get_feedback(class_id, section_id, student_id)
        return Response(result, status=200)

    else:
        data = parse_request_data(request)
        letter = data['letter']
        comment = data['comment']

        if letter and comment:
            result = feedback.update_feedback(class_id, section_id, student_id, letter)
            return Response(result['message'], status=result['status'])
        else:
            return Response({"message": "Missing required fields"}, status=400)

@api_view(['GET', 'POST', 'PUT'])
def handle_attendance(request, class_id, section_id):
    if request.method == 'GET':
        result = attendance.get_all_attendance(class_id, section_id)
        return Response(result, status=200)

    elif request.method == 'PUT':
        data = parse_request_data(request)
        result = attendance.update_attendance(class_id, section_id, data)

        return Response(result, status=200)

@api_view(['GET'])
def get_attendance(request):
    result = attendance.get_attendance(request.user.id)

    return Response(result, status=200)


@api_view(['GET'])
def get_class_students(request, class_id, section_id):
    result = manager.get_students(class_id, section_id)

    return Response(result, status=200)


@api_view(['POST', 'PUT'])
@permission_classes([IsAuthenticated])
@require_authorization(['teacher'])
def update_feedback(request, user_type, class_id, section_id, student_id):
    data = parse_request_data(request)

    student_feedback = data['feedback']

    result = feedback.update_feedback(class_id, section_id, student_id, request.user.id, student_feedback)

    return Response(result['message'], status=result['status'])


@api_view(['GET'])
def get_rooms(request):
    result = class_room.get_available_rooms()

    return Response(data=result, status=200)