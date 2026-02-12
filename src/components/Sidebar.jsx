import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const links = [
  { to: '/admin', label: 'Dashboard' },
  { to: '/admin/events', label: 'Manage Events' },
  { to: '/admin/users', label: 'Manage Users' },
  { to: '/admin/bookings', label: 'Manage Bookings' },
];

export default function Sidebar() {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  return (
    <aside className="admin-sidebar">
      <h4 className="admin-sidebar-title">Admin</h4>
      <nav className="admin-sidebar-nav">
        {links.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            className={`admin-sidebar-link ${location.pathname === to ? 'active' : ''}`}
          >
            {label}
          </Link>
        ))}
      </nav>
      <button
        type="button"
        className="theme-toggle admin-sidebar-theme-toggle"
        onClick={toggleTheme}
        aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
      >
        {theme === 'dark' ? (
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
        ) : (
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
        )}
        <span className="admin-sidebar-theme-label">{theme === 'dark' ? 'Light' : 'Dark'}</span>
      </button>
      <Link to="/" className="admin-sidebar-back">
        ← Back to site
      </Link>
    </aside>
  );
}
