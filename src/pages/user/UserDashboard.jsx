import React from 'react';
import { Link } from 'react-router-dom';
import UserSidebar from '../../components/UserSidebar';

const upcoming = [
  { id: '1', title: 'Live Music Night', date: '2026-02-14', venue: 'Town Hall' },
];

export default function UserDashboard() {
  return (
    <div className="user-layout">
      <UserSidebar />
      <div className="user-main page-container">
        <div className="max-w-4xl mx-auto">
          <h1 className="section-heading mb-2">Welcome back</h1>
          <p className="text-slate-600 mb-8">Here’s an overview of your events and bookings.</p>

          <div className="events-grid mb-10" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', marginBottom: '2.5rem' }}>
            <Link to="/user/bookings" className="card-premium p-6 block">
              <p className="text-sm font-medium text-slate-500">Registered events</p>
              <p className="text-3xl font-bold text-primary-600 mt-2">2</p>
            </Link>
            <Link to="/events" className="card-premium p-6 block">
              <p className="text-sm font-medium text-slate-500">Upcoming</p>
              <p className="text-3xl font-bold text-slate-900 mt-2">1</p>
            </Link>
          </div>

          <div className="section-header mb-6">
            <h2 className="text-xl font-bold text-slate-900" style={{ margin: 0 }}>Upcoming events</h2>
            <Link to="/user/bookings" className="text-sm font-semibold text-primary-600" style={{ textDecoration: 'none' }}>
              View all bookings →
            </Link>
          </div>

          {upcoming.length === 0 ? (
            <div className="card-premium p-8 text-center text-slate-500">
              <p style={{ margin: 0 }}>No upcoming events. <Link to="/events" className="text-primary-600 font-medium" style={{ textDecoration: 'underline' }}>Browse events</Link> to register.</p>
            </div>
          ) : (
            <ul className="flex flex-col gap-4" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {upcoming.map((e) => (
                <li key={e.id} className="card-premium p-5">
                  <div className="flex flex-col gap-4" style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                    <div>
                      <h3 className="font-semibold text-slate-900" style={{ margin: 0 }}>{e.title}</h3>
                      <p className="text-sm text-slate-500 mt-1">{e.date} · {e.venue}</p>
                    </div>
                    <div className="flex gap-3">
                      <Link to={`/events/${e.id}`} className="btn btn-outline">View event</Link>
                      <button type="button" onClick={() => alert('Downloading ticket...')} className="btn btn-primary">
                        Download ticket
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}

          <div className="flex flex-wrap gap-4 mt-10">
            <Link to="/events" className="cta-btn">Browse events</Link>
            <Link to="/user/profile" className="btn btn-outline btn-lg">Edit profile</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
