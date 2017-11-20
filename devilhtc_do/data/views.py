from django.shortcuts import render
from django.http import HttpResponse
# Create your views here.
from .models import SocialLink, Education, Project
from . import dataUtils as du
import json

def respondData(request):
	return HttpResponse("data ressponse")

def respondEducation(request):
	qset = Education.objects.all()
	out = du.getAllObjects(qset, 'education')
	response = json.dumps(out)
	
	return HttpResponse(response)

def respondProject(request):
	qset = Project.objects.all()
	out = du.getAllObjects(qset, 'project')
	response = json.dumps(out)
	return HttpResponse(response)