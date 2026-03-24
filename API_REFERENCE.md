# API Quick Reference Guide

## Base URL
```
http://localhost:8000/api
```

## Authentication
Include the token in your requests:
```
Authorization: Token YOUR_TOKEN_HERE
```

---

## 1. USER ENDPOINTS

### Register
```http
POST /users/users/register/
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "secure_password",
  "password2": "secure_password",
  "first_name": "John",
  "last_name": "Doe"
}

Response (201 Created):
{
  "user": {
    "id": 1,
    "username": "john_doe",
    "email": "john@example.com",
    "first_name": "John",
    "last_name": "Doe"
  },
  "token": "abc123token"
}
```

### Login
```http
POST /users/users/login/
Content-Type: application/json

{
  "username": "john_doe",
  "password": "secure_password"
}

Response (200 OK):
{
  "user": {
    "id": 1,
    "username": "john_doe",
    "email": "john@example.com",
    "first_name": "John",
    "last_name": "Doe"
  },
  "token": "abc123token"
}
```

### Get Current User Profile
```http
GET /users/users/profile/
Headers: Authorization: Token abc123token

Response (200 OK):
{
  "id": 1,
  "user": {...},
  "role": "user",
  "phone": "1234567890",
  "address": "123 Main St",
  "city": "San Francisco",
  "state": "California",
  "postal_code": "94102",
  "bio": "Event enthusiast",
  "created_at": "2024-01-15T10:30:00Z"
}
```

### Update Profile
```http
PUT /users/profiles/1/
Headers: Authorization: Token abc123token
Content-Type: application/json

{
  "phone": "9876543210",
  "address": "456 Oak Ave",
  "city": "Los Angeles",
  "state": "California",
  "postal_code": "90001",
  "bio": "Updated bio"
}
```

### Logout
```http
POST /users/users/logout/
Headers: Authorization: Token abc123token

Response (200 OK):
{
  "message": "Logged out successfully"
}
```

---

## 2. EVENT ENDPOINTS

### List All Events
```http
GET /events/events/?status=upcoming&city=San%20Francisco&search=conference

Query Parameters:
- status: upcoming, ongoing, completed, cancelled
- city: filter by city
- search: search by title, description, location
- ordering: start_date, price, created_at (prefix with - for descending)

Response (200 OK):
{
  "count": 50,
  "next": "http://localhost:8000/api/events/events/?page=2",
  "previous": null,
  "results": [
    {
      "id": 1,
      "title": "Tech Conference 2024",
      "category": {
        "id": 1,
        "name": "Technology",
        "description": "Tech events"
      },
      "organizer_name": "Company Name",
      "location": "Convention Center",
      "city": "San Francisco",
      "start_date": "2024-06-15T09:00:00Z",
      "price": "99.99",
      "capacity": 500,
      "current_attendees": 250,
      "remaining_seats": 250,
      "image": "http://localhost:8000/media/event_images/...",
      "status": "upcoming",
      "is_featured": true,
      "is_available": true,
      "created_at": "2024-01-10T08:00:00Z"
    }
  ]
}
```

### Get Event Details
```http
GET /events/events/1/
Headers: Authorization: Token abc123token (optional)

Response (200 OK):
{
  "id": 1,
  "title": "Tech Conference 2024",
  "description": "Annual tech conference with speakers...",
  "category": {...},
  "organizer_id": 5,
  "organizer_name": "Company Name",
  "location": "Convention Center",
  "city": "San Francisco",
  "state": "California",
  "latitude": 37.7749,
  "longitude": -122.4194,
  "start_date": "2024-06-15T09:00:00Z",
  "end_date": "2024-06-15T18:00:00Z",
  "price": "99.99",
  "capacity": 500,
  "current_attendees": 250,
  "remaining_seats": 250,
  "image": "http://localhost:8000/media/event_images/...",
  "images": [
    {
      "id": 1,
      "image": "http://localhost:8000/media/event_images/...",
      "uploaded_at": "2024-01-10T08:00:00Z"
    }
  ],
  "status": "upcoming",
  "is_featured": true,
  "is_available": true,
  "created_at": "2024-01-10T08:00:00Z",
  "updated_at": "2024-01-14T12:00:00Z"
}
```

### Create Event (Organizer/Admin only)
```http
POST /events/events/
Headers: Authorization: Token abc123token
Content-Type: multipart/form-data

{
  "title": "Web Development Workshop",
  "description": "Learn modern web development",
  "category": 1,
  "location": "Tech Hub",
  "city": "San Francisco",
  "state": "California",
  "latitude": 37.7749,
  "longitude": -122.4194,
  "start_date": "2024-07-20T10:00:00Z",
  "end_date": "2024-07-20T16:00:00Z",
  "price": "49.99",
  "capacity": 50,
  "image": <file>
}

Response (201 Created): Event object
```

### Get Upcoming Events
```http
GET /events/events/upcoming/

Response (200 OK): List of upcoming events
```

### Get Featured Events
```http
GET /events/events/featured/

Response (200 OK): List of featured events
```

### Get Event Categories
```http
GET /events/categories/

Response (200 OK):
[
  {
    "id": 1,
    "name": "Technology",
    "description": "Tech related events",
    "icon": "tech",
    "created_at": "2024-01-01T00:00:00Z"
  }
]
```

---

## 3. BOOKING ENDPOINTS

### Create Booking
```http
POST /bookings/bookings/
Headers: Authorization: Token abc123token
Content-Type: application/json

{
  "event_id": 1,
  "number_of_tickets": 2
}

Response (201 Created):
{
  "id": 1,
  "user": {...},
  "event": {...},
  "number_of_tickets": 2,
  "total_price": "199.98",
  "status": "pending",
  "booking_date": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-15T10:30:00Z",
  "notes": null,
  "attendee": {
    "id": 1,
    "ticket_number": "TICKET-ABC12345",
    "checked_in": false
  }
}
```

