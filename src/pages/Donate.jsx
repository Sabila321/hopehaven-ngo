import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Heart,
  CheckCircle2,
  Lock,
  Phone,
  Mail,
  AlertCircle,
  X,
  DollarSign,
  Info
} from 'lucide-react';
import Button from '../components/Button';
import { useSiteData } from '../context/SiteDataContext';

export default function Donate() {
  const { programs, settings } = useSiteData();
  const [searchParams] = useSearchParams();
  const initialCause = searchParams.get('cause') || 'where-most-needed';

  const [frequency, setFrequency] = useState('one-time');
  const [selectedAmount, setSelectedAmount] = useState(100);
  const [customAmount, setCustomAmount] = useState('');
  const [selectedCause, setSelectedCause] = useState(initialCause);
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [dedication, setDedication] = useState('');

  const [errors, setErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [receiptData, setReceiptData] = useState(null);

  const presetAmounts = [25, 50, 100, 250, 500];

  const handleAmountSelect = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount('');
    if (errors.amount) {
      setErrors((prev) => ({ ...prev, amount: '' }));
    }
  };

  const handleCustomAmountChange = (e) => {
    const val = e.target.value;
    setCustomAmount(val);
    if (val && !isNaN(val) && Number(val) > 0) {
      setSelectedAmount(Number(val));
    } else {
      setSelectedAmount(null);
    }
    if (errors.amount) {
      setErrors((prev) => ({ ...prev, amount: '' }));
    }
  };

  const validate = () => {
    const errs = {};
    const effectiveAmount = customAmount ? Number(customAmount) : selectedAmount;

    if (!effectiveAmount || effectiveAmount <= 0) {
      errs.amount = 'Please select or enter a valid donation amount.';
    }

    if (!isAnonymous && !donorName.trim()) {
      errs.donorName = 'Please enter your name or check "Donate Anonymously".';
    }

    if (!donorEmail.trim()) {
      errs.donorEmail = 'Please provide an email for the tax receipt.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(donorEmail.trim())) {
      errs.donorEmail = 'Please enter a valid email address.';
    }

    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const effectiveAmount = customAmount ? Number(customAmount) : selectedAmount;
    const causeObj = programs.find((p) => p.id === selectedCause);
    const causeLabel = causeObj ? causeObj.title : 'Where Most Needed (General Fund)';

    setReceiptData({
      amount: effectiveAmount,
      frequency,
      cause: causeLabel,
      donorName: isAnonymous ? 'Anonymous Philanthropist' : donorName,
      donorEmail,
      donorPhone: donorPhone || 'Not provided',
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      receiptId: `HH-${Math.floor(100000 + Math.random() * 900000)}`
    });

    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setDonorName('');
    setDonorEmail('');
    setDonorPhone('');
    setCustomAmount('');
    setSelectedAmount(100);
    setErrors({});
  };

  return (
    <div>
      {/* Page Hero */}
      <div className="page-hero">
        <div className="container">
          <span className="section-tag" style={{ backgroundColor: 'rgba(52, 211, 153, 0.2)', color: '#6ee7b7' }}>
            Give Hope Today
          </span>
          <h1 className="page-hero-title">Support HopeHaven Foundation</h1>
          <p className="page-hero-subtitle">
            Your generous contribution funds vital drinking water, healthcare, orphan education, and emergency flood aid with 100% field transparency.
          </p>
        </div>
      </div>

      <section className="section-py">
        <div className="container">
          {/* Static / Demo Disclaimer Banner */}
          <div className="alert-info" style={{ marginBottom: '2.5rem' }}>
            <Info size={20} style={{ flexShrink: 0 }} />
            <div>
              <strong>Static Demo Notice:</strong> Real financial payment gateway integration is currently simulated. No real credit card or bank charges will occur. You can safely test the donation amount flow and receipt generator.
            </div>
          </div>

          <div className="grid-2" style={{ gap: '3.5rem', alignItems: 'flex-start' }}>
            {/* Donation Form Card */}
            <div className="card" style={{ padding: '2.5rem', border: '1px solid var(--slate-200)' }}>
              <form onSubmit={handleSubmit} noValidate>
                {/* 1. Frequency Toggle */}
                <div style={{ marginBottom: '2rem' }}>
                  <label className="form-label" style={{ marginBottom: '0.65rem', display: 'block' }}>
                    Donation Frequency
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <button
                      type="button"
                      onClick={() => setFrequency('one-time')}
                      className={`btn btn-md ${frequency === 'one-time' ? 'btn-primary' : 'btn-outline'}`}
                      style={{ width: '100%', borderRadius: 'var(--radius-md)' }}
                    >
                      One-Time Gift
                    </button>
                    <button
                      type="button"
                      onClick={() => setFrequency('monthly')}
                      className={`btn btn-md ${frequency === 'monthly' ? 'btn-primary' : 'btn-outline'}`}
                      style={{ width: '100%', borderRadius: 'var(--radius-md)' }}
                    >
                      Monthly Sustainer
                    </button>
                  </div>
                </div>

                {/* 2. Amount Options */}
                <div style={{ marginBottom: '2rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
                    <label className="form-label">
                      Select Amount (USD) <span className="required">*</span>
                    </label>
                    {frequency === 'monthly' && (
                      <span style={{ fontSize: '0.75rem', color: 'var(--primary-700)', fontWeight: 600 }}>
                        Billed every month
                      </span>
                    )}
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.5rem', marginBottom: '0.75rem' }}>
                    {presetAmounts.map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => handleAmountSelect(amt)}
                        className={`btn btn-md ${selectedAmount === amt && !customAmount ? 'btn-primary' : 'btn-outline'}`}
                        style={{ padding: '0.75rem 0.25rem', fontWeight: 700 }}
                      >
                        ${amt}
                      </button>
                    ))}
                  </div>

                  {/* Custom Amount */}
                  <div style={{ position: 'relative' }}>
                    <DollarSign size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--slate-500)' }} />
                    <input
                      type="number"
                      min="1"
                      placeholder="Or enter custom amount in USD"
                      value={customAmount}
                      onChange={handleCustomAmountChange}
                      className={`form-input ${errors.amount ? 'is-invalid' : ''}`}
                      style={{ paddingLeft: '2.5rem' }}
                    />
                  </div>
                  {errors.amount && (
                    <div className="form-error">
                      <AlertCircle size={14} /> {errors.amount}
                    </div>
                  )}
                </div>

                {/* 3. Cause Selection */}
                <div className="form-group">
                  <label htmlFor="selectedCause" className="form-label">
                    Designate Your Donation
                  </label>
                  <select
                    id="selectedCause"
                    value={selectedCause}
                    onChange={(e) => setSelectedCause(e.target.value)}
                    className="form-select"
                  >
                    <option value="where-most-needed">Where Needed Most (General Humanitarian Fund)</option>
                    {programs.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.title} ({p.category})
                      </option>
                    ))}
                  </select>
                </div>

                {/* 4. Donor Information */}
                <div style={{ borderTop: '1px solid var(--slate-200)', paddingTop: '1.5rem', marginTop: '1.5rem' }}>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--slate-900)' }}>
                    Donor Information
                  </h4>

                  <div className="form-group">
                    <label htmlFor="donorName" className="form-label">
                      Full Name {!isAnonymous && <span className="required">*</span>}
                    </label>
                    <input
                      type="text"
                      id="donorName"
                      disabled={isAnonymous}
                      placeholder={isAnonymous ? 'Anonymous Donor' : 'e.g. Sabila Memon'}
                      value={donorName}
                      onChange={(e) => {
                        setDonorName(e.target.value);
                        if (errors.donorName) setErrors((prev) => ({ ...prev, donorName: '' }));
                      }}
                      className={`form-input ${errors.donorName ? 'is-invalid' : ''}`}
                    />
                    {errors.donorName && (
                      <div className="form-error">
                        <AlertCircle size={14} /> {errors.donorName}
                      </div>
                    )}
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className="form-group">
                      <label htmlFor="donorEmail" className="form-label">
                        Email Address <span className="required">*</span>
                      </label>
                      <input
                        type="email"
                        id="donorEmail"
                        placeholder={settings.email}
                        value={donorEmail}
                        onChange={(e) => {
                          setDonorEmail(e.target.value);
                          if (errors.donorEmail) setErrors((prev) => ({ ...prev, donorEmail: '' }));
                        }}
                        className={`form-input ${errors.donorEmail ? 'is-invalid' : ''}`}
                      />
                      {errors.donorEmail && (
                        <div className="form-error">
                          <AlertCircle size={14} /> {errors.donorEmail}
                        </div>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="donorPhone" className="form-label">
                        Phone Number (Optional)
                      </label>
                      <input
                        type="tel"
                        id="donorPhone"
                        placeholder={settings.phone}
                        value={donorPhone}
                        onChange={(e) => setDonorPhone(e.target.value)}
                        className="form-input"
                      />
                    </div>
                  </div>

                  {/* Anonymous Checkbox */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
                    <input
                      type="checkbox"
                      id="isAnonymous"
                      checked={isAnonymous}
                      onChange={(e) => {
                        setIsAnonymous(e.target.checked);
                        if (e.target.checked && errors.donorName) {
                          setErrors((prev) => ({ ...prev, donorName: '' }));
                        }
                      }}
                      style={{ width: '18px', height: '18px', accentColor: 'var(--primary-600)', cursor: 'pointer' }}
                    />
                    <label htmlFor="isAnonymous" style={{ fontSize: '0.875rem', color: 'var(--slate-700)', cursor: 'pointer' }}>
                      Keep my name anonymous on public supporter lists
                    </label>
                  </div>

                  {/* Dedication / In Memory of */}
                  <div className="form-group">
                    <label htmlFor="dedication" className="form-label">
                      Dedicate this gift in honor or memory of someone (Optional)
                    </label>
                    <input
                      type="text"
                      id="dedication"
                      placeholder="e.g. In memory of our beloved grandparents"
                      value={dedication}
                      onChange={(e) => setDedication(e.target.value)}
                      className="form-input"
                    />
                  </div>
                </div>

                <div style={{ marginTop: '1.75rem' }}>
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    style={{ width: '100%' }}
                    icon={<Heart size={18} fill="#ffffff" />}
                  >
                    Complete Simulated Donation (${customAmount || selectedAmount || 0})
                  </Button>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '1rem', color: 'var(--slate-500)', fontSize: '0.8rem' }}>
                  <Lock size={14} /> 256-Bit SSL Encrypted & Verified Non-Profit Demo
                </div>
              </form>
            </div>

            {/* Donation Impact Breakdown & Offline Contact Info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div className="card" style={{ padding: '2rem' }}>
                <h4 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--slate-900)' }}>
                  What Your Gift Provides
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <div style={{ background: 'var(--primary-100)', color: 'var(--primary-800)', fontWeight: 800, padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-md)', fontSize: '0.95rem' }}>
                      $25
                    </div>
                    <p style={{ fontSize: '0.875rem', color: 'var(--slate-600)', margin: 0 }}>
                      Supplies a complete primary student school bag, notebooks, stationary, and uniform for one academic year.
                    </p>
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <div style={{ background: 'var(--primary-100)', color: 'var(--primary-800)', fontWeight: 800, padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-md)', fontSize: '0.95rem' }}>
                      $50
                    </div>
                    <p style={{ fontSize: '0.875rem', color: 'var(--slate-600)', margin: 0 }}>
                      Provides a comprehensive dry food hamper (flour, rice, lentils, oil, milk) feeding a family of six for one month.
                    </p>
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <div style={{ background: 'var(--primary-100)', color: 'var(--primary-800)', fontWeight: 800, padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-md)', fontSize: '0.95rem' }}>
                      $100
                    </div>
                    <p style={{ fontSize: '0.875rem', color: 'var(--slate-600)', margin: 0 }}>
                      Funds a life-restoring cataract surgery with intraocular lens replacement, restoring sight to an elderly villager.
                    </p>
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <div style={{ background: 'var(--primary-100)', color: 'var(--primary-800)', fontWeight: 800, padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-md)', fontSize: '0.95rem' }}>
                      $500
                    </div>
                    <p style={{ fontSize: '0.875rem', color: 'var(--slate-600)', margin: 0 }}>
                      Contributes directly towards drilling a deep community water borewell that provides safe drinking water for 300+ people.
                    </p>
                  </div>
                </div>
              </div>

              {/* Direct Helpline Card */}
              <div style={{
                backgroundColor: 'var(--slate-900)',
                color: 'var(--white)',
                borderRadius: 'var(--radius-xl)',
                padding: '2.5rem',
                border: '1px solid var(--slate-800)'
              }}>
                <span className="badge badge-amber" style={{ marginBottom: '0.75rem' }}>
                  Direct Bank & Zakat Transfers
                </span>
                <h4 style={{ color: '#ffffff', fontSize: '1.3rem', marginBottom: '0.75rem' }}>
                  Prefer Direct Bank Wire or Cheque?
                </h4>
                <p style={{ color: 'var(--slate-300)', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  For official bank account details, wire instructions, or Zakat calculation verification, contact our treasury coordinator directly:
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Phone size={18} style={{ color: 'var(--accent-400)' }} />
                    <div>
                      <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--slate-400)' }}>Direct Helpline:</span>
                      <a href={`tel:${settings.phone}`} style={{ color: '#ffffff', fontWeight: 700, fontSize: '1.05rem' }}>
                        {settings.phone}
                      </a>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Mail size={18} style={{ color: 'var(--primary-400)' }} />
                    <div>
                      <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--slate-400)' }}>Treasury Email:</span>
                      <a href={`mailto:${settings.email}`} style={{ color: '#ffffff', fontWeight: 600, fontSize: '0.95rem' }}>
                        {settings.email}
                      </a>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <Button href={`tel:${settings.phone}`} variant="secondary" size="sm" icon={<Phone size={14} />}>
                    Call Us
                  </Button>
                  <Button href={`mailto:${settings.email}`} variant="outline-white" size="sm" icon={<Mail size={14} />}>
                    Email Us
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Simulated Donation Receipt Modal */}
      {isModalOpen && receiptData && (
        <div className="modal-backdrop" onClick={handleCloseModal}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div style={{
              backgroundColor: 'var(--primary-600)',
              color: 'var(--white)',
              padding: '1.5rem 2rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <CheckCircle2 size={24} />
                <h3 style={{ color: '#ffffff', fontSize: '1.25rem', margin: 0 }}>
                  Thank You for Your Gift!
                </h3>
              </div>
              <button
                onClick={handleCloseModal}
                style={{ background: 'none', border: 'none', color: '#ffffff', cursor: 'pointer' }}
                aria-label="Close receipt"
              >
                <X size={22} />
              </button>
            </div>

            <div style={{ padding: '2rem' }}>
              <p style={{ color: 'var(--slate-600)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                This is a simulated confirmation receipt for your demonstration donation to HopeHaven Foundation.
              </p>

              <div style={{
                backgroundColor: 'var(--slate-50)',
                border: '1px solid var(--slate-200)',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
                marginBottom: '1.5rem',
                fontSize: '0.9rem'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ color: 'var(--slate-500)' }}>Receipt Number:</span>
                  <strong>{receiptData.receiptId}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ color: 'var(--slate-500)' }}>Date:</span>
                  <span>{receiptData.date}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ color: 'var(--slate-500)' }}>Donor:</span>
                  <span>{receiptData.donorName}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ color: 'var(--slate-500)' }}>Designated Cause:</span>
                  <span style={{ textAlign: 'right', maxWidth: '240px' }}>{receiptData.cause}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ color: 'var(--slate-500)' }}>Frequency:</span>
                  <span style={{ textTransform: 'capitalize' }}>{receiptData.frequency}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '0.75rem', borderTop: '1px dashed var(--slate-300)', marginTop: '0.75rem', fontSize: '1.1rem' }}>
                  <strong>Total Simulated Amount:</strong>
                  <strong style={{ color: 'var(--primary-700)' }}>${receiptData.amount.toLocaleString()} USD</strong>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <Button onClick={handleCloseModal} variant="primary" size="md" style={{ width: '100%' }}>
                  Done & Return to Site
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
