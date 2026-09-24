import React, { useEffect } from 'react';
import { Routes, Route, useLocation, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Context Providers
import { AuthProvider } from './context/AuthContext';
import { SiteDataProvider } from './context/SiteDataContext';
import ProtectedRoute from './components/admin/ProtectedRoute';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Programs from './pages/Programs';
import Projects from './pages/Projects';
import GetInvolved from './pages/GetInvolved';
import Volunteer from './pages/Volunteer';
import Donate from './pages/Donate';
import Contact from './pages/Contact';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';

// ScrollToTop component
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// 404 Fallback component
function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '7rem 1.5rem', minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <span className="section-tag" style={{ backgroundColor: 'var(--danger-50)', color: 'var(--danger-600)' }}>
        404 Error
      </span>
      <h1 style={{ fontSize: '3rem', margin: '1rem 0', color: 'var(--slate-900)' }}>Page Not Found</h1>
      <p style={{ color: 'var(--slate-600)', maxWidth: '480px', marginBottom: '2rem' }}>
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link to="/" className="btn btn-primary btn-md">
        Return to Homepage
      </Link>
    </div>
  );
}

function MainLayout({ children }) {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  if (isAdminRoute) {
    return <main>{children}</main>;
  }

  return (
    <div className="app-wrapper">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <SiteDataProvider>
        <ScrollToTop />
        <MainLayout>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/get-involved" element={<GetInvolved />} />
            <Route path="/volunteer" element={<Volunteer />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/contact" element={<Contact />} />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* Fallback */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </MainLayout>
      </SiteDataProvider>
    </AuthProvider>
  );
}
