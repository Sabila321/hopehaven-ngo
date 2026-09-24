import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Users, ArrowUpRight } from 'lucide-react';
import Button from './Button';

export default function ProgramCard({ program }) {
  const percentFunded = Math.min(100, Math.round((program.raised / program.goal) * 100));

  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Card Image & Badge */}
      <div style={{ position: 'relative', height: '220px', overflow: 'hidden', backgroundColor: 'var(--slate-100)' }}>
        <img
          src={program.image}
          alt={program.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
          className="card-img"
        />
        <span
          className="badge badge-primary"
          style={{ position: 'absolute', top: '12px', left: '12px', backdropFilter: 'blur(4px)', backgroundColor: 'rgba(255, 255, 255, 0.92)' }}
        >
          {program.category}
        </span>
        {program.urgency === 'High' || program.urgency === 'Critical' ? (
          <span
            className="badge badge-amber"
            style={{ position: 'absolute', top: '12px', right: '12px', backgroundColor: '#fef3c7', color: '#b45309', fontWeight: 700 }}
          >
            {program.urgency} Need
          </span>
        ) : null}
      </div>

      {/* Card Body */}
      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '0.65rem', lineHeight: 1.35, color: 'var(--slate-900)' }}>
          {program.title}
        </h3>

        <p style={{ fontSize: '0.9rem', color: 'var(--slate-600)', marginBottom: '1.25rem', flex: 1, lineHeight: 1.6 }}>
          {program.summary}
        </p>

        {/* Beneficiaries Tag */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.825rem', color: 'var(--slate-500)', marginBottom: '1rem' }}>
          <Users size={14} style={{ color: 'var(--primary-600)' }} />
          <span>Beneficiaries: <strong style={{ color: 'var(--slate-800)' }}>{program.beneficiaries}</strong></span>
        </div>

        {/* Funding Progress */}
        <div style={{ marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>
            <span style={{ color: 'var(--slate-600)' }}>Raised: <strong style={{ color: 'var(--primary-700)' }}>${program.raised.toLocaleString()}</strong></span>
            <span style={{ color: 'var(--slate-500)' }}>Goal: ${program.goal.toLocaleString()}</span>
          </div>
          <div className="progress-bar-container">
            <div className="progress-bar-fill" style={{ width: `${percentFunded}%` }} />
          </div>
          <div style={{ textAlign: 'right', fontSize: '0.775rem', fontWeight: 600, color: 'var(--primary-600)' }}>
            {percentFunded}% Completed
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '0.75rem', marginTop: 'auto' }}>
          <Button
            to={`/donate?cause=${program.id}`}
            variant="primary"
            size="sm"
            style={{ flex: 1 }}
            icon={<Heart size={14} />}
          >
            Donate
          </Button>
          <Button
            to="/programs"
            variant="outline"
            size="sm"
            style={{ padding: '0.55rem 0.85rem' }}
            title="View Details"
          >
            <ArrowUpRight size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
}
