# admin.py
from django.contrib import admin
from .models import Supervisor, Master, Student, EvaluationSupervisor, EvaluationMaster

admin.site.register(Supervisor)
admin.site.register(Master)
admin.site.register(Student)
admin.site.register(EvaluationMaster)
admin.site.register(EvaluationSupervisor)
