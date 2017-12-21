from django.conf.urls import url

from . import views

urlpatterns = [
	url(r'^$', views.optionsView.as_view(), name = 'playgrounds-options'),
	url(r'^tetris/', views.tetrisView.as_view(), name = 'playgrounds-tetris')
]