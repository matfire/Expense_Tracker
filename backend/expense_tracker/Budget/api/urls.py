from django.urls import path

from . import views

urlpatterns = [
    path("category/", views.Inlet_Category_list.as_view()),
    path("category/chart/", views.get_inlet_category_chart),
    path("inlet/", views.Inlet_List.as_view()),
    path("inlet/add/", views.Inlet_Create.as_view()),
    path("inlet/chart/", views.get_expenses_by_month),
]