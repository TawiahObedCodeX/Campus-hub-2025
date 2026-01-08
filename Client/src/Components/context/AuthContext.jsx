import { useState, useEffect, useCallback } from 'react';
import { AuthContext } from './AuthContext';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem('user');
      return storedUser ? JSON.parse(storedUser) : null;
    } catch {
      return null;
    }
  }); // { id, role, ... } or null if not logged in
  const [token, setToken] = useState(() => {
    return localStorage.getItem('token') || null;
  });
  const [onboardingStep, setOnboardingStep] = useState(() => {
    const storedStep = localStorage.getItem('onboardingStep');
    return storedStep || '';
  }); // e.g., '', 'personal-info', 'student-id', 'role', 'step4', 'skills', 'completed'
  const [loading, setLoading] = useState(true);

  const login = (userData, token) => {
    setUser(userData);
    setToken(token);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', token);
  };

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    setOnboardingStep('');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('onboardingStep');
  }, []);

  const updateOnboardingStep = (newStep) => {
    setOnboardingStep(newStep);
    localStorage.setItem('onboardingStep', newStep);
  };

  useEffect(() => {
    const verifyToken = async () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken && storedToken !== 'dummy-token') {
        try {
          const response = await fetch('http://localhost:5002/api/auth/me', {
            headers: {
              'Authorization': `Bearer ${storedToken}`,
            },
          });
          if (response.ok) {
            const data = await response.json();
            setUser(data.user);
            setToken(storedToken);
          } else {
            logout();
          }
        } catch (error) {
          console.error('Token verification failed:', error);
          logout();
        }
      }
      setLoading(false);
    };
    verifyToken();
  }, [logout]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        onboardingStep,
        loading,
        login,
        logout,
        updateOnboardingStep,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}