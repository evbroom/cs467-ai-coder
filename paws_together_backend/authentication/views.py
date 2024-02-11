from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from rest_framework import status, permissions, viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserSerializer, UserSignupSerializer

from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

# Signup View
@method_decorator(csrf_exempt, name='dispatch')
class SignupView(APIView):
    permission_classes = [permissions.AllowAny]
    
    def post(self, request, *args, **kwargs):
        serializer = UserSignupSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({
                "id": user.id,
                "username": user.username
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Login View
@method_decorator(csrf_exempt, name='dispatch')
class LoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')
        print(f"Logging in with username={username}, password={password}") 
        user = authenticate(username=username, password=password)
        if user is not None:
            login(request, user)
            return Response({
                "message": "Successfully logged in."
            }, status=status.HTTP_200_OK)
        return Response({
            "error": "Invalid credentials"
        }, status=status.HTTP_401_UNAUTHORIZED)

# User ViewSet for CRUD operations
@method_decorator(csrf_exempt, name='dispatch')
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
