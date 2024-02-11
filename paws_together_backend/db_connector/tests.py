from django.test import TestCase, Client
from django.db import models
from django.urls import reverse
from .models import Pet
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from rest_framework.test import APIClient, APITestCase
from rest_framework import status
from rest_framework.authtoken.models import Token



class UserTestCase(TestCase):

    def setUp(self):
        """Sets up the database for the tests."""
        User.objects.create(username="testuser1", password="password123", email="test1@example.com", is_staff=True)
        self.token = Token.objects.create(user=self.user)

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
        """Tests that a user with a duplicate email cannot be created."""
        with self.assertRaises(ValidationError):
            user = User(username="testuser3", password="password789", email="test1@example.com", is_staff=False)
            user.full_clean()

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
        pet = Pet.objects.create(type='cat', breed='Siamese', availability='available', disposition=['good_with_pets'])
        self.assertEqual(pet.type, 'cat')

    def test_invalid_pet_type(self):
        """Tests that an invalid pet type raises a ValidationError."""
        with self.assertRaises(ValidationError):
            pet = Pet.objects.create(type='unicorn', breed='Unknown', availability='available', disposition=['good_with_pets'])
            pet.full_clean()

    def test_invalid_disposition(self):
        """Tests that an invalid disposition raises a ValidationError."""
        with self.assertRaises(ValidationError):
            pet = Pet.objects.create(type='dog', breed='Labrador Retriever', availability='available', disposition=['bad_with_pets'])
            pet.full_clean()

    def test_invalid_breed(self):
        """Tests that an invalid breed raises a ValidationError."""
        with self.assertRaises(ValidationError):
            pet = Pet.objects.create(type='dog', breed='Unknown', availability='available', disposition=['good_with_pets'])
            pet.full_clean()
    
    def test_invalid_availability(self):
        """Tests that an invalid availability raises a ValidationError."""
        with self.assertRaises(ValidationError):
            pet = Pet.objects.create(type='dog', breed='Labrador Retriever', availability='unknown', disposition=['good_with_pets'])
            pet.full_clean()
    
    def test_invalid_picture_url(self):
        """Tests that an invalid picture URL raises a ValidationError."""
        with self.assertRaises(ValidationError):
            pet = Pet.objects.create(type='dog', breed='Labrador Retriever', availability='available', disposition=['good_with_pets'], picture_url='invalid_url')
            pet.full_clean()

    def test_invalid_description(self):
        """Tests that an invalid description raises a ValidationError."""
        with self.assertRaises(ValidationError):
            pet = Pet.objects.create(type='dog', breed='Labrador Retriever', availability='available', disposition=['good_with_pets'], description='a' * 1001)
            pet.full_clean()
    
    def test_valid_disposition(self):
        """Tests that a valid disposition is saved correctly."""
        pet = Pet.objects.create(type='dog', breed='Labrador Retriever', availability='available', disposition=['good_with_pets', 'leash_needed'])
        self.assertEqual(pet.disposition, ['good_with_pets', 'leash_needed'])
    
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
        good_with_pets = Pet.objects.filter(disposition__contains=["good_with_pets"])
        self.assertFalse(good_with_pets.exists())
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

