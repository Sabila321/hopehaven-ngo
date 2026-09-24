import React from 'react';
import { MapPin, Calendar, CheckCircle2, Clock, Sparkles } from 'lucide-react';

export default function ProjectCard({ project }) {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Completed':
        return (
          <span className="badge" style={{ backgroundColor: '#dcfce7', color: '#15803d' }}>
            <CheckCircle2 size={12} /> Completed
          </span>
        );
      case 'In Progress':
        return (
          <span className="badge badge-amber">
            <Clock size={12} /> In Progress
          </span>
        );
      case 'Upcoming':
      default:
        return (
          <span className="badge badge-blue">
            <Sparkles size={12} /> Planned / Upcoming
          </span>
        );
    }
  };

  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Image & Status */}
      <div style={{ position: 'relative', height: '210px', overflow: 'hidden', backgroundColor: 'var(--slate-100)' }}>
        <img
          src={project.image}
          alt={project.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          <span className="badge badge-primary" style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', color: 'var(--primary-800)' }}>
            {project.category}
          </span>
          {getStatusBadge(project.status)}
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', fontSize: '0.825rem', color: 'var(--slate-500)', marginBottom: '0.75rem' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
            <MapPin size={14} style={{ color: 'var(--primary-600)' }} />
            {project.location}
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
            <Calendar size={14} />
            {project.year}
          </span>
        </div>

        <h3 style={{ fontSize: '1.18rem', marginBottom: '0.75rem', lineHeight: 1.35, color: 'var(--slate-900)' }}>
          {project.title}
        </h3>

        <p style={{ fontSize: '0.875rem', color: 'var(--slate-600)', marginBottom: '1.25rem', lineHeight: 1.6, flex: 1 }}>
          {project.description}
        </p>

        {/* Impact Box */}
        <div style={{
          backgroundColor: 'var(--primary-50)',
          borderLeft: '3px solid var(--primary-600)',
          padding: '0.75rem 0.9rem',
          borderRadius: '0 var(--radius-sm) var(--radius-sm) 0',
          marginTop: 'auto'
        }}>
          <span style={{ display: 'block', fontSize: '0.725rem', textTransform: 'uppercase', fontWeight: 700, color: 'var(--primary-800)', letterSpacing: '0.04em' }}>
            Verified Field Impact
          </span>
          <p style={{ fontSize: '0.85rem', color: 'var(--primary-900)', fontWeight: 600, margin: 0, marginTop: '0.15rem' }}>
            {project.impact}
          </p>
        </div>
      </div>
    </div>
  );
}
