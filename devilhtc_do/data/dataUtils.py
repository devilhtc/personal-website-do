import json

def getAllObjectsResponse(data, model):
	qset = data.objects.all()
	out = getAllObjects(qset, model)
	response = json.dumps(out)
	return response

def getAllObjects(qset, model):
	if model == 'education':
		return [parseEducation(e) for e in qset]
	elif model == 'project':
		return [parseProject(p) for p in qset]
	elif model == 'social_link':
		return [parseSocialLink(s) for s in qset]
	else:
		return []

def getAllImgUrls(qsetBgs, qsetIcons):
	out = []
	for qset in qsetBgs:
		out += getALlBgImgUrl(qset)
	for qset in qsetIcons:
		out += getIconUrl(qset)
	return out

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
	p2['startDate'] = p.startDate.isoformat()
	return p2

def parseSocialLink(s):
	s2 = {}
	s2['name'] = s.name
	s2['iconUrl'] = s.icon_url
	s2['link'] = s.link
	s2['bgColor'] = s.bg_color
	return s2

def getALlBgImgUrl(qset):
	return [item.bg_img_url for item in qset]

def getIconUrl(qset):
	return [item.icon_url for item in qset]