from django.urls import path
from ..views import auth_views

urlpatterns = [
    path('', auth_views.auth, name='authentication'),
    path('me', auth_views.me, name='authentication-information'),
]