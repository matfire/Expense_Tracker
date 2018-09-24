"""expense_tracker URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.urls import path, include
from django.contrib import admin
from django.contrib.auth import views as auth_views
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.csrf import ensure_csrf_cookie
from Administration.views import CustomTokenAuth, get_user_from_token


urlpatterns = [
    url(r'^admin/', admin.site.urls),
    path('api-auth/', include("rest_framework.urls")),
    path("api/budget/", include("Budget.api.urls")),
    path("api/users/", include("Administration.api.urls")),
    path("rest-auth/registration/", include("rest_auth.registration.urls")),
    path("get_user/", get_user_from_token.as_view()),    
]
from rest_framework.authtoken import views
urlpatterns += [
    url(r'^api-token-auth/', CustomTokenAuth.as_view()),
]
