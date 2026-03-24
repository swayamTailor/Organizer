import React from 'react';
import { Link } from 'react-router-dom';
import OrganizoLogo from './OrganizoLogo';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-grid">
          <div>
            <Link to="/" className="footer-brand">
              <span className="footer-brand-icon">
                <OrganizoLogo size={32} />
              </span>
              Organizo
            </Link>
            <p className="footer-desc">
              Discover and book premium events near you. Concerts, workshops, comedy, and more — all in one place.
            </p>
          </div>
          <div>
            <h4 className="footer-heading">Explore</h4>
            <ul className="footer-links">
              <li><Link to="/events">All Events</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="footer-heading">Account</h4>
            <ul className="footer-links">
              <li><Link to="/login">Log in</Link></li>
              <li><Link to="/register">Sign up</Link></li>
              <li><Link to="/user/dashboard">Dashboard</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="footer-heading">Legal</h4>
            <ul className="footer-links">
              <li><span style={{ cursor: 'default', opacity: 0.8 }}>Privacy Policy</span></li>
              <li><span style={{ cursor: 'default', opacity: 0.8 }}>Terms of Service</span></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {year} Organizo. All rights reserved.</p>
          <p>Premium event management platform.</p>
        </div>
      </div>
    </footer>
  );
}
