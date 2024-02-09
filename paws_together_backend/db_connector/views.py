from django.shortcuts import render
from rest_framework import viewsets
from .models import Animal
from .serializers import AnimalSerializer
from django.http import JsonResponse
# Create your views here.

class AnimalViewSet(viewsets.ModelViewSet):
    queryset = Animal.objects.all()
    serializer_class = AnimalSerializer

    def get_queryset(self):
        queryset = Animal.objects.all()

        # Get query parameters
        type = self.request.query_params.get('type', None)
        breed = self.request.query_params.get('breed', None)
        availability = self.request.query_params.get('availability', None)
        disposition = self.request.query_params.get('disposition', None)

        # Filter queryset based on query parameters
        if type is not None:
            queryset = queryset.filter(type=type)
        if breed is not None:
            queryset = queryset.filter(breed=breed)
        if availability is not None:
            queryset = queryset.filter(availability=availability)
        if disposition is not None:
            queryset = queryset.filter(disposition__contains=[disposition])
        
        return queryset

def breed_options(request):
    type = request.GET.get('type', None)
    if type == 'dog':
        options = Animal.DOG_BREEDS
    elif type == 'cat':
        options = Animal.CAT_BREEDS
    else:
        options = ['Other']
    
    return JsonResponse(options, safe=False)
