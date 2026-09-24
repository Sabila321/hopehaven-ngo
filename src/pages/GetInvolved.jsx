import React from 'react';
import { Link } from 'react-router-dom';
import {
  HandHeart,
  Briefcase,
  Users,
  Megaphone,
  Gift,
  HeartHandshake,
  ArrowRight,
  Phone,
  Mail,
  CheckCircle2
} from 'lucide-react';
import Button from '../components/Button';
import ContactSection from '../components/ContactSection';

export default function GetInvolved() {
  const ways = [
    {
      icon: <Users size={32} />,
      title: 'Become a Volunteer',
      badge: 'Individual',
      description: 'Offer your time and skills. Whether you are a physician, teacher, content creator, or logistics volunteer, your hands create immediate impact on the ground.',
      cta: 'Join Volunteer Roster',
      to: '/volunteer',
      color: 'var(--primary-600)'
    },
    {
      icon: <HandHeart size={32} />,
      title: 'Make a Direct Contribution',
      badge: 'Zakat & Sadaqah',
      description: 'Support ongoing solar water well construction, child scholarships, or flood ration drives. Choose between one-time gifts or recurring monthly sustenance.',
      cta: 'Donate Online',
      to: '/donate',
      color: 'var(--accent-600)'
    },
    {
      icon: <Briefcase size={32} />,
      title: 'Corporate CSR Partnerships',
      badge: 'Institutions',
      description: 'Align your business with verified sustainable development goals (SDGs). We partner with corporations for dedicated employee engagement and tax-deductible projects.',
      cta: 'Contact CSR Desk',
      to: '/contact',
      color: 'var(--teal-700)'
    },
    {
      icon: <Gift size={32} />,
      title: 'In-Kind Supplies Donation',
      badge: 'Goods & Tools',
      description: 'We welcome functional medical equipment, educational books, solar panels, water filters, and warm winter garments for distribution in disaster zones.',
      cta: 'Coordinate Drop-off',
      to: '/contact',
      color: '#0284c7'
    },
    {
      icon: <Megaphone size={32} />,
      title: 'Community Advocate & Ambassador',
      badge: 'Digital Advocacy',
      description: 'Amplify our humanitarian voice. Organize university fundraising events, launch digital campaigns, and spread awareness in your network.',
      cta: 'Get Advocacy Toolkit',
      to: '/contact',
      color: '#7c3aed'
    },
    {
      icon: <HeartHandshake size={32} />,
      title: 'Legacy Giving & Endowments',
      badge: 'Long-Term Impact',
      description: 'Dedicate an ongoing Sadaqah Jariyah well or school wing in memory of loved ones. We provide engraved commemorative plaques and transparent progress documentation.',
      cta: 'Inquire About Endowments',
      to: '/contact',
      color: '#b45309'
    }
  ];

  return (
    <div>
      {/* Page Hero */}
      <div className="page-hero">
        <div className="container">
          <span className="section-tag" style={{ backgroundColor: 'rgba(52, 211, 153, 0.2)', color: '#6ee7b7' }}>
            Join Our Movement
          </span>
          <h1 className="page-hero-title">Get Involved With HopeHaven</h1>
          <p className="page-hero-subtitle">
            Change doesn’t happen in isolation. Discover meaningful ways you can lend your voice, skills, resources, or corporate backing to lift up vulnerable communities.
          </p>
        </div>
      </div>

      <section className="section-py">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Paths to Action</span>
            <h2 className="section-title">How You Can Participate</h2>
            <p className="section-subtitle">
              Every form of support brings nourishment, education, and hope to a family in desperate need.
            </p>
          </div>

          <div className="grid-3">
            {ways.map((way, idx) => (
              <div
                key={idx}
                className="card"
                style={{ padding: '2rem', display: 'flex', flexDirection: 'column', height: '100%' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                  <div style={{
                    width: '3.75rem',
                    height: '3.75rem',
                    borderRadius: 'var(--radius-lg)',
                    backgroundColor: 'var(--slate-50)',
                    color: way.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid var(--slate-200)'
                  }}>
                    {way.icon}
                  </div>
                  <span className="badge badge-primary">{way.badge}</span>
                </div>

                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: 'var(--slate-900)' }}>
                  {way.title}
                </h3>

                <p style={{ fontSize: '0.9rem', color: 'var(--slate-600)', lineHeight: 1.65, marginBottom: '1.75rem', flex: 1 }}>
                  {way.description}
                </p>

                <div style={{ marginTop: 'auto' }}>
                  <Button to={way.to} variant="outline" size="sm" style={{ width: '100%' }} icon={<ArrowRight size={15} />}>
                    {way.cta}
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Corporate / Institutional Partnership Highlight */}
          <div style={{
            marginTop: '5rem',
            background: 'linear-gradient(135deg, var(--teal-900) 0%, var(--primary-900) 100%)',
            color: 'var(--white)',
            borderRadius: 'var(--radius-xl)',
            padding: '3.5rem 2.5rem',
            boxShadow: 'var(--shadow-xl)'
          }}>
            <div className="grid-2" style={{ alignItems: 'center' }}>
              <div>
                <span style={{
                  display: 'inline-block',
                  fontSize: '0.8rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  fontWeight: 700,
                  color: 'var(--accent-400)',
                  marginBottom: '0.75rem'
                }}>
                  Institutional & CSR Collaboration
                </span>
                <h3 style={{ fontSize: '2.1rem', color: '#ffffff', marginBottom: '1rem', lineHeight: 1.25 }}>
                  Partner With Us for Verified Social Impact
                </h3>
                <p style={{ color: 'var(--slate-200)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                  We work closely with companies, schools, and philanthropic trusts to design measurable CSR projects with audited compliance and media reporting.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '2rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: '#d1fae5' }}>
                    <CheckCircle2 size={16} color="#34d399" /> Detailed impact reports with GPS-tagged site photos
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: '#d1fae5' }}>
                    <CheckCircle2 size={16} color="#34d399" /> Employee volunteer field immersion days
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: '#d1fae5' }}>
                    <CheckCircle2 size={16} color="#34d399" /> Recognition on our annual transparency report
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <Button to="/contact" variant="secondary" size="md">
                    Inquire for Corporate CSR
                  </Button>
                  <Button href="tel:03233747970" variant="outline-white" size="md" icon={<Phone size={15} />}>
                    Call 03233747970
                  </Button>
                </div>
              </div>

              {/* Direct helpline card */}
              <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: 'var(--radius-lg)',
                padding: '2.5rem 2rem',
                backdropFilter: 'blur(10px)',
                textAlign: 'center'
              }}>
                <h4 style={{ color: '#ffffff', fontSize: '1.4rem', marginBottom: '0.5rem' }}>
                  Speak to Our Coordinator
                </h4>
                <p style={{ color: 'var(--slate-300)', fontSize: '0.9rem', marginBottom: '1.75rem' }}>
                  Need advice on how your school, brand, or family can sponsor a cause? We are available via direct call or email.
                </p>

                <div style={{ marginBottom: '1.25rem' }}>
                  <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--primary-300)', textTransform: 'uppercase', fontWeight: 600 }}>Helpline:</span>
                  <a href="tel:03233747970" style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fbbf24' }}>
                    03233747970
                  </a>
                </div>

                <div style={{ marginBottom: '1.75rem' }}>
                  <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--primary-300)', textTransform: 'uppercase', fontWeight: 600 }}>Email Address:</span>
                  <a href="mailto:sabilamemon7@gmail.com" style={{ fontSize: '1.05rem', fontWeight: 600, color: '#ffffff', wordBreak: 'break-all' }}>
                    sabilamemon7@gmail.com
                  </a>
                </div>

                <Button to="/volunteer" variant="white" size="md" style={{ width: '100%' }}>
                  Apply as Volunteer Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactSection />
    </div>
  );
}
