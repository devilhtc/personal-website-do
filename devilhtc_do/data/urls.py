from django.conf.urls import url
from . import views

urlpatterns = [
	url(r'^education/$', views.respondEducation, name = 'education_data'),
	url(r'^project/$', views.respondProject, name = 'project_data'),
	url(r'^$', views.respondData, name = 'data'),
]