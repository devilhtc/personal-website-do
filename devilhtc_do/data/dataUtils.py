import json

def getAllObjects(qset, model):
	if model == 'education':
		return [parseEducation(e) for e in qset]
	elif model == 'project':
		return [parseProject(p) for p in qset]
	else:
		return []

def parseEducation(e):
	e2 = {}
	e2['title'] = e.title
	e2['description'] = json.loads(e.description)
	e2['bgImgUrl'] = e.bg_img_url
	return e2

def parseProject(p):
	p2 = {}
	p2['title'] = p.title
	p2['description'] = json.loads(p.description)
	p2['keywords'] = json.loads(p.keywords)
	p2['links'] = json.loads(p.links)
	return p2