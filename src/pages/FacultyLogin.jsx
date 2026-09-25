import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './style.css'

export default function FacultyLogin() {
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
      const response = await axios.post("http://localhost:1235/facultyapi/login", formdata)
      if (response.status === 200) {
        const authData = response.data
        const token = authData.token || null
        const userData = authData.user || authData
        login('faculty', userData, token)
        navigate("/faculty/home")
      } else {
        setError("Invalid faculty email or password.")
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
          <div className="auth-icon-badge" style={{ background: '#e0f2fe', color: '#0284c7' }}>
            👨‍🏫
          </div>
          <h2 className="auth-title">Faculty Portal</h2>
          <p className="auth-subtitle">Sign in to evaluate student certification requests</p>
        </div>

        {error && (
          <div className="alert-box alert-danger">
            <span>⚠️</span> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Academic Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="faculty@college.edu"
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
            {loading ? "Signing In..." : "Sign In to Faculty Portal"}
          </button>
        </form>

        <div className="auth-footer">
          <span>Not registered yet? </span>
          <Link to="/register" style={{ fontWeight: 600 }}>Register here</Link>
          <span style={{ margin: '0 8px' }}>•</span>
          <Link to="/" style={{ fontWeight: 600 }}>Home</Link>
        </div>
      </div>
    </div>
  )
}
