import React from 'react';

export default function Button({ children, onClick, variant = 'primary', className = '', type = 'button', disabled }) {
  const variantClass = variant === 'secondary' ? 'btn-secondary' : variant === 'outline' ? 'btn-outline' : 'btn-primary';
  const classes = ['btn', variantClass];
  if (className) classes.push(className);
  return (
    <button type={type} onClick={onClick} className={classes.join(' ')} disabled={disabled}>
      {children}
    </button>
  );
}