class PetAPITestCase(APITestCase):
    def setUp(self):
        # Create a user and generate a token for authentication
        self.user = User.objects.create_user(username='testuser', email='test@example.com', password='testpassword')
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.user.token.key)
        
        # Create initial pet instance for testing
        self.pet = Pet.objects.create(
            type='dog', breed='Labrador Retriever', availability='available', 
            disposition=['good_with_children'], picture_url='http://example.com/dog.jpg', description='Friendly dog')

    def test_get_pet_list_authenticated(self):
        """Ensure authenticated user can retrieve the pet list."""
        url = reverse('pets-list')  # Assuming 'pets' is the registered basename in urls.py
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_pet_authenticated(self):
        """Ensure authenticated user can create a new pet."""
        url = reverse('pets-list')  # Assuming 'pets' is the registered basename in urls.py
        data = {
            'type': 'cat', 'breed': 'Siamese', 'availability': 'available', 
            'disposition': ['good_with_children'], 'picture_url': 'http://example.com/cat.jpg', 
            'description': 'Playful cat'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_pet_detail_authenticated(self):
        """Ensure authenticated user can retrieve a pet detail."""
        url = reverse('pets-detail', kwargs={'pk': self.pet.pk})  # Adjust URL name as needed
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_pet_authenticated(self):
        """Ensure authenticated user can update a pet."""
        url = reverse('pets-detail', kwargs={'pk': self.pet.pk})  # Adjust URL name as needed
        data = {'description': 'Very friendly dog'}
        response = self.client.patch(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.pet.refresh_from_db()
        self.assertEqual(self.pet.description, 'Very friendly dog')

    def test_delete_pet_authenticated(self):
        """Ensure authenticated user can delete a pet."""
        url = reverse('pets-detail', kwargs={'pk': self.pet.pk})  # Adjust URL name as needed
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Pet.objects.filter(pk=self.pet.pk).exists())

class PetViewSetTestCase(TestCase):
    def setUp(self):
        self.client = Client()

        # Create five pets
        Pet.objects.create(type='dog', breed='Bulldog', availability='available', disposition=['good_with_children', 'good_with_pets'], picture_url='http://example.com/dog.jpg', description='A friendly bulldog.')
        Pet.objects.create(type='cat', breed='Siamese', availability='available', disposition=['good_with_pets'], picture_url='http://example.com/cat.jpg', description='A friendly cat.')
        Pet.objects.create(type='dog', breed='Labrador Retriever', availability='available', disposition=['good_with_children'], picture_url='http://example.com/dog2.jpg', description='A friendly labrador.')
        Pet.objects.create(type='cat', breed='Domestic Shorthair', availability='available', disposition=['good_with_pets'], picture_url='http://example.com/cat2.jpg', description='A friendly domestic shorthair.')
        Pet.objects.create(type='dog', breed='Beagle', availability='available', disposition=['good_with_children', 'leash_needed'], picture_url='http://example.com/dog3.jpg', description='A friendly beagle.')
        Pet.objects.create(type='other', breed='Other', availability='available', disposition=['good_with_children', 'leash_needed'], picture_url='http://example.com/other.jpg', description='A friendly other.')

    def test_type_filter_dog(self):
        """Test that the type filter works correctly."""
        response = self.client.get(reverse('pet-list'), {'type': 'dog'})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 3)

    def test_type_filter_cat(self):
        """Test that the type filter works correctly."""
        response = self.client.get(reverse('pet-list'), {'type': 'cat'})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 2)
    
    def test_type_filter_other(self):
        """Test that the other type filter works correctly."""
        response = self.client.get(reverse('pet-list'), {'type': 'other'})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 1)

    def test_breed_filter(self):
        """Test that the breed filter works correctly."""
        response = self.client.get(reverse('pet-list'), {'breed': 'Bulldog'})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 1)

    def test_availability_filter(self):
        """Test that the availability filter works correctly."""
        response = self.client.get(reverse('pet-list'), {'availability': 'available'})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 6)

    def test_disposition_filter(self):
        """Test that the disposition filter works correctly."""
        response = self.client.get(reverse('pet-list'), {'disposition': 'good_with_children'})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 4)
    
    def test_multiple_filters(self):
        """Test that multiple filters work correctly."""
        response = self.client.get(reverse('pet-list'), {'type': 'dog', 'availability': 'available'})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 3)

    def test_multiple_dispositions_filter(self):
        """Test that multiple dispositions filter works correctly."""
        response = self.client.get(reverse('pet-list'), {'disposition': ['good_with_children', 'leash_needed']})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 2)
    
    def test_empty_dispositions_filter(self):
        """Test that multiple dispositions filter works correctly."""
        response = self.client.get(reverse('pet-list'), {'disposition': ['good_with_children', 'leash_needed', 'good_with_pets']})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 0)

    def test_breed_options(self):
        """Test that the breed options are returned correctly."""
        # Test with 'type' parameter set to 'dog'
        response = self.client.get(reverse('breed_options'), {'type': 'dog'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json(), Pet.DOG_BREEDS)

        # Test with 'type' parameter set to 'cat'
        response = self.client.get(reverse('breed_options'), {'type': 'cat'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json(), Pet.CAT_BREEDS)

        # Test with 'type' parameter to 'other'
        response = self.client.get(reverse('breed_options'), {'type': 'other'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json(), ['Other'])
