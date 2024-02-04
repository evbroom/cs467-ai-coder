from django.contrib.auth.models import AbstractUser
from django.db import models

class PawsTogetherUser(AbstractUser):
    is_privileged = models.BooleanField(default=False)

    def __str__(self):
        return self.username
