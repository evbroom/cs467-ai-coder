from django.test import TestCase, Client, override_settings
from django.db import models
from django.urls import reverse
from .models import Pet
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from rest_framework.test import APIClient, APITestCase
from rest_framework import status
from rest_framework.authtoken.models import Token
from authentication.serializers import UserSignupSerializer
from rest_framework.exceptions import ValidationError as DRFValidationError
from django.core.files.uploadedfile import SimpleUploadedFile
import os
import shutil
from django.conf import settings
from io import BytesIO
from PIL import Image
import json
class UserTestCase(TestCase):

    def setUp(self):
        """Sets up the database for the tests."""
        User.objects.create(username="testuser1", password="password123", email="test1@example.com", is_staff=True)

    def test_valid_user_creation(self):
        """Tests that a valid user can be created."""
        user = User.objects.create(username="testuser2", password="password456", email="test2@example.com", is_staff=False)
        self.assertEqual(user.username, "testuser2")

    def test_username_uniqueness(self):
        """Tests that a user with a duplicate username cannot be created."""
        with self.assertRaises(ValidationError):
            user = User(username="testuser1", password="password789", email="test3@example.com", is_staff=False)
            user.full_clean()

    def test_email_uniqueness(self):
        """Tests that a user with a duplicate email cannot be created through the serializer."""
        # Data for creating the first user
        user_data1 = {
            "username": "testuser5",
            "email": "test5@example.com",
            "password": "password123"
        }

        # Data for creating the second user with a duplicate email
        user_data2 = {
            "username": "testuser6",
            "email": "test5@example.com",  # Duplicate email
            "password": "password456"
        }

        # Create the first user through the serializer
        serializer1 = UserSignupSerializer(data=user_data1)
        self.assertTrue(serializer1.is_valid(), serializer1.errors)
        serializer1.save()

        # Attempt to create the second user and expect it to be invalid due to duplicate email
        serializer2 = UserSignupSerializer(data=user_data2)
        self.assertFalse(serializer2.is_valid())
        self.assertIn('email', serializer2.errors)
        self.assertEqual(serializer2.errors['email'][0], 'A user with that email already exists.')


    def test_max_length_constraints(self):
        """Tests that the max length constraints are enforced."""
        # Assuming the max length for username, password, and email is 255
        long_string = 'a' * 256
        with self.assertRaises(ValidationError):
            user = User(username=long_string, password="password123", email="test4@example.com", is_staff=False)
            user.full_clean()

        with self.assertRaises(ValidationError):
            user = User(username="testuser4", password=long_string, email="test5@example.com", is_staff=False)
            user.full_clean()

        with self.assertRaises(ValidationError):
            user = User(username="testuser5", password="password123", email=long_string, is_staff=False)
            user.full_clean()

    def test_invalid_is_staffs(self):
        """Tests that an invalid account type raises a ValidationError."""
        with self.assertRaises(ValidationError):
            user = User(username="testuser6", password="password123", email="test6@example.com", is_staff="invalid_type")
            user.full_clean()

    def test_is_staff_validity(self):
        """Tests that the account type is correctly saved."""
        user_admin = User.objects.create(username="adminuser", password="password123", email="admin@example.com", is_staff=True)
        user_public = User.objects.create(username="publicuser", password="password123", email="public@example.com", is_staff=False)
        self.assertEqual(user_admin.is_staff, True)
        self.assertEqual(user_public.is_staff, False)

