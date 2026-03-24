# Frontend Integration Guide

This guide explains how to integrate your React EMS frontend with the Django backend.

## Backend API URL Configuration

Update your frontend to point to the backend API:

### 1. Create API Configuration File

Create `src/config/api.js`:

```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

export const API_ENDPOINTS = {
  // Auth
  REGISTER: `${API_BASE_URL}/users/users/register/`,
  LOGIN: `${API_BASE_URL}/users/users/login/`,
  LOGOUT: `${API_BASE_URL}/users/users/logout/`,
  PROFILE: `${API_BASE_URL}/users/users/profile/`,
  
  // Events
  EVENTS: `${API_BASE_URL}/events/events/`,
  EVENTS_UPCOMING: `${API_BASE_URL}/events/events/upcoming/`,
  EVENTS_FEATURED: `${API_BASE_URL}/events/events/featured/`,
  CATEGORIES: `${API_BASE_URL}/events/categories/`,
  
  // Bookings
  BOOKINGS: `${API_BASE_URL}/bookings/bookings/`,
  MY_BOOKINGS: `${API_BASE_URL}/bookings/bookings/my_bookings/`,
  
  // Payments
  PAYMENTS: `${API_BASE_URL}/payments/payments/`,
  CREATE_PAYMENT: `${API_BASE_URL}/payments/payments/create_payment/`,
};

export default API_BASE_URL;
```

### 2. Create Environment Configuration

Create `.env`:

```
REACT_APP_API_URL=http://localhost:8000/api
REACT_APP_STRIPE_KEY=pk_test_your_stripe_publishable_key
```

### 3. Create API Service Module

Create `src/services/api.js`:

```javascript
import API_BASE_URL, { API_ENDPOINTS } from '../config/api';

class ApiService {
  constructor() {
    this.token = localStorage.getItem('auth_token');
  }

  // Set token after login
  setToken(token) {
    this.token = token;
    localStorage.setItem('auth_token', token);
  }

  // Get token
  getToken() {
    return this.token || localStorage.getItem('auth_token');
  }

  // Clear token on logout
  clearToken() {
    this.token = null;
    localStorage.removeItem('auth_token');
  }

  // Generic fetch with auth
  async fetch(url, options = {}) {
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    const token = this.getToken();
    if (token) {
      headers['Authorization'] = `Token ${token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || error.error || 'API request failed');
    }

    return response.json();
  }

  // Auth endpoints
  async register(data) {
    const response = await this.fetch(API_ENDPOINTS.REGISTER, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    if (response.token) {
      this.setToken(response.token);
    }
    return response;
  }

  async login(username, password) {
    const response = await this.fetch(API_ENDPOINTS.LOGIN, {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
    if (response.token) {
      this.setToken(response.token);
    }
    return response;
  }

  async logout() {
    await this.fetch(API_ENDPOINTS.LOGOUT, { method: 'POST' });
    this.clearToken();
  }

  async getProfile() {
    return this.fetch(API_ENDPOINTS.PROFILE);
  }

  // Event endpoints
  async getEvents(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.fetch(`${API_ENDPOINTS.EVENTS}?${queryString}`);
  }

  async getEvent(id) {
    return this.fetch(`${API_ENDPOINTS.EVENTS}${id}/`);
  }

  async getUpcomingEvents() {
    return this.fetch(API_ENDPOINTS.EVENTS_UPCOMING);
  }

  async getFeaturedEvents() {
    return this.fetch(API_ENDPOINTS.EVENTS_FEATURED);
  }

  async getCategories() {
    return this.fetch(API_ENDPOINTS.CATEGORIES);
  }

  async createEvent(data) {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      formData.append(key, data[key]);
    });

    const headers = {};
    const token = this.getToken();
    if (token) {
      headers['Authorization'] = `Token ${token}`;
    }

    const response = await fetch(API_ENDPOINTS.EVENTS, {
      method: 'POST',
      headers,
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to create event');
    }

    return response.json();
  }

  // Booking endpoints
  async getMyBookings() {
    return this.fetch(API_ENDPOINTS.MY_BOOKINGS);
  }

  async createBooking(eventId, numberOfTickets) {
    return this.fetch(API_ENDPOINTS.BOOKINGS, {
      method: 'POST',
      body: JSON.stringify({
        event_id: eventId,
        number_of_tickets: numberOfTickets,
      }),
    });
  }

  async cancelBooking(bookingId) {
    return this.fetch(`${API_ENDPOINTS.BOOKINGS}${bookingId}/cancel/`, {
      method: 'POST',
    });
  }

  // Payment endpoints
  async createPayment(bookingId, paymentMethod = 'stripe') {
    return this.fetch(API_ENDPOINTS.CREATE_PAYMENT, {
      method: 'POST',
      body: JSON.stringify({
        booking_id: bookingId,
        payment_method: paymentMethod,
      }),
    });
  }

  async processStripePayment(paymentId, token) {
    return this.fetch(`${API_ENDPOINTS.PAYMENTS}${paymentId}/process_stripe_payment/`, {
      method: 'POST',
      body: JSON.stringify({ token }),
    });
  }
}

export default new ApiService();
```

---

## Authentication Flow

### 1. Register New User

```javascript
// components/Register.jsx
import apiService from '../services/api';

function Register() {
  const handleRegister = async (formData) => {
    try {
      const response = await apiService.register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        password2: formData.password,
        first_name: formData.firstName,
        last_name: formData.lastName,
      });
      
      // Token is automatically set and stored
      console.log('User registered:', response.user);
      // Redirect to dashboard
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    // Your register form component
  );
}
```

### 2. Login User

```javascript
// components/Login.jsx
import apiService from '../services/api';

