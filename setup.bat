@echo off
REM Quick Setup Script for EMS Backend
REM Run this script from the EMS-backend folder

echo.
echo ========================================
echo   EMS Backend - Quick Setup
echo ========================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo Error: Python is not installed or not in PATH
    pause
    exit /b 1
)

echo [1/5] Creating virtual environment...
python -m venv venv
if errorlevel 1 (
    echo Error: Failed to create virtual environment
    pause
    exit /b 1
)

echo [2/5] Activating virtual environment...
call venv\Scripts\activate.bat

echo [3/5] Installing dependencies...
pip install -r requirements.txt
if errorlevel 1 (
    echo Error: Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo [4/5] Running Django migrations...
cd ems_project
python manage.py migrate
if errorlevel 1 (
    echo Error: Failed to run migrations
    pause
    exit /b 1
)

echo.
echo ========================================
echo   Setup Complete!
echo ========================================
echo.
echo Next steps:
echo.
echo 1. Create .env file from .env.example:
echo    copy .env.example .env
echo    (Edit .env with your database and Stripe credentials)
echo.
echo 2. Create a superuser (admin account):
echo    cd ems_project
echo    python manage.py createsuperuser
echo.
echo 3. Start the development server:
echo    python manage.py runserver
echo.
echo 4. Access the API at: http://localhost:8000/
echo    Admin panel: http://localhost:8000/admin/
echo.
echo Database: Make sure MySQL is running and ems_db exists
echo.
pause
