import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './admin.css'

export default function AdminHome() {
  const [stats, setStats] = useState({
    students: 0,
    faculty: 0,
    certifications: 0,
    loading: true
  })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [studentsRes, facultyRes, certsRes] = await Promise.allSettled([
          axios.get("http://localhost:1235/adminapi/viewallstudents"),
          axios.get("http://localhost:1235/adminapi/viewallfaculty"),
          axios.get("http://localhost:1235/adminapi/viewallcertifications")
        ])

        setStats({
          students: studentsRes.status === 'fulfilled' && Array.isArray(studentsRes.value.data) ? studentsRes.value.data.length : 0,
          faculty: facultyRes.status === 'fulfilled' && Array.isArray(facultyRes.value.data) ? facultyRes.value.data.length : 0,
          certifications: certsRes.status === 'fulfilled' && Array.isArray(certsRes.value.data) ? certsRes.value.data.length : 0,
          loading: false
        })
      } catch (err) {
        setStats(prev => ({ ...prev, loading: false }))
      }
    }

    fetchStats()
  }, [])

  return (
    <div className="admin-dashboard fade-in">
      <div className="admin-header-bar">
        <div>
          <h2 className="admin-title">Admin Command Center</h2>
          <p className="admin-subtitle">Centralized oversight of academic credentials, evaluators, and candidates</p>
        </div>
      </div>

      <div className="admin-stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#e0e7ff', color: '#4f46e5' }}>
            👨‍🎓
          </div>
          <div className="stat-info">
            <h4>Total Students</h4>
            <div className="stat-value">{stats.loading ? "..." : stats.students}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#e0f2fe', color: '#0284c7' }}>
            👨‍🏫
          </div>
          <div className="stat-info">
            <h4>Faculty Evaluators</h4>
            <div className="stat-value">{stats.loading ? "..." : stats.faculty}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#f5f3ff', color: '#8b5cf6' }}>
            📜
          </div>
          <div className="stat-info">
            <h4>Certifications</h4>
            <div className="stat-value">{stats.loading ? "..." : stats.certifications}</div>
          </div>
        </div>
      </div>

      <h3 style={{ marginBottom: '1rem', fontSize: '1.2rem' }}>Quick Actions</h3>
      <div className="quick-actions-grid">
        <Link to="/admin/addstudent" className="quick-action-card">
          <span className="quick-action-icon">➕</span>
          <h4>Add New Student</h4>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Enroll a new candidate</p>
        </Link>

        <Link to="/admin/viewallstudents" className="quick-action-card">
          <span className="quick-action-icon">📋</span>
          <h4>Manage Students</h4>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>View & delete candidate records</p>
        </Link>

        <Link to="/admin/addfaculty" className="quick-action-card">
          <span className="quick-action-icon">👨‍🏫</span>
          <h4>Add Faculty</h4>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Register an academic evaluator</p>
        </Link>

        <Link to="/admin/viewallcertifications" className="quick-action-card">
          <span className="quick-action-icon">🛡️</span>
          <h4>Audit Certificates</h4>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Review and revoke credentials</p>
        </Link>
      </div>
    </div>
  )
}