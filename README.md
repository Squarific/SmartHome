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
    ./manage.py runserver

###Client

    cd client
    ember server

