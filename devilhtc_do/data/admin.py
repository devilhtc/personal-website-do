from django.contrib import admin

# Register your models here.
from .models import SocialLink, Education, Project

admin.site.register(SocialLink)
admin.site.register(Education)
admin.site.register(Project)