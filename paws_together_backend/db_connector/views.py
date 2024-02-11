from django.shortcuts import render
from rest_framework import viewsets
from .models import Pet
from .serializers import PetSerializer
from django.http import JsonResponse
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from rest_framework import status
# Create your views here.

class PetPagination(PageNumberPagination):
    page_size = 5  # Set the number of items per page
    page_size_query_param = 'page_size'
    max_page_size = 100

    def get_paginated_response(self, data):
        return Response({
            'is_next_page': self.get_next_link() is not None,
            'pets': data
        })
class PetViewSet(viewsets.ModelViewSet):
    # authentication_classes = [TokenAuthentication]
    # permission_classes = [IsAuthenticated]
    queryset = Pet.objects.all()
    serializer_class = PetSerializer
    pagination_class = PetPagination

    def get_queryset(self):
        queryset = Pet.objects.all()

        # Get query parameters
        type = self.request.query_params.get('type', None)
        breed = self.request.query_params.get('breed', None)
        availability = self.request.query_params.get('availability', None)
        dispositions = self.request.query_params.getlist('disposition')

        # Filter queryset based on query parameters
        if type is not None:
            queryset = queryset.filter(type=type)
        if breed is not None:
            queryset = queryset.filter(breed=breed)
        if availability is not None:
            queryset = queryset.filter(availability=availability)
        if dispositions is not None:
            for disposition in dispositions:
                queryset = queryset.filter(disposition__contains=[disposition])
        
        return queryset
    
    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        # Customize the response as needed
        return Response({
            'id': response.data['id'],
            'picture_url': response.data['picture_url']
        }, status=status.HTTP_201_CREATED)

    def partial_update(self, request, *args, **kwargs):
        response = super().partial_update(request, *args, **kwargs)
        # Customize the response to include message and optionally picture_url
        return Response({
            'message': 'Pet profile updated successfully',
            'picture_url': response.data.get('picture_url')
        })

def breed_options(request, type=None):
    if type == 'dog':
        options = Pet.DOG_BREEDS
    elif type == 'cat':
        options = Pet.CAT_BREEDS
    else:
        options = ['Other']
    
    return JsonResponse(options, safe=False)
