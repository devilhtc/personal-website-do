from django.shortcuts import render
from django.http import HttpResponse
# Create your views here.
from .models import SocialLink, Education, Project
from . import dataUtils as du
import json

def respondData(request):
	return HttpResponse("data ressponse")

def respondEducation(request):
	response = du.getAllObjectsResponse(Education, 'education')
	return HttpResponse(response)

def respondProject(request):
	response = du.getAllObjectsResponse(Project, 'project')
	return HttpResponse(response)

def respondSocialLink(request):
	response = du.getAllObjectsResponse(SocialLink, 'social_link')
	return HttpResponse(response)

def respondCacheImg(request):
	qsetBgs = [Education.objects.all()]
	qsetIcons = [SocialLink.objects.all()]
	allImgUrls = du.getAllImgUrls(qsetBgs, qsetIcons)
	response = json.dumps(allImgUrls)
	return HttpResponse(response)