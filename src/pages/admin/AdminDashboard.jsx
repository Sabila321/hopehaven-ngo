import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useSiteData } from '../../context/SiteDataContext';
import {
  LayoutDashboard,
  HeartHandshake,
  FolderKanban,
  MessageSquareQuote,
  Inbox,
  Settings,
  LogOut,
  ExternalLink,
  Plus,
  Edit2,
  Trash2,
  Save,
  RotateCcw,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  X,
  Eye,
  Calendar,
  DollarSign,
  Users
} from 'lucide-react';
import Button from '../../components/Button';

export default function AdminDashboard() {
  const { adminUser, logout } = useAuth();
  const {
    programs,
    projects,
    testimonials,
    settings,
    contactMessages,
    volunteerApplications,
    addProgram,
    updateProgram,
    deleteProgram,
    addProject,
    updateProject,
    deleteProject,
    addTestimonial,
    updateTestimonial,
    deleteTestimonial,
    updateSettings,
    deleteContactMessage,
    deleteVolunteerApplication,
    resetToDefaults
  } = useSiteData();

  const navigate = useNavigate();

  // Active tab: 'overview' | 'programs' | 'projects' | 'testimonials' | 'inbox' | 'settings'
  const [activeTab, setActiveTab] = useState('overview');
  const [inboxSubTab, setInboxSubTab] = useState('messages'); // 'messages' | 'volunteers'
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 4000);
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  // --- Modal States ---
  const [isProgramModalOpen, setIsProgramModalOpen] = useState(false);
  const [editingProgram, setEditingProgram] = useState(null);
  const [programForm, setProgramForm] = useState({
    title: '',
    category: 'Clean Water',
    summary: '',
    description: '',
    goal: 50000,
    raised: 10000,
    beneficiaries: '',
    image: '',
    urgency: 'Moderate',
    featured: true
  });

  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [projectForm, setProjectForm] = useState({
    title: '',
    category: 'Clean Water',
    status: 'In Progress',
    location: '',
    year: '2025',
    impact: '',
    description: '',
    image: '',
    featured: true
  });

  const [isTestimonialModalOpen, setIsTestimonialModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [testimonialForm, setTestimonialForm] = useState({
    name: '',
    role: '',
    location: '',
    quote: '',
    avatar: '',
    rating: 5
  });

  // Settings form state
  const [settingsForm, setSettingsForm] = useState({
    phone: settings.phone,
    email: settings.email,
    address: settings.address,
    heroTitle: settings.heroTitle,
    heroSubtitle: settings.heroSubtitle,
    lives: settings.stats?.lives || '150,000+',
    volunteers: settings.stats?.volunteers || '2,400+',
    projectsCount: settings.stats?.projects || '380+',
    communities: settings.stats?.communities || '85+'
  });

  // --- Program Modal Handlers ---
  const openAddProgramModal = () => {
    setEditingProgram(null);
    setProgramForm({
      title: '',
      category: 'Clean Water',
      summary: '',
      description: '',
      goal: 50000,
      raised: 0,
      beneficiaries: '1,000+ People',
      image: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=800&q=80',
      urgency: 'Moderate',
      featured: true
    });
    setIsProgramModalOpen(true);
  };

  const openEditProgramModal = (prog) => {
    setEditingProgram(prog);
    setProgramForm({ ...prog });
    setIsProgramModalOpen(true);
  };

  const handleSaveProgram = (e) => {
    e.preventDefault();
    if (!programForm.title.trim()) return;

    if (editingProgram) {
      updateProgram(editingProgram.id, programForm);
      showToast('Program updated successfully!');
    } else {
      addProgram(programForm);
      showToast('New program added successfully!');
    }
    setIsProgramModalOpen(false);
  };

  const handleDeleteProgram = (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      deleteProgram(id);
      showToast('Program removed.');
    }
  };

  // --- Project Modal Handlers ---
  const openAddProjectModal = () => {
    setEditingProject(null);
    setProjectForm({
      title: '',
      category: 'Clean Water',
      status: 'In Progress',
      location: 'Sindh District',
      year: '2025',
      impact: '10,000 villagers supplied with fresh solar filtered water.',
      description: '',
      image: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=800&q=80',
      featured: true
    });
    setIsProjectModalOpen(true);
  };

  const openEditProjectModal = (proj) => {
    setEditingProject(proj);
    setProjectForm({ ...proj });
    setIsProjectModalOpen(true);
  };

  const handleSaveProject = (e) => {
    e.preventDefault();
    if (!projectForm.title.trim()) return;

    if (editingProject) {
      updateProject(editingProject.id, projectForm);
      showToast('Project updated successfully!');
    } else {
      addProject(projectForm);
      showToast('New project created successfully!');
    }
    setIsProjectModalOpen(false);
  };

  const handleDeleteProject = (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      deleteProject(id);
      showToast('Project removed.');
    }
  };

  // --- Testimonial Modal Handlers ---
  const openAddTestimonialModal = () => {
    setEditingTestimonial(null);
    setTestimonialForm({
      name: '',
      role: 'Community Member',
      location: 'Karachi',
      quote: '',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&h=200&q=80',
      rating: 5
    });
    setIsTestimonialModalOpen(true);
  };

  const openEditTestimonialModal = (t) => {
    setEditingTestimonial(t);
    setTestimonialForm({ ...t });
    setIsTestimonialModalOpen(true);
  };

  const handleSaveTestimonial = (e) => {
    e.preventDefault();
    if (!testimonialForm.name.trim() || !testimonialForm.quote.trim()) return;

    if (editingTestimonial) {
      updateTestimonial(editingTestimonial.id, testimonialForm);
      showToast('Testimonial updated!');
    } else {
      addTestimonial(testimonialForm);
      showToast('New testimonial added!');
    }
    setIsTestimonialModalOpen(false);
  };

  // --- Settings Save Handler ---
  const handleSaveSettings = (e) => {
    e.preventDefault();
    updateSettings({
      phone: settingsForm.phone,
      email: settingsForm.email,
      address: settingsForm.address,
      heroTitle: settingsForm.heroTitle,
      heroSubtitle: settingsForm.heroSubtitle,
      stats: {
        lives: settingsForm.lives,
        volunteers: settingsForm.volunteers,
        projects: settingsForm.projectsCount,
        communities: settingsForm.communities
      }
    });
    showToast('Website settings and contact details updated!');
  };

  const handleResetData = () => {
    if (window.confirm('Reset all website data to initial defaults? Any custom added items will be replaced.')) {
      resetToDefaults();
      setSettingsForm({
        phone: '03233747970',
        email: 'sabilamemon7@gmail.com',
        address: 'Block 4, Clifton, Karachi, Pakistan',
        heroTitle: 'Together We Bring Hope, Dignity & Opportunity',
        heroSubtitle: 'We are a dedicated non-profit organization striving to eliminate poverty, deliver clean drinking water, ensure quality education for every child, and provide rapid relief in times of crisis.',
        lives: '150,000+',
        volunteers: '2,400+',
        projectsCount: '380+',
        communities: '85+'
      });
      showToast('Website data reset to defaults.');
    }
  };

  // Compute total funds raised across all programs
  const totalFundsRaised = programs.reduce((acc, p) => acc + (Number(p.raised) || 0), 0);
  const totalGoals = programs.reduce((acc, p) => acc + (Number(p.goal) || 0), 0);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', backgroundColor: '#f1f5f9' }}>
      {/* Toast Notification */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          backgroundColor: '#064e3b',
          color: '#ffffff',
          padding: '0.9rem 1.4rem',
          borderRadius: 'var(--radius-md)',
          boxShadow: 'var(--shadow-xl)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          zIndex: 200,
          animation: 'fadeIn 0.2s ease'
        }}>
          <CheckCircle2 size={20} color="#34d399" />
          <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>{toastMessage}</span>
        </div>
      )}

      {/* Admin Sidebar */}
      <aside style={{
        width: '260px',
        backgroundColor: '#0f172a',
        color: '#f8fafc',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
        borderRight: '1px solid #1e293b'
      }}>
        {/* Brand */}
        <div style={{ padding: '1.5rem', borderBottom: '1px solid #1e293b' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.35rem' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: 'var(--primary-600)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
              <LayoutDashboard size={16} />
            </div>
            <span style={{ fontWeight: 800, fontSize: '1.1rem', color: '#ffffff' }}>HopeHaven</span>
          </div>
          <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--primary-400)', fontWeight: 600 }}>
            Admin Management Console
          </span>
        </div>

        {/* Current User Info */}
        <div style={{ padding: '1rem 1.5rem', backgroundColor: '#1e293b', borderBottom: '1px solid #334155' }}>
          <span style={{ display: 'block', fontSize: '0.725rem', color: '#94a3b8', textTransform: 'uppercase' }}>
            Logged in as Admin:
          </span>
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#38bdf8', wordBreak: 'break-all' }}>
            {adminUser || 'sabilamemon7@gmail.com'}
          </span>
        </div>

        {/* Nav Tabs */}
        <nav style={{ padding: '1rem 0.75rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
          <button
            onClick={() => setActiveTab('overview')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              width: '100%',
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-md)',
              border: 'none',
              background: activeTab === 'overview' ? 'var(--primary-700)' : 'transparent',
              color: activeTab === 'overview' ? '#ffffff' : '#cbd5e1',
              fontWeight: 600,
              fontSize: '0.9rem',
              cursor: 'pointer',
              textAlign: 'left'
            }}
          >
            <LayoutDashboard size={18} /> Overview
          </button>

          <button
            onClick={() => setActiveTab('programs')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-md)',
              border: 'none',
              background: activeTab === 'programs' ? 'var(--primary-700)' : 'transparent',
              color: activeTab === 'programs' ? '#ffffff' : '#cbd5e1',
              fontWeight: 600,
              fontSize: '0.9rem',
              cursor: 'pointer'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <HeartHandshake size={18} /> Programs & Causes
            </div>
            <span style={{ fontSize: '0.75rem', background: '#334155', padding: '0.15rem 0.45rem', borderRadius: '10px' }}>
              {programs.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-md)',
              border: 'none',
              background: activeTab === 'projects' ? 'var(--primary-700)' : 'transparent',
              color: activeTab === 'projects' ? '#ffffff' : '#cbd5e1',
              fontWeight: 600,
              fontSize: '0.9rem',
              cursor: 'pointer'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <FolderKanban size={18} /> Field Projects
            </div>
            <span style={{ fontSize: '0.75rem', background: '#334155', padding: '0.15rem 0.45rem', borderRadius: '10px' }}>
              {projects.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('testimonials')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-md)',
              border: 'none',
              background: activeTab === 'testimonials' ? 'var(--primary-700)' : 'transparent',
              color: activeTab === 'testimonials' ? '#ffffff' : '#cbd5e1',
              fontWeight: 600,
              fontSize: '0.9rem',
              cursor: 'pointer'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <MessageSquareQuote size={18} /> Testimonials
            </div>
            <span style={{ fontSize: '0.75rem', background: '#334155', padding: '0.15rem 0.45rem', borderRadius: '10px' }}>
              {testimonials.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('inbox')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-md)',
              border: 'none',
              background: activeTab === 'inbox' ? 'var(--primary-700)' : 'transparent',
              color: activeTab === 'inbox' ? '#ffffff' : '#cbd5e1',
              fontWeight: 600,
              fontSize: '0.9rem',
              cursor: 'pointer'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Inbox size={18} /> Inquiries & Inbox
            </div>
            <span style={{ fontSize: '0.75rem', background: '#059669', color: '#fff', padding: '0.15rem 0.45rem', borderRadius: '10px', fontWeight: 700 }}>
              {contactMessages.length + volunteerApplications.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              width: '100%',
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-md)',
              border: 'none',
              background: activeTab === 'settings' ? 'var(--primary-700)' : 'transparent',
              color: activeTab === 'settings' ? '#ffffff' : '#cbd5e1',
              fontWeight: 600,
              fontSize: '0.9rem',
              cursor: 'pointer',
              textAlign: 'left'
            }}
          >
            <Settings size={18} /> Site Settings & Info
          </button>
        </nav>

        {/* Sidebar Footer */}
        <div style={{ padding: '1rem', borderTop: '1px solid #1e293b', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.6rem 0.8rem',
              color: '#94a3b8',
              fontSize: '0.85rem',
              borderRadius: 'var(--radius-sm)'
            }}
          >
            <ExternalLink size={15} /> View Public Website
          </Link>

          <button
            onClick={handleResetData}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.6rem 0.8rem',
              color: '#f87171',
              background: 'none',
              border: 'none',
              fontSize: '0.825rem',
              cursor: 'pointer',
              textAlign: 'left'
            }}
          >
            <RotateCcw size={14} /> Reset Data to Default
          </button>

          <button
            onClick={handleLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.65rem 0.8rem',
              color: '#cbd5e1',
              backgroundColor: '#1e293b',
              border: '1px solid #334155',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
              marginTop: '0.5rem'
            }}
          >
            <LogOut size={15} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, overflowY: 'auto' }}>
        {/* Top Header Bar */}
        <header style={{
          backgroundColor: '#ffffff',
          padding: '1.25rem 2rem',
          borderBottom: '1px solid var(--slate-200)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <h2 style={{ fontSize: '1.4rem', color: 'var(--slate-900)', textTransform: 'capitalize' }}>
              {activeTab === 'overview' && 'Executive Overview'}
              {activeTab === 'programs' && 'Manage Programs & Causes'}
              {activeTab === 'projects' && 'Manage Field Projects'}
              {activeTab === 'testimonials' && 'Manage Testimonials'}
              {activeTab === 'inbox' && 'Form Inquiries & Applications'}
              {activeTab === 'settings' && 'Website Settings & Contact Information'}
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--slate-500)', margin: 0 }}>
              Live content changes reflect immediately on the public website.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Link to="/" className="btn btn-outline btn-sm" target="_blank" rel="noopener noreferrer">
              <ExternalLink size={14} /> Open Site
            </Link>
          </div>
        </header>

        {/* Dashboard Body */}
        <main style={{ padding: '2rem', flex: 1 }}>
          {/* ==================== TAB 1: OVERVIEW ==================== */}
          {activeTab === 'overview' && (
            <div>
              {/* Metric Cards */}
              <div className="grid-4" style={{ marginBottom: '2.5rem' }}>
                <div className="card" style={{ padding: '1.5rem', borderLeft: '4px solid var(--primary-600)' }}>
                  <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--slate-500)', fontWeight: 600 }}>Active Programs</span>
                  <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--slate-900)', marginTop: '0.25rem' }}>{programs.length}</div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--primary-700)' }}>Humanitarian initiatives</span>
                </div>

                <div className="card" style={{ padding: '1.5rem', borderLeft: '4px solid #0284c7' }}>
                  <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--slate-500)', fontWeight: 600 }}>Field Projects</span>
                  <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--slate-900)', marginTop: '0.25rem' }}>{projects.length}</div>
                  <span style={{ fontSize: '0.8rem', color: '#0284c7' }}>Ground interventions</span>
                </div>

                <div className="card" style={{ padding: '1.5rem', borderLeft: '4px solid var(--accent-500)' }}>
                  <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--slate-500)', fontWeight: 600 }}>Total Raised</span>
                  <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--slate-900)', marginTop: '0.25rem' }}>
                    ${totalFundsRaised.toLocaleString()}
                  </div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--slate-500)' }}>of ${totalGoals.toLocaleString()} target</span>
                </div>

                <div className="card" style={{ padding: '1.5rem', borderLeft: '4px solid #8b5cf6' }}>
                  <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--slate-500)', fontWeight: 600 }}>Total Inbox Inquiries</span>
                  <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--slate-900)', marginTop: '0.25rem' }}>
                    {contactMessages.length + volunteerApplications.length}
                  </div>
                  <span style={{ fontSize: '0.8rem', color: '#8b5cf6' }}>Messages & applications</span>
                </div>
              </div>

              {/* Quick Actions & Recent Messages Grid */}
              <div className="grid-2" style={{ gap: '2rem' }}>
                {/* Quick Actions Card */}
                <div className="card" style={{ padding: '1.75rem' }}>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '1.25rem' }}>Quick Actions</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <button
                      onClick={openAddProgramModal}
                      className="btn btn-outline btn-md"
                      style={{ justifyContent: 'flex-start', gap: '0.6rem' }}
                    >
                      <Plus size={16} color="var(--primary-600)" /> Add New Cause
                    </button>
                    <button
                      onClick={openAddProjectModal}
                      className="btn btn-outline btn-md"
                      style={{ justifyContent: 'flex-start', gap: '0.6rem' }}
                    >
                      <Plus size={16} color="#0284c7" /> Add New Project
                    </button>
                    <button
                      onClick={() => setActiveTab('settings')}
                      className="btn btn-outline btn-md"
                      style={{ justifyContent: 'flex-start', gap: '0.6rem' }}
                    >
                      <Settings size={16} color="var(--slate-600)" /> Edit Contact Info
                    </button>
                    <button
                      onClick={() => setActiveTab('inbox')}
                      className="btn btn-outline btn-md"
                      style={{ justifyContent: 'flex-start', gap: '0.6rem' }}
                    >
                      <Inbox size={16} color="#8b5cf6" /> Review Inquiries
                    </button>
                  </div>

                  <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: 'var(--primary-50)', borderRadius: 'var(--radius-md)' }}>
                    <h4 style={{ fontSize: '0.95rem', color: 'var(--primary-900)', marginBottom: '0.35rem' }}>
                      Current Contact Details in Use:
                    </h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--primary-800)', margin: 0 }}>
                      Phone: <strong>{settings.phone}</strong> | Email: <strong>{settings.email}</strong>
                    </p>
                  </div>
                </div>

                {/* Recent Inquiries Preview */}
                <div className="card" style={{ padding: '1.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                    <h3 style={{ fontSize: '1.2rem', margin: 0 }}>Recent Form Submissions</h3>
                    <button
                      onClick={() => setActiveTab('inbox')}
                      className="btn btn-text btn-sm"
                      style={{ fontSize: '0.85rem' }}
                    >
                      View All
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {contactMessages.slice(0, 3).map((msg) => (
                      <div key={msg.id} style={{ padding: '0.85rem', backgroundColor: 'var(--slate-50)', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--primary-600)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.825rem', marginBottom: '0.2rem' }}>
                          <strong>{msg.name}</strong>
                          <span style={{ color: 'var(--slate-400)' }}>{msg.date}</span>
                        </div>
                        <p style={{ fontSize: '0.825rem', color: 'var(--slate-600)', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {msg.message}
                        </p>
                      </div>
                    ))}
                    {contactMessages.length === 0 && (
                      <p style={{ color: 'var(--slate-500)', fontSize: '0.875rem' }}>No recent messages.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB 2: PROGRAMS ==================== */}
          {activeTab === 'programs' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <p style={{ color: 'var(--slate-600)', margin: 0 }}>
                  Manage the humanitarian causes shown on the Homepage, Programs page, and Donation selector.
                </p>
                <Button onClick={openAddProgramModal} variant="primary" size="sm" icon={<Plus size={16} />}>
                  Add New Program
                </Button>
              </div>

              <div style={{ backgroundColor: 'var(--white)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--slate-200)', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead style={{ backgroundColor: 'var(--slate-50)', borderBottom: '1px solid var(--slate-200)', fontSize: '0.825rem', color: 'var(--slate-600)', textTransform: 'uppercase' }}>
                    <tr>
                      <th style={{ padding: '1rem' }}>Cause / Title</th>
                      <th style={{ padding: '1rem' }}>Category</th>
                      <th style={{ padding: '1rem' }}>Goal</th>
                      <th style={{ padding: '1rem' }}>Raised</th>
                      <th style={{ padding: '1rem' }}>Progress</th>
                      <th style={{ padding: '1rem' }}>Urgency</th>
                      <th style={{ padding: '1rem', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody style={{ fontSize: '0.9rem' }}>
                    {programs.map((prog) => {
                      const percent = Math.min(100, Math.round((prog.raised / prog.goal) * 100));
                      return (
                        <tr key={prog.id} style={{ borderBottom: '1px solid var(--slate-100)' }}>
                          <td style={{ padding: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                              <img src={prog.image} alt={prog.title} style={{ width: '45px', height: '45px', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }} />
                              <div>
                                <strong style={{ display: 'block', color: 'var(--slate-900)' }}>{prog.title}</strong>
                                <span style={{ fontSize: '0.775rem', color: 'var(--slate-500)' }}>{prog.beneficiaries}</span>
                              </div>
                            </div>
                          </td>
                          <td style={{ padding: '1rem' }}>
                            <span className="badge badge-primary">{prog.category}</span>
                          </td>
                          <td style={{ padding: '1rem', fontWeight: 600 }}>${Number(prog.goal).toLocaleString()}</td>
                          <td style={{ padding: '1rem', fontWeight: 600, color: 'var(--primary-700)' }}>${Number(prog.raised).toLocaleString()}</td>
                          <td style={{ padding: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                              <div style={{ width: '80px', height: '6px', backgroundColor: 'var(--slate-200)', borderRadius: '3px', overflow: 'hidden' }}>
                                <div style={{ width: `${percent}%`, height: '100%', backgroundColor: 'var(--primary-600)' }} />
                              </div>
                              <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>{percent}%</span>
                            </div>
                          </td>
                          <td style={{ padding: '1rem' }}>
                            <span className={`badge ${prog.urgency === 'Critical' ? 'badge-amber' : 'badge-primary'}`}>
                              {prog.urgency}
                            </span>
                          </td>
                          <td style={{ padding: '1rem', textAlign: 'right' }}>
                            <div style={{ display: 'inline-flex', gap: '0.4rem' }}>
                              <button
                                onClick={() => openEditProgramModal(prog)}
                                className="btn btn-outline btn-sm"
                                style={{ padding: '0.4rem 0.6rem' }}
                                title="Edit Program"
                              >
                                <Edit2 size={14} />
                              </button>
                              <button
                                onClick={() => handleDeleteProgram(prog.id, prog.title)}
                                className="btn btn-outline btn-sm"
                                style={{ padding: '0.4rem 0.6rem', color: 'var(--danger-600)' }}
                                title="Delete Program"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ==================== TAB 3: PROJECTS ==================== */}
          {activeTab === 'projects' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <p style={{ color: 'var(--slate-600)', margin: 0 }}>
                  Manage verified field projects, completion timelines, and verified impact metrics.
                </p>
                <Button onClick={openAddProjectModal} variant="primary" size="sm" icon={<Plus size={16} />}>
                  Add New Project
                </Button>
              </div>

              <div style={{ backgroundColor: 'var(--white)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--slate-200)', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead style={{ backgroundColor: 'var(--slate-50)', borderBottom: '1px solid var(--slate-200)', fontSize: '0.825rem', color: 'var(--slate-600)', textTransform: 'uppercase' }}>
                    <tr>
                      <th style={{ padding: '1rem' }}>Project Title</th>
                      <th style={{ padding: '1rem' }}>Category</th>
                      <th style={{ padding: '1rem' }}>Status</th>
                      <th style={{ padding: '1rem' }}>Location</th>
                      <th style={{ padding: '1rem' }}>Timeline</th>
                      <th style={{ padding: '1rem', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody style={{ fontSize: '0.9rem' }}>
                    {projects.map((proj) => (
                      <tr key={proj.id} style={{ borderBottom: '1px solid var(--slate-100)' }}>
                        <td style={{ padding: '1rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <img src={proj.image} alt={proj.title} style={{ width: '45px', height: '45px', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }} />
                            <div>
                              <strong style={{ display: 'block', color: 'var(--slate-900)' }}>{proj.title}</strong>
                              <span style={{ fontSize: '0.775rem', color: 'var(--slate-500)' }}>{proj.impact}</span>
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: '1rem' }}>
                          <span className="badge badge-primary">{proj.category}</span>
                        </td>
                        <td style={{ padding: '1rem' }}>
                          <span className={`badge ${proj.status === 'Completed' ? 'badge-primary' : 'badge-amber'}`}>
                            {proj.status}
                          </span>
                        </td>
                        <td style={{ padding: '1rem', color: 'var(--slate-600)' }}>{proj.location}</td>
                        <td style={{ padding: '1rem', color: 'var(--slate-600)' }}>{proj.year}</td>
                        <td style={{ padding: '1rem', textAlign: 'right' }}>
                          <div style={{ display: 'inline-flex', gap: '0.4rem' }}>
                            <button
                              onClick={() => openEditProjectModal(proj)}
                              className="btn btn-outline btn-sm"
                              style={{ padding: '0.4rem 0.6rem' }}
                              title="Edit Project"
                            >
                              <Edit2 size={14} />
                            </button>
                            <button
                              onClick={() => handleDeleteProject(proj.id, proj.title)}
                              className="btn btn-outline btn-sm"
                              style={{ padding: '0.4rem 0.6rem', color: 'var(--danger-600)' }}
                              title="Delete Project"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ==================== TAB 4: TESTIMONIALS ==================== */}
          {activeTab === 'testimonials' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <p style={{ color: 'var(--slate-600)', margin: 0 }}>
                  Manage community voices, beneficiary testimonials, and volunteer feedback.
                </p>
                <Button onClick={openAddTestimonialModal} variant="primary" size="sm" icon={<Plus size={16} />}>
                  Add New Testimonial
                </Button>
              </div>

              <div className="grid-2">
                {testimonials.map((t) => (
                  <div key={t.id} className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
                    <p style={{ fontStyle: 'italic', color: 'var(--slate-700)', fontSize: '0.925rem', marginBottom: '1rem', flex: 1 }}>
                      "{t.quote}"
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--slate-100)', paddingTop: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <img src={t.avatar} alt={t.name} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                        <div>
                          <strong style={{ fontSize: '0.95rem', color: 'var(--slate-900)', display: 'block' }}>{t.name}</strong>
                          <span style={{ fontSize: '0.8rem', color: 'var(--slate-500)' }}>{t.role} ({t.location})</span>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '0.35rem' }}>
                        <button
                          onClick={() => openEditTestimonialModal(t)}
                          className="btn btn-outline btn-sm"
                          style={{ padding: '0.35rem 0.5rem' }}
                        >
                          <Edit2 size={13} />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete review by ${t.name}?`)) {
                              deleteTestimonial(t.id);
                              showToast('Testimonial deleted.');
                            }
                          }}
                          className="btn btn-outline btn-sm"
                          style={{ padding: '0.35rem 0.5rem', color: 'var(--danger-600)' }}
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ==================== TAB 5: INBOX ==================== */}
          {activeTab === 'inbox' && (
            <div>
              {/* Sub-tab pills */}
              <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2rem' }}>
                <button
                  onClick={() => setInboxSubTab('messages')}
                  className={`btn btn-md ${inboxSubTab === 'messages' ? 'btn-primary' : 'btn-outline'}`}
                  style={{ borderRadius: 'var(--radius-full)' }}
                >
                  Contact Form Inquiries ({contactMessages.length})
                </button>
                <button
                  onClick={() => setInboxSubTab('volunteers')}
                  className={`btn btn-md ${inboxSubTab === 'volunteers' ? 'btn-primary' : 'btn-outline'}`}
                  style={{ borderRadius: 'var(--radius-full)' }}
                >
                  Volunteer Applications ({volunteerApplications.length})
                </button>
              </div>

              {/* Sub-tab: Messages */}
              {inboxSubTab === 'messages' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {contactMessages.map((msg) => (
                    <div key={msg.id} className="card" style={{ padding: '1.5rem', borderLeft: '4px solid var(--primary-600)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                        <div>
                          <h4 style={{ fontSize: '1.1rem', color: 'var(--slate-900)', marginBottom: '0.2rem' }}>
                            {msg.subject || 'General Inquiry'}
                          </h4>
                          <span style={{ fontSize: '0.85rem', color: 'var(--slate-500)' }}>
                            From: <strong style={{ color: 'var(--slate-800)' }}>{msg.name}</strong> • Email: <a href={`mailto:${msg.email}`} style={{ color: 'var(--primary-700)' }}>{msg.email}</a> • Phone: <a href={`tel:${msg.phone}`} style={{ color: 'var(--primary-700)' }}>{msg.phone}</a>
                          </span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <span style={{ fontSize: '0.8rem', color: 'var(--slate-400)' }}>{msg.date}</span>
                          <button
                            onClick={() => {
                              if (window.confirm('Delete this message?')) {
                                deleteContactMessage(msg.id);
                                showToast('Message deleted.');
                              }
                            }}
                            className="btn btn-outline btn-sm"
                            style={{ padding: '0.35rem 0.5rem', color: 'var(--danger-600)' }}
                            title="Delete Message"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                      <p style={{ backgroundColor: 'var(--slate-50)', padding: '1rem', borderRadius: 'var(--radius-sm)', fontSize: '0.9rem', color: 'var(--slate-700)', margin: 0, lineHeight: 1.6 }}>
                        {msg.message}
                      </p>
                    </div>
                  ))}
                  {contactMessages.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '3rem', backgroundColor: '#ffffff', borderRadius: 'var(--radius-lg)' }}>
                      <Inbox size={36} color="var(--slate-400)" />
                      <p style={{ color: 'var(--slate-500)', marginTop: '0.5rem' }}>No contact inquiries received yet.</p>
                    </div>
                  )}
                </div>
              )}

              {/* Sub-tab: Volunteers */}
              {inboxSubTab === 'volunteers' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {volunteerApplications.map((app) => (
                    <div key={app.id} className="card" style={{ padding: '1.5rem', borderLeft: '4px solid var(--accent-500)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.2rem' }}>
                            <h4 style={{ fontSize: '1.1rem', color: 'var(--slate-900)', margin: 0 }}>{app.fullName}</h4>
                            <span className="badge badge-amber">{app.areaOfInterest}</span>
                          </div>
                          <span style={{ fontSize: '0.85rem', color: 'var(--slate-500)' }}>
                            Email: <a href={`mailto:${app.email}`} style={{ color: 'var(--primary-700)' }}>{app.email}</a> • Phone: <a href={`tel:${app.phone}`} style={{ color: 'var(--primary-700)' }}>{app.phone}</a> • Availability: <strong>{app.availability}</strong>
                          </span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <span style={{ fontSize: '0.8rem', color: 'var(--slate-400)' }}>{app.date}</span>
                          <button
                            onClick={() => {
                              if (window.confirm('Delete this volunteer application?')) {
                                deleteVolunteerApplication(app.id);
                                showToast('Volunteer application deleted.');
                              }
                            }}
                            className="btn btn-outline btn-sm"
                            style={{ padding: '0.35rem 0.5rem', color: 'var(--danger-600)' }}
                            title="Delete Application"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                      <p style={{ backgroundColor: 'var(--slate-50)', padding: '1rem', borderRadius: 'var(--radius-sm)', fontSize: '0.9rem', color: 'var(--slate-700)', margin: 0, lineHeight: 1.6 }}>
                        {app.message}
                      </p>
                    </div>
                  ))}
                  {volunteerApplications.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '3rem', backgroundColor: '#ffffff', borderRadius: 'var(--radius-lg)' }}>
                      <Users size={36} color="var(--slate-400)" />
                      <p style={{ color: 'var(--slate-500)', marginTop: '0.5rem' }}>No volunteer applications received yet.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* ==================== TAB 6: SETTINGS ==================== */}
          {activeTab === 'settings' && (
            <div style={{ maxWidth: '840px' }}>
              <form onSubmit={handleSaveSettings} className="card" style={{ padding: '2.5rem' }}>
                <h3 style={{ fontSize: '1.35rem', marginBottom: '1.5rem', color: 'var(--slate-900)' }}>
                  Organization Contact & Global Settings
                </h3>

                {/* Contact Information */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.5rem' }}>
                  <div className="form-group">
                    <label className="form-label">Official Phone Helpline</label>
                    <input
                      type="text"
                      value={settingsForm.phone}
                      onChange={(e) => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                      className="form-input"
                      placeholder="03233747970"
                      required
                    />
                    <span className="form-hint">Used in Topbar, Footer, and Contact sections</span>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Official NGO Email</label>
                    <input
                      type="email"
                      value={settingsForm.email}
                      onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value })}
                      className="form-input"
                      placeholder="sabilamemon7@gmail.com"
                      required
                    />
                    <span className="form-hint">Official inbox for public and volunteer inquiries</span>
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                  <label className="form-label">Headquarters Physical Address</label>
                  <input
                    type="text"
                    value={settingsForm.address}
                    onChange={(e) => setSettingsForm({ ...settingsForm, address: e.target.value })}
                    className="form-input"
                    placeholder="Block 4, Clifton, Karachi, Pakistan"
                    required
                  />
                </div>

                {/* Hero Headlines */}
                <div style={{ borderTop: '1px solid var(--slate-200)', paddingTop: '1.5rem', marginBottom: '1.5rem' }}>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--slate-900)' }}>
                    Homepage Hero Copy
                  </h4>

                  <div className="form-group">
                    <label className="form-label">Hero Title Headline</label>
                    <input
                      type="text"
                      value={settingsForm.heroTitle}
                      onChange={(e) => setSettingsForm({ ...settingsForm, heroTitle: e.target.value })}
                      className="form-input"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Hero Subtitle Description</label>
                    <textarea
                      rows="3"
                      value={settingsForm.heroSubtitle}
                      onChange={(e) => setSettingsForm({ ...settingsForm, heroSubtitle: e.target.value })}
                      className="form-textarea"
                      required
                    />
                  </div>
                </div>

                {/* Impact Statistics */}
                <div style={{ borderTop: '1px solid var(--slate-200)', paddingTop: '1.5rem', marginBottom: '2rem' }}>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--slate-900)' }}>
                    Impact Metric Counters (Displayed across site)
                  </h4>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
                    <div className="form-group">
                      <label className="form-label">Lives Impacted</label>
                      <input
                        type="text"
                        value={settingsForm.lives}
                        onChange={(e) => setSettingsForm({ ...settingsForm, lives: e.target.value })}
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Volunteers</label>
                      <input
                        type="text"
                        value={settingsForm.volunteers}
                        onChange={(e) => setSettingsForm({ ...settingsForm, volunteers: e.target.value })}
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Projects</label>
                      <input
                        type="text"
                        value={settingsForm.projectsCount}
                        onChange={(e) => setSettingsForm({ ...settingsForm, projectsCount: e.target.value })}
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Communities</label>
                      <input
                        type="text"
                        value={settingsForm.communities}
                        onChange={(e) => setSettingsForm({ ...settingsForm, communities: e.target.value })}
                        className="form-input"
                      />
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <Button type="submit" variant="primary" size="lg" icon={<Save size={18} />}>
                    Save Settings & Publish
                  </Button>
                  <Button type="button" onClick={handleResetData} variant="outline" size="lg" icon={<RotateCcw size={16} />}>
                    Reset All Site Data
                  </Button>
                </div>
              </form>
            </div>
          )}
        </main>
      </div>

      {/* ==================== MODAL: ADD / EDIT PROGRAM ==================== */}
      {isProgramModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsProgramModalOpen(false)}>
          <div
            className="modal-card"
            style={{ maxWidth: '640px', maxHeight: '90vh', overflowY: 'auto' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ padding: '1.25rem 1.75rem', backgroundColor: 'var(--primary-700)', color: '#ffffff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ color: '#ffffff', fontSize: '1.2rem', margin: 0 }}>
                {editingProgram ? 'Edit Cause / Program' : 'Add New Cause / Program'}
              </h3>
              <button onClick={() => setIsProgramModalOpen(false)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveProgram} style={{ padding: '1.75rem' }}>
              <div className="form-group">
                <label className="form-label">Program Title *</label>
                <input
                  type="text"
                  required
                  value={programForm.title}
                  onChange={(e) => setProgramForm({ ...programForm, title: e.target.value })}
                  className="form-input"
                  placeholder="e.g. Solar Drinking Water Borewells"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select
                    value={programForm.category}
                    onChange={(e) => setProgramForm({ ...programForm, category: e.target.value })}
                    className="form-select"
                  >
                    <option value="Clean Water">Clean Water</option>
                    <option value="Education">Education</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Disaster Relief">Disaster Relief</option>
                    <option value="Livelihood">Livelihood</option>
                    <option value="Child Care">Child Care</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Urgency Level</label>
                  <select
                    value={programForm.urgency}
                    onChange={(e) => setProgramForm({ ...programForm, urgency: e.target.value })}
                    className="form-select"
                  >
                    <option value="Critical">Critical</option>
                    <option value="High">High</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Ongoing">Ongoing</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Target Goal (USD) *</label>
                  <input
                    type="number"
                    required
                    min="100"
                    value={programForm.goal}
                    onChange={(e) => setProgramForm({ ...programForm, goal: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Raised So Far (USD) *</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={programForm.raised}
                    onChange={(e) => setProgramForm({ ...programForm, raised: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Beneficiaries Tag</label>
                <input
                  type="text"
                  value={programForm.beneficiaries}
                  onChange={(e) => setProgramForm({ ...programForm, beneficiaries: e.target.value })}
                  className="form-input"
                  placeholder="e.g. 15,000+ Villagers"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Short Summary (Card Excerpt) *</label>
                <textarea
                  rows="2"
                  required
                  value={programForm.summary}
                  onChange={(e) => setProgramForm({ ...programForm, summary: e.target.value })}
                  className="form-textarea"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Image URL</label>
                <input
                  type="url"
                  value={programForm.image}
                  onChange={(e) => setProgramForm({ ...programForm, image: e.target.value })}
                  className="form-input"
                  placeholder="https://images.unsplash.com/..."
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
                <Button type="button" onClick={() => setIsProgramModalOpen(false)} variant="outline" size="md">
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="md">
                  {editingProgram ? 'Update Program' : 'Add Program'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================== MODAL: ADD / EDIT PROJECT ==================== */}
      {isProjectModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsProjectModalOpen(false)}>
          <div className="modal-card" style={{ maxWidth: '640px' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ padding: '1.25rem 1.75rem', backgroundColor: '#0284c7', color: '#ffffff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ color: '#ffffff', fontSize: '1.2rem', margin: 0 }}>
                {editingProject ? 'Edit Field Project' : 'Add New Field Project'}
              </h3>
              <button onClick={() => setIsProjectModalOpen(false)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveProject} style={{ padding: '1.75rem' }}>
              <div className="form-group">
                <label className="form-label">Project Title *</label>
                <input
                  type="text"
                  required
                  value={projectForm.title}
                  onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                  className="form-input"
                  placeholder="e.g. Badin Disaster Reconstruction"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select
                    value={projectForm.category}
                    onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                    className="form-select"
                  >
                    <option value="Clean Water">Clean Water</option>
                    <option value="Education">Education</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Disaster Relief">Disaster Relief</option>
                    <option value="Livelihood">Livelihood</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Status</label>
                  <select
                    value={projectForm.status}
                    onChange={(e) => setProjectForm({ ...projectForm, status: e.target.value })}
                    className="form-select"
                  >
                    <option value="Completed">Completed</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Upcoming">Upcoming</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Year / Timeline</label>
                  <input
                    type="text"
                    value={projectForm.year}
                    onChange={(e) => setProjectForm({ ...projectForm, year: e.target.value })}
                    className="form-input"
                    placeholder="2025"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Location District *</label>
                <input
                  type="text"
                  required
                  value={projectForm.location}
                  onChange={(e) => setProjectForm({ ...projectForm, location: e.target.value })}
                  className="form-input"
                  placeholder="e.g. Tharparkar & Umerkot"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Verified Impact Metric *</label>
                <input
                  type="text"
                  required
                  value={projectForm.impact}
                  onChange={(e) => setProjectForm({ ...projectForm, impact: e.target.value })}
                  className="form-input"
                  placeholder="e.g. 32,000+ villagers now have continuous clean water."
                />
              </div>

              <div className="form-group">
                <label className="form-label">Project Description</label>
                <textarea
                  rows="3"
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                  className="form-textarea"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Image URL</label>
                <input
                  type="url"
                  value={projectForm.image}
                  onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
                  className="form-input"
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
                <Button type="button" onClick={() => setIsProjectModalOpen(false)} variant="outline" size="md">
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="md">
                  {editingProject ? 'Update Project' : 'Save Project'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================== MODAL: ADD / EDIT TESTIMONIAL ==================== */}
      {isTestimonialModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsTestimonialModalOpen(false)}>
          <div className="modal-card" style={{ maxWidth: '540px' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ padding: '1.25rem 1.75rem', backgroundColor: 'var(--slate-800)', color: '#ffffff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ color: '#ffffff', fontSize: '1.2rem', margin: 0 }}>
                {editingTestimonial ? 'Edit Testimonial' : 'Add Testimonial'}
              </h3>
              <button onClick={() => setIsTestimonialModalOpen(false)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveTestimonial} style={{ padding: '1.75rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Person Name *</label>
                  <input
                    type="text"
                    required
                    value={testimonialForm.name}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, name: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Role / Affiliation</label>
                  <input
                    type="text"
                    value={testimonialForm.role}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, role: e.target.value })}
                    className="form-input"
                    placeholder="Beneficiary / Volunteer"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Location</label>
                  <input
                    type="text"
                    value={testimonialForm.location}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, location: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Rating (1 - 5 Stars)</label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={testimonialForm.rating}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, rating: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Quote Message *</label>
                <textarea
                  rows="3"
                  required
                  value={testimonialForm.quote}
                  onChange={(e) => setTestimonialForm({ ...testimonialForm, quote: e.target.value })}
                  className="form-textarea"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Avatar Image URL</label>
                <input
                  type="url"
                  value={testimonialForm.avatar}
                  onChange={(e) => setTestimonialForm({ ...testimonialForm, avatar: e.target.value })}
                  className="form-input"
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
                <Button type="button" onClick={() => setIsTestimonialModalOpen(false)} variant="outline" size="md">
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="md">
                  Save Testimonial
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
