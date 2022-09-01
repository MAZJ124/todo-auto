
# todo/models.py
      
from datetime import datetime
from django.db import models
# Create your models here.

# add this
class Todo(models.Model):
  title = models.CharField(max_length=120)
  description = models.TextField()
  completed = models.BooleanField(default=False)
  deadline = models.DateField(default=datetime.now())
      
  def __str__(self):
    return self.title


class Module(models.Model):
  code = models.CharField(max_length=120)
  name = models.CharField(max_length=120)
  # Module duration in weeks 
  duration = models.IntegerField(default=13)
  
  def __str__(self):
    return self.code
