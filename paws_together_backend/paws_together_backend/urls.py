"""
URL configuration for paws_together_backend project.

Available routes:
- /admin/ : Django admin site.
- /animals/ : List all animals or create a new animal (GET, POST).
- /animals/{id}/ : Retrieve, update or delete a specific animal (GET, PUT, PATCH, DELETE).

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path
from rest_framework.routers import DefaultRouter
from db_connector.views import PetViewSet, breed_options
from authentication.views import UserViewSet, SignupView, LoginView, LogoutView
from django.urls import path


router = DefaultRouter()
router.register(r'pets', PetViewSet)
router.register(r'users', UserViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
    path('signup/', SignupView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('pets/breeds/<str:type>/', breed_options, name='breed_options'),
]
