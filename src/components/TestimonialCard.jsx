import React from 'react';
import { Star, Quote } from 'lucide-react';

export default function TestimonialCard({ testimonial }) {
  return (
    <div className="card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Stars & Quote Icon */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', gap: '0.2rem', color: '#f59e0b' }}>
          {[...Array(testimonial.rating || 5)].map((_, i) => (
            <Star key={i} size={16} fill="#f59e0b" />
          ))}
        </div>
        <Quote size={28} style={{ color: 'var(--primary-200)' }} />
      </div>

      {/* Quote text */}
      <p style={{ fontSize: '0.975rem', color: 'var(--slate-700)', fontStyle: 'italic', marginBottom: '1.75rem', flex: 1, lineHeight: 1.65 }}>
        "{testimonial.quote}"
      </p>

      {/* Author Footer */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginTop: 'auto', paddingTop: '1.25rem', borderTop: '1px solid var(--slate-100)' }}>
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--primary-200)' }}
        />
        <div>
          <h4 style={{ fontSize: '1rem', color: 'var(--slate-900)', marginBottom: '0.15rem' }}>
            {testimonial.name}
          </h4>
          <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--primary-700)', fontWeight: 600 }}>
            {testimonial.role}
          </span>
          <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--slate-400)' }}>
            {testimonial.location}
          </span>
        </div>
      </div>
    </div>
  );
}
