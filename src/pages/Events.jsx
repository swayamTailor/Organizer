import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import EventCard from '../components/EventCard';

const ALL = [
  { id: '1', title: 'Live Music Night', category: 'Music', date: '2026-02-14', image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=240&fit=crop' },
  { id: '2', title: 'Comedy Standup', category: 'Standup', date: '2026-03-01', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Microphone.JPG/400px-Microphone.JPG' },
  { id: '3', title: 'React Workshop', category: 'Workshop', date: '2026-04-10', image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=240&fit=crop' },
  { id: '4', title: 'Acoustic Evening', category: 'Music', date: '2026-05-05', image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=240&fit=crop' },
  { id: '5', title: 'Garba Night', category: 'Garba', date: '2026-09-25', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Garba_%28dance%29.jpg/400px-Garba_%28dance%29.jpg' },
  { id: '6', title: 'Movie Shows', category: 'Movie', date: '2026-06-15', image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=240&fit=crop' },
];

const CATEGORIES = ['All', 'Music', 'Standup', 'Workshop', 'Garba', 'Movie'];

export default function Events() {
  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get('category') || 'All';
  const [category, setCategory] = useState(categoryFromUrl);
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (CATEGORIES.includes(categoryFromUrl)) setCategory(categoryFromUrl);
  }, [categoryFromUrl]);

  const filtered = useMemo(() => {
    return ALL.filter(
      (e) =>
        (category === 'All' || e.category === category) &&
        e.title.toLowerCase().includes(query.toLowerCase().trim())
    );
  }, [category, query]);

  return (
    <div className="page-container">
      <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
        <h1 className="section-heading mb-2" style={{ marginBottom: '0.5rem' }}>All Events</h1>
        <p className="text-slate-600 mb-8">Find and book events that match your interests.</p>

        <div className="flex flex-col sm:flex-row gap-4" style={{ marginBottom: '2rem' }}>
          <div className="search-wrap">
            <span className="search-icon" aria-hidden>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="search"
              placeholder="Search events..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="filter-pills">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`filter-pill ${category === cat ? 'active' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="card-premium p-12 text-center">
            <p className="text-slate-500" style={{ margin: 0 }}>No events match your filters. Try a different category or search.</p>
          </div>
        ) : (
          <div className="events-grid">
            {filtered.map((ev) => (
              <EventCard key={ev.id} event={ev} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
