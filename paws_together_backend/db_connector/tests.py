from django.test import TestCase, Client
from django.db import models
from django.urls import reverse
from .models import User, Pet
from django.core.exceptions import ValidationError
from rest_framework.test import APIClient, APITestCase
from rest_framework import status


class UserTestCase(TestCase):

    def setUp(self):
        """Sets up the database for the tests."""
        User.objects.create(username="testuser1", password="password123", email="test1@example.com", account_type="admin")

    def test_valid_user_creation(self):
        """Tests that a valid user can be created."""
        user = User.objects.create(username="testuser2", password="password456", email="test2@example.com", account_type="public")
        self.assertEqual(user.username, "testuser2")

    def test_username_uniqueness(self):
        """Tests that a user with a duplicate username cannot be created."""
        with self.assertRaises(ValidationError):
            user = User(username="testuser1", password="password789", email="test3@example.com", account_type="public")
            user.full_clean()

    def test_email_uniqueness(self):
        """Tests that a user with a duplicate email cannot be created."""
        with self.assertRaises(ValidationError):
            user = User(username="testuser3", password="password789", email="test1@example.com", account_type="public")
            user.full_clean()

    def test_max_length_constraints(self):
        """Tests that the max length constraints are enforced."""
        # Assuming the max length for username, password, and email is 255
        long_string = 'a' * 256
        with self.assertRaises(ValidationError):
            user = User(username=long_string, password="password123", email="test4@example.com", account_type="public")
            user.full_clean()

        with self.assertRaises(ValidationError):
            user = User(username="testuser4", password=long_string, email="test5@example.com", account_type="public")
            user.full_clean()

        with self.assertRaises(ValidationError):
            user = User(username="testuser5", password="password123", email=long_string, account_type="public")
            user.full_clean()

    def test_invalid_account_types(self):
        """Tests that an invalid account type raises a ValidationError."""
        with self.assertRaises(ValidationError):
            user = User(username="testuser6", password="password123", email="test6@example.com", account_type="invalid_type")
            user.full_clean()

    def test_account_type_validity(self):
        """Tests that the account type is correctly saved."""
        user_admin = User.objects.create(username="adminuser", password="password123", email="admin@example.com", account_type="admin")
        user_public = User.objects.create(username="publicuser", password="password123", email="public@example.com", account_type="public")
        self.assertEqual(user_admin.account_type, "admin")
        self.assertEqual(user_public.account_type, "public")

