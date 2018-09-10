from rest_framework.generics import ListAPIView, RetrieveAPIView, ListCreateAPIView, CreateAPIView
from Budget.models import Inlet_Category, Inlet
from .serializers import Inlet_Category_Serializer, Inlet_Get_Serializer, Inlet_Add_Serializer
from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework.decorators import api_view
from Administration.models import User
import random
import datetime

class Inlet_Category_list(ListCreateAPIView):
    serializer_class = Inlet_Category_Serializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        queryset = Inlet_Category.objects.all()

        queryset = queryset.filter(user=self.request.user)
        return queryset
    
    def post(self, request, format=None):
        serializer = Inlet_Category_Serializer(data=request.data)
        if serializer.is_valid():
            r = lambda: random.randint(0,255)
            color = '#{:02x}{:02x}{:02x}'.format(r(), r(), r())
            serializer.save(user=request.user, color=color)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class Inlet_Category_add(RetrieveAPIView):
    queryset = Inlet_Category.objects.all()
    serializer_class = Inlet_Category_Serializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

class Inlet_List(ListAPIView):
    serializer_class = Inlet_Get_Serializer
    permission_classes = (permissions.IsAuthenticated,)
    def get_queryset(self):
        queryset = Inlet.objects.all()
        queryset = queryset.filter(user=self.request.user).order_by("date")
        return queryset


class Inlet_Create(CreateAPIView):
    serializer_class = Inlet_Add_Serializer
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, format=None):
        serializer = Inlet_Add_Serializer(data=request.data)
        if request.data.get("date"):
            serializer.initial_data["date"] = serializer.initial_data["date"][0:10]
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["GET"])
def get_inlet_category_chart(request):
    permission_classes = (permissions.IsAuthenticated,)
    if request.user.is_authenticated:
        categories = Inlet_Category.objects.filter(user=request.user)
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)

    data = []
    for category in categories:
        instance = {
            "x" : category.name,
            "color" : category.color,
            "y" : Inlet.objects.filter(category=category).count()
        }
        data.append(instance)
    return Response(data, status=status.HTTP_201_CREATED)


@api_view(["GET"])
def get_expenses_by_month(request):
    data = []

    for i in range(1, 13):
        current_month = ""
        if i == 1:
            current_month = "Jan"
        elif i == 2:
            current_month = "Feb"
        elif i == 3:
            current_month = "Mar"
        elif i == 4:
            current_month = "Apr"
        elif i == 5:
            current_month = "May"
        elif i == 6:
            current_month = "June"
        elif i == 7:
            current_month = "July"
        elif i == 8:
            current_month = "Aug"
        elif i == 9:
            current_month = "Sept"
        elif i == 10:
            current_month = "Oct"
        elif i == 11:
            current_month = "Nov"
        elif i == 12:
            current_month = "Dec"
        results = {
            "month" : current_month,
            "amount" : 0}
        instances =  Inlet.objects.all().filter(user=request.user).filter(date__month=i).filter(date__year=datetime.datetime.now().year)
        for instance in instances:
            results["amount"] = results["amount"] + instance.value
        data.append(results)
    return Response(data, status=status.HTTP_201_CREATED)