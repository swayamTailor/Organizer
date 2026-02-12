import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../components/Button';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  function submit(e) {
    e.preventDefault();
    setError('');
    if (!email.trim()) {
      setError('Email is required');
      return;
    }
    if (!password) {
      setError('Password is required');
      return;
    }
    if (email.includes('admin')) {
      navigate('/admin');
    } else {
      navigate('/user/dashboard');
    }
  }

  return (
    <div className="page-container auth-wrap min-h-70">
      <div className="auth-card">
        <div className="card-premium p-6" style={{ padding: '2rem' }}>
          <h1 className="auth-title">Log in</h1>
          <p className="auth-subtitle">Sign in to your Organizo account.</p>

          <form onSubmit={submit} className="auth-form">
            {error && <div className="alert-error">{error}</div>}
            <div className="form-row">
              <label htmlFor="login-email" className="form-label">Email</label>
              <input
                id="login-email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
              />
            </div>
            <div className="form-row">
              <label htmlFor="login-password" className="form-label">Password</label>
              <input
                id="login-password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
              />
            </div>
            <Button type="submit" variant="primary" className="btn-block">
              Log in
            </Button>
          </form>

          <p className="auth-link-wrap">
            Don’t have an account? <Link to="/register" className="auth-link">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
