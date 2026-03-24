import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';

const ADMIN_PASSWORD = 'st2007';

export default function AdminLogin() {
  const [form, setForm] = useState({ name: '', password: '' });
  const [errors, setErrors] = useState({});
  const [attempt, setAttempt] = useState(0);
  const navigate = useNavigate();

  function validate() {
    const next = {};
    if (!form.name.trim()) next.name = 'Name is required';
    if (!form.password) next.password = 'Password is required';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function submit(e) {
    e.preventDefault();
    if (!validate()) return;

    if (form.password === ADMIN_PASSWORD) {
      localStorage.setItem('admin', JSON.stringify({ name: form.name, loggedIn: true }));
      navigate('/admin');
    } else {
      setAttempt(attempt + 1);
      setErrors({ password: 'Invalid password. Try again.' });
      setForm({ ...form, password: '' });
    }
  }

  return (
    <div className="page-container auth-wrap min-h-70">
      <div className="auth-card">
        <div className="card-premium p-6" style={{ padding: '2rem' }}>
          <h1 className="auth-title">Admin Login</h1>
          <p className="auth-subtitle">Enter your credentials to access the admin panel.</p>

          <form onSubmit={submit} className="auth-form">
            {attempt > 0 && (
              <div className="alert-error" style={{ marginBottom: '1.25rem' }}>
                Access denied. Incorrect password. (Attempts: {attempt})
              </div>
            )}
            <div className="form-row">
              <label htmlFor="admin-name" className="form-label">Name</label>
              <input
                id="admin-name"
                type="text"
                placeholder="Your name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={`form-input ${errors.name ? 'input-error' : ''}`}
              />
              {errors.name && <p className="form-error">{errors.name}</p>}
            </div>
            <div className="form-row">
              <label htmlFor="admin-password" className="form-label">Password</label>
              <input
                id="admin-password"
                type="password"
                placeholder="Enter password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className={`form-input ${errors.password ? 'input-error' : ''}`}
              />
              {errors.password && <p className="form-error">{errors.password}</p>}
            </div>
            <Button type="submit" variant="primary" className="btn-block">
              Access Admin
            </Button>
          </form>

          <p className="auth-link-wrap">
            <a href="/" style={{ textDecoration: 'underline', cursor: 'pointer' }}>Back to home</a>
          </p>
        </div>
      </div>
    </div>
  );
}
