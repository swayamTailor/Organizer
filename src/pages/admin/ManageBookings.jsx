import React from 'react';
import Sidebar from '../../components/Sidebar';
import { Link } from 'react-router-dom';

const bookings = [
  { id: 'b1', user: 'Demo User', event: 'Live Music Night', eventId: '1', date: '2026-02-14', status: 'Confirmed' },
];

export default function ManageBookings() {
  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main">
        <h1 className="section-heading mb-2">Manage Bookings</h1>
        <p className="text-slate-600 mb-8">View and manage all event bookings.</p>

        <div className="card-premium table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>User</th>
                <th>Event</th>
                <th>Date</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id}>
                  <td className="font-medium text-slate-900">{b.user}</td>
                  <td className="text-slate-600">{b.event}</td>
                  <td className="text-slate-600">{b.date}</td>
                  <td><span className="badge badge-green">{b.status}</span></td>
                  <td>
                    <Link to={`/events/${b.eventId}`} className="table-link">View event</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
