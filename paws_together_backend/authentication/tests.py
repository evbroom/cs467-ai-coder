from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

class AuthenticationTestSuite(APITestCase):
    @classmethod
    def setUpTestData(cls):
        # Create a user for login tests
        cls.user = User.objects.create_user(username='testuser', email='user@example.com', password='testpassword123')
        cls.token = Token.objects.create(user=cls.user)
        cls.api_authentication()

    @classmethod
    def api_authentication(cls):
        cls.client.credentials(HTTP_AUTHORIZATION='Token ' + cls.token.key)

    def test_signup_success(self):
        """
        Ensure we can create a new user.
        """
        url = reverse('signup')
        data = {'username': 'newuser', 'email': 'newuser@example.com', 'password': 'newpassword123'}
        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue('id' in response.data)
        self.assertEqual(User.objects.count(), 2)  # Including the setUpTestData user

    def test_signup_failure(self):
        """
        Ensure user creation fails with invalid data.
        """
        url = reverse('signup')
        data = {'username': '', 'email': 'invalid', 'password': 'short'}
        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_login_success(self):
        """
        Ensure login is successful with correct credentials.
        """
        url = reverse('login')
        data = {'username': 'testuser', 'password': 'testpassword123'}
        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue('token' in response.data)

    def test_login_failure(self):
        """
        Ensure login fails with incorrect credentials.
        """
        url = reverse('login')
        data = {'username': 'testuser', 'password': 'wrongpassword'}
        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_access_protected_view_authenticated(self):
        """
        Test accessing a protected view with authentication.
        """
        # Assuming 'protected_view' is a view name for a protected resource
        url = reverse('protected_view')
        response = self.client.get(url)

        self.assertNotEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_access_protected_view_unauthenticated(self):
        """
        Test accessing a protected view without authentication.
        """
        self.client.credentials()  # Remove any authentication tokens
        url = reverse('protected_view')
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

