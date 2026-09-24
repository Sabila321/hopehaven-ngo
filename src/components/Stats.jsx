import React from 'react';
import { Users, HandHeart, CheckCircle2, Globe2 } from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';

export default function Stats() {
  const { settings } = useSiteData();

  const stats = [
    {
      id: 'lives',
      number: settings.stats?.lives || '150,000+',
      label: 'Lives Positively Impacted',
      description: 'Families provided with clean water, healthcare & food relief.',
      icon: <Users size={28} />
    },
    {
      id: 'volunteers',
      number: settings.stats?.volunteers || '2,400+',
      label: 'Active Dedicated Volunteers',
      description: 'Passionate changemakers serving across 18 regional hubs.',
      icon: <HandHeart size={28} />
    },
    {
      id: 'projects',
      number: settings.stats?.projects || '380+',
      label: 'Projects Completed',
      description: 'Solar wells, schools, mobile clinics and emergency drives.',
      icon: <CheckCircle2 size={28} />
    },
    {
      id: 'communities',
      number: settings.stats?.communities || '85+',
      label: 'Communities Reached',
      description: 'Under-resourced rural villages & urban settlements empowered.',
      icon: <Globe2 size={28} />
    }
  ];

  return (
    <section className="section-py bg-slate-50">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Measurable Change</span>
          <h2 className="section-title">Our Impact in Numbers</h2>
          <p className="section-subtitle">
            Every donation, volunteer hour, and community partnership translates directly into tangible real-world transformation.
          </p>
        </div>

        <div className="stats-grid">
          {stats.map((stat) => (
            <div key={stat.id} className="stat-item">
              <div className="stat-icon">
                {stat.icon}
              </div>
              <div className="stat-number">{stat.number}</div>
              <h3 style={{ fontSize: '1.05rem', color: 'var(--slate-800)', marginBottom: '0.4rem' }}>
                {stat.label}
              </h3>
              <p style={{ fontSize: '0.825rem', color: 'var(--slate-500)', lineHeight: 1.5 }}>
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
