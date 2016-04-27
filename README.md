# SmartHome
SmartHome made for the course Programming Project Databases at the University of Antwerp.

##Build instructions
###Dependencies

    sudo apt-get install nodejs nodejs-legacy npm python python-pip python-mysqldb

###Server

    sudo pip install python-dateutil django djangorestframework==3.2.0 markdown django-filter djangorestframework-jsonapi==2.0.0-beta.2 django-rest-auth[with_social] django-cors-headers django-filter django-crispy-forms

###Client

    None

##Run instructions
###Server

Your database should run on localhost and have the user smarthome with pass smarthome

    cd server
    ./manage.py migrate                 # create database tables
    ./manage.py loaddata initial_data   # load users and tags
    ./manage.py runserver               # run the server on http://localhost:8000

#### Load pregenerated sample data
You can simply load pregenerated data into the database:

First load the configuration:

    ./manage.py loaddata example_configuration.json

Then load the sample data for 10 homes over 5 years:

    ./manage.py loaddata sample_data.json

#### Populate with ElecSim
You can also populate the database with a given configuration file (generated by ElecSim).
The following command will parse an ElecSim configuration file, generate the data and store it in the database:

    ./populate.py [json_config_file] [from_date] [to_date]

to_date defaults to the present datetime.
E.g.:

    ./populate.py homes_config.json 2013-01-01T00:00

You can generate your own configurations using ElecSim (found on Blackboard and in the directory '/ElecSim').

###Client

    python -m SimpleHTTPServer

Then open your browser to localhost:8000

