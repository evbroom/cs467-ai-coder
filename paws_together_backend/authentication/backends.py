from django.contrib.auth.backends import ModelBackend
from .models import PawsTogetherUser

class CustomUserAuthBackend(ModelBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        try:
            user = PawsTogetherUser.objects.get(username=username)
        except PawsTogetherUser.DoesNotExist:
            return None

        if user.check_password(password):
            return user

    def get_user(self, user_id):
        try:
            return PawsTogetherUser.objects.get(pk=user_id)
        except PawsTogetherUser.DoesNotExist:
            return None