### Get My Bookings
```http
GET /bookings/bookings/my_bookings/
Headers: Authorization: Token abc123token

Response (200 OK): List of user's bookings
```

### Confirm Booking
```http
POST /bookings/bookings/1/confirm/
Headers: Authorization: Token abc123token

Response (200 OK): Updated booking with status "confirmed"
```

### Cancel Booking
```http
POST /bookings/bookings/1/cancel/
Headers: Authorization: Token abc123token

Response (200 OK):
{
  "message": "Booking cancelled successfully"
}
```

### Check-in Attendee
```http
POST /bookings/attendees/1/check_in/
Headers: Authorization: Token abc123token

Response (200 OK):
{
  "id": 1,
  "ticket_number": "TICKET-ABC12345",
  "checked_in": true,
  "checked_in_at": "2024-06-15T09:30:00Z"
}
```

---

## 4. PAYMENT ENDPOINTS

### Create Payment
```http
POST /payments/payments/create_payment/
Headers: Authorization: Token abc123token
Content-Type: application/json

{
  "booking_id": 1,
  "payment_method": "stripe"
}

Response (201 Created):
{
  "id": 1,
  "booking": {...},
  "amount": "199.98",
  "currency": "USD",
  "payment_method": "stripe",
  "status": "pending",
  "transaction_id": null,
  "stripe_payment_intent_id": null,
  "paid_at": null,
  "created_at": "2024-01-15T10:35:00Z",
  "updated_at": "2024-01-15T10:35:00Z",
  "notes": null,
  "is_paid": false
}
```

### Process Stripe Payment
```http
POST /payments/payments/1/process_stripe_payment/
Headers: Authorization: Token abc123token
Content-Type: application/json

{
  "token": "pm_1234567890"  // Stripe payment method token from frontend
}

Response (200 OK):
{
  "id": 1,
  "booking": {...},
  "amount": "199.98",
  "currency": "USD",
  "payment_method": "stripe",
  "status": "completed",
  "transaction_id": "pi_1234567890",
  "stripe_payment_intent_id": "pi_1234567890",
  "paid_at": "2024-01-15T10:40:00Z",
  "created_at": "2024-01-15T10:35:00Z",
  "updated_at": "2024-01-15T10:40:00Z",
  "is_paid": true
}
```

### Get My Payments
```http
GET /payments/payments/
Headers: Authorization: Token abc123token

Response (200 OK): List of user's payments
```

### Request Refund
```http
POST /payments/refunds/
Headers: Authorization: Token abc123token
Content-Type: application/json

{
  "payment_id": 1,
  "amount": "199.98",
  "reason": "user_request",
  "notes": "Change of plans"
}

Response (201 Created):
{
  "id": 1,
  "payment": {...},
  "amount": "199.98",
  "reason": "user_request",
  "status": "pending",
  "refund_transaction_id": null,
  "requested_at": "2024-01-15T11:00:00Z",
  "completed_at": null,
  "notes": "Change of plans"
}
```

### Process Refund
```http
POST /payments/refunds/1/process_refund/
Headers: Authorization: Token abc123token

Response (200 OK):
{
  "id": 1,
  "payment": {...},
  "amount": "199.98",
  "reason": "user_request",
  "status": "completed",
  "refund_transaction_id": "re_1234567890",
  "requested_at": "2024-01-15T11:00:00Z",
  "completed_at": "2024-01-15T11:05:00Z",
  "notes": "Change of plans"
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "error": "Description of what went wrong"
}
```

### 401 Unauthorized
```json
{
  "detail": "Authentication credentials were not provided."
}
```

### 403 Forbidden
```json
{
  "detail": "You do not have permission to perform this action."
}
```

### 404 Not Found
```json
{
  "detail": "Not found."
}
```

### 500 Internal Server Error
```json
{
  "detail": "Internal server error"
}
```

---

## Common Status Codes

- `200 OK` - Request successful
- `201 Created` - Resource created successfully
- `204 No Content` - Request successful, no content to return
- `400 Bad Request` - Invalid request parameters
- `401 Unauthorized` - Authentication required
- `403 Forbidden` - Permission denied
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

---

## Rate Limiting

Currently no rate limiting is implemented. This is recommended for production.

---

## Pagination

List endpoints return paginated results:

```json
{
  "count": 100,
  "next": "http://localhost:8000/api/events/events/?page=2",
  "previous": null,
  "results": [...]
}
```

Add `?page=2` to get the next page.

---

## Filtering & Searching

### Filter Examples
```
GET /events/events/?status=upcoming&city=San%20Francisco

GET /bookings/bookings/?status=confirmed

GET /payments/payments/?status=completed
```

### Search Examples
```
GET /events/events/?search=conference

GET /events/categories/?search=tech
```

### Ordering Examples
```
GET /events/events/?ordering=-start_date  # Descending

GET /events/events/?ordering=price  # Ascending
```

---

## Frontend Integration Example (React)

```javascript
// Get CORS Allowed Origin from settings
const API_BASE_URL = 'http://localhost:8000/api';

// Store token
const token = localStorage.getItem('token');

// Fetch with token
fetch(`${API_BASE_URL}/users/users/profile/`, {
  headers: {
    'Authorization': `Token ${token}`,
    'Content-Type': 'application/json'
  }
})
.then(res => res.json())
.then(data => console.log(data));
```

---

## Testing Tools

Use **Postman**, **Insomnia**, or **cURL** to test these endpoints.
