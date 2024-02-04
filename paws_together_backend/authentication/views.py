from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from authentication.models import PawsTogetherUser
from django.shortcuts import render, redirect
from django.contrib.auth import login


def user_signup(request):
    if request.method == 'POST':
        username = request.POST['username']
        email = request.POST['email']
        password = request.POST['password']
        user_type = request.POST.get('user_type', 'regular')

        try:
            user = PawsTogetherUser.objects.create_user(username=username, email=email, password=password)
            user.user_type = user_type
            user.save()
            return JsonResponse({'message': 'User created successfully'})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)

def user_login(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']

        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            if user.user_type == 'privileged':
                return redirect(LOGIN_REDIRECT_URL_PRIVILEGED)
            else:
                return redirect(LOGIN_REDIRECT_URL)
            return JsonResponse({'message': 'User logged in successfully'})
        else:
            return JsonResponse({'error': 'Invalid credentials'}, status=401)
        
def home_view(request):
    # Your logic for the 'home' view
    return render(request, 'authentication/home.html')

def pawsadmin_view(request):
    # Your logic for the 'pawsadmin' view
    return render(request, 'authentication/pawsadmin.html')
