import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import Button from '../components/Button';
import { useSiteData } from '../context/SiteDataContext';

export default function Contact() {
  const { settings, addContactMessage } = useSiteData();
  const emailSubject = 'Website inquiry for HopeHaven Foundation';
  const emailHref = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(settings.email)}&su=${encodeURIComponent(emailSubject)}`;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // FAQ accordion state
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = 'Please enter your full name.';
    } else if (formData.name.trim().length < 3) {
      errs.name = 'Name must be at least 3 characters.';
    }

    if (!formData.email.trim()) {
      errs.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address.';
    }

    if (!formData.phone.trim()) {
      errs.phone = 'Please enter your contact phone number.';
    } else if (!/^[0-9+\s-]{8,15}$/.test(formData.phone.trim())) {
      errs.phone = 'Please enter a valid phone number (e.g. 03233747970).';
    }

    if (!formData.message.trim()) {
      errs.message = 'Please enter your message or question.';
    } else if (formData.message.trim().length < 10) {
      errs.message = 'Message must be at least 10 characters long.';
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
      // Dispatch message to SiteDataContext for Admin review!
      addContactMessage(formData);

      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      setErrors({});
    }, 500);
  };

  const faqs = [
    {
      q: 'How can I verify that my donation has been deployed to the cause?',
      a: 'We publish verified quarterly impact dossiers with photo-documentation, GPS coordinates of solar wells, and financial ledger receipts. Registered donors receive personal project milestone updates.'
    },
    {
      q: 'Can I donate via bank transfer, cheque, or in person?',
      a: `Yes! Please call our helpline at ${settings.phone} or email ${settings.email} to request our official non-profit IBAN and banking details for direct wire transfers.`
    },
    {
      q: 'Is HopeHaven eligible for Zakat donations?',
      a: 'Yes. We maintain a strict, 100% Shariah-compliant Zakat distribution policy where funds are allocated solely to eligible impoverished families, orphans, and disaster-affected victims without administrative deductions.'
    },
    {
      q: 'How do I volunteer for upcoming medical camps or flood drives?',
      a: `Visit our Volunteer page or call our coordinator directly at ${settings.phone}. We conduct weekend orientation sessions for new medical and general volunteers.`
    }
  ];

  return (
    <div>
      {/* Page Hero */}
      <div className="page-hero">
        <div className="container">
          <span className="section-tag" style={{ backgroundColor: 'rgba(52, 211, 153, 0.2)', color: '#6ee7b7' }}>
            We are Here to Help
          </span>
          <h1 className="page-hero-title">Contact HopeHaven Foundation</h1>
          <p className="page-hero-subtitle">
            Have a question, proposal, or need immediate assistance? Reach out directly to our team through phone, email, or our online inquiry form.
          </p>
        </div>
      </div>

      <section className="section-py">
        <div className="container">
          {/* Top Quick Action Callout Cards */}
          <div className="grid-3" style={{ marginBottom: '4rem' }}>
            {/* Direct Phone Card */}
            <div className="card" style={{ padding: '2rem', textAlign: 'center', borderTop: '4px solid var(--primary-600)' }}>
              <div style={{
                width: '3.5rem',
                height: '3.5rem',
                borderRadius: '50%',
                backgroundColor: 'var(--primary-50)',
                color: 'var(--primary-600)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem auto'
              }}>
                <Phone size={24} />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.4rem', color: 'var(--slate-900)' }}>
                Direct Phone Helpline
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--slate-600)', marginBottom: '0.75rem' }}>
                Mon to Sat, 9:00 AM – 6:00 PM PKT
              </p>
              <a
                href={`tel:${settings.phone}`}
                style={{
                  display: 'block',
                  fontSize: '1.3rem',
                  fontWeight: 800,
                  color: 'var(--primary-700)',
                  marginBottom: '1.25rem'
                }}
              >
                {settings.phone}
              </a>
              <Button href={`tel:${settings.phone}`} variant="primary" size="sm" icon={<Phone size={14} />}>
                Call Us Now
              </Button>
            </div>

            {/* Direct Email Card */}
            <div className="card" style={{ padding: '2rem', textAlign: 'center', borderTop: '4px solid var(--accent-500)' }}>
              <div style={{
                width: '3.5rem',
                height: '3.5rem',
                borderRadius: '50%',
                backgroundColor: 'var(--accent-50)',
                color: 'var(--accent-600)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem auto'
              }}>
                <Mail size={24} />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.4rem', color: 'var(--slate-900)' }}>
                Official Email
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--slate-600)', marginBottom: '0.75rem' }}>
                Inquiries answered within 24 hours
              </p>
              <a
                href={emailHref}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'block',
                  fontSize: '1.05rem',
                  fontWeight: 700,
                  color: 'var(--slate-800)',
                  wordBreak: 'break-all',
                  marginBottom: '1.25rem'
                }}
              >
                {settings.email}
              </a>
              <Button href={emailHref} variant="secondary" size="sm" icon={<Mail size={14} />}>
                Email Us Now
              </Button>
            </div>

            {/* Office Location Card */}
            <div className="card" style={{ padding: '2rem', textAlign: 'center', borderTop: '4px solid var(--teal-700)' }}>
              <div style={{
                width: '3.5rem',
                height: '3.5rem',
                borderRadius: '50%',
                backgroundColor: '#e0f2fe',
                color: '#0369a1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem auto'
              }}>
                <MapPin size={24} />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.4rem', color: 'var(--slate-900)' }}>
                Headquarters
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--slate-600)', marginBottom: '0.75rem' }}>
                Visits by prior appointment
              </p>
              <address style={{ fontStyle: 'normal', fontSize: '0.95rem', fontWeight: 600, color: 'var(--slate-800)', marginBottom: '1.25rem' }}>
                {settings.address}
              </address>
              <Button to="/donate" variant="outline" size="sm">
                Support Our Center
              </Button>
            </div>
          </div>

          {/* Form & Operational Details Grid */}
          <div className="grid-2" style={{ gap: '3.5rem', alignItems: 'flex-start' }}>
            {/* Contact Form */}
            <div className="card" style={{ padding: '2.5rem', border: '1px solid var(--slate-200)' }}>
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.75rem', marginBottom: '0.5rem', color: 'var(--slate-900)' }}>
                  Send an Online Message
                </h3>
                <p style={{ color: 'var(--slate-600)', fontSize: '0.9rem' }}>
                  Have an inquiry or request? Leave your contact details below and our team will get back to you promptly.
                </p>
              </div>

              {submitted && (
                <div className="alert-success">
                  <CheckCircle2 size={24} style={{ flexShrink: 0, color: 'var(--success-600)' }} />
                  <div>
                    <strong style={{ display: 'block', marginBottom: '0.25rem', fontSize: '1rem' }}>
                      Message Sent Successfully!
                    </strong>
                    <p style={{ fontSize: '0.875rem', color: '#14532d', margin: 0 }}>
                      Thank you for contacting HopeHaven Foundation. We have received your inquiry and will respond shortly to your email or phone number.
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate>
                {/* Full Name */}
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    Full Name <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="e.g. Sabila Memon"
                    value={formData.name}
                    onChange={handleChange}
                    className={`form-input ${errors.name ? 'is-invalid' : ''}`}
                  />
                  {errors.name && (
                    <div className="form-error">
                      <AlertCircle size={14} /> {errors.name}
                    </div>
                  )}
                </div>

                {/* Email & Phone */}
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
                      Phone Number <span className="required">*</span>
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

                {/* Subject */}
                <div className="form-group">
                  <label htmlFor="subject" className="form-label">
                    Subject / Topic
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    placeholder="e.g. Water Well Project Sponsorship or General Inquiry"
                    value={formData.subject}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>

                {/* Message */}
                <div className="form-group">
                  <label htmlFor="message" className="form-label">
                    Your Message <span className="required">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    placeholder="Write your message here..."
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
                  {isSubmitting ? 'Sending Message...' : 'Send Message'}
                </Button>
              </form>
            </div>

            {/* Right Column: Office Hours & FAQ Accordion */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {/* Working Hours Card */}
              <div className="card" style={{ padding: '2rem', backgroundColor: 'var(--slate-50)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
                  <Clock size={22} style={{ color: 'var(--primary-600)' }} />
                  <h4 style={{ fontSize: '1.2rem', color: 'var(--slate-900)', margin: 0 }}>
                    Operational Hours
                  </h4>
                </div>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
                  <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--slate-200)', paddingBottom: '0.5rem' }}>
                    <span style={{ color: 'var(--slate-600)' }}>Monday – Friday:</span>
                    <strong>9:00 AM – 6:00 PM PKT</strong>
                  </li>
                  <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--slate-200)', paddingBottom: '0.5rem' }}>
                    <span style={{ color: 'var(--slate-600)' }}>Saturday:</span>
                    <strong>10:00 AM – 3:00 PM PKT</strong>
                  </li>
                  <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--slate-200)', paddingBottom: '0.5rem' }}>
                    <span style={{ color: 'var(--slate-600)' }}>Sunday:</span>
                    <span style={{ color: 'var(--slate-500)' }}>Emergency Field Response Only</span>
                  </li>
                </ul>
              </div>

              {/* FAQ Section */}
              <div className="card" style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
                  <HelpCircle size={22} style={{ color: 'var(--primary-600)' }} />
                  <h4 style={{ fontSize: '1.2rem', color: 'var(--slate-900)', margin: 0 }}>
                    Frequently Asked Questions
                  </h4>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {faqs.map((faq, idx) => (
                    <div
                      key={idx}
                      style={{
                        border: '1px solid var(--slate-200)',
                        borderRadius: 'var(--radius-md)',
                        overflow: 'hidden'
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => toggleFaq(idx)}
                        style={{
                          width: '100%',
                          textAlign: 'left',
                          padding: '0.9rem 1rem',
                          background: 'none',
                          border: 'none',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          cursor: 'pointer',
                          fontWeight: 600,
                          fontSize: '0.9rem',
                          color: 'var(--slate-800)'
                        }}
                      >
                        <span>{faq.q}</span>
                        {openFaq === idx ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                      {openFaq === idx && (
                        <div style={{ padding: '0 1rem 1rem 1rem', fontSize: '0.85rem', color: 'var(--slate-600)', lineHeight: 1.6 }}>
                          {faq.a}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
