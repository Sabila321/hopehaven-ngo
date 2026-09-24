import React, { createContext, useContext, useState, useEffect } from 'react';
import { programsData as defaultPrograms } from '../data/programs';
import { projectsData as defaultProjects } from '../data/projects';
import { testimonialsData as defaultTestimonials } from '../data/testimonials';

const SiteDataContext = createContext(null);

const STORAGE_KEY = 'hopehaven_site_data_v1';

const defaultSettings = {
  phone: '03233747970',
  email: 'sabilamemon7@gmail.com',
  address: 'Block 4, Clifton, Karachi, Pakistan',
  organizationName: 'HopeHaven Welfare Foundation',
  heroBadge: 'HopeHaven Welfare Foundation',
  heroTitle: 'Together We Bring Hope, Dignity & Opportunity',
  heroSubtitle: 'We are a dedicated non-profit organization striving to eliminate poverty, deliver clean drinking water, ensure quality education for every child, and provide rapid relief in times of crisis.',
  stats: {
    lives: '150,000+',
    volunteers: '2,400+',
    projects: '380+',
    communities: '85+'
  }
};

const initialSampleMessages = [
  {
    id: 'msg-1',
    name: 'Ahmed Bilal',
    email: 'ahmed.bilal@example.com',
    phone: '03001234567',
    subject: 'Solar Water Well Sponsorship in Thar',
    message: 'Hello, our family foundation would like to sponsor a complete solar water filtration well in Tharparkar. Please provide project timeline and budget details.',
    date: '2026-09-18 10:30 AM',
    read: true
  },
  {
    id: 'msg-2',
    name: 'Zainab Qureshi',
    email: 'zainab.q@example.com',
    phone: '03339876543',
    subject: 'School Uniforms Donation Drive',
    message: 'We have 200 high-quality stitched uniforms to donate for your slum education centers. How can we arrange delivery to your Karachi warehouse?',
    date: '2026-09-20 03:15 PM',
    read: false
  }
];

const initialSampleApplications = [
  {
    id: 'app-1',
    fullName: 'Dr. Hamza Siddiqui',
    email: 'dr.hamza@example.com',
    phone: '03214567890',
    areaOfInterest: 'Healthcare & Medical Camps',
    availability: 'Weekends Only',
    message: 'General practitioner with 4 years of clinical experience. Eager to volunteer for Sunday eye and free medical checkup camps.',
    date: '2026-09-19 11:45 AM',
    status: 'Reviewed'
  },
  {
    id: 'app-2',
    fullName: 'Mariam Farooq',
    email: 'mariam.f@example.com',
    phone: '03451122334',
    areaOfInterest: 'Child Teaching & Slum Schools',
    availability: 'Weekdays (Part-time)',
    message: 'Recent graduate in Early Childhood Education. Passionate about teaching literacy and basic mathematics to out-of-school children.',
    date: '2026-09-21 09:20 AM',
    status: 'Pending'
  }
];

