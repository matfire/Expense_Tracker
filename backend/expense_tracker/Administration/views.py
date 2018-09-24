from django.shortcuts import render
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework.views import APIView

user = get_user_model()
# Create your views here.
class UserSerializer(serializers.ModelSerializer):
	class Meta:
		model = user
		fields = ("username", "email", "first_name", "last_name")

class CustomTokenAuth(ObtainAuthToken):
	def post(self, request, *args, **kwargs):
		response = super(CustomTokenAuth, self).post(request, *args, **kwargs)
		token = Token.objects.get(key=response.data['token'])
		user_instance = user.objects.get(id=token.user_id)
		user_serialized = UserSerializer(user_instance)
		return Response({'token': token.key, 'user':user_serialized.data})

class get_user_from_token(APIView):
	def post(self, request, format=None):
		print(request.data)
		token = Token.objects.get(key=request.data["token"])
		user_instance = user.objects.get(id=token.user_id)
		user_serialized = UserSerializer(user_instance)
		return Response({'user':user_serialized.data})
