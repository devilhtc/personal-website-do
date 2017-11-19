from django.conf.urls import url

from . import views

urlpatterns = [
	url(r'^$', views.indexView.as_view(), name = 'index'),
]