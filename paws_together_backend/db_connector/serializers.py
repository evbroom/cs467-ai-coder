from rest_framework import serializers
from .models import Pet


class PetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pet
        fields = '__all__'

    def validate_news(self, value):
        # make partial_patch able to empty the news array.
        if value == ['null']:
            return None
        return value