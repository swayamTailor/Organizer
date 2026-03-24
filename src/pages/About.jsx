import React from 'react';
import { Link } from 'react-router-dom';

const values = [
  { title: 'Quality', desc: 'We curate events that meet high standards so you always have a great experience.' },
  { title: 'Simplicity', desc: 'Discover, book, and manage your events in one place with a smooth flow.' },
  { title: 'Trust', desc: 'Secure payments and reliable support so you can focus on enjoying the event.' },
];

const features = [
  { title: 'Easy Discovery', desc: 'Browse thousands of events by category, location, date, and price.' },
  { title: 'Secure Booking', desc: 'Fast checkout with encrypted payments and instant ticket confirmation.' },
  { title: 'Event Management', desc: 'Track your bookings, save favorites, and receive personalized recommendations.' },
];

const stats = [
  { number: '50K+', label: 'Events Listed' },
  { number: '500K+', label: 'Happy Users' },
  { number: '1M+', label: 'Tickets Sold' },
  { number: '95%', label: 'Satisfaction Rate' },
];

export default function About() {
  return (
    <div className="page-container">
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        {/* Hero Section */}
        <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
          <h1 className="section-heading" style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>About Organizo</h1>
          <p style={{ fontSize: '1.25rem', lineHeight: '1.8', color: 'var(--slate-600)', marginBottom: '1.5rem' }}>
            Organizo is revolutionizing how people discover, book, and experience events. We're building the world's most trusted platform connecting event enthusiasts with unforgettable moments.
          </p>
        </div>

        {/* Mission Section */}
        <div style={{ marginBottom: '4rem', padding: '2rem', backgroundColor: 'var(--bg-surface)', borderRadius: '1rem', border: '1px solid var(--border-default)' }}>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem', fontWeight: 'bold' }}>Our Mission</h2>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--slate-600)', marginBottom: '1rem' }}>
            We believe that live events create connections, memories, and joy. Our mission is to make discovering and attending events effortless for everyone. Whether you're looking for a sold-out concert, a professional workshop, a comedy night, or a weekend getaway experience, we're here to help you find it and book it with confidence.
          </p>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--slate-600)' }}>
            We partner with venues, organizers, and artists to bring you a curated selection of events that match your interests. Our goal is to be your go-to destination for every event in your life.
          </p>
        </div>

        {/* Stats Section */}
        <div style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '2rem', fontWeight: 'bold', textAlign: 'center' }}>By The Numbers</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
            {stats.map(({ number, label }) => (
              <div key={label} style={{ 
                padding: '2rem', 
                textAlign: 'center', 
                backgroundColor: 'var(--bg-surface)', 
                borderRadius: '1rem',
                border: '2px solid var(--primary-600)',
                cursor: 'pointer',
                transition: 'transform 0.2s'
              }}>
                <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--primary-600)', marginBottom: '0.5rem' }}>
                  {number}
                </div>
                <div style={{ fontSize: '1.1rem', color: 'var(--slate-600)' }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Core Values Section */}
        <div style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '2rem', fontWeight: 'bold', textAlign: 'center' }}>What We Believe</h2>
          <div className="stats-grid">
            {values.map(({ title, desc }) => (
              <div key={title} className="card-premium p-6">
                <h3 className="font-semibold text-primary-600" style={{ margin: 0, fontSize: '1.25rem' }}>{title}</h3>
                <p className="mt-2 text-slate-600 leading-relaxed" style={{ fontSize: '1rem' }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '2rem', fontWeight: 'bold', textAlign: 'center' }}>Why Choose Organizo</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            {features.map(({ title, desc }) => (
              <div key={title} style={{ 
                padding: '2rem', 
                backgroundColor: 'var(--bg-surface)', 
                borderRadius: '1rem',
                border: '1px solid var(--border-default)'
              }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--primary-600)', marginBottom: '0.75rem' }}>
                  {title}
                </h3>
                <p style={{ color: 'var(--slate-600)', lineHeight: '1.6' }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* History Section */}
        <div style={{ marginBottom: '4rem', padding: '2rem', backgroundColor: 'var(--bg-surface)', borderRadius: '1rem', border: '1px solid var(--border-default)' }}>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', fontWeight: 'bold' }}>Our Story</h2>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--slate-600)', marginBottom: '1rem' }}>
            Organizo started with a simple observation: finding and booking events shouldn't be complicated. We saw people spending hours searching across multiple websites, dealing with confusing interfaces, and worrying about ticket security.
          </p>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--slate-600)', marginBottom: '1rem' }}>
            In 2023, our team came together with a vision to build an all-in-one platform that puts the power back in the hands of event enthusiasts. We designed Organizo from the ground up with user experience at the core, incorporating feedback from thousands of event-goers and organizers.
          </p>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--slate-600)' }}>
            Today, Organizo is the trusted platform for millions of people worldwide. We're constantly innovating, expanding our event catalog, and improving our technology to ensure you have the best experience every time you book an event with us.
          </p>
        </div>

        {/* Call to Action Section */}
        <div className="cta-section" style={{ marginTop: '3rem' }}>
          <h2 className="cta-title" style={{ fontSize: '2rem' }}>Ready to Discover Your Next Event?</h2>
          <p className="cta-text" style={{ fontSize: '1.1rem' }}>Join thousands of happy users and start exploring amazing events today.</p>
          <div className="flex flex-wrap justify-center gap-4" style={{ marginTop: '2rem' }}>
            <Link to="/events" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
              Browse Events
            </Link>
            <Link
              to="/contact"
              className="btn btn-outline"
              style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