export function SiteDataProvider({ children }) {
  // Load state from localStorage or initialize from defaults
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          programs: parsed.programs || defaultPrograms,
          projects: parsed.projects || defaultProjects,
          testimonials: parsed.testimonials || defaultTestimonials,
          settings: { ...defaultSettings, ...(parsed.settings || {}) },
          contactMessages: parsed.contactMessages || initialSampleMessages,
          volunteerApplications: parsed.volunteerApplications || initialSampleApplications
        };
      }
    } catch (e) {
      console.warn('Error reading from localStorage:', e);
    }
    return {
      programs: defaultPrograms,
      projects: defaultProjects,
      testimonials: defaultTestimonials,
      settings: defaultSettings,
      contactMessages: initialSampleMessages,
      volunteerApplications: initialSampleApplications
    };
  });

  // Save to localStorage on any state change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.warn('Error saving to localStorage:', e);
    }
  }, [data]);

  // --- Program CRUD ---
  const addProgram = (programData) => {
    const newProgram = {
      ...programData,
      id: programData.id || `cause-${Date.now()}`,
      goal: Number(programData.goal) || 50000,
      raised: Number(programData.raised) || 0
    };
    setData((prev) => ({
      ...prev,
      programs: [newProgram, ...prev.programs]
    }));
  };

  const updateProgram = (id, updatedFields) => {
    setData((prev) => ({
      ...prev,
      programs: prev.programs.map((p) =>
        p.id === id ? { ...p, ...updatedFields, goal: Number(updatedFields.goal ?? p.goal), raised: Number(updatedFields.raised ?? p.raised) } : p
      )
    }));
  };

  const deleteProgram = (id) => {
    setData((prev) => ({
      ...prev,
      programs: prev.programs.filter((p) => p.id !== id)
    }));
  };

  // --- Project CRUD ---
  const addProject = (projectData) => {
    const newProject = {
      ...projectData,
      id: projectData.id || `proj-${Date.now()}`
    };
    setData((prev) => ({
      ...prev,
      projects: [newProject, ...prev.projects]
    }));
  };

  const updateProject = (id, updatedFields) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.map((p) =>
        p.id === id ? { ...p, ...updatedFields } : p
      )
    }));
  };

  const deleteProject = (id) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id)
    }));
  };

  // --- Testimonial CRUD ---
  const addTestimonial = (testimonialData) => {
    const newTestimonial = {
      ...testimonialData,
      id: testimonialData.id || `test-${Date.now()}`,
      rating: Number(testimonialData.rating) || 5
    };
    setData((prev) => ({
      ...prev,
      testimonials: [newTestimonial, ...prev.testimonials]
    }));
  };

  const updateTestimonial = (id, updatedFields) => {
    setData((prev) => ({
      ...prev,
      testimonials: prev.testimonials.map((t) =>
        t.id === id ? { ...t, ...updatedFields, rating: Number(updatedFields.rating ?? t.rating) } : t
      )
    }));
  };

  const deleteTestimonial = (id) => {
    setData((prev) => ({
      ...prev,
      testimonials: prev.testimonials.filter((t) => t.id !== id)
    }));
  };

  // --- Settings Update ---
  const updateSettings = (newSettings) => {
    setData((prev) => ({
      ...prev,
      settings: {
        ...prev.settings,
        ...newSettings,
        stats: {
          ...prev.settings.stats,
          ...(newSettings.stats || {})
        }
      }
    }));
  };

  // --- Contact Messages ---
  const addContactMessage = (msg) => {
    const newMsg = {
      ...msg,
      id: `msg-${Date.now()}`,
      date: new Date().toLocaleString(),
      read: false
    };
    setData((prev) => ({
      ...prev,
      contactMessages: [newMsg, ...prev.contactMessages]
    }));
  };

  const deleteContactMessage = (id) => {
    setData((prev) => ({
      ...prev,
      contactMessages: prev.contactMessages.filter((m) => m.id !== id)
    }));
  };

  // --- Volunteer Applications ---
  const addVolunteerApplication = (app) => {
    const newApp = {
      ...app,
      id: `app-${Date.now()}`,
      date: new Date().toLocaleString(),
      status: 'Pending'
    };
    setData((prev) => ({
      ...prev,
      volunteerApplications: [newApp, ...prev.volunteerApplications]
    }));
  };

  const deleteVolunteerApplication = (id) => {
    setData((prev) => ({
      ...prev,
      volunteerApplications: prev.volunteerApplications.filter((a) => a.id !== id)
    }));
  };

  // --- Reset All to Factory Defaults ---
  const resetToDefaults = () => {
    setData({
      programs: defaultPrograms,
      projects: defaultProjects,
      testimonials: defaultTestimonials,
      settings: defaultSettings,
      contactMessages: initialSampleMessages,
      volunteerApplications: initialSampleApplications
    });
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <SiteDataContext.Provider
      value={{
        programs: data.programs,
        projects: data.projects,
        testimonials: data.testimonials,
        settings: data.settings,
        contactMessages: data.contactMessages,
        volunteerApplications: data.volunteerApplications,
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
        addContactMessage,
        deleteContactMessage,
        addVolunteerApplication,
        deleteVolunteerApplication,
        resetToDefaults
      }}
    >
      {children}
    </SiteDataContext.Provider>
  );
}

export function useSiteData() {
  const context = useContext(SiteDataContext);
  if (!context) {
    throw new Error('useSiteData must be used within a SiteDataProvider');
  }
  return context;
}
