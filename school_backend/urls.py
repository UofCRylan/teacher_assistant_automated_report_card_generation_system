"""
URL configuration for school_backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('api/auth/', include('school_app.urls.auth_urls')),
    path('api/student/', include('school_app.urls.student_urls')),
    path('api/teacher/', include('school_app.urls.teacher_urls')),
    path('api/class/', include('school_app.urls.class_urls')),
    path('api/schedule/', include('school_app.urls.schedule_urls')),
    path('api/report/', include('school_app.urls.reports_urls')),
    # path('api/admin/', include('school_app.urls.admin_urls')),
    # path('admin/', admin.site.urls),
    # # e.g., /school/upload/ => calls upload_ocr_view
    # path('school/', include('school_app.urls')),
]



# Serve uploaded media during development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)