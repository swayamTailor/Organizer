import React from 'react';
import { Link } from 'react-router-dom';
import EventCard from '../components/EventCard';

const sampleEvents = [
  { id: '1', title: 'Live Music Night', category: 'Music', date: '2026-02-14', image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=240&fit=crop' },
  { id: '2', title: 'Comedy Standup', category: 'Standup', date: '2026-03-01', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Microphone.JPG/400px-Microphone.JPG' },
  { id: '3', title: 'React Workshop', category: 'Workshop', date: '2026-04-10', image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=240&fit=crop' },
  { id: '4', title: 'Acoustic Evening', category: 'Music', date: '2026-05-05', image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=240&fit=crop' },
  { id: '5', title: 'Garba Night', category: 'Garba', date: '2026-09-25', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Garba_%28dance%29.jpg/400px-Garba_%28dance%29.jpg' },
  { id: '6', title: 'Movie Shows', category: 'Movie', date: '2026-06-15', image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=240&fit=crop' },
];

const stats = [
  { value: '500+', label: 'Events' },
  { value: '50K+', label: 'Attendees' },
  { value: '98%', label: 'Satisfaction' },
];

export default function Home() {
  return (
    <div className="page-container">
      <section className="hero animate-fade-in">
        <div className="hero-pattern" />
        <div className="hero-inner">
          <h1 className="hero-title">Discover great events near you</h1>
          <p className="hero-subtitle">
            Join music nights, workshops, comedy shows, and more — curated for your city. Book in seconds.
          </p>
          <div className="hero-actions">
            <Link to="/events" className="hero-btn-primary">Browse Events</Link>
            <Link to="/about" className="hero-btn-outline">Learn more</Link>
          </div>
        </div>
      </section>

      <section className="section-spacing">
        <div className="stats-grid">
          {stats.map(({ value, label }) => {
            const getLink = () => {
              if (label === 'Events') return '/events';
              if (label === 'Attendees') return '/events';
              if (label === 'Satisfaction') return '/about';
              return '/';
            };
            return (
              <Link
                key={label}
                to={getLink()}
                className="card-premium p-6 text-center animate-fade-in"
                style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '';
                }}
              >
                <p className="text-3xl font-bold text-primary-600" style={{ margin: 0 }}>{value}</p>
                <p className="text-sm font-medium text-slate-500 mt-1">{label}</p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="section-spacing">
        <div className="section-header">
          <h2 className="section-heading" style={{ margin: 0 }}>Upcoming events</h2>
          <Link to="/events" className="text-sm font-semibold text-primary-600" style={{ textDecoration: 'none' }}>
            View all →
          </Link>
        </div>
        <div className="events-grid" style={{ marginTop: '2rem' }}>
          {sampleEvents.map((e) => (
            <EventCard key={e.id} event={e} />
          ))}
        </div>
      </section>

      <section className="section-spacing">
        <h2 className="section-heading" style={{ margin: 0 }}>Categories</h2>
        <div className="flex flex-wrap gap-3" style={{ marginTop: '1.5rem' }}>
          <Link to="/events?category=Music" className="pill">Music</Link>
          <Link to="/events?category=Standup" className="pill">Standup</Link>
          <Link to="/events?category=Workshop" className="pill">Workshop</Link>
          <Link to="/events?category=Garba" className="pill">Garba</Link>
          <Link to="/events?category=Movie" className="pill">Movie</Link>
        </div>
      </section>

      <section className="section-spacing cta-section">
        <h2 className="cta-title">Ready to get started?</h2>
        <p className="cta-text max-w-md mx-auto">Create an account to book events and manage your tickets in one place.</p>
        <Link to="/register" className="cta-btn">
          Create free account
        </Link>
      </section>
    </div>
  );
}
