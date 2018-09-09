from django.urls import path
from . import views

urlpatterns = [
    # path("create/", views.RegistrationAPI.as_view()),
    path("login/", views.Login),
    # path("", views.UserAPI.as_view()),
]