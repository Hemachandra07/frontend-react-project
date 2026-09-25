import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './student.css'

export default function ViewCertifications() {
  const { user } = useAuth()
  const studentInfo = user || JSON.parse(sessionStorage.getItem("studentInfo") || "{}")

  const [certs, setCerts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [error, setError] = useState('')

  const fetchCerts = async () => {
    if (!studentInfo?.id) {
      setError("Student information not found. Please log in again.")
      setLoading(false)
      return
    }

    setLoading(true)
    try {
      const res = await axios.get(
        `http://localhost:1235/studentapi/viewmycertifications?studentid=${studentInfo.id}`
      )
      if (res.status === 200 && Array.isArray(res.data)) {
        setCerts(res.data)
      } else {
        setCerts([])
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setCerts([])
      } else {
        setError("Failed to fetch certifications: " + (err.response?.data || err.message))
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCerts()
  }, [studentInfo?.id])

  const filteredCerts = certs.filter(cert => {
    const term = searchTerm.toLowerCase()
    return (
      (cert.title && cert.title.toLowerCase().includes(term)) ||
      (cert.company && cert.company.toLowerCase().includes(term)) ||
      (cert.category && cert.category.toLowerCase().includes(term)) ||
      (cert.certificateid && cert.certificateid.toLowerCase().includes(term)) ||
      (cert.status && cert.status.toLowerCase().includes(term))
    )
  })

  return (
    <div className="student-dashboard fade-in">
      <div className="admin-header-bar">
        <div>
          <h2 className="admin-title">📜 My Submitted Certifications</h2>
          <p className="admin-subtitle">
            Track verification progress and access authorized certification credentials
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button onClick={fetchCerts} className="btn-reset" style={{ padding: '0.5rem 1rem' }}>
            🔄 Refresh
          </button>
          <Link to="/student/apply" className="btn-submit" style={{ padding: '0.5rem 1rem', fontSize: '0.88rem' }}>
            ➕ New Application
          </Link>
        </div>
      </div>

      {error && (
        <div className="alert-box alert-danger">
          <span>⚠️</span> {error}
        </div>
      )}

      {certs.length > 0 && (
        <div style={{ marginBottom: '1.5rem' }}>
          <input
            type="text"
            className="search-input"
            placeholder="🔍 Filter by title, vendor, status..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}

      {loading ? (
        <div className="empty-state">
          <div className="spinner" style={{ margin: '0 auto 1rem' }}></div>
          <p>Retrieving your credentials...</p>
        </div>
      ) : certs.length === 0 ? (
        <div className="table-card" style={{ textAlign: 'center', padding: '3.5rem 1rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📂</div>
          <h3>No Certifications Submitted Yet</h3>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem', marginBottom: '1.5rem' }}>
            Apply for verification of your industry certifications to showcase them on your portfolio.
          </p>
          <Link to="/student/apply" className="btn-submit" style={{ display: 'inline-flex' }}>
            Apply for Certification →
          </Link>
        </div>
      ) : filteredCerts.length === 0 ? (
        <div className="table-card" style={{ textAlign: 'center', padding: '2rem' }}>
          <p>No certifications match "{searchTerm}".</p>
        </div>
      ) : (
        <div className="certs-grid">
          {filteredCerts.map((cert) => (
            <div key={cert.id} className="cert-card">
              <div>
                <div className="cert-card-header">
                  <div>
                    <h4 className="cert-card-title">{cert.title}</h4>
                    <span className="cert-card-company">{cert.company}</span>
                  </div>
                  <span
                    className={`badge-tag ${
                      cert.status.toLowerCase() === 'approved'
                        ? 'badge-status-approved'
                        : cert.status.toLowerCase() === 'pending'
                        ? 'badge-status-pending'
                        : 'badge-status-rejected'
                    }`}
                  >
                    {cert.status}
                  </span>
                </div>

                <div className="cert-details-grid">
                  <div>
                    <strong>Category:</strong> {cert.category}
                  </div>
                  <div>
                    <strong>Level:</strong> {cert.level}
                  </div>
                  <div>
                    <strong>Exam:</strong> {cert.examtype}
                  </div>
                  <div>
                    <strong>ID:</strong> <code>{cert.certificateid}</code>
                  </div>
                  <div>
                    <strong>Issued:</strong> {cert.issueddate}
                  </div>
                  <div>
                    <strong>Expires:</strong> {cert.expiarydate}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.75rem' }}>
                {cert.certificatedocument && (
                  <a
                    href={`http://localhost:1235/studentapi/viewcertificate/${cert.certificatedocument}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-reset"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.4rem',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      padding: '0.45rem',
                      color: 'var(--primary)',
                      background: 'var(--primary-light)'
                    }}
                  >
                    📄 View Uploaded Document ↗
                  </a>
                )}

                {cert.status.toLowerCase() === 'approved' && cert.certificateurl ? (
                  <a
                    href={cert.certificateurl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-view-doc"
                  >
                    🎓 View Verified Credential ↗
                  </a>
                ) : cert.status.toLowerCase() === 'pending' ? (
                  <div style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--warning-text)', background: 'var(--warning-light)', padding: '0.5rem', borderRadius: 'var(--radius-sm)' }}>
                    ⏳ Under Faculty Evaluation
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--danger-text)', background: 'var(--danger-light)', padding: '0.5rem', borderRadius: 'var(--radius-sm)' }}>
                    ✕ Application Rejected
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
