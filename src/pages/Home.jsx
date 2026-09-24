import React from 'react';
import { Link } from 'react-router-dom';
import {
  Droplets,
  GraduationCap,
  HeartPulse,
  Flame,
  ArrowRight,
  HandHeart
} from 'lucide-react';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import ProgramCard from '../components/ProgramCard';
import ProjectCard from '../components/ProjectCard';
import TestimonialCard from '../components/TestimonialCard';
import ContactSection from '../components/ContactSection';
import Button from '../components/Button';
import { useSiteData } from '../context/SiteDataContext';

export default function Home() {
  const { programs, projects, testimonials, settings } = useSiteData();

  const featuredPrograms = programs.slice(0, 3);
  const featuredProjects = projects.slice(0, 3);

  const pillars = [
    {
      icon: <Droplets size={28} />,
      title: 'Clean Water',
      desc: 'Solar-powered filtration units & deep borewells providing safe water to remote desert & rural villages.'
    },
    {
      icon: <GraduationCap size={28} />,
      title: 'Education for All',
      desc: 'Free school supplies, uniforms, trained faculty, and modern computer literacy centers for underprivileged youth.'
    },
    {
      icon: <HeartPulse size={28} />,
      title: 'Healthcare Aid',
      desc: 'Mobile clinics delivering free diagnosis, cataract eye surgeries, maternal support, and medicines.'
    },
    {
      icon: <Flame size={28} />,
      title: 'Disaster Relief',
      desc: 'Rapid ground deployment of food hampers, clean water tablets, and emergency shelters during floods.'
    }
  ];

  return (
    <div>
      {/* 1. Hero Section */}
      <Hero
        badge={settings.heroBadge || "HopeHaven Welfare Foundation"}
        title={settings.heroTitle || "Together We Bring Hope, Dignity & Opportunity"}
        subtitle={settings.heroSubtitle || "We are a dedicated non-profit organization striving to eliminate poverty, deliver clean drinking water, ensure quality education for every child, and provide rapid relief in times of crisis."}
      />

      {/* 2. Our Mission & Core Pillars */}
      <section className="section-py">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Who We Are</span>
            <h2 className="section-title">Our Sacred Mission</h2>
            <p className="section-subtitle">
              HopeHaven exists to empower marginalized communities, bridge structural divides, and build sustainable local ecosystems where every human life can flourish with safety and dignity.
            </p>
          </div>

          <div className="grid-4">
            {pillars.map((pillar, idx) => (
              <div key={idx} className="card" style={{ padding: '2rem 1.5rem', textAlign: 'center' }}>
                <div style={{
                  width: '4rem',
                  height: '4rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--primary-50)',
                  color: 'var(--primary-600)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.25rem auto'
                }}>
                  {pillar.icon}
                </div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.65rem' }}>{pillar.title}</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--slate-600)', lineHeight: 1.6 }}>{pillar.desc}</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Button to="/about" variant="outline" size="md" icon={<ArrowRight size={16} />}>
              Read Our Full Story & Vision
            </Button>
          </div>
        </div>
      </section>

      {/* 3. Impact Statistics */}
      <Stats />

      {/* 4. Featured Causes / Programs */}
      <section className="section-py">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div>
              <span className="section-tag">Make A Difference</span>
              <h2 className="section-title" style={{ marginBottom: '0.5rem' }}>Featured Causes</h2>
              <p className="section-subtitle" style={{ margin: 0 }}>
                Direct your zakat and charitable giving where urgent field support is required today.
              </p>
            </div>
            <Button to="/programs" variant="outline" size="md" icon={<ArrowRight size={16} />}>
              View All {programs.length} Programs
            </Button>
          </div>

          <div className="grid-3">
            {featuredPrograms.map((program) => (
              <ProgramCard key={program.id} program={program} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. Donation / Support CTA Banner */}
      <section className="section-py-sm">
        <div className="container">
          <div className="cta-banner">
            <div style={{ maxWidth: '640px', position: 'relative', zIndex: 1 }}>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: 'rgba(255,255,255,0.15)',
                padding: '0.35rem 0.9rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.825rem',
                fontWeight: 600,
                color: 'var(--accent-200)',
                marginBottom: '1rem'
              }}>
                <HandHeart size={15} /> Your Generosity Changes Lives
              </span>
              <h2 style={{ fontSize: '2.5rem', color: '#ffffff', marginBottom: '1rem', lineHeight: 1.2 }}>
                Help Provide Clean Water & Education to a Family Today
              </h2>
              <p style={{ color: 'var(--slate-100)', fontSize: '1.05rem', marginBottom: '2rem' }}>
                Every single dollar is directed straight to vetted field operations. With complete audit trails and verified donor reporting, you know your kindness reaches the truly needy.
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Button to="/donate" variant="secondary" size="lg" icon={<HandHeart size={18} />}>
                  Donate Now
                </Button>
                <Button to="/volunteer" variant="outline-white" size="lg">
                  Join As Volunteer
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Recent Projects */}
      <section className="section-py">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div>
              <span className="section-tag">Ground Realities</span>
              <h2 className="section-title" style={{ marginBottom: '0.5rem' }}>Recent Field Projects</h2>
              <p className="section-subtitle" style={{ margin: 0 }}>
                Explore how your contributions are being deployed on the ground right now.
              </p>
            </div>
            <Button to="/projects" variant="outline" size="md" icon={<ArrowRight size={16} />}>
              Explore All {projects.length} Projects
            </Button>
          </div>

          <div className="grid-3">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* 7. Beneficiary & Volunteer Testimonials */}
      <section className="section-py bg-slate-50">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Stories of Hope</span>
            <h2 className="section-title">Voices From the Communities</h2>
            <p className="section-subtitle">
              Listen to the real stories of resilience, gratitude, and transformation told by our beneficiaries and volunteer workers.
            </p>
          </div>

          <div className="grid-2">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* 8. Contact CTA Section */}
      <ContactSection />
    </div>
  );
}
