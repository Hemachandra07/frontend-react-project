import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [role, setRole] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth state from sessionStorage on mount
  useEffect(() => {
    const storedToken = sessionStorage.getItem('jwtToken');
    const storedRole = sessionStorage.getItem('userRole');
    const isAdmin = sessionStorage.getItem('isAdmin') === 'true';
    const isFaculty = sessionStorage.getItem('isFaculty') === 'true';
    const isStudent = sessionStorage.getItem('isStudent') === 'true';

    if (storedToken) {
      setToken(storedToken);
    }

    if (storedRole === 'admin' || isAdmin) {
      setRole('admin');
      const adminInfo = sessionStorage.getItem('adminInfo');
      setUser(adminInfo ? JSON.parse(adminInfo) : { username: 'admin' });
    } else if (storedRole === 'faculty' || isFaculty) {
      setRole('faculty');
      const facultyInfo = sessionStorage.getItem('facultyInfo');
      setUser(facultyInfo ? JSON.parse(facultyInfo) : null);
    } else if (storedRole === 'student' || isStudent) {
      setRole('student');
      const studentInfo = sessionStorage.getItem('studentInfo');
      setUser(studentInfo ? JSON.parse(studentInfo) : null);
    } else {
      setRole(null);
      setUser(null);
      setToken(null);
    }
    setLoading(false);
  }, []);

  const login = (newRole, userData = {}, jwtToken = null) => {
    sessionStorage.setItem('userRole', newRole);
    sessionStorage.setItem('userInfo', JSON.stringify(userData));
    if (jwtToken) {
      sessionStorage.setItem('jwtToken', jwtToken);
      setToken(jwtToken);
    }

    if (newRole === 'admin') {
      sessionStorage.setItem('isAdmin', 'true');
      sessionStorage.setItem('adminInfo', JSON.stringify(userData));
      sessionStorage.removeItem('isFaculty');
      sessionStorage.removeItem('isStudent');
    } else if (newRole === 'faculty') {
      sessionStorage.setItem('isFaculty', 'true');
      sessionStorage.setItem('facultyInfo', JSON.stringify(userData));
      sessionStorage.removeItem('isAdmin');
      sessionStorage.removeItem('isStudent');
    } else if (newRole === 'student') {
      sessionStorage.setItem('isStudent', 'true');
      sessionStorage.setItem('studentInfo', JSON.stringify(userData));
      sessionStorage.removeItem('isAdmin');
      sessionStorage.removeItem('isFaculty');
    }

    setRole(newRole);
    setUser(userData);
  };

  const logout = () => {
    sessionStorage.removeItem('jwtToken');
    sessionStorage.removeItem('userRole');
    sessionStorage.removeItem('userInfo');
    sessionStorage.removeItem('isAdmin');
    sessionStorage.removeItem('adminInfo');
    sessionStorage.removeItem('isFaculty');
    sessionStorage.removeItem('facultyInfo');
    sessionStorage.removeItem('isStudent');
    sessionStorage.removeItem('studentInfo');

    setRole(null);
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ role, user, token, login, logout, loading }}>
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
