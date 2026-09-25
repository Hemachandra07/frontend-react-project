import React, { useState, useEffect } from 'react'
import axios from "axios"
import './admin.css'

export default function ViewAllStudents() {
  const [data, setData] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  const fetchStudents = async () => {
    setLoading(true)
    try {
      const response = await axios.get("http://localhost:1235/adminapi/viewallstudents")
      if (response.status === 200 && Array.isArray(response.data)) {
        setData(response.data)
      } else {
        setData([])
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setData([])
      } else {
        setError(err.message || "Failed to load students.")
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStudents()
  }, [])

  const deleteStudent = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete student "${name}" (ID: ${id})?`)) {
      try {
        const response = await axios.get(`http://localhost:1235/adminapi/deletestudent?id=${id}`)
        if (response.status === 200) {
          setMessage(response.data || "Student deleted successfully")
          fetchStudents()
          setTimeout(() => setMessage(""), 3000)
        }
      } catch (err) {
        setError("Failed to delete student: " + (err.response?.data || err.message))
        setTimeout(() => setError(""), 3000)
      }
    }
  }

  const filteredStudents = data.filter(student => {
    const term = searchTerm.toLowerCase()
    return (
      String(student.id).toLowerCase().includes(term) ||
      (student.name && student.name.toLowerCase().includes(term)) ||
      (student.department && student.department.toLowerCase().includes(term)) ||
      (student.email && student.email.toLowerCase().includes(term))
    )
  })

  return (
    <div className="admin-dashboard fade-in">
      <div className="admin-header-bar">
        <div>
          <h3 className="admin-title">👨‍🎓 Enrolled Students</h3>
          <p className="admin-subtitle">Total enrolled candidates: {data.length}</p>
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
            placeholder="🔍 Search by ID, name, email, dept..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={fetchStudents} className="btn-reset" style={{ padding: '0.5rem 1rem' }}>
            🔄 Refresh
          </button>
        </div>

        {loading ? (
          <div className="empty-state">
            <div className="spinner" style={{ margin: '0 auto 1rem' }}></div>
            <p>Loading student directory...</p>
          </div>
        ) : filteredStudents.length === 0 ? (
          <div className="empty-state">
            <p>No students found {searchTerm ? `matching "${searchTerm}"` : ""}.</p>
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
                  <th>Email</th>
                  <th>Contact</th>
                  <th style={{ textAlign: 'center' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student.id}>
                    <td><strong>{student.id}</strong></td>
                    <td>{student.name}</td>
                    <td>{student.gender}</td>
                    <td>
                      <span className="badge-tag badge-dept">{student.department}</span>
                    </td>
                    <td>{student.email}</td>
                    <td>{student.contact}</td>
                    <td style={{ textAlign: 'center' }}>
                      <button
                        className="btn-action-delete"
                        onClick={() => deleteStudent(student.id, student.name)}
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