import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './style.css'

export default function AdminLogin() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [formdata, setFormdata] = useState({
    username: "",
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
      const response = await axios.post("http://localhost:1235/adminapi/login", formdata)
      if (response.status === 200) {
        const authData = response.data
        const token = authData.token || null
        const userData = authData.user || authData
        login('admin', userData, token)
        navigate("/admin/home")
      } else {
        setError("Invalid admin username or password.")
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
          <div className="auth-icon-badge" style={{ background: '#f5f3ff', color: '#8b5cf6' }}>
            🛡️
          </div>
          <h2 className="auth-title">Admin Console</h2>
          <p className="auth-subtitle">Sign in with institutional administrative credentials</p>
        </div>

        {error && (
          <div className="alert-box alert-danger">
            <span>⚠️</span> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              className="form-control"
              placeholder="e.g. admin"
              value={formdata.username}
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
            {loading ? "Signing In..." : "Sign In to Admin Console"}
          </button>
        </form>

        <div className="auth-footer">
          <span>Need access? </span>
          <Link to="/register" style={{ fontWeight: 600 }}>Create an account</Link>
          <span style={{ margin: '0 8px' }}>•</span>
          <Link to="/" style={{ fontWeight: 600 }}>Back to Home</Link>
        </div>
      </div>
    </div>
  )
}