# Canvas Drug Search

## Project Description:

Search for drugs by brand name, generic name, or main ingredient. Canvas Drug Search will supply you with all medication delivery options that match your search.  

Search options powered by RxNorm API. 

## Features:
1) AutoSuggest for Search Bar Completion
2) Multi-Select Option Menu to choose dosage and medication delivery method
3) Save medication name option
4) All Searches powered by RxNorm API

## Getting Started:

## Prerequisites:

# Prerequisites General Information:
Canvas Drug Search has a flask-python Backend API with a node.js React frontend application.
This means that you will need python, node, and create-react-app dependencies. 
Python's dependencies are found in requirements.txt. You will need python's pip installer to run requirements.txt. Node and React's dependencies are found in package.json. You will need either node's npm or yarn installer to successfully download the libraries noted in packages.json.

#Prerequisites Steps:
1) Download the project in a directory of its own. Navigate into the new directory and type in the following command.  

    $ git clone https://github.com/laurengordonfahn/canvasSearch.git

2) Create a virtual environment using virtualenv to house the required frameworks if you are unsure you have this capacity visit https://virtualenv.pypa.io/en/stable/: 

```
$ virtualenv env
$ source env/bin/activate
```

3) Pip install will enable installation of the project requirements
If you are uncertain if you have pip install visit the website : https://pip.pypa.io/en/stable/installing/

4) Make sure you are in the first level of your newly created and cloned directory then pip install the requirements, the file will be read into the environment automatically:

```
$ pip install -r requirements.txt
```

5) Download package.json dependencies using yarn OR npm. The following command will source all dependencies in package.json. If you are not certain if you have yarn visit https://yarnpkg.com/lang/en/docs/install/.  Yarn will create yarn.lock which will show you all sub-dependencies utilized. Yarn also offers 'yarn upgrade' a command that will help you keep dependency libraries up-to-date. 
```
    $ yarn install
```
If using npm :
```
    $npm install
```

6) Note that package.json was first sourced off of create-react-app. If you want to read more: https://github.com/facebookincubator/create-react-app/blob/master/README.md.
This project uses webpack to building all frontend files.
In packages.json devDependencies is empty but before this project was deployed held the react-scripts requirement found now in dependencies. This change enabled deployment in build mode. 

```
## Installing:
1) create a database using postgres and source the database. To learn more about postgres: https://www.postgresql.org/download/. The seed.py file contains basic color options for your calendar and is essential. 
``` 
    $ createdb canvas
    $ python model.py
```

2) To run the server file server.py :
``` 
    $ python server.py
```
3) To run the frontend:
```
    $ yarn run 
```
If using npm
```
    $ npm start
``` 

## Built With:
* Python- Backend Language
* Flask - Python web frame work
* SqlAlchemy- Database Toolkit for python (ORM)
* PostgreSQL- Object Relational Database System 
* JavaScript- Front end language
* React - Front end Framework
* JQuery- JavaScript Library
* RxNorm - Third Party API

## Current Features Completed:
* Auto Complete Search Bar
* Multi-Select Choice Menu
* Save Search Options

## Future Build-Out:
* Build-Out test JavaScript suites and Flask-Server test suites
* Save Medication Search Built Out - Unsave, Save original search term with save, etc
* Display Physician recent search terms
* Publish API docs

## Author:
* Lauren Gordon-Fahn
