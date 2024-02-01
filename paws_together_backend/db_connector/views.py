from django.shortcuts import render
from rest_framework import viewsets
from .models import Animal
from .serializers import AnimalSerializer
# Create your views here.

class AnimalViewSet(viewsets.ModelViewSet):
    queryset = Animal.objects.all()
    serializer_class = AnimalSerializer
