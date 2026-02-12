import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import Button from '../../components/Button';

export default function AddEvent() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', date: '', category: 'Music', venue: '', description: '' });
  const [errors, setErrors] = useState({});

  function validate() {
    const next = {};
    if (!form.title.trim()) next.title = 'Title is required';
    if (!form.date.trim()) next.date = 'Date is required';
    if (!form.category.trim()) next.category = 'Category is required';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function submit(e) {
    e.preventDefault();
    if (!validate()) return;
    alert('Event created (demo): ' + JSON.stringify(form));
    navigate('/admin/events');
  }

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main">
        <h1 className="section-heading mb-2">Add Event</h1>
        <p className="text-slate-600 mb-8">Create a new event for your platform.</p>

        <div style={{ maxWidth: '42rem' }}>
          <div className="card-premium p-6" style={{ padding: '2rem' }}>
            <form onSubmit={submit}>
              <div className="form-row">
                <label htmlFor="event-title" className="form-label">Title</label>
                <input
                  id="event-title"
                  type="text"
                  placeholder="Event name"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className={`form-input ${errors.title ? 'input-error' : ''}`}
                />
                {errors.title && <p className="form-error">{errors.title}</p>}
              </div>
              <div className="form-row">
                <label htmlFor="event-date" className="form-label">Date</label>
                <input
                  id="event-date"
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className={`form-input ${errors.date ? 'input-error' : ''}`}
                />
                {errors.date && <p className="form-error">{errors.date}</p>}
              </div>
              <div className="form-row">
                <label htmlFor="event-category" className="form-label">Category</label>
                <select
                  id="event-category"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="form-input form-select"
                >
                  <option value="Music">Music</option>
                  <option value="Standup">Standup</option>
                  <option value="Workshop">Workshop</option>
                  <option value="Garba">Garba</option>
                  <option value="Movie">Movie</option>
                </select>
              </div>
              <div className="form-row">
                <label htmlFor="event-venue" className="form-label">Venue</label>
                <input
                  id="event-venue"
                  type="text"
                  placeholder="Venue name"
                  value={form.venue}
                  onChange={(e) => setForm({ ...form, venue: e.target.value })}
                  className="form-input"
                />
              </div>
              <div className="form-row">
                <label htmlFor="event-desc" className="form-label">Description</label>
                <textarea
                  id="event-desc"
                  rows={4}
                  placeholder="Brief description"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="form-textarea"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <Button type="submit" variant="primary">Create event</Button>
                <Button type="button" variant="secondary" onClick={() => navigate('/admin/events')}>Cancel</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
