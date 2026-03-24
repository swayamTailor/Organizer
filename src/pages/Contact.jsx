import React, { useState } from 'react';
import Button from '../components/Button';

export default function Contact() {
  const [msg, setMsg] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  function validate() {
    const next = {};
    if (!msg.name.trim()) next.name = 'Name is required';
    if (!msg.email.trim()) next.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(msg.email)) next.email = 'Enter a valid email';
    if (!msg.message.trim()) next.message = 'Message is required';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function submit(e) {
    e.preventDefault();
    if (!validate()) return;
    setSent(true);
    setMsg({ name: '', email: '', message: '' });
    setErrors({});
  }

  if (sent) {
    return (
      <div className="page-container">
        <div className="max-w-2xl mx-auto text-center card-premium p-12 animate-fade-in">
          <div className="success-icon-wrap">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="success-title">Message sent</h2>
          <p className="success-text">We’ll get back to you as soon as we can.</p>
          <button
            type="button"
            onClick={() => setSent(false)}
            className="text-sm font-semibold text-primary-600"
            style={{ marginTop: '1.5rem', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            Send another message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="max-w-2xl mx-auto">
        <h1 className="section-heading mb-2">Contact Us</h1>
        <p className="text-slate-600 mb-8">Have a question or feedback? Send us a message and we’ll respond soon.</p>

        <div className="card-premium p-6" style={{ padding: '2rem' }}>
          <form onSubmit={submit}>
            <div className="form-row">
              <label htmlFor="contact-name" className="form-label">Name</label>
              <input
                id="contact-name"
                type="text"
                placeholder="Your name"
                value={msg.name}
                onChange={(e) => setMsg({ ...msg, name: e.target.value })}
                className={`form-input ${errors.name ? 'input-error' : ''}`}
              />
              {errors.name && <p className="form-error">{errors.name}</p>}
            </div>
            <div className="form-row">
              <label htmlFor="contact-email" className="form-label">Email</label>
              <input
                id="contact-email"
                type="email"
                placeholder="you@example.com"
                value={msg.email}
                onChange={(e) => setMsg({ ...msg, email: e.target.value })}
                className={`form-input ${errors.email ? 'input-error' : ''}`}
              />
              {errors.email && <p className="form-error">{errors.email}</p>}
            </div>
            <div className="form-row">
              <label htmlFor="contact-message" className="form-label">Message</label>
              <textarea
                id="contact-message"
                placeholder="Your message..."
                rows={5}
                value={msg.message}
                onChange={(e) => setMsg({ ...msg, message: e.target.value })}
                className={`form-textarea ${errors.message ? 'input-error' : ''}`}
              />
              {errors.message && <p className="form-error">{errors.message}</p>}
            </div>
            <div className="pt-2">
              <Button type="submit" variant="primary">Send Message</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
