from db_connector.models import User
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from django.shortcuts import render, redirect
from django.contrib.auth import login
from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.views.decorators.csrf import csrf_exempt
import json


@csrf_exempt
def user_signup(request):
    if request.method == 'POST':
        try:
            # Parse the JSON data from the request body
            data = json.loads(request.body.decode('utf-8'))
            print(data)
            username = data.get('username')
            print(username)
            password = data.get('password')
            email = data.get('email')
            account_type = data.get('account_type', 'public')

            if username and email and password:
                user = User.objects.create_user(username=username, email=email, password=password)
                user.account_type = account_type
                user.save()
                return JsonResponse({'message': 'User created successfully'})
            else:
                return JsonResponse({'error': 'Invalid data provided'}, status=400)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON data'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)

@csrf_exempt
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

def get_csrf_token(request):
    csrf_token = get_token(request)
    return JsonResponse({'csrf_token': csrf_token})
