from django.urls import path

from . import views

urlpatterns = [
    path("category/", views.Inlet_Category_list.as_view()),
    path("category/<pk>/", views.Inlet_Category_add.as_view()),
    path("inlet/", views.Inlet_List.as_view()),
    path("inlet/add/", views.Inlet_Create.as_view()),
]