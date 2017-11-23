import smtplib
from email.mime.text import MIMEText

#from mail_info import user_info 

#print(user_info)

if True:
	msg = MIMEText("email trial from python")
	msg['Subject'] = "sup"
	msg['From'] = 'me'
	msg['To'] = 'devilmengsk@gmail.com'

	gmail_user = 'htcondjango@gmail.com'
	password = ''

	server = smtplib.SMTP('smtp.gmail.com', 587)
	server.ehlo()
	server.starttls()
	server.login(gmail_user, password)
	server.sendmail('bla', msg['To'], 'msg')
	server.close()
