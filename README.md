# Personal Website of Kevin He

## If website is online, it can be accessed [here](http://devilhtc.com)

Personal Website built with 

Front-end: ReactJS, Redux, node.js and Webpack. 

Back-end: Django, SQLite and GUnicorn (wsgi server), WhiteNoise (for serving static files)

Reverse Proxy: Nginx

To run locally on 127.0.0.1:8000/

### Part 1

First, assume you have ```node.js``` and ```npm``` installed, install dependencies with 

```
npm init

npm install
```

Compile the React ```jsx``` source code into a ```bundle.js``` that web browsers can understand

```
npm run build
```

Note that after switching to Django, the file ```bundle.js``` is stored in ```devilhtc_do/static/```, which is specified in ```webpack.config.js```.

### Part 2

Then set up the back-end part.

Assume you have installed Python and pip (preferrably with python3 as python in a virtual environment), you need to run 

```
pip install Django, WhiteNoise, gunicorn
```

Then change directory to ```devilhtc_do``` (using ```cd devilhtc_do```) to proceed.

To generate static files that we can serve, run

```
python manage.py collectstatic
```

This will generated a ```staticfiles``` folder that stores the static files to be served and we are good to go!

### Part 3

Then we can spin up a wsgi server with GUnicorn with Django and GUnicorn. (still in ```devilhtc_do``` directory) 

Running dev server integrated in Django:

```
python manage.py runserver
```

Running server:

```
gunicorn devilhtc_do.wsgi:application --bind 127.0.0.1:8000
```

**Or** use the shell script ```run.sh``` that runs things in the background and stores output in ```nohup.out```. 

To use the script, first run ```chmod +x run.sh``` to make it executable and run

```
./run.sh
```

to run the server. 

To shut down the server, use ```head -1 nohup.out``` to find out what the process id is (inside the second pair of square brackets, in the form of ```[time] [pid] log content```). Then run ```kill pid``` to kill the process where ```pid``` is the numbers.

**Or** go into the parent directory ```personal-website-do``` and run ```node webServer.js``` (However the newly setup REST API for data acquisition won't work.)

