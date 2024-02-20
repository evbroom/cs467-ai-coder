from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from rest_framework import status, permissions, viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserSerializer, UserSignupSerializer
from rest_framework.authtoken.models import Token
from django.utils import timezone
from datetime import timedelta
from authentication.models import FailedLoginAttempt

# Signup View
class SignupView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = UserSignupSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            login(request, user)
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                "id": user.id,
                "username": user.username,
                "token": token.key,
                "is_admin": user.is_staff
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Login View
class LoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')
        ip_address = request.META.get('REMOTE_ADDR') 
        print(f"Logging in with username={username}, password={password}") 

        # Check for excessive failed attempts
        too_many_attempts = self.check_failed_attempts(username, ip_address)
        if too_many_attempts:
            return Response({"error": "Too many failed login attempts. Please try again later."}, status=status.HTTP_429_TOO_MANY_REQUESTS)
        
        user = authenticate(username=username, password=password)
        if user is not None:
            # If authentication is successful, reset failed login attempts
            FailedLoginAttempt.objects.filter(username=username).delete()
            # Now proceed to login the user
            login(request, user)
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                "message": "Successfully logged in.",
                "token": token.key,
                "is_admin": user.is_staff
            }, status=status.HTTP_200_OK)
        else:
            # Log the failed attempt
            FailedLoginAttempt.objects.create(username=username, ip_address=ip_address)
            return Response({
                "error": "Invalid credentials"
            }, status=status.HTTP_401_UNAUTHORIZED)
        
    def check_failed_attempts(self, username, ip_address):
        # Define your lockout policy here
        lockout_timeframe = timedelta(minutes=15)
        max_attempts = 5
        recent_attempts = FailedLoginAttempt.objects.filter(
            username=username,
            ip_address=ip_address,
            attempt_time__gte=timezone.now() - lockout_timeframe
        )
        return recent_attempts.count() >= max_attempts

class LogoutView(APIView):
    def post(self, request):
        try:
            # Delete the token to log the user out
            request.user.auth_token.delete()
            logout(request)
            return Response({"message": "Successfully logged out."}, status=status.HTTP_200_OK)
        except (AttributeError, ObjectDoesNotExist):
            return Response({"error": "Invalid request, token not found."}, status=status.HTTP_400_BAD_REQUEST)


# User ViewSet for CRUD operations
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_permissions(self):
        """
        Instantiates and returns the list of permissions that this view requires.
        """
        if self.action == 'create':
            permission_classes = [permissions.AllowAny]
        elif self.action in ['retrieve', 'update', 'partial_update', 'destroy']:
            permission_classes = [permissions.IsAuthenticated]
        else:
            permission_classes = [permissions.IsAdminUser]
        return [permission() for permission in permission_classes]

    def perform_create(self, serializer):
        # Custom logic for creating a user can be added here
        serializer.save()

    def perform_update(self, serializer):
        # Custom logic for updating a user can be added here
        serializer.save()

    def perform_destroy(self, instance):
        # Custom logic for deleting a user can be added here
        instance.delete()
