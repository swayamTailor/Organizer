import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import OrganizoLogo from './OrganizoLogo';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/events', label: 'Events' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="navbar">
      <div className="container">
        <div className="navbar-inner">
          <Link to="/" className="navbar-brand">
            <span className="navbar-logo-icon">
              <OrganizoLogo size={28} />
            </span>
            Organizo
          </Link>

          <nav className="nav-links">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`nav-link ${location.pathname === to ? 'active' : ''}`}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="nav-actions">
            <Link to="/admin" className="nav-link admin-link">Admin</Link>
            <Link to="/login" className="nav-btn-login">
              Log in
            </Link>
            <Link to="/register" className="nav-btn-signup">
              Sign up
            </Link>
          </div>

          <button
            type="button"
            className="nav-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {mobileOpen && (
          <div className="nav-mobile animate-fade-in">
            <nav className="flex flex-col gap-1">
              {navLinks.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setMobileOpen(false)}
                  className={`nav-link ${location.pathname === to ? 'active' : ''}`}
                >
                  {label}
                </Link>
              ))}
              <div className="nav-mobile-actions">
                <Link to="/login" onClick={() => setMobileOpen(false)} className="nav-link">
                  Log in
                </Link>
                <Link to="/register" onClick={() => setMobileOpen(false)} className="nav-btn-signup">
                  Sign up
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
