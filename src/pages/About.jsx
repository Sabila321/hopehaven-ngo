import React from 'react';
import { Target, Compass, Heart, Shield, CheckCircle2, Award, Users } from 'lucide-react';
import Button from '../components/Button';
import Stats from '../components/Stats';
import ContactSection from '../components/ContactSection';
import { useSiteData } from '../context/SiteDataContext';

export default function About() {
  const { settings } = useSiteData();

  const values = [
    {
      icon: <Heart size={26} />,
      title: 'Radical Compassion',
      desc: 'We put humanity at the center of every intervention, treating every community member with unconditional dignity.'
    },
    {
      icon: <Shield size={26} />,
      title: '100% Financial Integrity',
      desc: 'Every penny donated is accounted for with open ledger reports, independent audits, and zero tolerance for waste.'
    },
    {
      icon: <Target size={26} />,
      title: 'Sustainable Self-Sufficiency',
      desc: 'We do not create perpetual dependency. Our programs empower families with skills, water access, and economic tools.'
    },
    {
      icon: <Users size={26} />,
      title: 'Community-Led Ownership',
      desc: 'Local village elders, mothers, and youth shape and manage our projects from planning to daily maintenance.'
    }
  ];

  const team = [
    {
      name: 'Sabila Memon',
      role: 'Founder & Executive Director',
      bio: 'Lifelong humanitarian advocate focused on women empowerment and grassroots community welfare in rural Sindh.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&h=400&q=80'
    },
    {
      name: 'Dr. Tariq Rasheed',
      role: 'Head of Medical Operations',
      bio: 'Surgeon and public health specialist organizing mobile eye surgery camps and maternal health units across remote districts.',
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&h=400&q=80'
    },
    {
      name: 'Ayesha Siddiqui',
      role: 'Director of Education Programs',
      bio: 'Former educator passionate about digital classroom technology and gender parity in primary school education.',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&h=400&q=80'
    },
    {
      name: 'Bilal Ahmed',
      role: 'Field Logistics & Emergency Rescue',
      bio: 'Disaster response veteran coordinating boat rescue missions, dry ration distribution, and solar well installations.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&h=400&q=80'
    }
  ];

  return (
    <div>
      {/* Page Hero */}
      <div className="page-hero">
        <div className="container">
          <span className="section-tag" style={{ backgroundColor: 'rgba(52, 211, 153, 0.2)', color: '#6ee7b7' }}>
            Our Purpose & Heritage
          </span>
          <h1 className="page-hero-title">About HopeHaven Foundation</h1>
          <p className="page-hero-subtitle">
            Founded with a vision to leave no vulnerable human behind, we unite passionate volunteers, donors, and grassroots leaders to heal communities.
          </p>
        </div>
      </div>

      {/* Story & Vision */}
      <section className="section-py">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center', gap: '3.5rem' }}>
            <div>
              <span className="section-tag">Our History</span>
              <h2 className="section-title" style={{ marginBottom: '1.25rem' }}>
                Born From Grassroots Compassion
              </h2>
              <p style={{ marginBottom: '1rem', fontSize: '1rem', lineHeight: 1.75 }}>
                HopeHaven Welfare Foundation began in 2018 when a small circle of volunteer doctors and educators traveled to drought-affected desert regions to deliver drinking water and medical aid. What began as a weekend initiative quickly revealed the devastating absence of basic human necessities across dozens of neighboring settlements.
              </p>
              <p style={{ marginBottom: '1.5rem', fontSize: '1rem', lineHeight: 1.75 }}>
                Today, HopeHaven has evolved into a recognized non-governmental organization that has served more than 150,000 individuals across four core sectors: <strong>Clean Water</strong>, <strong>Quality Education</strong>, <strong>Emergency Relief</strong>, and <strong>Healthcare</strong>.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '2rem' }}>
                <div style={{ padding: '1.25rem', backgroundColor: 'var(--slate-50)', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--primary-600)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary-800)', fontWeight: 700, marginBottom: '0.35rem' }}>
                    <Compass size={18} /> Our Vision
                  </div>
                  <p style={{ fontSize: '0.85rem', margin: 0 }}>
                    A world where every human being enjoys equitable access to clean water, health, and dignified learning.
                  </p>
                </div>
                <div style={{ padding: '1.25rem', backgroundColor: 'var(--slate-50)', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--accent-500)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-700)', fontWeight: 700, marginBottom: '0.35rem' }}>
                    <Target size={18} /> Our Mission
                  </div>
                  <p style={{ fontSize: '0.85rem', margin: 0 }}>
                    To deliver rapid emergency intervention and sustainable infrastructure through transparent community partnerships.
                  </p>
                </div>
              </div>
            </div>

            {/* Visual Collage */}
            <div style={{ position: 'relative' }}>
              <div style={{ borderRadius: 'var(--radius-xl)', overflow: 'hidden', boxShadow: 'var(--shadow-xl)', height: '440px' }}>
                <img
                  src="https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=800&q=80"
                  alt="HopeHaven volunteers building community well"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-py bg-slate-50">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Guiding Principles</span>
            <h2 className="section-title">The Values That Drive Us</h2>
            <p className="section-subtitle">
              Every decision we make in the boardroom or in the field is governed by our core ethical pillars.
            </p>
          </div>

          <div className="grid-4">
            {values.map((v, idx) => (
              <div key={idx} className="card" style={{ padding: '2rem 1.5rem', textAlign: 'center' }}>
                <div style={{
                  width: '3.75rem',
                  height: '3.75rem',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'var(--primary-100)',
                  color: 'var(--primary-700)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.25rem auto'
                }}>
                  {v.icon}
                </div>
                <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem' }}>{v.title}</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--slate-600)', lineHeight: 1.6 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <Stats />

      {/* Leadership Team */}
      <section className="section-py">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Dedicated Leadership</span>
            <h2 className="section-title">Meet Our Team</h2>
            <p className="section-subtitle">
              Passionate professionals and humanitarian workers devoting their lives to making real impact.
            </p>
          </div>

          <div className="grid-4">
            {team.map((member, idx) => (
              <div key={idx} className="card" style={{ overflow: 'hidden' }}>
                <div style={{ height: '260px', overflow: 'hidden', backgroundColor: 'var(--slate-100)' }}>
                  <img
                    src={member.image}
                    alt={member.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.15rem', marginBottom: '0.25rem' }}>{member.name}</h3>
                  <span style={{ display: 'block', fontSize: '0.825rem', color: 'var(--primary-600)', fontWeight: 600, marginBottom: '0.75rem' }}>
                    {member.role}
                  </span>
                  <p style={{ fontSize: '0.85rem', color: 'var(--slate-600)', lineHeight: 1.55 }}>
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transparency & Governance Card */}
      <section className="section-py-sm" style={{ backgroundColor: 'var(--slate-100)' }}>
        <div className="container">
          <div style={{
            backgroundColor: 'var(--white)',
            borderRadius: 'var(--radius-xl)',
            padding: '3rem',
            border: '1px solid var(--slate-200)',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '2.5rem',
            alignItems: 'center'
          }}>
            <div>
              <span className="section-tag" style={{ backgroundColor: '#e0f2fe', color: '#0369a1' }}>
                Accountability First
              </span>
              <h3 style={{ fontSize: '1.85rem', marginBottom: '1rem' }}>
                Financial Transparency & Zero Overhead Philosophy
              </h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--slate-600)', lineHeight: 1.7, marginBottom: '1.25rem' }}>
                We believe trust is earned through complete radical transparency. 100% of public donations go directly into designated field projects. Administrative costs are underwritten independently by our founding board members.
              </p>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--slate-700)' }}>
                  <CheckCircle2 size={16} color="var(--primary-600)" /> Independent third-party financial audits annually
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--slate-700)' }}>
                  <CheckCircle2 size={16} color="var(--primary-600)" /> Photo & video verification for major donor milestones
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--slate-700)' }}>
                  <CheckCircle2 size={16} color="var(--primary-600)" /> Tax-exempt certification under Non-Profit Trust regulations
                </li>
              </ul>
            </div>
            <div style={{ textAlign: 'center', padding: '2rem', backgroundColor: 'var(--slate-50)', borderRadius: 'var(--radius-lg)' }}>
              <Award size={48} style={{ color: 'var(--accent-500)', marginBottom: '1rem' }} />
              <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Have Inquiries About Our Operations?</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--slate-600)', marginBottom: '1.5rem' }}>
                Contact our executive desk directly at <strong>{settings.phone}</strong> or <strong>{settings.email}</strong>
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                <Button to="/donate" variant="primary" size="md">
                  Support Our Mission
                </Button>
                <Button to="/contact" variant="outline" size="md">
                  Contact Team
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Callout */}
      <ContactSection />
    </div>
  );
}
