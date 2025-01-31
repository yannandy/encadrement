# models.py
from django.db import models
from django.contrib.auth.models import User

class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    supervisor = models.ForeignKey('Supervisor', on_delete=models.SET_NULL, null=True, blank=True)
    master = models.ForeignKey('Master', on_delete=models.SET_NULL, null=True, blank=True)

class Supervisor(models.Model):
    name = models.CharField(max_length=100)
    specialty = models.CharField(max_length=100)
    available = models.BooleanField(default=True)
    max_students = models.IntegerField(default=3)
    def __str__(self):
        return self.name

class Master(models.Model):
    name = models.CharField(max_length=100)
    specialty = models.CharField(max_length=100)
    available = models.BooleanField(default=True)
    def __str__(self):
        return self.name

class EvaluationSupervisor(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    encadreur = models.ForeignKey(Supervisor, on_delete=models.CASCADE)
    rating = models.FloatField()

class EvaluationMaster(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    master = models.ForeignKey(Master, on_delete=models.CASCADE)
    rating = models.FloatField()

