from django.conf.urls import url

from . import views

urlpatterns = [
	url(r'^data/$', views.respondData, name = 'twitter-data'),
	url(r'^$', views.goldenTwitterView.as_view(), name = 'golden'),
]