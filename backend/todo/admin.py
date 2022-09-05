
# todo/admin.py
    
from django.contrib import admin
from .models import Todo, Module # add this
    
class TodoAdmin(admin.ModelAdmin):  # add this
  list_display = ('title', 'description', 'completed', 'deadline') # add this

class ModuleAdmin(admin.ModelAdmin):  # add this
  list_display = ('code', 'name', 'duration') # add this
        
# Register your models here.
admin.site.register(Todo, TodoAdmin) # add this
admin.site.register(Module, ModuleAdmin) # add this