class PetTestCase(TestCase):
    def setUp(self):
        """Sets up the database for the tests."""
        Pet.objects.create(type='dog', breed='Bulldog', availability='available', disposition=['good_with_children'])

    def test_pet_creation(self):
        """Tests that the Pet is correctly created."""
        pet = Pet.objects.filter(type='dog', breed='Bulldog').first()
        self.assertEqual(pet.type, 'dog')
        self.assertEqual(pet.breed, 'Bulldog')
        self.assertEqual(pet.availability, 'available')
        self.assertEqual(pet.disposition, ['good_with_children'])

    def test_type_field_choices(self):
        """Tests that the type field choices are correct."""
        pet = Pet.objects.create(type='cat', breed='Siamese', availability='available', disposition=['good_with_animals'])
        self.assertEqual(pet.type, 'cat')

    def test_invalid_pet_type(self):
        """Tests that an invalid pet type raises a ValidationError."""
        with self.assertRaises(ValidationError):
            pet = Pet.objects.create(type='unicorn', breed='Unknown', availability='available', disposition=['good_with_animals'])
            pet.full_clean()

    def test_invalid_disposition(self):
        """Tests that an invalid disposition raises a ValidationError."""
        with self.assertRaises(ValidationError):
            pet = Pet.objects.create(type='dog', breed='Labrador Retriever', availability='available', disposition=['bad_with_pets'])
            pet.full_clean()

    def test_invalid_breed(self):
        """Tests that an invalid breed raises a ValidationError."""
        with self.assertRaises(ValidationError):
            pet = Pet.objects.create(type='dog', breed='Unknown', availability='available', disposition=['good_with_animals'])
            pet.full_clean()
    
    def test_invalid_availability(self):
        """Tests that an invalid availability raises a ValidationError."""
        with self.assertRaises(ValidationError):
            pet = Pet.objects.create(type='dog', breed='Labrador Retriever', availability='unknown', disposition=['good_with_animals'])
            pet.full_clean()
    
    def test_invalid_picture_url(self):
        """Tests that an invalid picture URL raises a ValidationError."""
        with self.assertRaises(ValidationError):
            pet = Pet.objects.create(type='dog', breed='Labrador Retriever', availability='available', disposition=['good_with_animals'], picture_url='invalid_url')
            pet.full_clean()

    def test_invalid_description(self):
        """Tests that an invalid description raises a ValidationError."""
        with self.assertRaises(ValidationError):
            pet = Pet.objects.create(type='dog', breed='Labrador Retriever', availability='available', disposition=['good_with_animals'], description='a' * 1001)
            pet.full_clean()
    
    def test_valid_disposition(self):
        """Tests that a valid disposition is saved correctly."""
        pet = Pet.objects.create(type='dog', breed='Labrador Retriever', availability='available', disposition=['good_with_animals', 'leash_needed'])
        self.assertEqual(pet.disposition, ['good_with_animals', 'leash_needed'])
    
    def test_availability_choices(self):
        """Tests that the availability choices are correct."""
        pet = Pet.objects.create(
            type="dog", 
            breed="Beagle", 
            disposition=["leash_needed"], 
            picture_url="http://example.com/dog2.jpg", 
            availability="adopted", 
            description="Adopted dog"
        )
        self.assertEqual(pet.availability, "adopted")

    def test_date_auto_creation(self):
        """Tests that the date_created field is automatically created."""
        pet = Pet.objects.create(
            type="cat", 
            breed="Bengal", 
            disposition=["good_with_children"], 
            picture_url="http://example.com/cat2.jpg", 
            availability="pending", 
            description="Playful cat"
        )
        self.assertIsNotNone(pet.date_created)

    def test_filtering_by_type(self):
        """Tests that filtering by type works correctly."""
        Pet.objects.create(
            type="cat", 
            breed="Siamese", 
            disposition=["leash_needed"], 
            picture_url="http://example.com/cat.jpg", 
            availability="available", 
            description="Quiet cat"
        )
        dogs = Pet.objects.filter(type="dog")
        self.assertTrue(dogs.exists())
        cats = Pet.objects.filter(type="cat")
        self.assertTrue(cats.exists())
    
    def test_filtering_by_breed(self):
        """Tests that filtering by breed works correctly."""
        Pet.objects.create(
            type="dog", 
            breed="Labrador Retriever", 
            disposition=["leash_needed"], 
            picture_url="http://example.com/dog.jpg", 
            availability="available", 
            description="Friendly dog"
        )
        labs = Pet.objects.filter(breed="Labrador Retriever")
        self.assertTrue(labs.exists())
        siamese = Pet.objects.filter(breed="Siamese")
        self.assertFalse(siamese.exists())

    def test_filtering_by_disposition(self):
        """Tests that filtering by disposition works correctly."""
        Pet.objects.create(
            type="cat", 
            breed="Siamese", 
            disposition=["leash_needed"], 
            picture_url="http://example.com/cat.jpg", 
            availability="available", 
            description="Quiet cat"
        )
        good_with_animals = Pet.objects.filter(disposition__contains=["good_with_animals"])
        self.assertFalse(good_with_animals.exists())
        good_with_children = Pet.objects.filter(disposition__contains=["good_with_children"])
        self.assertTrue(good_with_children.exists())
        leash_needed = Pet.objects.filter(disposition__contains=["leash_needed"])
        self.assertTrue(leash_needed.exists())
    
    def test_filtering_by_picture_url(self):
        """Tests that filtering by picture URL works correctly."""
        Pet.objects.create(
            type="cat", 
            breed="Siamese", 
            disposition=["leash_needed"], 
            picture_url="http://example.com/cat.jpg", 
            availability="available", 
            description="Quiet cat"
        )
        cat = Pet.objects.filter(picture_url="http://example.com/cat.jpg")
        self.assertTrue(cat.exists())
        dog = Pet.objects.filter(picture_url="http://example.com/dog.jpg")
        self.assertFalse(dog.exists())

    def test_filtering_by_availability(self):
        """Tests that filtering by availability works correctly."""
        Pet.objects.create(
            type="cat", 
            breed="Siamese", 
            disposition=["leash_needed"], 
            picture_url="http://example.com/cat.jpg", 
            availability="adopted", 
            description="Quiet cat"
        )
        available_pets = Pet.objects.filter(availability="available")
        self.assertTrue(available_pets.exists())
        adopted_pets = Pet.objects.filter(availability="adopted")
        self.assertTrue(adopted_pets.exists())

