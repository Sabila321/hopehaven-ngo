import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Phone, Mail, MapPin, Send, CheckCircle2, Lock } from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';
import { useAuth } from '../context/AuthContext';

export default function Footer() {
  const { settings } = useSiteData();
  const { isAuthenticated } = useAuth();
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (emailInput && emailInput.includes('@')) {
      setSubscribed(true);
      setEmailInput('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          {/* Brand & Overview */}
          <div className="footer-brand">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div className="brand-icon">
                <Heart size={20} fill="#ffffff" />
              </div>
              <div>
                <span style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff', display: 'block', lineHeight: 1.1 }}>
                  HopeHaven
                </span>
                <span style={{ fontSize: '0.725rem', fontWeight: 600, color: 'var(--primary-400)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                  Welfare Foundation
                </span>
              </div>
            </div>
            <p>
              A non-governmental, non-profit humanitarian organization committed to restoring dignity and hope to vulnerable communities through clean water, healthcare, education, and rapid disaster relief.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem' }}>
              <Link to="/donate" className="btn btn-secondary btn-sm" style={{ fontWeight: 700 }}>
                Support Our Mission
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/programs">Our Programs</Link></li>
              <li><Link to="/projects">Field Projects</Link></li>
              <li><Link to="/get-involved">Get Involved</Link></li>
              <li><Link to="/volunteer">Become a Volunteer</Link></li>
              <li><Link to="/donate">Donate Online</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>

          {/* Causes / Programs */}
          <div className="footer-col">
            <h4>Our Causes</h4>
            <ul className="footer-links">
              <li><Link to="/programs">Clean Drinking Water</Link></li>
              <li><Link to="/programs">Child Education</Link></li>
              <li><Link to="/programs">Mobile Healthcare</Link></li>
              <li><Link to="/programs">Flood & Disaster Relief</Link></li>
              <li><Link to="/programs">Women Skill Development</Link></li>
              <li><Link to="/programs">Orphan Nutrition Support</Link></li>
            </ul>
          </div>

          {/* Contact Details & Newsletter */}
          <div className="footer-col">
            <h4>Official Contact</h4>
            <div className="footer-contact-item">
              <Phone size={18} />
              <div>
                <span style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--slate-400)' }}>Helpline / Direct Call</span>
                <a href={`tel:${settings.phone}`} style={{ color: '#ffffff', fontWeight: 600 }}>{settings.phone}</a>
              </div>
            </div>
            <div className="footer-contact-item">
              <Mail size={18} />
              <div>
                <span style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--slate-400)' }}>Official Email</span>
                <a href={`mailto:${settings.email}`} style={{ color: '#ffffff', fontWeight: 600 }}>{settings.email}</a>
              </div>
            </div>
            <div className="footer-contact-item">
              <MapPin size={18} />
              <div>
                <span style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--slate-400)' }}>Headquarters</span>
                <span style={{ color: 'var(--slate-300)' }}>{settings.address}</span>
              </div>
            </div>

            {/* Newsletter form simulation */}
            <div style={{ marginTop: '1.5rem' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--slate-300)', fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>
                Stay Informed With Impact Updates
              </span>
              {subscribed ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#34d399', fontSize: '0.85rem', padding: '0.5rem 0' }}>
                  <CheckCircle2 size={16} /> Thank you for subscribing!
                </div>
              ) : (
                <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '0.5rem' }}>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    required
                    style={{
                      flex: 1,
                      padding: '0.6rem 0.85rem',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'rgba(255,255,255,0.08)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      color: '#ffffff',
                      fontSize: '0.85rem',
                      outline: 'none'
                    }}
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe to newsletter"
                    style={{
                      background: 'var(--primary-600)',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: 'var(--radius-md)',
                      padding: '0.6rem 0.9rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Send size={15} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Footer Bottom Note */}
        <div className="footer-bottom">
          <div>
            © {new Date().getFullYear()} HopeHaven Welfare Foundation. All Rights Reserved. Built with pure React.js.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <span>Registered Non-Profit NGO</span>
            <span>Tax-Exempt Humanitarian Trust</span>
            <Link to="/contact" style={{ color: 'var(--primary-400)' }}>Contact Support</Link>
            <Link
              to={isAuthenticated ? '/admin' : '/admin/login'}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                color: '#fbbf24',
                fontWeight: 600,
                fontSize: '0.825rem',
                background: 'rgba(251, 191, 36, 0.1)',
                padding: '0.2rem 0.6rem',
                borderRadius: '4px'
              }}
            >
              <Lock size={12} /> {isAuthenticated ? 'Admin Dashboard' : 'Admin Portal'}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
