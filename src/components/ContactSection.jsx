import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, MessageSquare, ArrowRight } from 'lucide-react';
import Button from './Button';
import { useSiteData } from '../context/SiteDataContext';

export default function ContactSection() {
  const { settings } = useSiteData();

  return (
    <section className="section-py" style={{ backgroundColor: 'var(--slate-900)', color: 'var(--white)' }}>
      <div className="container">
        <div style={{
          background: 'linear-gradient(135deg, rgba(6, 78, 59, 0.6) 0%, rgba(15, 23, 42, 0.9) 100%)',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '3.5rem 2.5rem',
          boxShadow: 'var(--shadow-xl)'
        }}>
          <div style={{ maxWidth: '750px', margin: '0 auto', textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-tag" style={{ backgroundColor: 'rgba(52, 211, 153, 0.15)', color: '#6ee7b7' }}>
              Connect Directly
            </span>
            <h2 style={{ fontSize: '2.4rem', color: '#ffffff', marginBottom: '1rem' }}>
              Have Questions or Want to Partner With Us?
            </h2>
            <p style={{ color: 'var(--slate-300)', fontSize: '1.05rem' }}>
              Whether you are an individual wanting to volunteer, a donor seeking project updates, or a corporate partner, our team is here to help. Reach out directly through phone or email.
            </p>
          </div>

          <div className="grid-3" style={{ marginBottom: '3rem' }}>
            {/* Phone Card */}
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: 'var(--radius-lg)',
              padding: '2rem 1.5rem',
              textAlign: 'center',
              backdropFilter: 'blur(8px)'
            }}>
              <div style={{
                width: '3.5rem',
                height: '3.5rem',
                borderRadius: '50%',
                backgroundColor: 'rgba(16, 185, 129, 0.2)',
                color: '#34d399',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem auto'
              }}>
                <Phone size={24} />
              </div>
              <h3 style={{ fontSize: '1.15rem', color: '#ffffff', marginBottom: '0.4rem' }}>
                Helpline & Direct Call
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--slate-400)', marginBottom: '1rem' }}>
                Mon - Sat: 9:00 AM - 6:00 PM PKT
              </p>
              <a
                href={`tel:${settings.phone}`}
                style={{
                  display: 'inline-block',
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  color: '#fbbf24',
                  marginBottom: '1.25rem'
                }}
              >
                {settings.phone}
              </a>
              <div>
                <Button href={`tel:${settings.phone}`} variant="secondary" size="sm" icon={<Phone size={14} />}>
                  Call Us Directly
                </Button>
              </div>
            </div>

            {/* Email Card */}
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: 'var(--radius-lg)',
              padding: '2rem 1.5rem',
              textAlign: 'center',
              backdropFilter: 'blur(8px)'
            }}>
              <div style={{
                width: '3.5rem',
                height: '3.5rem',
                borderRadius: '50%',
                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                color: '#60a5fa',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem auto'
              }}>
                <Mail size={24} />
              </div>
              <h3 style={{ fontSize: '1.15rem', color: '#ffffff', marginBottom: '0.4rem' }}>
                Official Email
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--slate-400)', marginBottom: '1rem' }}>
                We respond within 24 business hours
              </p>
              <a
                href={`mailto:${settings.email}`}
                style={{
                  display: 'inline-block',
                  fontSize: '1rem',
                  fontWeight: 700,
                  color: '#38bdf8',
                  wordBreak: 'break-all',
                  marginBottom: '1.25rem'
                }}
              >
                {settings.email}
              </a>
              <div>
                <Button href={`mailto:${settings.email}`} variant="primary" size="sm" icon={<Mail size={14} />}>
                  Email Us Directly
                </Button>
              </div>
            </div>

            {/* Office Visit Card */}
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: 'var(--radius-lg)',
              padding: '2rem 1.5rem',
              textAlign: 'center',
              backdropFilter: 'blur(8px)'
            }}>
              <div style={{
                width: '3.5rem',
                height: '3.5rem',
                borderRadius: '50%',
                backgroundColor: 'rgba(245, 158, 11, 0.2)',
                color: '#fbbf24',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem auto'
              }}>
                <MapPin size={24} />
              </div>
              <h3 style={{ fontSize: '1.15rem', color: '#ffffff', marginBottom: '0.4rem' }}>
                Head Office
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--slate-400)', marginBottom: '1rem' }}>
                Registered NGO Headquarters
              </p>
              <span style={{ display: 'block', fontSize: '0.95rem', fontWeight: 600, color: '#ffffff', marginBottom: '1.25rem' }}>
                {settings.address}
              </span>
              <div>
                <Button to="/contact" variant="outline-white" size="sm" icon={<MessageSquare size={14} />}>
                  Send Online Message
                </Button>
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <Link
              to="/contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: '#6ee7b7',
                fontWeight: 600,
                fontSize: '1rem',
                textDecoration: 'underline'
              }}
            >
              Go to Full Contact Page with Online Message Form <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
