# Generated by Django 5.0.1 on 2024-02-16 19:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('db_connector', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pet',
            name='picture_url',
            field=models.ImageField(upload_to='pets/'),
        ),
    ]
