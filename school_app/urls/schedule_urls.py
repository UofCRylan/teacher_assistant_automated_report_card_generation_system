from django.urls import path
from ..views import schedule_views

urlpatterns = [
    path('', schedule_views.default, name='user-schedule'),
    path('create', schedule_views.default, name='user-schedule'),
    path('all', schedule_views.get_all_schedules, name='get-all-schedules'),
    path('<int:schedule_id>', schedule_views.handle_schedule, name='handle-schedule'),
]
