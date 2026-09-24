import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Lock, Mail, Eye, EyeOff, ShieldCheck, ArrowLeft, AlertCircle, CheckCircle2, KeyRound } from 'lucide-react';
import Button from '../../components/Button';

export default function AdminLogin() {
  const { login, expectedEmail } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('sabilamemon7@gmail.com');
  const [password, setPassword] = useState(
    import.meta.env.VITE_ADMIN_PASSWORD || 'SabilaAdmin@2026#NGO'
  );
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const from = location.state?.from?.pathname || '/admin';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Please provide both admin email and password.');
      return;
    }

    setIsLoading(true);

    try {
      const result = await login(email, password);

      if (result.success) {
        navigate(from, { replace: true });
      } else {
        setError(result.error || 'Authentication failed. Please verify your credentials.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleFillCredentials = () => {
    setEmail('sabilamemon7@gmail.com');
    // Pre-fill the configured default password from env
    setPassword(import.meta.env.VITE_ADMIN_PASSWORD || 'SabilaAdmin@2026#NGO');
    setError('');
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'var(--slate-950)',
      background: 'radial-gradient(circle at 50% 20%, #064e3b 0%, #0f172a 65%, #020617 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 1.25rem',
      position: 'relative'
    }}>
      {/* Return to Public Website */}
      <Link
        to="/"
        style={{
          position: 'absolute',
          top: '1.5rem',
          left: '1.5rem',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          color: 'var(--slate-300)',
          fontSize: '0.9rem',
          fontWeight: 500,
          transition: 'color var(--transition-fast)'
        }}
      >
        <ArrowLeft size={16} /> Back to Website
      </Link>

      <div style={{ width: '100%', maxWidth: '460px' }}>
        {/* Main Card */}
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.98)',
          borderRadius: 'var(--radius-xl)',
          padding: '2.5rem',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          {/* Logo / Header */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{
              width: '4rem',
              height: '4rem',
              borderRadius: 'var(--radius-lg)',
              background: 'linear-gradient(135deg, var(--primary-600) 0%, var(--teal-700) 100%)',
              color: 'var(--white)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem auto',
              boxShadow: 'var(--shadow-glow)'
            }}>
              <ShieldCheck size={28} />
            </div>
            <h1 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--slate-900)', marginBottom: '0.35rem' }}>
              NGO Admin Portal
            </h1>
            <p style={{ color: 'var(--slate-500)', fontSize: '0.9rem' }}>
              HopeHaven Welfare Foundation Staff Access
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div style={{
              backgroundColor: 'var(--danger-50)',
              border: '1px solid #fecaca',
              color: 'var(--danger-600)',
              padding: '0.85rem 1rem',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.875rem',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.5rem',
              marginBottom: '1.5rem'
            }}>
              <AlertCircle size={18} style={{ flexShrink: 0, marginTop: '0.1rem' }} />
              <div>{error}</div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate autoComplete="off">
            {/* Admin Email */}
            <div className="form-group">
              <label htmlFor="adminEmail" className="form-label">
                Admin Email Address
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--slate-400)' }} />
                <input
                  type="email"
                  id="adminEmail"
                  autoComplete="off"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="sabilamemon7@gmail.com"
                  required
                  className="form-input"
                  style={{ paddingLeft: '2.5rem' }}
                />
              </div>
            </div>

            {/* Admin Password */}
            <div className="form-group">
              <label htmlFor="adminPassword" className="form-label">
                Admin Secure Password
              </label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--slate-400)' }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="adminPassword"
                  autoComplete="off"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your admin password"
                  required
                  className="form-input"
                  style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: 'var(--slate-400)',
                    cursor: 'pointer',
                    padding: '4px'
                  }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Login CTA */}
            <div style={{ marginTop: '1.75rem' }}>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={isLoading}
                style={{ width: '100%' }}
                icon={<KeyRound size={18} />}
              >
                {isLoading ? 'Authenticating...' : 'Sign In to Dashboard'}
              </Button>
            </div>
          </form>

          {/* Quick Helper Badge */}
          <div style={{
            marginTop: '2rem',
            padding: '1rem',
            backgroundColor: 'var(--slate-50)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--slate-200)',
            fontSize: '0.825rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
              <span style={{ fontWeight: 700, color: 'var(--slate-700)' }}>
                Demo Credentials:
              </span>
              <button
                type="button"
                onClick={handleFillCredentials}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--primary-700)',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  textDecoration: 'underline'
                }}
              >
                Auto-fill
              </button>
            </div>
            <div style={{ color: 'var(--slate-600)', lineHeight: 1.5 }}>
              Email: <code>{expectedEmail}</code><br />
              Password: <em>(Loaded securely via <code>.env</code> file)</em>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
