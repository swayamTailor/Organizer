import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Button from '../components/Button';
import { getEventPrice, formatPriceInRupees } from '../utils/priceUtils';

const SAMPLE = [
  { id: '1', title: 'Live Music Night', category: 'Music', date: '2026-02-14', time: '7:30 PM', venue: 'Town Hall', price: 'Free', image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&h=500&fit=crop', description: 'An evening of live acoustic and band performances. Join us for great music and vibes.' },
  { id: '2', title: 'Comedy Standup', category: 'Standup', date: '2026-03-01', time: '8:00 PM', venue: 'City Theater', price: '$10', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Microphone.JPG/800px-Microphone.JPG', description: 'Top comedians bring the laughs. An unforgettable night of stand-up comedy.' },
  { id: '3', title: 'React Workshop', category: 'Workshop', date: '2026-04-10', time: '10:00 AM', venue: 'Tech Hub', price: '$25', image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=500&fit=crop', description: 'Hands-on React.js workshop. Build a real app from scratch with expert guidance.' },
  { id: '4', title: 'Acoustic Evening', category: 'Music', date: '2026-05-05', time: '6:00 PM', venue: 'Riverside Cafe', price: '$5', image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=500&fit=crop', description: 'Chill acoustic sets and open mic. Perfect for a relaxed evening of live music.' },
  { id: '5', title: 'Garba Night', category: 'Garba', date: '2026-09-25', time: '7:00 PM', venue: 'Community Hall', price: 'Free', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Garba_%28dance%29.jpg/800px-Garba_%28dance%29.jpg', description: 'Celebrate Navratri with traditional Garba and Dandiya. Join the dance, music, and festive vibes.' },
  { id: '6', title: 'Movie Shows', category: 'Movie', date: '2026-06-15', time: '4:00 PM & 8:00 PM', venue: 'City Cinemas', price: '$12', image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&h=500&fit=crop', description: 'Catch the latest blockbusters on the big screen. Multiple showtimes daily with premium sound and picture.' },
];

export default function EventDetails() {
  const { id } = useParams();
  const ev = SAMPLE.find((x) => x.id === id) || SAMPLE[0];
  
  // Get the randomized price for this event
  const eventPrice = getEventPrice(id || ev.id);
  const displayPrice = formatPriceInRupees(eventPrice);

  return (
    <div className="page-container">
      <div style={{ maxWidth: '64rem', margin: '0 auto' }}>
        <Link to="/events" className="back-link">← Back to events</Link>

        <div className="card-premium" style={{ overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 0 }}>
            <div className="event-card-img-wrap" style={{ minHeight: '300px', aspectRatio: 'auto' }}>
              <img src={ev.image} alt={ev.title} className="event-card-img" />
              <span className="event-card-badge">{ev.category}</span>
            </div>
            <div style={{ padding: '1.5rem', maxWidth: '100%' }}>
              <h1 className="section-heading" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{ev.title}</h1>
              <p className="text-slate-600 leading-relaxed" style={{ marginBottom: '1rem' }}>{ev.description}</p>
              <dl style={{ marginTop: '1.5rem', marginBottom: 0 }}>
                <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <dt className="text-sm font-medium text-slate-500" style={{ width: '4rem' }}>Date</dt>
                  <dd className="text-slate-800" style={{ margin: 0 }}>{ev.date} at {ev.time}</dd>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <dt className="text-sm font-medium text-slate-500" style={{ width: '4rem' }}>Venue</dt>
                  <dd className="text-slate-800" style={{ margin: 0 }}>{ev.venue}</dd>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <dt className="text-sm font-medium text-slate-500" style={{ width: '4rem' }}>Price</dt>
                  <dd className="text-slate-800 font-semibold" style={{ margin: 0 }}>{displayPrice}</dd>
                </div>
              </dl>
              <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--slate-100)', display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                <Button
                  variant="primary"
                  onClick={() => {
                    // Store event info for the booking process
                    sessionStorage.setItem('booking_event_id', ev.id);
                    sessionStorage.setItem('booking_event_title', ev.title);
                    sessionStorage.setItem('booking_event_price', eventPrice);
                    
                    if (window.confirm('Redirect to login to register for this event?')) {
                      window.location.href = '/login?redirect=/events/' + ev.id;
                    }
                  }}
                >
                  Register for event
                </Button>
                <Button variant="outline" onClick={() => window.history.back()}>
                  Back
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
