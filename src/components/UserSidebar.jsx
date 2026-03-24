import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const links = [
  { to: '/user/dashboard', label: 'Dashboard' },
  { to: '/user/bookings', label: 'My Bookings' },
  { to: '/events', label: 'Browse Events' },
  { to: '/user/profile', label: 'Profile' },
];

export default function UserSidebar() {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  return (
    <aside className="user-sidebar">
      <h4 className="user-sidebar-title">My Account</h4>
      <nav className="user-sidebar-nav">
        {links.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            className={`user-sidebar-link ${location.pathname === to ? 'active' : ''}`}
          >
            {label}
          </Link>
        ))}
      </nav>

      <button
        type="button"
        className="theme-toggle user-sidebar-theme-toggle"
        onClick={toggleTheme}
        aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
      >
        {theme === 'dark' ? 'Light' : 'Dark'}
      </button>

      <Link to="/" className="user-sidebar-back">
        ← Back to site
      </Link>
    </aside>
  );
}
