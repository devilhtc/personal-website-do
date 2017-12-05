from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse
from django.template import loader
from django.views.generic import TemplateView

class goldenTwitterView(TemplateView):
	template_name = "index.html"