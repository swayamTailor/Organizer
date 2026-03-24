import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

const PLACEHOLDER_IMG = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=240&fit=crop';

export default function EventCard({ event }) {
  const imgSrc = event.image || PLACEHOLDER_IMG;

  return (
    <article className="card-premium event-card">
      <div className="event-card-img-wrap">
        <img
          src={imgSrc}
          alt={event.title}
          className="event-card-img"
        />
        <span className="event-card-badge">{event.category}</span>
      </div>
      <div className="event-card-body">
        <h3 className="event-card-title">{event.title}</h3>
        <p className="event-card-meta">{event.date}</p>
        <div className="event-card-actions">
          <Link to={`/events/${event.id}`} className="event-card-link">
            View details
          </Link>
          <Button
            variant="primary"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = `/events/${event.id}`;
            }}
          >
            Register
          </Button>
        </div>
      </div>
    </article>
  );
}
