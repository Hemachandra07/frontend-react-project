import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import './faculty.css'

export default function FacultyHome() {
  const { user } = useAuth()
  const facultyInfo = user || JSON.parse(sessionStorage.getItem("facultyInfo") || "{}")
  const [pendingCount, setPendingCount] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPending = async () => {
      try {
        const res = await axios.get("http://localhost:1235/facultyapi/viewpendingrequests")
        if (res.status === 200 && Array.isArray(res.data)) {
          setPendingCount(res.data.length)
        } else {
          setPendingCount(0)
        }
      } catch (err) {
        setPendingCount(0)
      } finally {
        setLoading(false)
      }
    }

    fetchPending()
  }, [])

  return (
    <div className="faculty-dashboard fade-in">
      <div className="faculty-welcome-card">
        <div className="faculty-profile-info">
          <h3>Welcome back, {facultyInfo.name || "Faculty Evaluator"}!</h3>
          <p>Academic Certification Evaluator Portal</p>
          <div className="faculty-badge-list">
            {facultyInfo.department && (
              <span className="badge-tag badge-dept">{facultyInfo.department} Department</span>
            )}
            {facultyInfo.designation && (
              <span className="badge-tag" style={{ background: '#f5f3ff', color: '#7c3aed' }}>
                {facultyInfo.designation}
              </span>
            )}
            {facultyInfo.id && (
              <span className="badge-tag">ID: {facultyInfo.id}</span>
            )}
          </div>
        </div>

        <div className="stat-card" style={{ minWidth: '220px', border: '1px solid var(--border)' }}>
          <div className="stat-icon" style={{ background: '#fef3c7', color: '#d97706' }}>
            ⏳
          </div>
          <div className="stat-info">
            <h4>Pending Review</h4>
            <div className="stat-value">{loading ? "..." : pendingCount}</div>
          </div>
        </div>
      </div>

      <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', padding: '2rem', boxShadow: 'var(--shadow-sm)' }}>
        <h3 style={{ marginBottom: '0.75rem' }}>Evaluation Queue</h3>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: '1.6' }}>
          You have <strong>{pendingCount}</strong> student certification requests awaiting verification. Reviewing credentials promptly guarantees students can showcase their verified skills on their academic profiles.
        </p>
        <Link to="/faculty/requests" className="btn-submit" style={{ display: 'inline-flex' }}>
          Open Review Queue ({pendingCount}) →
        </Link>
      </div>
    </div>
  )
}
