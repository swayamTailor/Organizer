import React from 'react';
import Sidebar from '../../components/Sidebar';

const users = [
  { id: 'u1', name: 'Demo User', email: 'user@example.com', joined: '2025-01-15' },
  { id: 'u2', name: 'Jane Doe', email: 'jane@example.com', joined: '2025-01-20' },
];

export default function ManageUsers() {
  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main">
        <h1 className="section-heading mb-2">Manage Users</h1>
        <p className="text-slate-600 mb-8">View and manage user accounts.</p>

        <div className="card-premium table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Joined</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td className="font-medium text-slate-900">{u.name}</td>
                  <td className="text-slate-600">{u.email}</td>
                  <td className="text-slate-600">{u.joined}</td>
                  <td>
                    <button type="button" className="table-link" style={{ marginRight: '0.75rem', color: 'var(--slate-600)' }}>Block</button>
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
