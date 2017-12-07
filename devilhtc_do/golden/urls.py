from django.conf.urls import url

from . import views

urlpatterns = [
	url(r'^$', views.goldenTwitterView.as_view(), name = 'golden-main'),
	url(r'^data/', views.respondData, name = 'twitter-data'),
]