import React from 'react';

/**
 * EMS Logo — Movie ticket-inspired design with vibrant red gradient.
 * Classic movie ticket with perforated holes and modern elements.
 */
export default function OrganizoLogo({ className = '', size = 32 }) {
  const uniqueId = `movieTicketGradient-${Math.random()}`;
  
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        {/* Red gradient for movie ticket */}
        <linearGradient id={uniqueId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#d4af37" />
          <stop offset="50%" stopColor="#f4d03f" />
          <stop offset="100%" stopColor="#fad54b" />
        </linearGradient>
      </defs>

      {/* Main ticket body - classic rectangle */}
      <rect
        x="4"
        y="6"
        width="40"
        height="36"
        rx="3"
        ry="3"
        fill={`url(#${uniqueId})`}
        style={{ filter: 'drop-shadow(0 4px 12px rgba(212, 175, 55, 0.5))' }}
      />

      {/* Perforated holes (left side - classic movie ticket style) */}
      <circle cx="8" cy="12" r="2" fill="white" opacity="0.85" />
      <circle cx="8" cy="18" r="2" fill="white" opacity="0.85" />
      <circle cx="8" cy="24" r="2" fill="white" opacity="0.85" />
      <circle cx="8" cy="30" r="2" fill="white" opacity="0.85" />
      <circle cx="8" cy="36" r="2" fill="white" opacity="0.85" />

      {/* Vertical perforated line divider */}
      <line
        x1="18"
        y1="8"
        x2="18"
        y2="40"
        stroke="white"
        strokeWidth="2"
        strokeDasharray="3,3"
        opacity="0.5"
      />

      {/* Left section - Event details area */}
      <rect
        x="6"
        y="8"
        width="10"
        height="32"
        fill="none"
        stroke="white"
        strokeWidth="1"
        opacity="0.3"
        rx="1"
      />

      {/* Movie/Event title lines (text representation) */}
      <line x1="22" y1="12" x2="40" y2="12" stroke="white" strokeWidth="1.5" opacity="0.9" />
      <line x1="22" y1="16" x2="42" y2="16" stroke="white" strokeWidth="1.5" opacity="0.9" />
      <line x1="22" y1="20" x2="38" y2="20" stroke="white" strokeWidth="1.5" opacity="0.8" />

      {/* Ticket information section */}
      <line x1="22" y1="26" x2="32" y2="26" stroke="white" strokeWidth="1" opacity="0.7" />
      <line x1="22" y1="30" x2="28" y2="30" stroke="white" strokeWidth="1" opacity="0.7" />
      <line x1="22" y1="34" x2="35" y2="34" stroke="white" strokeWidth="1" opacity="0.6" />

      {/* Decorative stars - cinema vibes */}
      <path
        d="M38 28L39.2 31.6L43 32L40 34.6L40.8 38L38 35.6L35.2 38L36 34.6L33 32L36.8 31.6Z"
        fill="white"
        opacity="0.8"
      />

      {/* Serial/ticket number indicator */}
      <circle cx="30" cy="38" r="1.5" fill="white" opacity="0.7" />
      <circle cx="36" cy="38" r="1.5" fill="white" opacity="0.7" />
    </svg>
  );
}
