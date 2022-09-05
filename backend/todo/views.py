
# todo/views.py

from django.shortcuts import render
from rest_framework import viewsets          # add this
from .serializers import TodoSerializer, ModuleSerializer      # add this
from .models import Todo, Module                     # add this
        
class TodoView(viewsets.ModelViewSet):       # add this
  serializer_class = TodoSerializer          # add this
  queryset = Todo.objects.all()              # add this

class ModuleView(viewsets.ModelViewSet):       # add this
  serializer_class = ModuleSerializer          # add this
  queryset = Module.objects.all()              # add this
