import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import NavBar from './pages/NavBar'
import AdminNavBar from './admin/AdminNavBar'
import StudentNavBar from './student/StudentNavBar'
import FacultyNavBar from './faculty/FacultyNavBar'
import './App.css'

function AppContent() {
  const { role, user, logout, loading } = useAuth()

  if (loading) {
    return (
      <div className="portal-loading">
        <div className="spinner"></div>
        <p>Loading Portal...</p>
      </div>
    )
  }

  return (
    <div className="app-container">
      <header className="portal-header">
        <div className="portal-brand">
          <div className="portal-logo">🎓</div>
          <div>
            <h1 className="portal-title">CertifyHub</h1>
            <span className="portal-subtitle">Student Certification Management System</span>
          </div>
        </div>

        {role && (
          <div className="portal-user-badge">
            <span className="status-indicator"></span>
            <span className="user-role-tag">{role.toUpperCase()}</span>
            <span className="user-name">
              {user?.name || user?.username || user?.email || 'Logged In'}
            </span>
            <button onClick={logout} className="portal-quick-logout" title="Logout">
              Logout
            </button>
          </div>
        )}
      </header>

      <main className="portal-body">
        {role === 'admin' ? (
          <AdminNavBar />
        ) : role === 'faculty' ? (
          <FacultyNavBar />
        ) : role === 'student' ? (
          <StudentNavBar />
        ) : (
          <NavBar />
        )}
      </main>

      <footer className="portal-footer">
        <p>© 2026 CertifyHub — Student Certification Management Portal. All rights reserved.</p>
      </footer>
    </div>
  )
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  )
}

export default App
