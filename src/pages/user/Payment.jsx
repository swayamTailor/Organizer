import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import UserSidebar from '../../components/UserSidebar';
import { formatPriceInRupees } from '../../utils/priceUtils';

export default function Payment() {
  const [processing, setProcessing] = useState(false);
  const [done, setDone] = useState(false);
  const [bookingData, setBookingData] = useState({
    eventTitle: 'Live Music Night',
    eventPrice: 0,
    formattedPrice: 'Free'
  });

  useEffect(() => {
    // Retrieve booking information from sessionStorage
    const eventTitle = sessionStorage.getItem('booking_event_title') || 'Live Music Night';
    const eventPrice = parseInt(sessionStorage.getItem('booking_event_price') || '0', 10);
    const formattedPrice = formatPriceInRupees(eventPrice);

    setBookingData({
      eventTitle,
      eventPrice,
      formattedPrice
    });
  }, []);

  function pay(e) {
    e.preventDefault();
    setProcessing(true);
    setTimeout(() => {
      // Store the booking in localStorage for persistence
      const eventId = sessionStorage.getItem('booking_event_id') || '1';
      const existingBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
      
      const newBooking = {
        id: `b${Date.now()}`,
        eventId,
        event: bookingData.eventTitle,
        date: new Date().toLocaleDateString(),
        venue: 'Event Venue',
        status: 'Confirmed',
        price: bookingData.eventPrice,
        formattedPrice: bookingData.formattedPrice
      };
      
      existingBookings.push(newBooking);
      localStorage.setItem('bookings', JSON.stringify(existingBookings));
      
      // Clear session data
      sessionStorage.removeItem('booking_event_id');
      sessionStorage.removeItem('booking_event_title');
      sessionStorage.removeItem('booking_event_price');
      
      setProcessing(false);
      setDone(true);
    }, 1500);
  }

  if (done) {
    return (
      <div className="user-layout">
        <UserSidebar />
        <div className="user-main page-container">
          <div className="max-w-md mx-auto text-center card-premium p-10">
            <div className="success-icon-wrap" style={{ background: 'var(--green-100)' }}>
              <svg className="text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--green-800)' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="success-title">Payment successful</h2>
            <p className="success-text">Your booking is confirmed. Check My Bookings for your ticket.</p>
            <Link to="/user/bookings" className="auth-link mt-6" style={{ display: 'inline-block', marginTop: '1.5rem' }}>
              View my bookings
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="user-layout">
      <UserSidebar />
      <div className="user-main page-container">
        <div className="max-w-lg mx-auto">
          <h1 className="section-heading mb-2">Payment</h1>
          <p className="text-slate-600 mb-8">Complete your booking with a secure payment. (Demo — integrate Stripe/Razorpay as needed.)</p>

          <div className="card-premium p-6" style={{ padding: '2rem' }}>
            <div className="card-premium p-4 mb-6" style={{ background: 'var(--slate-50)', border: '1px solid var(--slate-200)' }}>
              <p className="text-sm font-medium text-slate-700" style={{ margin: 0 }}>Order summary</p>
              <p className="text-slate-600 text-sm mt-1">{bookingData.eventTitle} · 1 ticket</p>
              <p className="text-lg font-bold text-slate-900 mt-2">{bookingData.formattedPrice}</p>
            </div>
            <p className="text-sm text-slate-500 mb-4">
              This is a demo payment page. In production, connect Stripe or Razorpay for real payments.
            </p>
            <Button variant="primary" onClick={pay} className="btn-block">
              {processing ? 'Processing…' : 'Confirm payment'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
