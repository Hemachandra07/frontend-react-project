import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './style.css'

export default function StudentLogin() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [formdata, setFormdata] = useState({
    email: "",
    password: ""
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  function handleChange(e) {
    const { name, value } = e.target
    setFormdata({ ...formdata, [name]: value })
    if (error) setError("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await axios.post("http://localhost:1235/studentapi/login", formdata)
      if (response.status === 200) {
        const authData = response.data
        const token = authData.token || null
        const userData = authData.user || authData
        login('student', userData, token)
        navigate("/student/home")
      } else {
        setError("Invalid student email or password.")
      }
    } catch (err) {
      setError(err.response?.data || "Login failed. Please check your credentials.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-wrapper fade-in">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-icon-badge" style={{ background: '#e0e7ff', color: '#4f46e5' }}>
            🎓
          </div>
          <h2 className="auth-title">Student Portal</h2>
          <p className="auth-subtitle">Sign in to submit and track your professional certifications</p>
        </div>

        {error && (
          <div className="alert-box alert-danger">
            <span>⚠️</span> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Student Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="student@college.edu"
              value={formdata.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="••••••••"
              value={formdata.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="auth-btn-submit" disabled={loading}>
            {loading ? "Signing In..." : "Sign In to Student Portal"}
          </button>
        </form>

        <div className="auth-footer">
          <span>New student? </span>
          <Link to="/register" style={{ fontWeight: 600 }}>Create an account</Link>
          <span style={{ margin: '0 8px' }}>•</span>
          <Link to="/" style={{ fontWeight: 600 }}>Home</Link>
        </div>
      </div>
    </div>
  )
}
