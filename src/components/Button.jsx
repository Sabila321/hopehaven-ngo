import React from 'react';
import { Link } from 'react-router-dom';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  icon = null
}) {
  const classNames = `btn btn-${variant} btn-${size} ${className}`.trim();

  if (to) {
    return (
      <Link to={to} className={classNames} onClick={onClick}>
        {icon && <span className="btn-icon">{icon}</span>}
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classNames} onClick={onClick} target="_blank" rel="noopener noreferrer">
        {icon && <span className="btn-icon">{icon}</span>}
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={classNames}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <span className="btn-icon">{icon}</span>}
      {children}
    </button>
  );
}
