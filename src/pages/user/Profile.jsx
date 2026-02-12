import React, { useState } from 'react';
import Button from '../../components/Button';
import UserSidebar from '../../components/UserSidebar';

export default function Profile() {
  const [profile, setProfile] = useState({ name: 'Demo User', email: 'user@example.com' });
  const [saved, setSaved] = useState(false);

  function save(e) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <div className="user-layout">
      <UserSidebar />
      <div className="user-main page-container">
        <div className="max-w-2xl mx-auto">
          <h1 className="section-heading mb-2">Profile</h1>
          <p className="text-slate-600 mb-8">Update your account details.</p>

          <div className="card-premium p-6" style={{ padding: '2rem' }}>
            {saved && <div className="alert-success">Profile updated successfully.</div>}
            <form onSubmit={save}>
              <div className="form-row">
                <label htmlFor="profile-name" className="form-label">Name</label>
                <input
                  id="profile-name"
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="form-input"
                />
              </div>
              <div className="form-row">
                <label htmlFor="profile-email" className="form-label">Email</label>
                <input
                  id="profile-email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="form-input"
                />
              </div>
              <Button type="submit" variant="primary">Save changes</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
