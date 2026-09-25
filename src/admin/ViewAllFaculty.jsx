import React, { useState, useEffect } from 'react'
import axios from "axios"
import './admin.css'

export default function ViewAllFaculty() {
  const [data, setData] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  const fetchFaculty = async () => {
    setLoading(true)
    try {
      const response = await axios.get("http://localhost:1235/adminapi/viewallfaculty")
      if (response.status === 200 && Array.isArray(response.data)) {
        setData(response.data)
      } else {
        setData([])
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setData([])
      } else {
        setError(err.message || "Failed to load faculty.")
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchFaculty()
  }, [])

  const deleteFaculty = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete faculty member "${name}" (ID: ${id})?`)) {
      try {
        const response = await axios.get(`http://localhost:1235/adminapi/deletefaculty?id=${id}`)
        if (response.status === 200) {
          setMessage(response.data || "Faculty member deleted successfully")
          fetchFaculty()
          setTimeout(() => setMessage(""), 3000)
        }
      } catch (err) {
        setError("Failed to delete faculty: " + (err.response?.data || err.message))
        setTimeout(() => setError(""), 3000)
      }
    }
  }

  const filteredFaculty = data.filter(faculty => {
    const term = searchTerm.toLowerCase()
    return (
      String(faculty.id).toLowerCase().includes(term) ||
      (faculty.name && faculty.name.toLowerCase().includes(term)) ||
      (faculty.department && faculty.department.toLowerCase().includes(term)) ||
      (faculty.designation && faculty.designation.toLowerCase().includes(term)) ||
      (faculty.email && faculty.email.toLowerCase().includes(term))
    )
  })

  return (
    <div className="admin-dashboard fade-in">
      <div className="admin-header-bar">
        <div>
          <h3 className="admin-title">👨‍🏫 Academic Faculty</h3>
          <p className="admin-subtitle">Total registered faculty evaluators: {data.length}</p>
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
            placeholder="🔍 Search by ID, name, dept, designation..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={fetchFaculty} className="btn-reset" style={{ padding: '0.5rem 1rem' }}>
            🔄 Refresh
          </button>
        </div>

        {loading ? (
          <div className="empty-state">
            <div className="spinner" style={{ margin: '0 auto 1rem' }}></div>
            <p>Loading faculty directory...</p>
          </div>
        ) : filteredFaculty.length === 0 ? (
          <div className="empty-state">
            <p>No faculty members found {searchTerm ? `matching "${searchTerm}"` : ""}.</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Gender</th>
                  <th>Department</th>
                  <th>Designation</th>
                  <th>Salary</th>
                  <th>Email</th>
                  <th>Contact</th>
                  <th style={{ textAlign: 'center' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredFaculty.map((faculty) => (
                  <tr key={faculty.id}>
                    <td><strong>{faculty.id}</strong></td>
                    <td>{faculty.name}</td>
                    <td>{faculty.gender}</td>
                    <td>
                      <span className="badge-tag badge-dept">{faculty.department}</span>
                    </td>
                    <td>
                      <span className="badge-tag" style={{ background: '#f5f3ff', color: '#7c3aed' }}>
                        {faculty.designation}
                      </span>
                    </td>
                    <td>₹{Number(faculty.salary).toLocaleString()}</td>
                    <td>{faculty.email}</td>
                    <td>{faculty.contact}</td>
                    <td style={{ textAlign: 'center' }}>
                      <button
                        className="btn-action-delete"
                        onClick={() => deleteFaculty(faculty.id, faculty.name)}
                      >
                        Delete
                      </button>
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