function Login() {
  const handleLogin = async (credentials) => {
    try {
      const response = await apiService.login(
        credentials.username,
        credentials.password
      );
      
      // Token is automatically set and stored
      console.log('User logged in:', response.user);
      // Redirect to dashboard
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    // Your login form component
  );
}
```

### 3. Get Current User Profile

```javascript
// hooks/useProfile.js
import { useEffect, useState } from 'react';
import apiService from '../services/api';

export function useProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await apiService.getProfile();
        setProfile(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (apiService.getToken()) {
      fetchProfile();
    }
  }, []);

  return { profile, loading, error };
}
```

---

## Event Display

### 1. Fetch and Display Events

```javascript
// pages/Events.jsx
import { useEffect, useState } from 'react';
import apiService from '../services/api';
import EventCard from '../components/EventCard';

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: 'upcoming',
    city: '',
    search: '',
  });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await apiService.getEvents(filters);
        setEvents(data.results || data);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [filters]);

  if (loading) return <div>Loading events...</div>;

  return (
    <div className="events-grid">
      {events.map(event => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}

export default Events;
```

### 2. Display Single Event

```javascript
// pages/EventDetails.jsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiService from '../services/api';

function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const data = await apiService.getEvent(id);
        setEvent(data);
      } catch (error) {
        console.error('Error fetching event:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) return <div>Loading event...</div>;
  if (!event) return <div>Event not found</div>;

  return (
    <div className="event-details">
      <h1>{event.title}</h1>
      <p>{event.description}</p>
      <p>Price: ${event.price}</p>
      <p>Available Seats: {event.remaining_seats}/{event.capacity}</p>
      <button onClick={() => handleBook(event.id)}>Book Tickets</button>
    </div>
  );
}
```

---

## Booking Flow

### 1. Create Booking

```javascript
// functions/handleBooking.js
import apiService from '../services/api';

export async function handleBooking(eventId, numberOfTickets) {
  try {
    const booking = await apiService.createBooking(eventId, numberOfTickets);
    console.log('Booking created:', booking);
    
    // Proceed to payment
    return booking;
  } catch (error) {
    console.error('Booking failed:', error);
    throw error;
  }
}
```

### 2. Get User Bookings

```javascript
// pages/MyBookings.jsx
import { useEffect, useState } from 'react';
import apiService from '../services/api';

function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchMyBookings = async () => {
      try {
        const data = await apiService.getMyBookings();
        setBookings(data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchMyBookings();
  }, []);

  return (
    <div className="my-bookings">
      {bookings.map(booking => (
        <div key={booking.id} className="booking-card">
          <h3>{booking.event.title}</h3>
          <p>Tickets: {booking.number_of_tickets}</p>
          <p>Total: ${booking.total_price}</p>
          <p>Status: {booking.status}</p>
        </div>
      ))}
    </div>
  );
}
```

---

## Payment Integration

### 1. Stripe Setup in React

Install Stripe React package:
```bash
npm install @stripe/react-stripe-js @stripe/js
```

### 2. Create Payment Component

```javascript
// components/PaymentForm.jsx
import { loadStripe } from '@stripe/js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import apiService from '../services/api';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

function PaymentForm({ bookingId, amount }) {
  const stripe = useStripe();
  const elements = useElements();

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    // Create payment method
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (error) {
      console.error('Payment error:', error);
      return;
    }

    try {
      // Create payment in backend
      const payment = await apiService.createPayment(bookingId);
      
      // Process payment
      const result = await apiService.processStripePayment(
        payment.id,
        paymentMethod.id
      );

      if (result.status === 'completed') {
        alert('Payment successful!');
        // Redirect to confirmation page
      }
    } catch (error) {
      console.error('Payment processing failed:', error);
    }
  };

  return (
    <form onSubmit={handlePayment}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay ${amount}
      </button>
    </form>
  );
}

export default function Payment({ bookingId, amount }) {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm bookingId={bookingId} amount={amount} />
    </Elements>
  );
}
```

---

## CORS Configuration

The backend already has CORS enabled. Make sure your frontend URL is in `CORS_ALLOWED_ORIGINS` in `.env`:

```
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
```

---

## Error Handling

Create a custom hook for error handling:

```javascript
// hooks/useApi.js
import { useState } from 'react';

export function useApi() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const request = async (apiCall) => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiCall();
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { request, error, loading };
}
```

---

## Environment Variables

Create `.env` in your React project:

```
REACT_APP_API_URL=http://localhost:8000/api
REACT_APP_STRIPE_KEY=pk_test_your_stripe_key
```

---

## Debugging

### Check Network Requests
Use browser DevTools (F12) → Network tab to see API calls

### Check Token
```javascript
// In browser console
localStorage.getItem('auth_token')
```

### Test API Endpoint
```bash
curl -H "Authorization: Token YOUR_TOKEN" http://localhost:8000/api/users/users/profile/
```

---

## Common Issues

### CORS Error
- Ensure backend is running on `http://localhost:8000`
- Check `CORS_ALLOWED_ORIGINS` in Django settings
- Frontend should be at `http://localhost:3000`

### Token Not Persisting
- Check browser localStorage for `auth_token`
- Ensure token is being set after login

### Payment Not Processing
- Verify Stripe keys in `.env`
- Check browser console for errors
- Ensure payment intent is created correctly

---

## Production Deployment

When deploying to production:

1. Update `REACT_APP_API_URL` to production backend URL
2. Use environment-specific `.env` files
3. Update `CORS_ALLOWED_ORIGINS` on backend
4. Use real Stripe keys (not test keys)
5. Enable HTTPS for payments
