# SmartHome
SmartHome made for the course Programming Project Databases at the University of Antwerp.

##Build instructions
###Dependencies

    sudo apt-get install nodejs nodejs-legacy npm python3 python3-pip
    sudo npm -g install bower ember-cli

###Server

    pip install django djangorestframework==3.2.0 markdown django-filter djangorestframework-jsonapi==2.0.0-beta.2 django-rest-auth[with_social]

###Client

    cd client
    bower install

##Run instructions
###Server

    cd server
    ./manage.py migrate                 # create database tables
    ./manage.py loaddata initial_data   # load users and tags
    ./manage.py runserver               # run the server on http://localhost:8000

#### Load pregenerated sample data
You can simply load pregenerated data into the database:

First load the configuration:

    ./manage.py loaddata example_configuration.json

For the data, there is a fixture for 1 day:

    ./manage.py loaddata sensor_data_1_day.json

and one for 1 week:

    ./manage.py loaddata sensor_data_1_week.json

#### Populate with ElecSim
You can also populate the database with a given configuration file (generated by ElecSim).

    ./populate_config.py homes_config.json

Then populate the database with sample data from a csv file (generated by ElecSim).

There is a sample file for 1 day:

    ./populate_data.py data_1_day.csv

and one for 1 week:

    ./populate_data.py data_1_week.csv

You can generate your own configurations and sensor data using ElecSim (found on Blackboard).

###Client

    cd client
    ember server

