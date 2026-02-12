import React from 'react';
import { Link } from 'react-router-dom';

const values = [
  { title: 'Quality', desc: 'We curate events that meet high standards so you always have a great experience.' },
  { title: 'Simplicity', desc: 'Discover, book, and manage your events in one place with a smooth flow.' },
  { title: 'Trust', desc: 'Secure payments and reliable support so you can focus on enjoying the event.' },
];

export default function About() {
  return (
    <div className="page-container">
      <div className="max-w-4xl mx-auto">
        <h1 className="section-heading mb-4">About Organizo</h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          Organizo is a premium event management platform built to help you discover and book events near you — concerts, workshops, comedy shows, and more — all in one place.
        </p>
        <p className="mt-4 text-slate-600 leading-relaxed">
          We partner with venues and organizers to bring you curated events and a seamless booking experience. Create an account to save favorites, manage tickets, and get reminders so you never miss an event.
        </p>

        <h2 className="mt-12 text-xl font-bold text-slate-900">What we believe</h2>
        <div className="stats-grid mt-6">
          {values.map(({ title, desc }) => (
            <div key={title} className="card-premium p-6">
              <h3 className="font-semibold text-primary-600" style={{ margin: 0 }}>{title}</h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <div className="cta-section mt-12">
          <h2 className="cta-title">Ready to explore?</h2>
          <p className="cta-text">Browse events and create an account to start booking.</p>
          <div className="flex flex-wrap justify-center gap-4" style={{ marginTop: '1.5rem' }}>
            <Link to="/events" className="cta-btn">
              Browse events
            </Link>
            <Link
              to="/contact"
              className="btn btn-outline btn-lg"
              style={{ marginLeft: '0.5rem' }}
            >
              Contact us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
