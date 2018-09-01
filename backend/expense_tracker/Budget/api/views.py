from rest_framework.generics import ListAPIView, RetrieveAPIView, ListCreateAPIView
from Budget.models import Inlet_Category
from .serializers import Inlet_Category_Serializer
from rest_framework.response import Response
from rest_framework import status

class Inlet_Category_list(ListCreateAPIView):
    serializer_class = Inlet_Category_Serializer

    def get_queryset(self):
        queryset = Inlet_Category.objects.all()

        if self.request.user.is_authenticated:
            queryset = queryset.filter(user=self.request.user)
        return queryset
    
    def post(self, request, format=None):
        serializer = Inlet_Category_Serializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class Inlet_Category_add(RetrieveAPIView):
    queryset = Inlet_Category.objects.all()
    serializer_class = Inlet_Category_Serializer