class PetTestCase(TestCase):
    def setUp(self):
        """Sets up the database for the tests."""
        Pet.objects.create(type='dog', breed='Bulldog', availability='available', disposition=['good_with_children'])

    def test_animal_creation(self):
        """Tests that the Pet is correctly created."""
        animal = Pet.objects.filter(type='dog', breed='Bulldog').first()
        self.assertEqual(animal.type, 'dog')
        self.assertEqual(animal.breed, 'Bulldog')
        self.assertEqual(animal.availability, 'available')
        self.assertEqual(animal.disposition, ['good_with_children'])

    def test_type_field_choices(self):
        """Tests that the type field choices are correct."""
        animal = Pet.objects.create(type='cat', breed='Siamese', availability='available', disposition=['good_with_animals'])
        self.assertEqual(animal.type, 'cat')

    def test_invalid_animal_type(self):
        """Tests that an invalid animal type raises a ValidationError."""
        with self.assertRaises(ValidationError):
            animal = Pet.objects.create(type='unicorn', breed='Unknown', availability='available', disposition=['good_with_animals'])
            animal.full_clean()

    def test_invalid_disposition(self):
        """Tests that an invalid disposition raises a ValidationError."""
        with self.assertRaises(ValidationError):
            animal = Pet.objects.create(type='dog', breed='Labrador Retriever', availability='available', disposition=['bad_with_animals'])
            animal.full_clean()

    def test_invalid_breed(self):
        """Tests that an invalid breed raises a ValidationError."""
        with self.assertRaises(ValidationError):
            animal = Pet.objects.create(type='dog', breed='Unknown', availability='available', disposition=['good_with_animals'])
            animal.full_clean()
    
    def test_invalid_availability(self):
        """Tests that an invalid availability raises a ValidationError."""
        with self.assertRaises(ValidationError):
            animal = Pet.objects.create(type='dog', breed='Labrador Retriever', availability='unknown', disposition=['good_with_animals'])
            animal.full_clean()
    
    def test_invalid_picture_url(self):
        """Tests that an invalid picture URL raises a ValidationError."""
        with self.assertRaises(ValidationError):
            animal = Pet.objects.create(type='dog', breed='Labrador Retriever', availability='available', disposition=['good_with_animals'], picture_url='invalid_url')
            animal.full_clean()

    def test_invalid_description(self):
        """Tests that an invalid description raises a ValidationError."""
        with self.assertRaises(ValidationError):
            animal = Pet.objects.create(type='dog', breed='Labrador Retriever', availability='available', disposition=['good_with_animals'], description='a' * 1001)
            animal.full_clean()
    
    def test_valid_disposition(self):
        """Tests that a valid disposition is saved correctly."""
        animal = Pet.objects.create(type='dog', breed='Labrador Retriever', availability='available', disposition=['good_with_animals', 'leash_needed'])
        self.assertEqual(animal.disposition, ['good_with_animals', 'leash_needed'])
    
    def test_availability_choices(self):
        """Tests that the availability choices are correct."""
        animal = Pet.objects.create(
            type="dog", 
            breed="Beagle", 
            disposition=["leash_needed"], 
            picture_url="http://example.com/dog2.jpg", 
            availability="adopted", 
            description="Adopted dog"
        )
        self.assertEqual(animal.availability, "adopted")

    def test_date_auto_creation(self):
        """Tests that the date_created field is automatically created."""
        animal = Pet.objects.create(
            type="cat", 
            breed="Bengal", 
            disposition=["good_with_children"], 
            picture_url="http://example.com/cat2.jpg", 
            availability="pending", 
            description="Playful cat"
        )
        self.assertIsNotNone(animal.date_created)

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
        available_animals = Pet.objects.filter(availability="available")
        self.assertTrue(available_animals.exists())
        adopted_animals = Pet.objects.filter(availability="adopted")
        self.assertTrue(adopted_animals.exists())

