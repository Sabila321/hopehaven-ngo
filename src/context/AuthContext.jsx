import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '../api/client';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Auth state — resolved asynchronously from Flask session on mount
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Expose the configured admin email for the login page hint
  const expectedEmail = (import.meta.env.VITE_ADMIN_EMAIL || 'sabilamemon7@gmail.com').trim().toLowerCase();

  // ---------------------------------------------------------------------------
  // On mount: ask Flask if a valid admin session already exists (via cookie)
  // This restores auth state after a page refresh without storing anything in
  // localStorage / sessionStorage.
  // ---------------------------------------------------------------------------
  useEffect(() => {
    authApi.status()
      .then((res) => {
        if (res.data?.authenticated) {
          setIsAuthenticated(true);
          setAdminUser(res.data.email || null);
        }
      })
      .catch(() => {
        // Flask is unreachable or session expired — start unauthenticated
        setIsAuthenticated(false);
      })
      .finally(() => setAuthLoading(false));
  }, []);

  // ---------------------------------------------------------------------------
  // Login — POST credentials to Flask, set session cookie server-side
  // Returns { success: bool, error?: string } — same interface as before
  // ---------------------------------------------------------------------------
  const login = async (email, password) => {
    try {
      const res = await authApi.login(email, password);
      if (res.success) {
        setIsAuthenticated(true);
        setAdminUser(res.data?.email || email);
        return { success: true };
      }
      return { success: false, error: res.message || 'Authentication failed.' };
    } catch (err) {
      // err.status 401 = wrong credentials
      if (err.status === 401) {
        return { success: false, error: err.message || 'Invalid credentials.' };
      }
      // Network/server error — fall back to offline mode with env credentials
      console.warn('[Auth] Flask unreachable, falling back to offline auth.');
      return _offlineLogin(email, password);
    }
  };

  // ---------------------------------------------------------------------------
  // Offline fallback: compare against .env credentials if Flask is down
  // ---------------------------------------------------------------------------
  const _offlineLogin = (email, password) => {
    const inputEmail = (email || '').trim().toLowerCase();
    const inputPassword = (password || '').trim();
    const expectedPassword = (import.meta.env.VITE_ADMIN_PASSWORD || 'SabilaAdmin@2026#NGO').trim();

    if (inputEmail === expectedEmail && inputPassword === expectedPassword) {
      setIsAuthenticated(true);
      setAdminUser(inputEmail);
      return { success: true };
    }
    if (inputEmail !== expectedEmail) {
      return { success: false, error: 'Invalid admin email address.' };
    }
    return { success: false, error: 'Invalid admin password. Please check your credentials.' };
  };

  // ---------------------------------------------------------------------------
  // Logout — clear Flask session cookie
  // ---------------------------------------------------------------------------
  const logout = async () => {
    try {
      await authApi.logout();
    } catch {
      // Proceed with client-side logout even if server call fails
    }
    setIsAuthenticated(false);
    setAdminUser(null);
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      adminUser,
      authLoading,
      login,
      logout,
      expectedEmail,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
