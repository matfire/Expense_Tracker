from rest_framework import serializers
from Budget.models import Inlet_Category, Inlet

class Inlet_Category_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Inlet_Category
        fields = ("name", "id")

class Inlet_Get_Serializer(serializers.ModelSerializer):

    category = serializers.StringRelatedField()
    class Meta:
        model = Inlet
        fields = ("name", "description", "category", "value")

class Inlet_Add_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Inlet
        fields = ("name", "description", "category", "value")