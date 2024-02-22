from django.db import models

class FailedLoginAttempt(models.Model):
    username = models.CharField(max_length=150)
    ip_address = models.GenericIPAddressField()
    attempt_time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Failed login attempt by {self.username} from {self.ip_address} at {self.attempt_time}"
