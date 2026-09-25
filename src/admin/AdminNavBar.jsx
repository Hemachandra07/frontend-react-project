import React from 'react'
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import AdminHome from './AdminHome'
import AddStudent from './AddStudent'
import ViewAllStudents from './ViewAllStudents'
import AddFaculty from './AddFaculty'
import ViewAllFaculty from './ViewAllFaculty'
import ViewAllCertifications from './ViewAllCertifications'
import './admin.css'

export default function AdminNavBar() {
  const navigate = useNavigate()
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate("/adminlogin")
  }

  return (
    <div>
      <div className="admin-nav-wrapper">
        <nav className="admin-nav">
          <div className="admin-nav-links">
            <NavLink
              to="/admin/home"
              className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}
            >
              📊 Dashboard
            </NavLink>
            <NavLink
              to="/admin/addstudent"
              className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}
            >
              ➕ Add Student
            </NavLink>
            <NavLink
              to="/admin/viewallstudents"
              className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}
            >
              👨‍🎓 Students
            </NavLink>
            <NavLink
              to="/admin/addfaculty"
              className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}
            >
              ➕ Add Faculty
            </NavLink>
            <NavLink
              to="/admin/viewallfaculty"
              className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}
            >
              👨‍🏫 Faculty
            </NavLink>
            <NavLink
              to="/admin/viewallcertifications"
              className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}
            >
              📜 Certifications
            </NavLink>
          </div>

          <button onClick={handleLogout} className="admin-logout-btn">
            Logout
          </button>
        </nav>
      </div>

      <div className="admin-content">
        <Routes>
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/admin/home" element={<AdminHome />} />
          <Route path="/admin/addstudent" element={<AddStudent />} />
          <Route path="/admin/viewallstudents" element={<ViewAllStudents />} />
          <Route path="/admin/addfaculty" element={<AddFaculty />} />
          <Route path="/admin/viewallfaculty" element={<ViewAllFaculty />} />
          <Route path="/admin/viewallcertifications" element={<ViewAllCertifications />} />
          <Route path="*" element={<AdminHome />} />
        </Routes>
      </div>
    </div>
  )
}