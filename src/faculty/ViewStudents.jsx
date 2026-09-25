import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './faculty.css'

export default function ViewStudents() {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  const fetchRequests = async () => {
    setLoading(true)
    try {
      const res = await axios.get("http://localhost:1235/facultyapi/viewpendingrequests")
      if (res.status === 200 && Array.isArray(res.data)) {
        setRequests(res.data)
      } else {
        setRequests([])
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setRequests([])
      } else {
        setError("Failed to fetch pending requests: " + (err.response?.data || err.message))
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRequests()
  }, [])

  const handleEvaluate = async (certid, status, title) => {
    const actionWord = status === 'Approved' ? 'approve' : 'reject'
    if (window.confirm(`Are you sure you want to ${actionWord} "${title}"?`)) {
      try {
        const res = await axios.post(
          `http://localhost:1235/facultyapi/evaluaterequest?certid=${certid}&status=${status}`
        )
        if (res.status === 200) {
          setMessage(res.data || `Request ${status} successfully!`)
          fetchRequests()
          setTimeout(() => setMessage(""), 3000)
        }
      } catch (err) {
        setError("Failed to evaluate request: " + (err.response?.data || err.message))
        setTimeout(() => setError(""), 3000)
      }
    }
  }

  return (
    <div className="faculty-dashboard fade-in">
      <div className="admin-header-bar">
        <div>
          <h2 className="admin-title">📝 Student Certification Requests</h2>
          <p className="admin-subtitle">
            Validate external vendor certifications submitted by enrolled candidates
          </p>
        </div>
        <button onClick={fetchRequests} className="btn-reset" style={{ padding: '0.5rem 1rem' }}>
          🔄 Refresh Queue
        </button>
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

      {loading ? (
        <div className="empty-state">
          <div className="spinner" style={{ margin: '0 auto 1rem' }}></div>
          <p>Loading candidate requests...</p>
        </div>
      ) : requests.length === 0 ? (
        <div className="table-card" style={{ textAlign: 'center', padding: '3.5rem 1rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉</div>
          <h3>All Caught Up!</h3>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
            There are currently no pending certification requests awaiting evaluation.
          </p>
        </div>
      ) : (
        <div className="requests-grid">
          {requests.map((req) => (
            <div key={req.id} className="request-card">
              <div>
                <div className="request-header">
                  <div>
                    <h4 className="request-title">{req.title}</h4>
                    <span className="request-company">{req.company}</span>
                  </div>
                  <span className="badge-tag badge-status-pending">{req.status}</span>
                </div>

                <div className="request-meta-grid">
                  <div>
                    <strong>Category:</strong> {req.category}
                  </div>
                  <div>
                    <strong>Level:</strong> {req.level}
                  </div>
                  <div>
                    <strong>Exam Type:</strong> {req.examtype}
                  </div>
                  <div>
                    <strong>Cert ID:</strong> <code>{req.certificateid}</code>
                  </div>
                  <div>
                    <strong>Issued:</strong> {req.issueddate}
                  </div>
                  <div>
                    <strong>Expires:</strong> {req.expiarydate}
                  </div>
                  <div style={{ gridColumn: '1 / -1' }}>
                    <strong>Student ID:</strong> {req.student ? req.student.id : 'N/A'}{' '}
                    {req.student?.name && `(${req.student.name})`}
                  </div>
                </div>

                {req.certificatedocument && (
                  <div style={{ marginTop: '0.75rem', marginBottom: '0.75rem' }}>
                    <a
                      href={`http://localhost:1235/studentapi/viewcertificate/${req.certificatedocument}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-reset"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        width: '100%',
                        justifyContent: 'center',
                        color: 'var(--primary)',
                        fontWeight: 700,
                        padding: '0.5rem',
                        background: 'var(--primary-light)'
                      }}
                    >
                      📄 View Uploaded Certificate Proof ↗
                    </a>
                  </div>
                )}
              </div>

              <div className="request-actions">
                <button
                  className="btn-approve"
                  onClick={() => handleEvaluate(req.id, "Approved", req.title)}
                >
                  ✓ Approve
                </button>
                <button
                  className="btn-reject"
                  onClick={() => handleEvaluate(req.id, "Rejected", req.title)}
                >
                  ✕ Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
