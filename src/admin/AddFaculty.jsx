import React, { useState } from 'react'
import axios from "axios"
import './admin.css'

export default function AddFaculty() {
  const [formdata, setFormData] = useState({
    id: "",
    name: "",
    gender: "",
    department: "",
    designation: "",
    salary: "",
    email: "",
    contact: "",
    password: ""
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formdata, [name]: value })
    if (message) setMessage("")
    if (error) setError("")
  }

  const handleReset = () => {
    setFormData({
      id: "",
      name: "",
      gender: "",
      department: "",
      designation: "",
      salary: "",
      email: "",
      contact: "",
      password: ""
    })
    setMessage("")
    setError("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")
    setError("")

    try {
      const response = await axios.post("http://localhost:1235/adminapi/addfaculty", formdata)
      if (response.status === 201 || response.status === 200) {
        setMessage(response.data || "Faculty added successfully!")
        setFormData({
          id: "",
          name: "",
          gender: "",
          department: "",
          designation: "",
          salary: "",
          email: "",
          contact: "",
          password: ""
        })
      }
    } catch (err) {
      setError(err.response?.data || err.message || "Failed to add faculty.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="admin-dashboard fade-in">
      <div className="form-card">
        <div className="form-header">
          <h3 className="admin-title" style={{ fontSize: '1.4rem' }}>👨‍🏫 Add New Faculty</h3>
          <p className="admin-subtitle">Register a faculty evaluator for review of student certifications</p>
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

        <form onSubmit={handleSubmit}>
          <div className="form-grid-2">
            <div className="form-group">
              <label>Faculty ID (Numeric)</label>
              <input
                type="number"
                name="id"
                placeholder="e.g. 501"
                className="form-control"
                value={formdata.id}
                required
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="Dr. Sarah Connor"
                className="form-control"
                value={formdata.name}
                required
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Gender</label>
              <select
                name="gender"
                className="form-control"
                value={formdata.gender}
                required
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Others">Others</option>
              </select>
            </div>

            <div className="form-group">
              <label>Department</label>
              <select
                name="department"
                className="form-control"
                value={formdata.department}
                required
                onChange={handleChange}
              >
                <option value="">Select Department</option>
                <option value="CSE">CSE</option>
                <option value="ECE">ECE</option>
                <option value="EEE">EEE</option>
                <option value="MECH">MECH</option>
                <option value="CIVIL">CIVIL</option>
                <option value="Others">Others</option>
              </select>
            </div>

            <div className="form-group">
              <label>Designation</label>
              <select
                name="designation"
                className="form-control"
                value={formdata.designation}
                required
                onChange={handleChange}
              >
                <option value="">Select Designation</option>
                <option value="Assistant Professor">Assistant Professor</option>
                <option value="Associate Professor">Associate Professor</option>
                <option value="Professor">Professor</option>
                <option value="Dean">Dean</option>
                <option value="Others">Others</option>
              </select>
            </div>

            <div className="form-group">
              <label>Monthly Salary (INR)</label>
              <input
                type="number"
                name="salary"
                placeholder="75000"
                className="form-control"
                value={formdata.salary}
                required
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="faculty@college.edu"
                className="form-control"
                value={formdata.email}
                required
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Contact Number</label>
              <input
                type="tel"
                name="contact"
                placeholder="9876543210"
                className="form-control"
                value={formdata.contact}
                required
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group" style={{ marginTop: '1.25rem' }}>
            <label>Account Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              className="form-control"
              value={formdata.password}
              required
              onChange={handleChange}
            />
          </div>

          <div className="form-button-row">
            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? "Adding..." : "Add Faculty"}
            </button>
            <button type="button" onClick={handleReset} className="btn-reset">
              Reset Form
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}