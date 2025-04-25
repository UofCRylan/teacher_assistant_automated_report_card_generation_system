ET
izzszent
Online

ET — 2025-04-06 6:22 PM
#include "memsim.h"
#include <cassert>
#include <iostream>
#include <list>

struct Partition {
Expand
message.txt
6 KB
ET — 2025-04-07 2:53 PM
Image
ET — 2025-04-07 7:55 PM
MPORTANT! Your Student ID #: 3748729Your password is temporarily set to your birthday (YYYYMMDD)Make note of this information, and then continue with the Application Process. You will be required to login, and then change your password and create a security question. Immediately afterwards, you may register in a course
Dianna@2010
ET — 2025-04-07 9:39 PM
Attachment file type: acrobat
RM project Feb 23, 2025 (1).pdf
664.04 KB
Attachment file type: acrobat
RM project Feb 23, 2025 (1).pdf
664.04 KB
Image
ET — 2025-04-07 9:55 PM
Image
ET — 2025-04-07 11:25 PM
Attachment file type: acrobat
Homework 5-Elizabeth Szentmiklossy 30165216.pdf
9.75 MB
ET — 2025-04-11 1:06 PM
Image
Image
ET
 pinned a message to this channel. See all pinned messages. — 2025-04-12 7:57 PM
ET — 2025-04-12 10:05 PM
% Sample meeting data
met(john,28,mary).
met(john,3,mary).
met(peter,21,john).
met(mary,23,mark).
met(anne,19,peter).
met(anne,29,john).
met(anne,24,mary).
met(mark,17,paul).

% Meeting is symmetric
meeting(X, T, Y) :- met(X, T, Y).
meeting(X, T, Y) :- met(Y, T, X).

% Base case: reached the goal person
contact(infect(P, Time), infect(P, GoalTime), [infect(P, Time)]) :-
    Time >= GoalTime,
    Time =< GoalTime + 7.

% Recursive case: infect someone else
contact(infect(Infector, Time1), infect(Goal, GoalTime), [infect(Infector, Time1)|Rest]) :-
    meeting(Infector, Time2, NextPerson),
    Time2 =< Time1,
    Time2 >= Time1 - 7,
    contact(infect(NextPerson, Time2), infect(Goal, GoalTime), Rest),
    + member(infect(NextPerson, Time2), Rest).

answer :-
    contact(infect(john, 31), infect(paul, T), Path),
    T >= 11, T =< 18,
    format("Paul could have been infected ~w days ago.~n", [T]),
    format("Infection path: ~w~n", [Path]).
can you close the door
close
the dor
door
door
door
close
the door
close it
close
close
close
the door
door
door
ET
 started a call that lasted a few seconds. — 2025-04-12 10:07 PM
ET — 2025-04-12 10:07 PM
close the dooe
% Sample meeting data
met(john,28,mary).
met(john,3,mary).
met(peter,21,john).
met(mary,23,mark).
met(anne,19,peter).
met(anne,29,john).
met(anne,24,mary).
met(mark,17,paul).

% Meeting is symmetric
meeting(X, T, Y) :- met(X, T, Y).
meeting(X, T, Y) :- met(Y, T, X).

% Base case: reached the goal person
contact(infect(P, Time), infect(P, GoalTime), [infect(P, Time)]) :-
    Time >= GoalTime,
    Time =< GoalTime + 7.

% Recursive case: infect someone else
contact(infect(Infector, Time1), infect(Goal, GoalTime), [infect(Infector, Time1)|Rest]) :-
    meeting(Infector, Time2, NextPerson),
    Time2 =< Time1,
    Time2 >= Time1 - 7,
    contact(infect(NextPerson, Time2), infect(Goal, GoalTime), Rest),
    + member(infect(NextPerson, Time2), Rest).

answer :-
    contact(infect(john, 31), infect(paul, T), Path),
    T >= 11, T =< 18,
    format("Paul could have been infected ~w days ago.~n", [T]),
    format("Infection path: ~w~n", [Path]).
ET — 2025-04-12 11:18 PM
workingdirectory(, 'C:/Users/eliza/Downloads').
ET
 started a call that lasted a minute. — 2025-04-12 11:50 PM
ET — 2025-04-13 12:34 AM
fin
% Custom permutation-safe solve
solve(Houses) :-

