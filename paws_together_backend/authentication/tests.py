from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

class AuthenticationTests(APITestCase):

    def test_signup_success(self):
        """
        Ensure we can create a new user via the signup endpoint.
        """
        url = reverse('signup')
        data = {
            'username': 'newuser',
            'email': 'newuser@example.com',
            'password': 'newuserpassword'
        }
        response = self.client.post(url, data, format='json')
        
        # Check the user was created successfully
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(User.objects.filter(username='newuser').exists())
        self.assertFalse('password' in response.data)  # Ensure password is not returned in response

    def test_login_success(self):
        """
        Ensure a user can login and receive a token.
        """
        # First, create a user to login
        User.objects.create_user('testuser', 'test@example.com', 'testpassword')
        
        url = reverse('login')
        data = {
            'username': 'testuser',
            'password': 'testpassword'
        }
        response = self.client.post(url, data, format='json')

        # Check login was successful and a token was received
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue('token' in response.data)

    def test_login_failure(self):
        """
        Ensure user cannot login with incorrect credentials.
        """
        # First, create a user to attempt to login with incorrect password
        User.objects.create_user('testuser', 'test@example.com', 'testpassword')
        
        url = reverse('login')
        data = {
            'username': 'testuser',
            'password': 'wrongpassword'
        }
        response = self.client.post(url, data, format='json')

        # Check login failed due to incorrect credentials
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertTrue('error' in response.data)