class PetAPITestCase(APITestCase):
    def setUp(self):
        """Sets up the database for the tests."""
        self.client = APIClient()
        self.animal_data = {
            "type": "dog", 
            "breed": "Bulldog", 
            "availability": "available", 
            "disposition": ["good_with_children"],
            "picture_url": "http://example.com/dog.jpg",
            "description": "A friendly bulldog."
        }
        self.response = self.client.post(
            reverse('animal-list'),
            self.animal_data,
            format="json"
        )   

    def test_api_can_create_an_animal(self):
        """Test the api has animal creation capability."""
        self.assertEqual(self.response.status_code, status.HTTP_201_CREATED)

    def test_api_can_get_an_animal(self):
        """Test the api can get a given animal."""
        animal = Pet.objects.get()
        response = self.client.get(
            reverse('animal-detail', kwargs={'pk': animal.id}), format="json")
        expected_data = {
            'id': animal.id,
            'type': animal.type,
            'breed': animal.breed,
            'availability': animal.availability,
            'disposition': animal.disposition,
            'picture_url': animal.picture_url,
            'description': animal.description
        }

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # date_created is in the response, but we don't need it in the expected_data
        self.assertTrue('date_created' in response.data)
        response.data.pop('date_created')
        self.assertEqual(response.data, expected_data)

    def test_api_can_update_animal(self):
        """Test the api can update a given animal."""
        animal = Pet.objects.get()

        change_animal = {
            'type': 'cat',
            'breed': 'Siamese',
            'availability': 'available',
            'disposition': ['good_with_animals'],
            'picture_url': animal.picture_url,
            'description': animal.description
        }
        res = self.client.put(
            reverse('animal-detail', kwargs={'pk': animal.id}),
            change_animal, format='json'
        )
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_api_can_delete_animal(self):
        """Test the api can delete a animal."""
        animal = Pet.objects.get()
        response = self.client.delete(
            reverse('animal-detail', kwargs={'pk': animal.id}),
            format='json', follow=True)
        self.assertEquals(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_api_can_get_all_animals(self):
        """Test the api can get a list of all animals."""
        # Delete all animals from setUp
        Pet.objects.all().delete()

        # Create some animals
        Pet.objects.create(type='dog', breed='Bulldog', availability='available', disposition=['good_with_children'], picture_url='http://example.com/dog.jpg', description='A friendly bulldog.')
        Pet.objects.create(type='cat', breed='Siamese', availability='available', disposition=['good_with_animals'], picture_url='http://example.com/cat.jpg', description='A friendly cat.')

        # Send a GET request to the API
        response = self.client.get(reverse('animal-list'), format='json')

        # Check that the status code is 200
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Check that the number of animals returned is correct
        self.assertEqual(len(response.data), 2)

    def test_api_returns_error_for_invalid_animal_id(self):
        """Test the api returns an error for an invalid animal id."""
        # Send a GET request with an invalid id
        response = self.client.get(reverse('animal-detail', kwargs={'pk': 999}), format='json')

        # Check that the status code is 404
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_api_returns_error_for_invalid_data(self):
        """Test the api returns an error for invalid data."""
        # Send a POST request with invalid data
        invalid_data = {'type': 'elephant', 'breed': 'African', 'availability': 'available'}
        response = self.client.post(reverse('animal-list'), invalid_data, format='json')

        # Check that the status code is 400
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

class PetViewSetTestCase(TestCase):
    def setUp(self):
        self.client = Client()

        # Create five animals
        Pet.objects.create(type='dog', breed='Bulldog', availability='available', disposition=['good_with_children', 'good_with_animals'], picture_url='http://example.com/dog.jpg', description='A friendly bulldog.')
        Pet.objects.create(type='cat', breed='Siamese', availability='available', disposition=['good_with_animals'], picture_url='http://example.com/cat.jpg', description='A friendly cat.')
        Pet.objects.create(type='dog', breed='Labrador Retriever', availability='available', disposition=['good_with_children'], picture_url='http://example.com/dog2.jpg', description='A friendly labrador.')
        Pet.objects.create(type='cat', breed='Domestic Shorthair', availability='available', disposition=['good_with_animals'], picture_url='http://example.com/cat2.jpg', description='A friendly domestic shorthair.')
        Pet.objects.create(type='dog', breed='Beagle', availability='available', disposition=['good_with_children', 'leash_needed'], picture_url='http://example.com/dog3.jpg', description='A friendly beagle.')
        Pet.objects.create(type='other', breed='Other', availability='available', disposition=['good_with_children', 'leash_needed'], picture_url='http://example.com/other.jpg', description='A friendly other.')

    def test_type_filter_dog(self):
        """Test that the type filter works correctly."""
        response = self.client.get(reverse('animal-list'), {'type': 'dog'})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 3)

    def test_type_filter_cat(self):
        """Test that the type filter works correctly."""
        response = self.client.get(reverse('animal-list'), {'type': 'cat'})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 2)
    
    def test_type_filter_other(self):
        """Test that the other type filter works correctly."""
        response = self.client.get(reverse('animal-list'), {'type': 'other'})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 1)

    def test_breed_filter(self):
        """Test that the breed filter works correctly."""
        response = self.client.get(reverse('animal-list'), {'breed': 'Bulldog'})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 1)

    def test_availability_filter(self):
        """Test that the availability filter works correctly."""
        response = self.client.get(reverse('animal-list'), {'availability': 'available'})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 6)

    def test_disposition_filter(self):
        """Test that the disposition filter works correctly."""
        response = self.client.get(reverse('animal-list'), {'disposition': 'good_with_children'})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 4)
    
    def test_multiple_filters(self):
        """Test that multiple filters work correctly."""
        response = self.client.get(reverse('animal-list'), {'type': 'dog', 'availability': 'available'})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 3)

    def test_multiple_dispositions_filter(self):
        """Test that multiple dispositions filter works correctly."""
        response = self.client.get(reverse('animal-list'), {'disposition': ['good_with_children', 'leash_needed']})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 2)
    
    def test_empty_dispositions_filter(self):
        """Test that multiple dispositions filter works correctly."""
        response = self.client.get(reverse('animal-list'), {'disposition': ['good_with_children', 'leash_needed', 'good_with_animals']})
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