    % First, permute and assign all attributes to variables
    colors(Colors), mypermutation(Colors, PC),
    nationalities(Nats), mypermutation(Nats, PN),
Expand
message.txt
3 KB
ET — 2025-04-14 11:30 AM
(https://www.linkedin.com/jobs/view/software-engineer-intern-at-masiv-mercedes-and-singh-innovative-ventures-4202352126/)
MASIV | Mercedes and Singh Innovative Ventures hiring Software Engi...
Posted 1:15:33 AM. MASIV | Software Engineering Intern (Co-op) | Summer 2025 | In-Person onlywww.mercedesandsingh.com…See this and similar jobs on LinkedIn.
MASIV | Mercedes and Singh Innovative Ventures hiring Software Engi...
Image
Image
ET — 2025-04-14 3:39 PM
import React, { useEffect, useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

function Building({ position, height }) {
  const ref = useRef();
Expand
message.txt
3 KB
blurry
import React, { useEffect, useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

function Building({ position, height }) {
  const ref = useRef();
Expand
message.txt
3 KB
ET — 2025-04-14 4:02 PM
import React, { useEffect, useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

function Building({ position, width, height, depth }) {
  const ref = useRef();
Expand
message.txt
3 KB
ET — 2025-04-14 5:06 PM
import React, { useEffect, useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';

function Building({ position, width, height, depth, info, onClick, isSelected }) {
  const ref = useRef();
Expand
message.txt
4 KB
ET — 2025-04-15 5:46 PM
https://masi-vintern-test.vercel.app/
MASIV 3D City Dashboard
Web site created using create-react-app
DerpyMcfuzzles — 2025-04-17 8:55 PM
https://developers.google.com/search/blog/2007/04/requesting-removal-of-content-from-our
Google for Developers
Requesting removal of content from our index  |  Google Search Ce...
Requesting removal of content from our index  |  Google Search Ce...
ET — 2025-04-23 10:48 AM
Attachment file type: acrobat
449 final question 2.1.pdf
1.35 MB
ET — 2025-04-23 10:56 AM
Attachment file type: acrobat
449 final question 2.1.pdf
1.33 MB
ET — 2025-04-23 11:52 AM
Attachment file type: acrobat
449 final 4.2.pdf
675.46 KB
Attachment file type: acrobat
449 final 4.2.pdf
675.46 KB
Attachment file type: acrobat
449 final 2.2.pdf
678.71 KB
ET — 2025-04-23 2:58 PM
Attachment file type: acrobat
449 final 6.2.pdf
411.43 KB
ET — 2025-04-23 4:27 PM
Attachment file type: acrobat
449 final Q9 .pdf
525.61 KB
ET — Yesterday at 10:04 PM
Image
DerpyMcfuzzles — Yesterday at 11:46 PM
# Teacher-Assisted Automated Report Card Generation System

## Authors
- Rylan Laplante: 30070936  
- Ifeanyi Ekpemandu: 30156846  
- Elizabeth Szentmiklossy: 30165216  
Expand
message.txt
5 KB
﻿
# Teacher-Assisted Automated Report Card Generation System

## Authors
- Rylan Laplante: 30070936  
- Ifeanyi Ekpemandu: 30156846  
- Elizabeth Szentmiklossy: 30165216  
**Course:** CPSC 471 – Database Management Systems  
**Instructor:** Dr. Elhajj  
**Date:** April 16, 2025  

---

## 1️. Database Setup – MySQL

This section outlines how to set up the MySQL database locally for the project.

### Step 1: Install MySQL

If MySQL is not already installed on your system, follow the official documentation to install MySQL Server:

🔗 [Install MySQL Server (5.7)](https://dev.mysql.com/doc/mysql-installation-excerpt/5.7/en/)



###  Step 2: Create a Database

After installation:
1. Launch MySQL Workbench or connect via terminal.
2. Create a new database.
3. Take note of:
   - **Database name**
   - **Username**
   - **Password**

These credentials are required in the backend setup.



### Step 3: Import the Schema

1. Clone the GitHub repository:
   ```python
   git clone --branch DataBase https://github.com/UofCRylan/teacher_assistant_automated_report_card_generation_system
   ```
In your Database instance click on Server->Data Import. Next find the directory where all files were cloned on your local machine and update the project folder. Then you can successfully import the schema. Now you should be able to see all tables imported into the
database.
   
## 2. Project Setup – Django Backend

This section outlines how to configure and launch the backend server using Django

### Step 1: Pull the backend code from GitHub
Clone the main branch into a separate local directory:
```python
git clone --branch main https://github.com/UofCRylan/teacher_assistant_automated_report_card_generation_system
cd CPSC_471_Database_Project
```
### Step 2: Create & Activate a Virtual Environment
To install and activate your virtual enviroment, please visit 
 https://virtualenv.pypa.io/en/latest/user_guide.html

Then install the necessary packages inside the virtual environment:
```python
pip install --upgrade pip setuptools wheel
pip install -r requirements.txt
pip install django
pip install pipwin
pip install mysqlclient
```
### Step 4: Configure Environment Variables
Open the code in youre chosen IDE that was pulled from main branch of the GitHub Repository. Your IDE must support Python. Navigate to the school_backend folder and open settings.py. In this file you must edit NAME, USER, PASSWORD with the credentials noted in step 1.


```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'YOUR_DATABASE_NAME',
        'USER': 'YOUR_USERNAME',
        'PASSWORD': 'YOUR_PASSWORD',
        'HOST': 'localhost',
        'PORT': '3306',
    }
}
```

### Step 5: Run Django Migrations & Collect Static Files
Run these two commands within the virtual environment through the terminal
```python
python manage.py migrate
python manage.py collectstatic --noinput
```
### Step 6: Start the Development Server
Start the Django server by running:
```python
python manage.py runserver
```
If successful, you will see the backend server running at: http://127.0.0.1:8000/

You now have the Django backend fully configured and running.

## 3. Project Setup – Frontend React

### Step 1: Pull the frontend code from GitHub
Once again, please visit the GitHub repository and pull from the frontend branch, storing the files in a different local directory then initially used for the database files and the backend project code.
```python
git clone --branch frontend  https://github.com/UofCRylan/teacher_assistant_automated_report_card_generation_system
cd CPSC_471_Database_Project
```
### Step 2: Activate the Virtual environment
In the terminal navigate to the directory where your virtual environment is and activate it. Make sure within the virtual environment you are in the directory where your frontend is locally stored. 

### Step 3: Start the Development Server
First install the required imports then start the server: Run the commands within the virtual environment in the terminal
```python
npm install
npm run dev
npm start
```
Now in your browser (chrome, firefox, etc) copy and paste thelink to the server
http://127.0.0.1:3000/

Now you can navigate around the project and explore all
features. 
