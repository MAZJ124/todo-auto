
# todo/serializers.py

from rest_framework import serializers
from .models import Todo, Module
      
class TodoSerializer(serializers.ModelSerializer):
  class Meta:
    model = Todo
    fields = ('id', 'title', 'description', 'completed', 'deadline')


class ModuleSerializer(serializers.ModelSerializer):
  class Meta:
    model = Module
    fields = ('code', 'name', 'duration', 'completed', 'start_date')