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
npm run build
npm start
```
Now in your browser (chrome, firefox, etc) copy and paste thelink to the server
http://127.0.0.1:3000/

Now you can navigate around the project and explore all
features. 
