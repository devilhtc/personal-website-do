from django.db import models

# Create your models here.

# ML stands for max length
NAME_ML = 100
URL_ML = 100
JSON_ML = 500
SHORT_ML = 20


class SocialLink(models.Model):
	name = models.CharField(max_length = NAME_ML)
	icon_url = models.CharField('icon url', max_length = URL_ML)
	link = models.CharField(max_length = URL_ML)
	bg_color = models.CharField('background color', max_length = SHORT_ML)

	def __str__(self):
		return self.name

class Education(models.Model):
	title =  models.CharField(max_length = NAME_ML)
	description = models.CharField(max_length = JSON_ML)
	bg_img_url = models.CharField('background image url',max_length = URL_ML)

	def __str__(self):
		return self.title

class Project(models.Model):
	title = models.CharField(max_length = NAME_ML)
	description = models.CharField(max_length = JSON_ML)
	keywords = models.CharField(max_length = JSON_ML)
	links = models.CharField(max_length = JSON_ML)
	
	def __str__(self):
		return self.title