@override_settings(DEFAULT_FILE_STORAGE='django.core.files.storage.FileSystemStorage')
class PetAPITestCase(APITestCase):
    def setUp(self):
        """Sets up the database for the tests."""
        # Create a test user
        self.test_user = User.objects.create_user(username='testuser', password='testpassword', email="test1@example.com", is_staff=True)
        self.test_user.save()

        # Create a token for the test user and authenticate
        self.client = APIClient()
        token = Token.objects.create(user=self.test_user)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)

        # Create an image file for the test
        image = Image.new('RGB', (100, 100))
        image_file = BytesIO()
        image.save(image_file, 'jpeg')
        image_file.seek(0)

        # Create a SimpleUploadedFile object from the BytesIO object
        image_content_file = SimpleUploadedFile('test.jpg', image_file.getvalue(), content_type='image/jpeg')


        self.pet_data = {
            "type": "dog", 
            "breed": "Bulldog", 
            "availability": "available", 
            "disposition": ["good_with_children"],
            "picture_url": image_content_file,
            "description": "A friendly bulldog."
        }
        self.response = self.client.post(
            reverse('pet-list'),
            self.pet_data,
            format="multipart"
        )

        # self.created_pet_picture_url = Pet.objects.get().picture_url
        # print('created_pet_picture_url: ', self.created_pet_picture_url)

    def test_api_can_create_an_pet(self):
        """Test the api has pet creation capability."""
        self.assertEqual(self.response.status_code, status.HTTP_201_CREATED)

    def test_api_can_get_an_pet(self):
        """Test the api can get a given pet."""
        pet = Pet.objects.get()
        response = self.client.get(
            reverse('pet-detail', kwargs={'pk': pet.id}), format="json")
        
        # response_path = urlparse(response.data['picture_url']).path
        # expected_path = urlparse(str(self.created_pet_picture_url)).path

        expected_data = {
            'id': pet.id,
            'type': pet.type,
            'breed': pet.breed,
            'availability': pet.availability,
            'disposition': pet.disposition,
            'picture_url': pet.picture_url,
            'description': pet.description,
            'news': pet.news
        }
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # date_created is in the response, but we don't need it in the expected_data
        self.assertTrue('date_created' in response.data)
        response.data.pop('date_created')

        # Convert the ImageFieldFile object to a string
        expected_data['picture_url'] = 'http://testserver/' + str(expected_data['picture_url'])

        self.assertEqual(response.data, expected_data)
    
    def test_api_can_update_pet(self):
        """Test the api can update a given pet."""
        pet = Pet.objects.get()

        # Create a new image file
        image = Image.new('RGB', (100, 100))
        image_file = BytesIO()
        image.save(image_file, 'jpeg')
        image_file.seek(0)

        # Create a new image file
        new_image = SimpleUploadedFile(
            name='new_test.jpg',
            content=image_file.getvalue(),
            content_type='image/jpeg'
        )

        change_pet = {
            'type': 'dog',
            'breed': 'Boxer',
            'availability': 'available',
            'disposition': ['good_with_animals'],
            # 'picture_url': new_image,
            'description': pet.description
        }
        res = self.client.patch(
            reverse('pet-detail', kwargs={'pk': pet.id}),
            {'picture_url': new_image, 'data': json.dumps(change_pet)},  # Pass the image file separately from the JSON data
            format='multipart'
        )

        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_api_can_delete_pet(self):
        """Test the api can delete a pet."""
        pet = Pet.objects.get()
        response = self.client.delete(
            reverse('pet-detail', kwargs={'pk': pet.id}),
            format='json', follow=True)
        self.assertEquals(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_api_can_get_all_pets(self):
        """Test the api can get a list of all pets."""
        # Delete all pets from setUp
        Pet.objects.all().delete()

        # Create some pets
        Pet.objects.create(type='dog', breed='Bulldog', availability='available', disposition=['good_with_children'], picture_url='http://example.com/dog.jpg', description='A friendly bulldog.')
        Pet.objects.create(type='cat', breed='Siamese', availability='available', disposition=['good_with_animals'], picture_url='http://example.com/cat.jpg', description='A friendly cat.')

        # Send a GET request to the API
        response = self.client.get(reverse('pet-list'), format='json')

        # Check that the status code is 200
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Check that the number of pets returned is correct
        self.assertEqual(len(response.data), 2)


    def test_api_returns_error_for_invalid_pet_id(self):
        """Test the api returns an error for an invalid pet id."""
        # Send a GET request with an invalid id
        response = self.client.get(reverse('pet-detail', kwargs={'pk': 999}), format='json')

        # Check that the status code is 404
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_api_returns_error_for_invalid_data(self):
        """Test the api returns an error for invalid data."""
        # Send a POST request with invalid data
        invalid_data = {'type': 'elephant', 'breed': 'African', 'availability': 'available'}
        response = self.client.post(reverse('pet-list'), invalid_data, format='json')

        # Check that the status code is 400
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def tearDown(self):
        # Call the superclass's tearDown method first
        super().tearDown()

        # Delete the test image folder
        test_image_folder = os.path.join(settings.MEDIA_ROOT, 'pets')
        if os.path.isdir(test_image_folder):
            shutil.rmtree(test_image_folder)

class PetViewSetTestCase(TestCase):
    def setUp(self):
        # Create a test user
        self.test_user = User.objects.create_user(username='testuser', password='testpassword', email="test1@example.com", is_staff=True)
        self.test_user.save()

        # Create a token for the test user and authenticate
        self.client = APIClient()
        token = Token.objects.create(user=self.test_user)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)

        # Create five pets
        Pet.objects.create(type='dog', breed='Bulldog', availability='available', disposition=['good_with_children', 'good_with_animals'], picture_url='http://example.com/dog.jpg', description='A friendly bulldog.')
        Pet.objects.create(type='cat', breed='Siamese', availability='available', disposition=['good_with_animals'], picture_url='http://example.com/cat.jpg', description='A friendly cat.')
        Pet.objects.create(type='dog', breed='Labrador Retriever', availability='available', disposition=['good_with_children'], picture_url='http://example.com/dog2.jpg', description='A friendly labrador.')
        Pet.objects.create(type='cat', breed='Domestic Shorthair', availability='available', disposition=['good_with_animals'], picture_url='http://example.com/cat2.jpg', description='A friendly domestic shorthair.')
        Pet.objects.create(type='dog', breed='Beagle', availability='available', disposition=['good_with_children', 'leash_needed'], picture_url='http://example.com/dog3.jpg', description='A friendly beagle.')
        Pet.objects.create(type='other', breed='Other', availability='available', disposition=['good_with_children', 'leash_needed'], picture_url='http://example.com/other.jpg', description='A friendly other.')

    def test_type_filter_dog(self):
        """Test that the type filter works correctly."""
        response = self.client.get(reverse('pet-list'), {'type': 'dog'})
        response_data = response.json()
        pets = response_data.get('pets', [])
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(pets), 3)

    def test_type_filter_cat(self):
        """Test that the type filter works correctly."""
        response = self.client.get(reverse('pet-list'), {'type': 'cat'})
        response_data = response.json()
        pets = response_data.get('pets', [])
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(pets), 2)
    
    def test_type_filter_other(self):
        """Test that the other type filter works correctly."""
        response = self.client.get(reverse('pet-list'), {'type': 'other'})
        response_data = response.json()
        pets = response_data.get('pets', [])
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(pets), 1)

    def test_breed_filter(self):
        """Test that the breed filter works correctly."""
        response = self.client.get(reverse('pet-list'), {'breed': 'Bulldog'})
        response_data = response.json()
        pets = response_data.get('pets', [])
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(pets), 1)

    def test_availability_filter(self):
        """Test that the availability filter works correctly."""
        response = self.client.get(reverse('pet-list'), {'availability': 'available'})
        response_data = response.json()
        pets = response_data.get('pets', [])
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(pets), 6)

    def test_disposition_filter(self):
        """Test that the disposition filter works correctly."""
        response = self.client.get(reverse('pet-list'), {'disposition': 'good_with_children'})
        response_data = response.json()
        pets = response_data.get('pets', [])
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(pets), 4)
    
    def test_multiple_filters(self):
        """Test that multiple filters work correctly."""
        response = self.client.get(reverse('pet-list'), {'type': 'dog', 'availability': 'available'})
        response_data = response.json()
        pets = response_data.get('pets', [])
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(pets), 3)

    def test_multiple_dispositions_filter(self):
        """Test that multiple dispositions filter works correctly."""
        response = self.client.get(reverse('pet-list'), {'disposition': ['good_with_children', 'leash_needed']})
        response_data = response.json()
        pets = response_data.get('pets', [])
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(pets), 2)
    
    def test_empty_dispositions_filter(self):
        """Test that multiple dispositions filter works correctly."""
        response = self.client.get(reverse('pet-list'), {'disposition': ['good_with_children', 'leash_needed', 'good_with_animals']})
        response_data = response.json()
        pets = response_data.get('pets', [])
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(pets), 0)

    def test_breed_options(self):
        """Test that the breed options are returned correctly."""
        # Test with 'type' parameter set to 'dog'
        url = reverse('breed_options', kwargs={'type': 'dog'})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json(), Pet.DOG_BREEDS)

        # Test with 'type' parameter set to 'cat'
        url = reverse('breed_options', kwargs={'type': 'cat'})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json(), Pet.CAT_BREEDS)

        # Test with 'type' parameter to 'other'
        url = reverse('breed_options', kwargs={'type': 'other'})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json(), ['Other'])

from unittest.mock import MagicMock
class PetViewSetPermissionsTest(APITestCase):
    def setUp(self):
        self.client = APIClient()

        # Create a regular user and an admin user
        self.regular_user = User.objects.create_user(username='regular', password='password')
        self.admin_user = User.objects.create_superuser(username='admin', password='password')

        # Create a pet object for testing
        self.pet = Pet.objects.create(
            type='dog', 
            breed='Beagle', 
            availability='available', 
            disposition=['good_with_children', 'leash_needed'], 
            picture_url='http://example.com/dog3.jpg', 
            description='A friendly beagle.'
        )

    def test_regular_user_can_get_pets(self):
        self.client.force_authenticate(user=self.regular_user)
        response = self.client.get(reverse('pet-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_regular_user_cannot_create_pet(self):
        self.client.force_authenticate(user=self.regular_user)
        response = self.client.post(reverse('pet-list'), data={
            'type': 'dog', 
            'breed': 'Beagle', 
            'availability': 'available', 
            'disposition': ['good_with_children', 'leash_needed'], 
            'picture_url': 'http://example.com/dog3.jpg', 
            'description': 'A friendly beagle.'
        })
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
