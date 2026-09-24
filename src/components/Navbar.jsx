import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Heart, Menu, X, HandHeart, Lock } from 'lucide-react';
import Button from './Button';
import LanguageSelector from './LanguageSelector';
import { useSiteData } from '../context/SiteDataContext';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { settings } = useSiteData();
  const { isAuthenticated } = useAuth();

  // Close mobile menu whenever route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Programs', path: '/programs' },
    { name: 'Projects', path: '/projects' },
    { name: 'Get Involved', path: '/get-involved' },
    { name: 'Volunteer', path: '/volunteer' },
    { name: 'Donate', path: '/donate' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <>
      {/* Main Sticky Navbar */}
      <header className="navbar">
        <div className="container navbar-container">
          {/* Logo / Brand */}
          <Link to="/" className="navbar-brand">
            <div className="brand-icon">
              <Heart size={20} fill="#ffffff" />
            </div>
            <div>
              <span style={{ display: 'block', lineHeight: 1.1 }}>HopeHaven</span>
              <span style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--primary-600)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                Welfare Foundation
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="navbar-links" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                end={link.path === '/'}
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Right Action CTA */}
          <div className="navbar-actions">
            <LanguageSelector />
            <Link
              to={isAuthenticated ? '/admin' : '/admin/login'}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                color: 'var(--slate-500)',
                fontSize: '0.825rem',
                fontWeight: 600,
                padding: '0.4rem 0.6rem',
                borderRadius: 'var(--radius-sm)',
                textDecoration: 'none'
              }}
              title="Staff / Admin Portal"
            >
              <Lock size={13} />
              <span>{isAuthenticated ? 'Admin' : 'Staff'}</span>
            </Link>

            <div className="desktop-donate-btn">
              <Button to="/donate" variant="primary" size="sm" icon={<HandHeart size={16} />}>
                Donate Now
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="mobile-menu-btn"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isOpen && (
          <div className="mobile-nav-drawer">
            <nav aria-label="Mobile Navigation">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                  end={link.path === '/'}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </NavLink>
              ))}
              <NavLink
                to={isAuthenticated ? '/admin' : '/admin/login'}
                className="nav-link"
                style={{ color: 'var(--accent-600)', fontWeight: 600 }}
                onClick={() => setIsOpen(false)}
              >
                🔒 {isAuthenticated ? 'Admin Dashboard' : 'Staff Admin Login'}
              </NavLink>
            </nav>
            <div className="mobile-actions">
              <Button to="/donate" variant="primary" size="md" onClick={() => setIsOpen(false)} icon={<HandHeart size={16} />}>
                Donate Now
              </Button>
              <Button to="/volunteer" variant="outline" size="md" onClick={() => setIsOpen(false)}>
                Join as Volunteer
              </Button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
