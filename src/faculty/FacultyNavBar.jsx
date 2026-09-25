import React from 'react'
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import FacultyHome from './FacultyHome'
import ViewStudents from './ViewStudents'
import './faculty.css'

export default function FacultyNavBar() {
  const navigate = useNavigate()
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate("/facultylogin")
  }

  return (
    <div>
      <div className="faculty-nav-wrapper">
        <nav className="faculty-nav">
          <div className="faculty-nav-links">
            <NavLink
              to="/faculty/home"
              className={({ isActive }) => `faculty-nav-link ${isActive ? 'active' : ''}`}
            >
              📊 Overview
            </NavLink>
            <NavLink
              to="/faculty/requests"
              className={({ isActive }) => `faculty-nav-link ${isActive ? 'active' : ''}`}
            >
              📝 Student Requests
            </NavLink>
          </div>

          <button onClick={handleLogout} className="faculty-logout-btn">
            Logout
          </button>
        </nav>
      </div>

      <div className="faculty-content">
        <Routes>
          <Route path="/faculty" element={<FacultyHome />} />
          <Route path="/faculty/home" element={<FacultyHome />} />
          <Route path="/faculty/requests" element={<ViewStudents />} />
          <Route path="*" element={<FacultyHome />} />
        </Routes>
      </div>
    </div>
  )
}
