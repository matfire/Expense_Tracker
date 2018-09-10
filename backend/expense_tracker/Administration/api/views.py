from rest_framework import viewsets, permissions, generics
from rest_framework.response import Response
from .serializers import CreateUserSerializer, UserSerializer, LoginUserSerializer
from django.contrib.auth import authenticate, login, logout
from rest_framework import status, permissions
from rest_framework.decorators import api_view, permission_classes
from expense_tracker.utils import CsrfExemptSessionAuthentication
from rest_framework.authentication import BasicAuthentication

@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def Login(request):
	username = request.data.get('username')
	password = request.data.get('password')
	user = authenticate(username=username, password=password)
	if user is not None:
        # the password verified for the user
		if user.is_active:
			login(request, user)
			return Response({"success":"logged in"}, status=status.HTTP_200_OK)
	return Response({"failure" : "wrong credentials"}, status=status.HTTP_400_BAD_REQUEST)
