# Event Management System (EMS) - Django Backend

A complete Django REST API backend for Event Management System with user authentication, event management, bookings, and payment processing.

## Features

✅ **User Management**
- User registration and login
- User profiles with roles (User, Admin, Organizer)
- Profile management (avatar, bio, address, etc.)

✅ **Event Management**
- Create, read, update, delete events
- Event categories
- Event images
- Capacity management
- Event status tracking (upcoming, ongoing, completed, cancelled)

✅ **Booking System**
- Book tickets for events
- Multiple ticket bookings
- Booking status management
- Attendee generation with ticket numbers
- Check-in functionality

✅ **Payment Processing**
- Stripe payment integration
- Multiple payment methods support
- Payment status tracking
- Refund management
- Payment history

## Project Structure

```
EMS-backend/
├── requirements.txt                 # Python dependencies
├── .env.example                     # Environment variables template
│
└── ems_project/                     # Main project folder
    ├── manage.py                    # Django management script
    ├── ems_project/                 # Project configuration
    │   ├── __init__.py
    │   ├── settings.py              # Django settings
    │   ├── urls.py                  # Main URL routing
    │   ├── wsgi.py                  # WSGI configuration
    │   └── asgi.py                  # ASGI configuration
    │
    ├── users/                       # User management app
    │   ├── models.py                # User profile model
    │   ├── serializers.py           # DRF serializers
    │   ├── views.py                 # API views
    │   ├── urls.py                  # App URLs
    │   └── admin.py                 # Admin configuration
    │
    ├── events/                      # Event management app
    │   ├── models.py                # Event, Category, EventImage models
    │   ├── serializers.py           # DRF serializers
    │   ├── views.py                 # API views
    │   ├── urls.py                  # App URLs
    │   └── admin.py                 # Admin configuration
    │
    ├── bookings/                    # Booking management app
    │   ├── models.py                # Booking, Attendee models
    │   ├── serializers.py           # DRF serializers
    │   ├── views.py                 # API views
    │   ├── urls.py                  # App URLs
    │   └── admin.py                 # Admin configuration
    │
    └── payments/                    # Payment processing app
        ├── models.py                # Payment, Refund, PaymentHistory models
        ├── serializers.py           # DRF serializers
        ├── views.py                 # API views
        ├── urls.py                  # App URLs
        └── admin.py                 # Admin configuration
```

## Prerequisites

- Python 3.8+
- MySQL 5.7+
- pip (Python package manager)

## Installation & Setup

### 1. Clone the Repository
```bash
cd c:\Users\swayam\Downloads\EMS-backend
```

### 2. Create Virtual Environment
```bash
# On Windows
python -m venv venv
venv\Scripts\activate

# On macOS/Linux
python -m venv venv
source venv/bin/activate
```

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

### 4. Configure Database
Make sure MySQL is running on localhost:3306

Create a MySQL database:
```bash
mysql -u root -p
CREATE DATABASE ems_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
EXIT;
```

### 5. Environment Variables
Create a `.env` file in the `EMS-backend` directory:
```bash
cp .env.example .env
```

Edit `.env` and update:
- `DB_USER` - Your MySQL username
- `DB_PASSWORD` - Your MySQL password
- `STRIPE_SECRET_KEY` - Your Stripe secret key
- `STRIPE_PUBLISHABLE_KEY` - Your Stripe publishable key
- `SECRET_KEY` - Generate a secure key for production

### 6. Run Migrations
```bash
cd ems_project
python manage.py migrate
```

### 7. Create Superuser (Admin)
```bash
python manage.py createsuperuser
```

### 8. Run Development Server
```bash
python manage.py runserver
```

The API will be available at: `http://localhost:8000/`
Admin panel: `http://localhost:8000/admin/`

## API Endpoints

### Authentication
- `POST /api/users/users/register/` - Register new user
- `POST /api/users/users/login/` - Login user
- `POST /api/users/users/logout/` - Logout user

### User Management
- `GET /api/users/users/` - List all users (admin only)
- `GET /api/users/users/{id}/` - Get user details
- `GET /api/users/users/profile/` - Get current user's profile
- `GET /api/users/profiles/` - List all profiles
- `GET /api/users/profiles/{id}/` - Get profile details
- `PUT /api/users/profiles/{id}/` - Update profile

