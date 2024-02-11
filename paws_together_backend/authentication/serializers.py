from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest_framework import serializers


# Serializer for User Signup
class UserSignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

# General User Serializer for CRUD operations
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'is_active', 'is_superuser']
        extra_kwargs = {
            'password': {'write_only': True, 'required': False},
            'is_superuser': {'read_only': True}  # Prevent modification of admin status through the API
        }

    def create(self, validated_data):
        # Re-use the create method from UserSignupSerializer or define custom logic
        validated_data['password'] = make_password(validated_data.get('password'))
        return User.objects.create_user(**validated_data)

    def update(self, instance, validated_data):
        # Update user instance based on validated data
        instance.username = validated_data.get('username', instance.username)
        instance.email = validated_data.get('email', instance.email)
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.is_active = validated_data.get('is_active', instance.is_active)

        # Handle password update with hashing
        password = validated_data.get('password', None)
        if password:
            instance.set_password(password)
        instance.save()
        return instance
