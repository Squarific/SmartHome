# SmartHome
SmartHome made for the course Programming Project Databases at the University of Antwerp.

##Build instructions
###Dependencies

    sudo apt-get install nodejs nodejs-legacy npm python3 python3-pip
    sudo npm -g install bower ember-cli

###Server

    pip install django
    pip install djangorestframework
    pip install markdown
    pip install django-filter

###Client

    cd client
    bower install

##Run instructions
###Server

    cd server
    ./manage.py migrate                 # create database tables
    ./manage.py loaddata initial_data   # load users and tags
    ./manage.py runserver               # run the server on http://localhost:8000

#### Populate with sample data
Load sample configuration data into the database (generated by ElecSim).

    ./populate_config.py

Then load sample data into the database (generated by ElecSim).

1 day:

    ./manage.py loaddata sensor_data_1_day.json

or 1 week:

    ./manage.py loaddata sensor_data_1_week.json

###Client

    cd client
    ember server

