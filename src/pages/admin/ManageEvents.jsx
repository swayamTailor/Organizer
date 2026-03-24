import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import Button from '../../components/Button';

const events = [
  { id: '1', title: 'Live Music Night', org: 'Melody Events', category: 'Music', date: '2026-02-14', status: 'Published' },
  { id: '2', title: 'Comedy Standup', org: 'Laugh House', category: 'Standup', date: '2026-03-01', status: 'Published' },
  { id: '3', title: 'React Workshop', org: 'Tech Academy', category: 'Workshop', date: '2026-04-10', status: 'Published' },
  { id: '4', title: 'Acoustic Evening', org: 'Music Vibes', category: 'Music', date: '2026-05-05', status: 'Published' },
  { id: '5', title: 'Garba Night', org: 'Cultural Events', category: 'Garba', date: '2026-09-25', status: 'Published' },
  { id: '6', title: 'Movie Shows', org: 'Cinema Plus', category: 'Movie', date: '2026-06-15', status: 'Published' },
];

export default function ManageEvents() {
  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main">
        <div className="section-header mb-8">
          <div>
            <h1 className="section-heading mb-2">Manage Events</h1>
            <p className="text-slate-600">Create, edit, and publish events. View all events in one place.</p>
          </div>
          <Link to="/admin/events/add"><Button variant="primary">Add event</Button></Link>
        </div>

        <div className="card-premium table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Event</th>
                <th>Organization</th>
                <th>Category</th>
                <th>Date</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((e) => (
                <tr key={e.id}>
                  <td className="font-medium text-slate-900">{e.title}</td>
                  <td className="text-slate-600">{e.org}</td>
                  <td className="text-slate-600">{e.category}</td>
                  <td className="text-slate-600">{e.date}</td>
                  <td><span className="badge badge-green">{e.status}</span></td>
                  <td>
                    <button type="button" className="table-link" style={{ marginRight: '0.75rem' }}>Edit</button>
                    <button type="button" className="table-link-danger">Delete</button>
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
