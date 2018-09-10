from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth import authenticate


user_model = get_user_model()


class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = user_model
        fields = ('id', 'username', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'],
                                        None,
                                        validated_data['password'])
        return user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = user_model
        fields = ('id', 'username')



class LoginUserSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Unable to log in with provided credentials.")