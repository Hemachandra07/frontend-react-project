import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import './student.css'

export default function StudentHome() {
  const { user } = useAuth()
  const studentInfo = user || JSON.parse(sessionStorage.getItem("studentInfo") || "{}")
  const [stats, setStats] = useState({
    total: 0,
    approved: 0,
    pending: 0,
    loading: true
  })

  useEffect(() => {
    const fetchStats = async () => {
      if (!studentInfo.id) {
        setStats(prev => ({ ...prev, loading: false }))
        return
      }

      try {
        const res = await axios.get(
          `http://localhost:1235/studentapi/viewmycertifications?studentid=${studentInfo.id}`
        )
        if (res.status === 200 && Array.isArray(res.data)) {
          const total = res.data.length
          const approved = res.data.filter(c => c.status && c.status.toLowerCase() === 'approved').length
          const pending = res.data.filter(c => c.status && c.status.toLowerCase() === 'pending').length
          setStats({ total, approved, pending, loading: false })
        } else {
          setStats({ total: 0, approved: 0, pending: 0, loading: false })
        }
      } catch (err) {
        setStats({ total: 0, approved: 0, pending: 0, loading: false })
      }
    }

    fetchStats()
  }, [studentInfo.id])

  return (
    <div className="student-dashboard fade-in">
      <div className="student-welcome-card">
        <div className="student-profile-info">
          <h3>Welcome, {studentInfo.name || "Student"}!</h3>
          <p>Academic & Professional Certification Portfolio</p>
          <div className="student-badges">
            {studentInfo.id && <span className="badge-tag">ID: {studentInfo.id}</span>}
            {studentInfo.department && (
              <span className="badge-tag badge-dept">{studentInfo.department} Department</span>
            )}
            {studentInfo.email && <span className="badge-tag">{studentInfo.email}</span>}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <div className="stat-card" style={{ padding: '1rem 1.25rem', minWidth: '140px' }}>
            <div className="stat-info">
              <h4>Total Submitted</h4>
              <div className="stat-value">{stats.loading ? "..." : stats.total}</div>
            </div>
          </div>
          <div className="stat-card" style={{ padding: '1rem 1.25rem', minWidth: '140px' }}>
            <div className="stat-info">
              <h4 style={{ color: 'var(--success-text)' }}>Approved</h4>
              <div className="stat-value" style={{ color: 'var(--success)' }}>
                {stats.loading ? "..." : stats.approved}
              </div>
            </div>
          </div>
        </div>
      </div>

      <h3 style={{ marginBottom: '1rem', fontSize: '1.2rem' }}>Quick Actions</h3>
      <div className="quick-actions-grid">
        <Link to="/student/apply" className="quick-action-card">
          <span className="quick-action-icon">➕</span>
          <h4>Apply for Certification</h4>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Submit a new credential for faculty verification
          </p>
        </Link>

        <Link to="/student/certifications" className="quick-action-card">
          <span className="quick-action-icon">📜</span>
          <h4>My Certifications</h4>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Track application status & view approved certificates
          </p>
        </Link>
      </div>
    </div>
  )
}
