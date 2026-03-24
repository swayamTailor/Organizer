import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UserSidebar from '../../components/UserSidebar';

const defaultBookings = [
  { id: 'b1', event: 'Live Music Night', eventId: '1', date: '2026-02-14', venue: 'Town Hall', status: 'Confirmed', price: 0, formattedPrice: 'Free' },
];

export default function MyBookings() {
  const [bookings, setBookings] = useState(defaultBookings);

  useEffect(() => {
    // Load bookings from localStorage
    const storedBookings = localStorage.getItem('bookings');
    if (storedBookings) {
      try {
        setBookings(JSON.parse(storedBookings));
      } catch (e) {
        setBookings(defaultBookings);
      }
    }
  }, []);
  return (
    <div className="user-layout">
      <UserSidebar />
      <div className="user-main page-container">
        <div className="max-w-4xl mx-auto">
          <h1 className="section-heading mb-2">My Bookings</h1>
          <p className="text-slate-600 mb-8">View and manage your event bookings and tickets.</p>

          {bookings.length === 0 ? (
            <div className="card-premium p-12 text-center">
              <p className="text-slate-500" style={{ margin: 0 }}>You don’t have any bookings yet.</p>
              <Link to="/events" className="text-primary-600 font-semibold mt-4" style={{ display: 'inline-block', textDecoration: 'underline' }}>
                Browse events
              </Link>
            </div>
          ) : (
            <ul className="flex flex-col gap-4" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {bookings.map((b) => (
                <li key={b.id} className="card-premium p-6">
                  <div className="flex flex-col gap-4" style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                    <div>
                      <h3 className="font-semibold text-slate-900" style={{ margin: 0 }}>{b.event}</h3>
                      <p className="text-sm text-slate-500 mt-1">{b.date} · {b.venue}</p>
                      <div style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <span className="badge badge-green">{b.status}</span>
                        <span className="text-sm font-semibold text-slate-900">
                          Price: {b.formattedPrice || '₹' + (b.price || 0).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Link to={`/events/${b.eventId}`} className="btn btn-outline">View event</Link>
                      <button type="button" onClick={() => alert('Downloading ticket...')} className="btn btn-primary">
                        Download ticket
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
