#!/bin/bash
# Quick Setup Script for EMS Backend
# Run this script from the EMS-backend folder

echo ""
echo "========================================"
echo "   EMS Backend - Quick Setup"
echo "========================================"
echo ""

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "Error: Python 3 is not installed"
    exit 1
fi

echo "[1/5] Creating virtual environment..."
python3 -m venv venv

echo "[2/5] Activating virtual environment..."
source venv/bin/activate

echo "[3/5] Installing dependencies..."
pip install -r requirements.txt

echo ""
echo "[4/5] Running Django migrations..."
cd ems_project
python manage.py migrate

echo ""
echo "========================================"
echo "   Setup Complete!"
echo "========================================"
echo ""
echo "Next steps:"
echo ""
echo "1. Create .env file from .env.example:"
echo "   cp .env.example .env"
echo "   (Edit .env with your database and Stripe credentials)"
echo ""
echo "2. Create a superuser (admin account):"
echo "   cd ems_project"
echo "   python manage.py createsuperuser"
echo ""
echo "3. Start the development server:"
echo "   python manage.py runserver"
echo ""
echo "4. Access the API at: http://localhost:8000/"
echo "   Admin panel: http://localhost:8000/admin/"
echo ""
echo "Database: Make sure MySQL is running and ems_db exists"
echo ""
