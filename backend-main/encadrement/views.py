from django.http import JsonResponse
from django.db.models import Avg, Q, F
from django.views.decorators.csrf import csrf_exempt
import json
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from .models import Student, Supervisor, Master, EvaluationMaster, EvaluationSupervisor

""" Superutilisateur:admin
    adresse : admin@test.com
    password : admin@

    username='boss'
    password='password123'

    username='kader'
    password='password@24#'

    username='thierry'
    password='password@24#'

    username='thierry001'
    password='thierry001@'
    """
#login endpoint
@csrf_exempt
def login_view(request):
    if request.method == 'POST':
        body = json.loads(request.body)
        username = body.get('username')
        password = body.get('password')

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            return JsonResponse({'message': 'Login successful', 'user_id': user.id, 'first_name':user.first_name, 'last_name':user.last_name})
        else:
            return JsonResponse({'error': 'Invalid credentials'}, status=400)
    return JsonResponse({'error': 'POST method required'}, status=400)

    """ http --session=my_session POST http://localhost:8000/api/login/ username="boss" password="password123" 
        http --session=my_session POST http://127.0.0.1:8000/api/rate-master/ master_id=1 rating=5
    """



#registration endpoint

@csrf_exempt
def registration_view(request):
    if request.method == 'POST':
        body = json.loads(request.body)
        username = body.get('username')
        email = body.get('email')
        password = body.get('password')
        first_name = body.get('first_name', '')  
        last_name = body.get('last_name', '') 

        # Check if the username already exists
        if User.objects.filter(username=username).exists():
            return JsonResponse({'error': 'Username already exists'}, status=400)

        # Create a new user and add first_name, last_name
        user = User.objects.create_user(username=username, email=email, password=password)
        user.first_name = first_name
        user.last_name = last_name
        user.save()  # Save the user

        student = Student.objects.create(user=user)

        return JsonResponse({'message': 'Registration successful', 'user_id': user.id, 'student_id': student.id})

    return JsonResponse({'error': 'POST method required'}, status=400)
    """ http POST http://127.0.0.1:8000/api/register/ \
            username='John' \
            email='johndoe@test.com' \
            password='password@24#' \
            first_name='John' \
            last_name='Doe'
            
     """

def supervisor_list_with_rating(request):
    # Annotate each supervisor with their average rating
    supervisors = Supervisor.objects.annotate(
        average_rating=Avg('evaluationsupervisor__rating')  # Correct reference to the related name
    ).values('id', 'name', 'specialty', 'available', 'average_rating')

    return JsonResponse(list(supervisors), safe=False)



def master_list_with_rating(request):
    # Annotate each master with their average rating
    masters = Master.objects.annotate(
        average_rating=Avg('evaluationmaster__rating')  # Ensure correct field reference
    ).values('id', 'name', 'specialty', 'available', 'average_rating')

    return JsonResponse(list(masters), safe=False)


@csrf_exempt
def choose_encadreur(request):
    if request.method == 'POST':
        body = json.loads(request.body)
        user_id = body.get('user_id')
        student = Student.objects.get(user=user_id)
        supervisor_id = body.get('supervisor_id')
        master_id = body.get('master_id')

        # Récupérer les superviseurs et les maitres
        supervisor = Supervisor.objects.get(id=supervisor_id)
        master = Master.objects.get(id=master_id)

        # Assigner un master à un étudiant
        if Student.objects.filter(master=master).exists():
            master.available = False
            master.save()
            return JsonResponse({'error': 'This master is already assigned to another student.'}, status=400)

        # Un supervisor est limité à trois étudiants
        supervisor_student_count = Student.objects.filter(supervisor=supervisor).count()
        if supervisor_student_count >= 3:
            supervisor.available = False
            supervisor.save()
            return JsonResponse({'error': 'This supervisor is already assigned to the maximum number of students.'}, status=400)

        # Assignation du maitre et superviseur si condition réunie
        student.supervisor = supervisor
        student.master = master
        student.save()

        # Mise à jour de la disponibilité
        master.available = False
        master.save()

        if supervisor_student_count + 1 >= 3:
            supervisor.available = False
            supervisor.save()

        return JsonResponse({'message': 'Encadreur choisi avec succès!'})

    return JsonResponse({'error': 'POST method required'}, status=400)

    """ Test du endpoint avec httpie
            http --session=my_session POST http://localhost:8000/api/login/ username="boss" password="password123"

            http --session=my_session POST http://localhost:8000/api/choose-encadreur/ supervisor_id=1 master_id=2
            """


    
    # views.py
@csrf_exempt
def rate_encadreur(request):
    if request.method == 'POST':
        body = json.loads(request.body)
        #student = Student.objects.get(user=request.user)
        user_id = body.get('user_id')
        student = Student.objects.get(user=user_id)
        encadreur_id = body.get('encadreur_id')
        rating = body.get('rating')

        encadreur = Supervisor.objects.get(id=encadreur_id)

        evaluation, created = EvaluationSupervisor.objects.update_or_create(
            student=student,
            encadreur=encadreur,
            defaults={'rating': rating}
        )

        return JsonResponse({'message': 'Note soumise avec succès!'})
    
        """ http POST http://127.0.0.1:8000/api/rate-encadreur/ \
            encadreur_id=1 \
            rating=4 """


@csrf_exempt
def rate_master(request):
    if request.method == 'POST':
        body = json.loads(request.body)
        #student = Student.objects.get(user=request.user) 
        user_id = body.get('user_id')
        student = Student.objects.get(user=user_id)
        master_id = body.get('master_id')
        rating = body.get('rating')

        master = Master.objects.get(id=master_id)

        # Update or create evaluation for the master
        evaluation, created = EvaluationMaster.objects.update_or_create(
            student=student,
            master=master,
            defaults={'rating': rating}
        )

        return JsonResponse({'message': 'Master rating submitted successfully!'})

    return JsonResponse({'error': 'POST method required'}, status=400)


def encadreur_ratings(request):
    ratings = Supervisor.objects.annotate(average_rating=Avg('evaluation__rating')).values('id', 'name', 'average_rating')
    return JsonResponse(list(ratings), safe=False)

