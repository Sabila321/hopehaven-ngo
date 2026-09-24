import React from 'react';
import { Heart, ArrowRight, ShieldCheck, Users, HandHeart } from 'lucide-react';
import Button from './Button';

export default function Hero({
  badge = 'Compassion in Action',
  title = 'Empowering Lives, Building Brighter Communities',
  subtitle = 'We are a dedicated non-profit organization striving to eliminate poverty, deliver clean drinking water, ensure quality education for every child, and provide rapid relief in times of crisis.',
  primaryAction = { label: 'Donate Now', to: '/donate', icon: <HandHeart size={18} /> },
  secondaryAction = { label: 'Explore Programs', to: '/programs', icon: <ArrowRight size={18} /> },
  imageUrl = 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80',
  showFloatingCard = true
}) {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-grid">
          {/* Text Content */}
          <div>
            {badge && (
              <div className="hero-badge">
                <ShieldCheck size={16} />
                <span>{badge}</span>
              </div>
            )}

            <h1 className="hero-title">
              Together We Bring <span className="highlight">Hope</span>, Dignity & Opportunity
            </h1>

            <p className="hero-description">
              {subtitle}
            </p>

            <div className="hero-actions">
              {primaryAction && (
                <Button to={primaryAction.to} variant="secondary" size="lg" icon={primaryAction.icon}>
                  {primaryAction.label}
                </Button>
              )}
              {secondaryAction && (
                <Button to={secondaryAction.to} variant="outline-white" size="lg" icon={secondaryAction.icon}>
                  {secondaryAction.label}
                </Button>
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.15)', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#34d399', boxShadow: '0 0 10px #34d399' }} />
                <span style={{ fontSize: '0.875rem', color: '#e2e8f0', fontWeight: 500 }}>100% Transparency</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#fbbf24', boxShadow: '0 0 10px #fbbf24' }} />
                <span style={{ fontSize: '0.875rem', color: '#e2e8f0', fontWeight: 500 }}>Direct Field Impact</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#60a5fa', boxShadow: '0 0 10px #60a5fa' }} />
                <span style={{ fontSize: '0.875rem', color: '#e2e8f0', fontWeight: 500 }}>Community-Led Action</span>
              </div>
            </div>
          </div>

          {/* Visual Frame */}
          <div className="hero-image-wrapper">
            <div className="hero-image-frame">
              <img
                src={imageUrl}
                alt="HopeHaven volunteers delivering humanitarian aid"
                loading="eager"
              />
            </div>

            {/* Floating Impact Callout */}
            {showFloatingCard && (
              <div className="hero-floating-card">
                <div style={{ width: '3rem', height: '3rem', borderRadius: '50%', backgroundColor: 'var(--primary-100)', color: 'var(--primary-700)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Users size={24} />
                </div>
                <div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--slate-900)', lineHeight: 1.1 }}>
                    150,000+
                  </div>
                  <div style={{ fontSize: '0.825rem', color: 'var(--slate-600)', fontWeight: 600 }}>
                    Lives Positively Impacted
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
