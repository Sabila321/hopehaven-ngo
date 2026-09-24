import React, { useState } from 'react';
import ProjectCard from '../components/ProjectCard';
import ContactSection from '../components/ContactSection';
import { useSiteData } from '../context/SiteDataContext';

export default function Projects() {
  const { projects } = useSiteData();
  const [activeStatus, setActiveStatus] = useState('All');

  const filteredProjects = activeStatus === 'All'
    ? projects
    : projects.filter((p) => p.status === activeStatus);

  const statuses = [
    { label: 'All Projects', value: 'All' },
    { label: 'Completed (Impact Verified)', value: 'Completed' },
    { label: 'In Progress (Active Fieldwork)', value: 'In Progress' },
    { label: 'Upcoming / Planned', value: 'Upcoming' }
  ];

  return (
    <div>
      {/* Page Hero */}
      <div className="page-hero">
        <div className="container">
          <span className="section-tag" style={{ backgroundColor: 'rgba(52, 211, 153, 0.2)', color: '#6ee7b7' }}>
            Tangible Impact
          </span>
          <h1 className="page-hero-title">Field Projects & Milestones</h1>
          <p className="page-hero-subtitle">
            See the concrete results of our humanitarian interventions across remote districts, flood rehabilitation zones, and urban slums.
          </p>
        </div>
      </div>

      <section className="section-py">
        <div className="container">
          {/* Status Filter Tabs */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.75rem',
            flexWrap: 'wrap',
            marginBottom: '3rem'
          }}>
            {statuses.map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() => setActiveStatus(item.value)}
                className={`btn btn-md ${activeStatus === item.value ? 'btn-primary' : 'btn-outline'}`}
                style={{ borderRadius: 'var(--radius-full)', fontSize: '0.9rem' }}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid-3">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          {/* Project Timeline & Verification Callout */}
          <div style={{
            marginTop: '5rem',
            backgroundColor: 'var(--slate-50)',
            borderRadius: 'var(--radius-xl)',
            padding: '3rem 2rem',
            border: '1px solid var(--slate-200)'
          }}>
            <div className="section-header" style={{ marginBottom: '2.5rem' }}>
              <span className="section-tag">How We Work</span>
              <h2 className="section-title">Our Project Execution Lifecycle</h2>
              <p className="section-subtitle">
                From community needs assessment to post-handover sustainability monitoring.
              </p>
            </div>

            <div className="grid-4">
              <div style={{ backgroundColor: 'var(--white)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--slate-200)' }}>
                <span style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--primary-600)', display: 'block', marginBottom: '0.5rem' }}>01</span>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Grassroots Assessment</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--slate-600)' }}>
                  Our field coordinators consult village elders and women to identify exact water table depths, school dropouts, or disease prevalence.
                </p>
              </div>

              <div style={{ backgroundColor: 'var(--white)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--slate-200)' }}>
                <span style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--primary-600)', display: 'block', marginBottom: '0.5rem' }}>02</span>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Transparent Funding</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--slate-600)' }}>
                  Budgets are publicly published and ring-fenced. Every expenditure item is audited for material quality and cost efficiency.
                </p>
              </div>

              <div style={{ backgroundColor: 'var(--white)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--slate-200)' }}>
                <span style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--primary-600)', display: 'block', marginBottom: '0.5rem' }}>03</span>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Engineered Execution</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--slate-600)' }}>
                  Civil engineers, medical teams, and community volunteers execute construction and medical camps using solar power and durable materials.
                </p>
              </div>

              <div style={{ backgroundColor: 'var(--white)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--slate-200)' }}>
                <span style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--primary-600)', display: 'block', marginBottom: '0.5rem' }}>04</span>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Continuous Oversight</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--slate-600)' }}>
                  Local maintenance committees are trained and equipped with spare parts, ensuring solar wells and schools operate uninterrupted for decades.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactSection />
    </div>
  );
}
