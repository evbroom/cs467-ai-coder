from django.db import models
from django.contrib.postgres.fields import ArrayField


class Pet(models.Model):
    TYPE_CHOICES = [
        ('dog', 'Dog'),
        ('cat', 'Cat'),
        ('other', 'Other'),
    ]

    DOG_BREEDS = [
        'Labrador Retriever', 'German Shepherd', 'Golden Retriever',
        'Bulldog', 'Beagle', 'Poodle', 'Rottweiler', 
        'Yorkshire Terrier', 'Boxer', 'Dachshund',
        'Other'
    ]

    CAT_BREEDS = [
        'Domestic Shorthair', 'Siamese', 'Maine Coon',
        'Persian', 'Ragdoll', 'Bengal', 'British Shorthair',
        'American Shorthair', 'Scottish Fold', 'Sphynx',
        'Other'
    ]
    AVAILABILITY_CHOICES = [
        ('not_available', 'Not Available'),
        ('available', 'Available'),
        ('pending', 'Pending'),
        ('adopted', 'Adopted'),
    ]
    DISPOSITION_CHOICES = [
        ('good_with_animals', 'Good with other animals'),
        ('good_with_children', 'Good with children'),
        ('leash_needed', 'Pet must be leashed at all times'),
    ]

    type = models.CharField(max_length=50, choices=TYPE_CHOICES)
    breed = models.CharField(max_length=255)
    disposition = ArrayField(models.CharField(max_length=50, choices=DISPOSITION_CHOICES))
    picture_url = models.ImageField(upload_to='pets/')
    availability = models.CharField(max_length=50, choices=AVAILABILITY_CHOICES)
    description = models.TextField()
    date_created = models.DateField(auto_now_add=True)

    # display the type, breed, and availabilaity 
    def __str__(self):
        return f"{self.get_type_display()} - {self.breed} - {self.get_availability_display()}"