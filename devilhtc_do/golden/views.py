from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse
from django.template import loader
from django.views.generic import TemplateView
from .goldenUtils import twitterUtil as tu
import sys
if sys.version_info[0]<3:
	import urlparse
else:
	import urllib.parse as urlparse
import json

class goldenTwitterView(TemplateView):
	template_name = "golden.html"

def respondData(request):
	print('query parameter string is ' + request.META['QUERY_STRING'])
	parsed = urlparse.parse_qs( request.META['QUERY_STRING'] )

	screen_name = parsed['screen_name'][0]
	max_count = int(parsed['max_count'][0])
	valid = tu.validateUser(screen_name)
	if not valid:
		res = 'invalid screen name'
	else:
		user_info = {'screen_name':screen_name}
		friends = tu.getClosestFriendsOfUser(user_info, max_count, version = 2)
		res = json.dumps(friends)
	return HttpResponse(res)