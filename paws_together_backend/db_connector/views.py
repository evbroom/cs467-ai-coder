from django.shortcuts import render
from rest_framework import viewsets
from .models import Pet
from .serializers import PetSerializer
from django.http import JsonResponse
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from rest_framework import status
import os
import boto3
from botocore.exceptions import NoCredentialsError
from django.conf import settings
# Create your views here.

class PetPagination(PageNumberPagination):
    page_size = 100  # Set the number of items per page
    page_size_query_param = 'page_size'
    max_page_size = 100

    def get_paginated_response(self, data):
        return Response({
            'is_next_page': self.get_next_link() is not None,
            'pets': data
        })
class PetViewSet(viewsets.ModelViewSet):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = Pet.objects.all()
    serializer_class = PetSerializer
    pagination_class = PetPagination

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            permission_classes = [IsAuthenticated]
        elif self.action in ['create', 'update', 'partial_update', 'destroy']:
            permission_classes = [IsAdminUser]
        else:
            permission_classes = [IsAuthenticated]  # Default to IsAuthenticated if no action matches
        return [permission() for permission in permission_classes]

    def get_queryset(self):
        queryset = Pet.objects.all().order_by('id')

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

        # Get the picture file from the request
        picture_file = request.FILES.get('picture')
        if picture_file:
            # Configure the S3 client
            s3 = boto3.client('s3',
                              region_name='nyc3',
                              endpoint_url=settings.AWS_S3_ENDPOINT_URL,
                              aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
                              aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY)
        
            # Define the bucket and file name
            bucket_name = 'pawstogetherimgs'
            file_extension = os.path.splitext(picture_file.name)[1]
            file_name = f'pets/{response.data["id"]}/pet_picture{file_extension}'
            
            try:
                # Upload the file to DigitalOcean Spaces
                s3.upload_fileobj(picture_file, bucket_name, file_name)
                
                # Update the picture_url in the response
                response.data['picture_url'] = f'https://nyc3.digitaloceanspaces.com/{bucket_name}/{file_name}'
            except NoCredentialsError:
                print("No credentials available for uploading to DigitalOcean Spaces")
        
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
