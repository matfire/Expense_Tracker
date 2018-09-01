from rest_framework import serializers
from Budget.models import Inlet_Category

class Inlet_Category_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Inlet_Category
        fields = ("name",)
    