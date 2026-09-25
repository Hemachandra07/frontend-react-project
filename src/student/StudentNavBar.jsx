import React from 'react'
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import StudentHome from './StudentHome'
import AddCertification from './AddCertification'
import ViewCertifications from './ViewCertifications'
import './student.css'

export default function StudentNavBar() {
  const navigate = useNavigate()
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate("/studentlogin")
  }

  return (
    <div>
      <div className="student-nav-wrapper">
        <nav className="student-nav">
          <div className="student-nav-links">
            <NavLink
              to="/student/home"
              className={({ isActive }) => `student-nav-link ${isActive ? 'active' : ''}`}
            >
              📊 Overview
            </NavLink>
            <NavLink
              to="/student/apply"
              className={({ isActive }) => `student-nav-link ${isActive ? 'active' : ''}`}
            >
              ➕ Apply Certification
            </NavLink>
            <NavLink
              to="/student/certifications"
              className={({ isActive }) => `student-nav-link ${isActive ? 'active' : ''}`}
            >
              📜 My Certifications
            </NavLink>
          </div>

          <button onClick={handleLogout} className="student-logout-btn">
            Logout
          </button>
        </nav>
      </div>

      <div className="student-content">
        <Routes>
          <Route path="/student" element={<StudentHome />} />
          <Route path="/student/home" element={<StudentHome />} />
          <Route path="/student/apply" element={<AddCertification />} />
          <Route path="/student/certifications" element={<ViewCertifications />} />
          <Route path="*" element={<StudentHome />} />
        </Routes>
      </div>
    </div>
  )
}
