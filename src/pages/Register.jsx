import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  function validate() {
    const next = {};
    if (!form.name.trim()) next.name = 'Name is required';
    if (!form.email.trim()) next.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Enter a valid email';
    if (!form.password) next.password = 'Password is required';
    else if (form.password.length < 6) next.password = 'Password must be at least 6 characters';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function submit(e) {
    e.preventDefault();
    if (!validate()) return;
    navigate('/user/dashboard');
  }

  return (
    <div className="page-container auth-wrap min-h-70">
      <div className="auth-card">
        <div className="card-premium p-6" style={{ padding: '2rem' }}>
          <h1 className="auth-title">Sign up</h1>
          <p className="auth-subtitle">Create your Organizo account to book events.</p>

          <form onSubmit={submit} className="auth-form">
            <div className="form-row">
              <label htmlFor="reg-name" className="form-label">Name</label>
              <input
                id="reg-name"
                type="text"
                placeholder="Your name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={`form-input ${errors.name ? 'input-error' : ''}`}
              />
              {errors.name && <p className="form-error">{errors.name}</p>}
            </div>
            <div className="form-row">
              <label htmlFor="reg-email" className="form-label">Email</label>
              <input
                id="reg-email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={`form-input ${errors.email ? 'input-error' : ''}`}
              />
              {errors.email && <p className="form-error">{errors.email}</p>}
            </div>
            <div className="form-row">
              <label htmlFor="reg-password" className="form-label">Password</label>
              <input
                id="reg-password"
                type="password"
                placeholder="At least 6 characters"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className={`form-input ${errors.password ? 'input-error' : ''}`}
              />
              {errors.password && <p className="form-error">{errors.password}</p>}
            </div>
            <Button type="submit" variant="primary" className="btn-block">
              Create account
            </Button>
          </form>

          <p className="auth-link-wrap">
            Already have an account? <Link to="/login" className="auth-link">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
