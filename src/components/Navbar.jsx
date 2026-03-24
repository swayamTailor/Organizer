import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import OrganizoLogo from './OrganizoLogo';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/events', label: 'Events' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, [location]);

  function handleLogout() {
    localStorage.removeItem('user');
    setUser(null);
    setShowUserMenu(false);
    navigate('/');
  }

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
            <Link to="/admin/login" className="nav-link admin-link">Admin</Link>
            {user ? (
              <div style={{ position: 'relative' }}>
                <button
                  type="button"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="nav-link"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 0.75rem', background: 'transparent', border: 'none', cursor: 'pointer' }}
                >
                  <span style={{ width: '1.75rem', height: '1.75rem', borderRadius: '50%', background: 'var(--primary-600)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontSize: '0.75rem', fontWeight: 'bold' }}>
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                  <span className="text-sm font-medium">{user.name}</span>
                </button>
                {showUserMenu && (
                  <div style={{ position: 'absolute', top: '100%', right: 0, background: 'var(--bg-surface)', border: '1px solid rgba(212, 175, 55, 0.3)', borderRadius: 'var(--radius)', marginTop: '0.5rem', minWidth: '150px', boxShadow: 'var(--shadow-premium)', zIndex: 100 }}>
                    <Link to="/user/profile" className="nav-link" style={{ display: 'block', padding: '0.75rem 1rem', borderBottom: '1px solid rgba(212, 175, 55, 0.1)' }} onClick={() => setShowUserMenu(false)}>
                      Profile
                    </Link>
                    <Link to="/user/bookings" className="nav-link" style={{ display: 'block', padding: '0.75rem 1rem', borderBottom: '1px solid rgba(212, 175, 55, 0.1)' }} onClick={() => setShowUserMenu(false)}>
                      My Bookings
                    </Link>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="nav-link"
                      style={{ display: 'block', width: '100%', padding: '0.75rem 1rem', textAlign: 'left', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--red-600)', fontWeight: '500' }}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login" className="nav-btn-login">
                  Log in
                </Link>
                <Link to="/register" className="nav-btn-signup">
                  Sign up
                </Link>
              </>
            )}
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
              {user ? (
                <div className="nav-mobile-actions">
                  <Link to="/user/profile" onClick={() => setMobileOpen(false)} className="nav-link">
                    Profile
                  </Link>
                  <Link to="/user/bookings" onClick={() => setMobileOpen(false)} className="nav-link">
                    My Bookings
                  </Link>
                  <button type="button" onClick={() => { handleLogout(); setMobileOpen(false); }} className="nav-link" style={{ textAlign: 'left', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--red-600)', width: '100%' }}>
                    Logout
                  </button>
                </div>
              ) : (
                <div className="nav-mobile-actions">
                  <Link to="/login" onClick={() => setMobileOpen(false)} className="nav-link">
                    Log in
                  </Link>
                  <Link to="/register" onClick={() => setMobileOpen(false)} className="nav-btn-signup">
                    Sign up
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
