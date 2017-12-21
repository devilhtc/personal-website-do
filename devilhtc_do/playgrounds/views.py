from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse
from django.template import loader
from django.views.generic import TemplateView


class optionsView(TemplateView):
	template_name = "options.html"

class tetrisView(TemplateView):
	template_name = "tetris.html"