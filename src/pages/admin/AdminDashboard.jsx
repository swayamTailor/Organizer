import React from 'react';
import Sidebar from '../../components/Sidebar';
import { Link } from 'react-router-dom';

const stats = [
  { label: 'Total events', value: 12, color: 'primary' },
  { label: 'Total users', value: 42, color: 'slate' },
  { label: 'Total bookings', value: 73, color: 'slate' },
];

export default function AdminDashboard() {
  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main">
        <h1 className="section-heading mb-2">Admin Dashboard</h1>
        <p className="text-slate-600 mb-8">Overview of your event platform.</p>

        <div className="stats-grid mb-10">
          {stats.map(({ label, value, color }) => (
            <div key={label} className="card-premium p-6">
              <p className="text-sm font-medium text-slate-500">{label}</p>
              <p className={`text-3xl font-bold mt-2 ${color === 'primary' ? 'text-primary-600' : 'text-slate-900'}`}>
                {value}
              </p>
            </div>
          ))}
        </div>

        <div className="card-premium p-6 mb-8">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Quick actions</h2>
          <div className="flex flex-wrap gap-3">
            <Link to="/admin/events/add" className="btn btn-primary">Add event</Link>
            <Link to="/admin/events" className="btn btn-outline">Manage events</Link>
          </div>
        </div>

        <div className="card-premium p-6 flex items-center justify-center text-slate-400 text-sm" style={{ height: '12rem' }}>
          Charts placeholder — integrate your analytics here
        </div>
      </div>
    </div>
  );
}
