import React, { useState, useEffect } from 'react'
import axios from "axios"
import './admin.css'

export default function ViewAllCertifications() {
  const [data, setData] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  const fetchCertifications = async () => {
    setLoading(true)
    try {
      const response = await axios.get("http://localhost:1235/adminapi/viewallcertifications")
      if (response.status === 200 && Array.isArray(response.data)) {
        setData(response.data)
      } else {
        setData([])
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setData([])
      } else {
        setError(err.message || "Failed to load certifications.")
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCertifications()
  }, [])

  const revokeCertificate = async (id, title) => {
    if (window.confirm(`Are you sure you want to revoke certification "${title}"?`)) {
      try {
        const response = await axios.get(`http://localhost:1235/adminapi/revokecertificate?id=${id}`)
        if (response.status === 200) {
          setMessage(response.data || "Certification revoked successfully")
          fetchCertifications()
          setTimeout(() => setMessage(""), 3000)
        }
      } catch (err) {
        setError("Failed to revoke certification: " + (err.response?.data || err.message))
        setTimeout(() => setError(""), 3000)
      }
    }
  }

  const filteredCerts = data.filter(cert => {
    const term = searchTerm.toLowerCase()
    const studentId = cert.student ? String(cert.student.id) : ""
    return (
      (cert.certificateid && cert.certificateid.toLowerCase().includes(term)) ||
      (cert.title && cert.title.toLowerCase().includes(term)) ||
      (cert.company && cert.company.toLowerCase().includes(term)) ||
      (cert.category && cert.category.toLowerCase().includes(term)) ||
      (cert.status && cert.status.toLowerCase().includes(term)) ||
      studentId.includes(term)
    )
  })

  return (
    <div className="admin-dashboard fade-in">
      <div className="admin-header-bar">
        <div>
          <h3 className="admin-title">📜 Institutional Certifications</h3>
          <p className="admin-subtitle">Audit, verify, and revoke student credentials across all domains</p>
        </div>
      </div>

      {message && (
        <div className="alert-box alert-success">
          <span>✅</span> {message}
        </div>
      )}

      {error && (
        <div className="alert-box alert-danger">
          <span>⚠️</span> {error}
        </div>
      )}

      <div className="table-card">
        <div className="table-toolbar">
          <input
            type="text"
            className="search-input"
            placeholder="🔍 Search by cert ID, student, company, title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={fetchCertifications} className="btn-reset" style={{ padding: '0.5rem 1rem' }}>
            🔄 Refresh
          </button>
        </div>

        {loading ? (
          <div className="empty-state">
            <div className="spinner" style={{ margin: '0 auto 1rem' }}></div>
            <p>Loading certifications registry...</p>
          </div>
        ) : filteredCerts.length === 0 ? (
          <div className="empty-state">
            <p>No certifications found {searchTerm ? `matching "${searchTerm}"` : ""}.</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Cert ID</th>
                  <th>Student ID</th>
                  <th>Company</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Level</th>
                  <th>Status</th>
                  <th>Proof Document</th>
                  <th style={{ textAlign: 'center' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredCerts.map((cert) => (
                  <tr key={cert.id}>
                    <td>
                      <code>{cert.certificateid}</code>
                    </td>
                    <td>
                      <strong>{cert.student ? cert.student.id : 'N/A'}</strong>
                    </td>
                    <td>{cert.company}</td>
                    <td>{cert.title}</td>
                    <td>
                      <span className="badge-tag">{cert.category}</span>
                    </td>
                    <td>{cert.level}</td>
                    <td>
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
                    </td>
                    <td>
                      {cert.certificatedocument ? (
                        <a
                          href={`http://localhost:1235/studentapi/viewcertificate/${cert.certificatedocument}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="badge-tag"
                          style={{ background: 'var(--primary-light)', color: 'var(--primary)', fontWeight: 600 }}
                        >
                          📄 View Doc ↗
                        </a>
                      ) : (
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>None</span>
                      )}
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      {cert.status.toLowerCase() === 'approved' ? (
                        <button
                          className="btn-action-delete"
                          onClick={() => revokeCertificate(cert.id, cert.title)}
                        >
                          Revoke
                        </button>
                      ) : (
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
