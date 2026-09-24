import React, { useState } from 'react';
import ProgramCard from '../components/ProgramCard';
import ContactSection from '../components/ContactSection';
import Button from '../components/Button';
import { HandHeart, Filter, Search } from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';

export default function Programs() {
  const { programs, settings } = useSiteData();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Clean Water', 'Education', 'Healthcare', 'Disaster Relief', 'Livelihood', 'Child Care'];

  const filteredPrograms = programs.filter((program) => {
    const matchesCategory = selectedCategory === 'All' || program.category === selectedCategory;
    const matchesSearch = program.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          program.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          program.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      {/* Page Hero */}
      <div className="page-hero">
        <div className="container">
          <span className="section-tag" style={{ backgroundColor: 'rgba(52, 211, 153, 0.2)', color: '#6ee7b7' }}>
            Where We Take Action
          </span>
          <h1 className="page-hero-title">Our Programs & Causes</h1>
          <p className="page-hero-subtitle">
            From life-giving water filtration plants to school supplies and emergency flood aid, explore our core initiatives and choose where to make an impact.
          </p>
        </div>
      </div>

      <section className="section-py">
        <div className="container">
          {/* Controls: Search & Category Pills */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            marginBottom: '3rem',
            backgroundColor: 'var(--slate-50)',
            padding: '1.75rem',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--slate-200)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--slate-700)', fontWeight: 600 }}>
                <Filter size={18} style={{ color: 'var(--primary-600)' }} />
                <span>Filter by Category:</span>
              </div>
              {/* Search Bar */}
              <div style={{ position: 'relative', minWidth: '260px' }}>
                <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--slate-400)' }} />
                <input
                  type="text"
                  placeholder="Search causes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.55rem 1rem 0.55rem 2.25rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--slate-300)',
                    fontSize: '0.875rem',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            {/* Category Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`btn btn-sm ${selectedCategory === category ? 'btn-primary' : 'btn-outline'}`}
                  style={{ borderRadius: 'var(--radius-full)' }}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Program Cards Grid */}
          {filteredPrograms.length > 0 ? (
            <div className="grid-3">
              {filteredPrograms.map((program) => (
                <ProgramCard key={program.id} program={program} />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '4rem 1rem', backgroundColor: 'var(--slate-50)', borderRadius: 'var(--radius-lg)' }}>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--slate-700)', marginBottom: '0.5rem' }}>
                No causes found matching your criteria.
              </h3>
              <p style={{ color: 'var(--slate-500)', marginBottom: '1.5rem' }}>
                Try selecting a different category or clearing the search keyword.
              </p>
              <Button onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }} variant="outline" size="sm">
                Reset Filters
              </Button>
            </div>
          )}

          {/* Bottom Prompt */}
          <div style={{
            marginTop: '4.5rem',
            padding: '3rem',
            borderRadius: 'var(--radius-xl)',
            backgroundColor: 'var(--primary-50)',
            border: '1px solid var(--primary-200)',
            textAlign: 'center'
          }}>
            <HandHeart size={40} style={{ color: 'var(--primary-600)', margin: '0 auto 1rem auto' }} />
            <h3 style={{ fontSize: '1.75rem', color: 'var(--slate-900)', marginBottom: '0.75rem' }}>
              Want to Sponsor an Entire Program or Water Well?
            </h3>
            <p style={{ maxWidth: '600px', margin: '0 auto 1.5rem auto', color: 'var(--slate-600)', fontSize: '0.95rem' }}>
              We provide personalized dedication plaques, completion certificates, and comprehensive GPS impact reports for major community sponsors. Call us at <strong>{settings.phone}</strong> or email <strong>{settings.email}</strong>.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <Button to="/donate" variant="primary" size="md">
                Donate Online
              </Button>
              <Button href={`tel:${settings.phone}`} variant="outline" size="md">
                Call Helpline: {settings.phone}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <ContactSection />
    </div>
  );
}
