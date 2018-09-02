from django.db import models
from django.contrib.auth import get_user_model


# Create your models here.

user_model = get_user_model()

class Inlet_Category(models.Model):
    name = models.CharField(max_length=250)
    user = models.ForeignKey(user_model, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class Inlet(models.Model):
    name = models.CharField(max_length=250)
    description = models.TextField(null=True, blank=True)
    category = models.ForeignKey(Inlet_Category, on_delete=models.CASCADE)
    user = models.ForeignKey(user_model, on_delete=models.CASCADE, blank=True, null=True)
    value = models.DecimalField(decimal_places=2, max_digits=10, default=0)