### Events
- `GET /api/events/events/` - List all events
- `GET /api/events/events/{id}/` - Get event details
- `POST /api/events/events/` - Create event (organizer/admin only)
- `PUT /api/events/events/{id}/` - Update event
- `DELETE /api/events/events/{id}/` - Delete event
- `GET /api/events/events/upcoming/` - Get upcoming events
- `GET /api/events/events/featured/` - Get featured events
- `GET /api/events/categories/` - List categories

### Bookings
- `GET /api/bookings/bookings/` - Get user's bookings
- `POST /api/bookings/bookings/` - Create booking
- `GET /api/bookings/bookings/{id}/` - Get booking details
- `POST /api/bookings/bookings/{id}/cancel/` - Cancel booking
- `POST /api/bookings/bookings/{id}/confirm/` - Confirm booking
- `GET /api/bookings/attendees/` - List attendees
- `POST /api/bookings/attendees/{id}/check_in/` - Check-in attendee

### Payments
- `POST /api/payments/payments/create_payment/` - Create payment
- `GET /api/payments/payments/` - Get user's payments
- `POST /api/payments/payments/{id}/process_stripe_payment/` - Process Stripe payment
- `POST /api/payments/refunds/` - Request refund
- `POST /api/payments/refunds/{id}/process_refund/` - Process refund

## Database Models

### Users App
- **UserProfile** - Extended user information with roles

### Events App
- **Category** - Event categories
- **Event** - Event details and metadata
- **EventImage** - Additional event images

### Bookings App
- **Booking** - Ticket bookings for events
- **Attendee** - Attendee information with ticket numbers

### Payments App
- **Payment** - Payment records
- **PaymentHistory** - Payment status history
- **Refund** - Refund records

## Authentication

The API uses **Token Authentication**. 

To authenticate:
1. Register/Login to get a token
2. Add token to request header: `Authorization: Token YOUR_TOKEN_HERE`

## Testing

### Create a Test Event
```bash
curl -X POST http://localhost:8000/api/events/events/ \
  -H "Authorization: Token YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Tech Conference 2024",
    "description": "Annual tech conference",
    "start_date": "2024-06-15T09:00:00Z",
    "end_date": "2024-06-15T18:00:00Z",
    "location": "Convention Center",
    "city": "San Francisco",
    "state": "California",
    "price": "99.99",
    "capacity": 100,
    "category": 1
  }'
```

### Book an Event
```bash
curl -X POST http://localhost:8000/api/bookings/bookings/ \
  -H "Authorization: Token YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "event_id": 1,
    "number_of_tickets": 2
  }'
```

## Environment Variables Reference

| Variable | Description | Default |
|----------|-------------|---------|
| `SECRET_KEY` | Django secret key | django-insecure-... |
| `DEBUG` | Debug mode | True |
| `ALLOWED_HOSTS` | Allowed hosts | localhost,127.0.0.1 |
| `DB_NAME` | Database name | ems_db |
| `DB_USER` | Database user | root |
| `DB_PASSWORD` | Database password | (empty) |
| `DB_HOST` | Database host | localhost |
| `DB_PORT` | Database port | 3306 |
| `CORS_ALLOWED_ORIGINS` | CORS origins | localhost:3000 |
| `STRIPE_SECRET_KEY` | Stripe secret key | (required) |
| `STRIPE_PUBLISHABLE_KEY` | Stripe public key | (required) |

## Production Deployment

Before deploying to production:

1. Set `DEBUG=False` in `.env`
2. Generate a secure `SECRET_KEY`
3. Configure `ALLOWED_HOSTS` with your domain
4. Use environment variable for sensitive data
5. Enable HTTPS
6. Use a production database (not SQLite)
7. Use a production WSGI server (Gunicorn, uWSGI)
8. Configure proper logging
9. Set up static file serving
10. Enable CORS for your frontend domain only

## Troubleshooting

### MySQL Connection Error
- Ensure MySQL is running
- Check DB_USER and DB_PASSWORD in `.env`
- Verify database name exists

### Migration Errors
```bash
python manage.py makemigrations
python manage.py migrate --fake-initial
```

### Static Files Issues
```bash
python manage.py collectstatic --noinput
```

## Contributing

Please follow PEP 8 style guide and include proper documentation for new features.

## License

This project is licensed under the MIT License.

## Support

For issues and questions, please create an issue in the repository.

## Roadmap

- [ ] Email notifications
- [ ] SMS notifications
- [ ] Advanced analytics
- [ ] Ticket validation QR codes
- [ ] Refund automation
- [ ] Multi-language support
- [ ] API rate limiting
- [ ] WebSocket for real-time updates
