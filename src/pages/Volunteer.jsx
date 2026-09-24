import React, { useState } from 'react';
import {
  Heart,
  Users,
  Award,
  Clock,
  CheckCircle2,
  AlertCircle,
  Phone,
  Mail,
  Send,
  Sparkles,
  BookOpen,
  Stethoscope,
  Truck
} from 'lucide-react';
import Button from '../components/Button';
import ContactSection from '../components/ContactSection';
import { useSiteData } from '../context/SiteDataContext';

export default function Volunteer() {
  const { settings, addVolunteerApplication } = useSiteData();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    areaOfInterest: '',
    availability: 'Weekends Only',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) {
      errs.fullName = 'Full Name is required.';
    } else if (formData.fullName.trim().length < 3) {
      errs.fullName = 'Name must be at least 3 characters.';
    }

    if (!formData.email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address.';
    }

    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required.';
    } else if (!/^[0-9+\s-]{8,15}$/.test(formData.phone.trim())) {
      errs.phone = 'Please enter a valid phone number (e.g. 03233747970).';
    }

    if (!formData.areaOfInterest) {
      errs.areaOfInterest = 'Please choose an area of interest.';
    }

    if (!formData.message.trim()) {
      errs.message = 'Please share a brief message or your skills/motivation.';
    } else if (formData.message.trim().length < 10) {
      errs.message = 'Please write at least 10 characters.';
    }

    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      // Dispatch volunteer application to SiteDataContext for Admin review!
      addVolunteerApplication(formData);

      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        areaOfInterest: '',
        availability: 'Weekends Only',
        message: ''
      });
      setErrors({});
    }, 500);
  };

  const volunteerBenefits = [
    {
      icon: <Stethoscope size={24} />,
      title: 'Medical & Healthcare Relief',
      desc: 'Join our doctors and nurses delivering primary diagnostics, medicines, and free eye camps in remote districts.'
    },
    {
      icon: <BookOpen size={24} />,
      title: 'Teaching & Child Mentorship',
      desc: 'Help teach reading, math, art, and computer basics at our community slum learning centers.'
    },
    {
      icon: <Truck size={24} />,
      title: 'Disaster Relief & Field Logistics',
      desc: 'Pack and distribute dry food hampers, clean water tanks, and shelter kits when disasters strike.'
    },
    {
      icon: <Sparkles size={24} />,
      title: 'Digital Storytelling & Media',
      desc: 'Capture photography, film testimonials, manage social outreach, and design advocacy campaigns.'
    }
  ];

  return (
    <div>
      {/* Page Hero */}
      <div className="page-hero">
        <div className="container">
          <span className="section-tag" style={{ backgroundColor: 'rgba(52, 211, 153, 0.2)', color: '#6ee7b7' }}>
            Serve Humanity
          </span>
          <h1 className="page-hero-title">Become a HopeHaven Volunteer</h1>
          <p className="page-hero-subtitle">
            Join over 2,400 active changemakers across 18 regional centers. Bring your energy, compassion, and skills to uplift lives in need.
          </p>
        </div>
      </div>

      <section className="section-py">
        <div className="container">
          {/* Top Benefits Grid */}
          <div className="section-header">
            <span className="section-tag">Ways to Serve</span>
            <h2 className="section-title">Where Your Talents Make an Impact</h2>
            <p className="section-subtitle">
              We match your schedule, skills, and interests to meaningful grassroots projects where you can create immediate, tangible change.
            </p>
          </div>

          <div className="grid-4" style={{ marginBottom: '5rem' }}>
            {volunteerBenefits.map((item, idx) => (
              <div key={idx} className="card" style={{ padding: '2rem 1.5rem', textAlign: 'center' }}>
                <div style={{
                  width: '3.5rem',
                  height: '3.5rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--primary-50)',
                  color: 'var(--primary-600)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.25rem auto'
                }}>
                  {item.icon}
                </div>
                <h3 style={{ fontSize: '1.15rem', marginBottom: '0.65rem' }}>{item.title}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--slate-600)', lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Form & Sidebar Grid */}
          <div className="grid-2" style={{ gap: '3.5rem', alignItems: 'flex-start' }}>
            {/* Volunteer Application Form */}
            <div className="card" style={{ padding: '2.5rem', border: '1px solid var(--slate-200)' }}>
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.75rem', marginBottom: '0.5rem', color: 'var(--slate-900)' }}>
                  Volunteer Application
                </h3>
                <p style={{ color: 'var(--slate-600)', fontSize: '0.9rem' }}>
                  Please fill out the form below. Our volunteer coordination desk will contact you within 48 hours for orientation.
                </p>
              </div>

              {submitted && (
                <div className="alert-success">
                  <CheckCircle2 size={24} style={{ flexShrink: 0, color: 'var(--success-600)' }} />
                  <div>
                    <strong style={{ display: 'block', marginBottom: '0.25rem', fontSize: '1rem' }}>
                      Application Submitted Successfully!
                    </strong>
                    <p style={{ fontSize: '0.875rem', color: '#14532d', margin: 0 }}>
                      Thank you for offering your compassionate service. Our volunteer coordinator will reach out to you at the email or phone number you provided.
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate>
                {/* Full Name */}
                <div className="form-group">
                  <label htmlFor="fullName" className="form-label">
                    Full Name <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    placeholder="e.g. Sabila Memon"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`form-input ${errors.fullName ? 'is-invalid' : ''}`}
                  />
                  {errors.fullName && (
                    <div className="form-error">
                      <AlertCircle size={14} /> {errors.fullName}
                    </div>
                  )}
                </div>

                {/* Email & Phone Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label htmlFor="email" className="form-label">
                      Email Address <span className="required">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder={settings.email}
                      value={formData.email}
                      onChange={handleChange}
                      className={`form-input ${errors.email ? 'is-invalid' : ''}`}
                    />
                    {errors.email && (
                      <div className="form-error">
                        <AlertCircle size={14} /> {errors.email}
                      </div>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone" className="form-label">
                      Phone / WhatsApp <span className="required">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder={settings.phone}
                      value={formData.phone}
                      onChange={handleChange}
                      className={`form-input ${errors.phone ? 'is-invalid' : ''}`}
                    />
                    {errors.phone && (
                      <div className="form-error">
                        <AlertCircle size={14} /> {errors.phone}
                      </div>
                    )}
                  </div>
                </div>

                {/* Area of Interest */}
                <div className="form-group">
                  <label htmlFor="areaOfInterest" className="form-label">
                    Area of Interest <span className="required">*</span>
                  </label>
                  <select
                    id="areaOfInterest"
                    name="areaOfInterest"
                    value={formData.areaOfInterest}
                    onChange={handleChange}
                    className={`form-select ${errors.areaOfInterest ? 'is-invalid' : ''}`}
                  >
                    <option value="">Select your preferred focus area...</option>
                    <option value="Healthcare & Medical Camps">Healthcare & Medical Camps</option>
                    <option value="Child Teaching & Slum Schools">Child Teaching & Slum Schools</option>
                    <option value="Clean Water Project Support">Clean Water Project Support</option>
                    <option value="Emergency Flood / Food Ration Drives">Emergency Flood / Food Ration Drives</option>
                    <option value="Photography, Video & Media Advocacy">Photography, Video & Media Advocacy</option>
                    <option value="Fundraising & Community Awareness">Fundraising & Community Awareness</option>
                    <option value="General Field Operations">General Field Operations</option>
                  </select>
                  {errors.areaOfInterest && (
                    <div className="form-error">
                      <AlertCircle size={14} /> {errors.areaOfInterest}
                    </div>
                  )}
                </div>

                {/* Availability */}
                <div className="form-group">
                  <label htmlFor="availability" className="form-label">
                    Your Availability
                  </label>
                  <select
                    id="availability"
                    name="availability"
                    value={formData.availability}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="Weekends Only">Weekends Only</option>
                    <option value="Weekdays (Part-time)">Weekdays (Part-time)</option>
                    <option value="Flexible / On-Call for Emergencies">Flexible / On-Call for Emergencies</option>
                    <option value="Full-Time Field Volunteer">Full-Time Field Volunteer</option>
                  </select>
                </div>

                {/* Message */}
                <div className="form-group">
                  <label htmlFor="message" className="form-label">
                    Skills, Background or Motivation <span className="required">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    placeholder="Tell us about your background, relevant qualifications, and why you want to volunteer with HopeHaven..."
                    value={formData.message}
                    onChange={handleChange}
                    className={`form-textarea ${errors.message ? 'is-invalid' : ''}`}
                  />
                  {errors.message && (
                    <div className="form-error">
                      <AlertCircle size={14} /> {errors.message}
                    </div>
                  )}
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={isSubmitting}
                  style={{ width: '100%' }}
                  icon={<Send size={18} />}
                >
                  {isSubmitting ? 'Submitting Application...' : 'Submit Volunteer Application'}
                </Button>
              </form>
            </div>

            {/* Volunteer Perks & Direct Contact */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div className="card" style={{ padding: '2rem', backgroundColor: 'var(--slate-50)' }}>
                <h4 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--slate-900)' }}>
                  What You Receive As a Volunteer
                </h4>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <CheckCircle2 size={18} style={{ color: 'var(--primary-600)', flexShrink: 0, marginTop: '0.2rem' }} />
                    <span style={{ fontSize: '0.9rem', color: 'var(--slate-700)' }}>
                      <strong>Official Volunteer Certificate:</strong> Recognized verification of humanitarian service hours for your university or resume.
                    </span>
                  </li>
                  <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <CheckCircle2 size={18} style={{ color: 'var(--primary-600)', flexShrink: 0, marginTop: '0.2rem' }} />
                    <span style={{ fontSize: '0.9rem', color: 'var(--slate-700)' }}>
                      <strong>Field Safety & Training:</strong> First-aid, community engagement etiquette, and emergency management briefings before field missions.
                    </span>
                  </li>
                  <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <CheckCircle2 size={18} style={{ color: 'var(--primary-600)', flexShrink: 0, marginTop: '0.2rem' }} />
                    <span style={{ fontSize: '0.9rem', color: 'var(--slate-700)' }}>
                      <strong>Direct Human Connection:</strong> The priceless feeling of directly saving lives, mentoring eager young students, and serving alongside like-minded humanitarians.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Direct helpline card */}
              <div style={{
                background: 'linear-gradient(135deg, var(--teal-900) 0%, var(--primary-800) 100%)',
                borderRadius: 'var(--radius-lg)',
                padding: '2rem',
                color: 'var(--white)'
              }}>
                <h4 style={{ color: '#ffffff', fontSize: '1.2rem', marginBottom: '0.75rem' }}>
                  Need Immediate Help With Application?
                </h4>
                <p style={{ color: 'var(--slate-200)', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  Feel free to reach out directly to our volunteer coordination team via phone or email:
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <a
                    href={`tel:${settings.phone}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.6rem',
                      color: '#fbbf24',
                      fontWeight: 700,
                      fontSize: '1.1rem'
                    }}
                  >
                    <Phone size={18} /> {settings.phone}
                  </a>
                  <a
                    href={`mailto:${settings.email}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.6rem',
                      color: '#6ee7b7',
                      fontSize: '0.95rem',
                      wordBreak: 'break-all'
                    }}
                  >
                    <Mail size={18} /> {settings.email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactSection />
    </div>
  );
}
