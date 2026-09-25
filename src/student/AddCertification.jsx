import React, { useState } from 'react'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import './student.css'

export default function AddCertification() {
  const { user } = useAuth()
  const studentInfo = user || JSON.parse(sessionStorage.getItem("studentInfo") || "{}")

  const [formData, setFormData] = useState({
    category: '',
    company: '',
    title: '',
    level: '',
    examtype: '',
    certificateid: '',
    issueddate: '',
    expiarydate: ''
  })
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    if (message) setMessage('')
    if (error) setError('')
  }

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      if (selectedFile.size > 10 * 1024 * 1024) {
        setError("File size exceeds 10MB limit. Please choose a smaller file.")
        setFile(null)
        e.target.value = ""
        return
      }
      setFile(selectedFile)
      if (error) setError('')
    }
  }

  const handleReset = () => {
    setFormData({
      category: '',
      company: '',
      title: '',
      level: '',
      examtype: '',
      certificateid: '',
      issueddate: '',
      expiarydate: ''
    })
    setFile(null)
    setMessage('')
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!studentInfo?.id) {
      setError("Student session not detected. Please log out and sign in again.")
      return
    }

    if (!file) {
      setError("Please select a certificate document (PDF or image) to upload.")
      return
    }

    setLoading(true)
    setMessage('')
    setError('')

    const submitData = new FormData()
    submitData.append('file', file)
    submitData.append('category', formData.category)
    submitData.append('company', formData.company)
    submitData.append('title', formData.title)
    submitData.append('level', formData.level)
    submitData.append('examtype', formData.examtype)
    submitData.append('certificateid', formData.certificateid)
    submitData.append('issueddate', formData.issueddate)
    submitData.append('expiarydate', formData.expiarydate)
    submitData.append('studentId', studentInfo.id)

    try {
      const res = await axios.post("http://localhost:1235/studentapi/applywithfile", submitData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      if (res.status === 200 || res.status === 201) {
        setMessage("Certification and document uploaded successfully! Awaiting faculty review.")
        handleReset()
      }
    } catch (err) {
      setError("Failed to submit application: " + (err.response?.data || err.message))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="student-dashboard fade-in">
      <div className="form-card" style={{ maxWidth: '800px' }}>
        <div className="form-header">
          <h3 className="admin-title" style={{ fontSize: '1.4rem' }}>➕ Apply for Certification Verification</h3>
          <p className="admin-subtitle">
            Upload your professional credential document for departmental faculty evaluation
          </p>
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
              <label>Domain / Category</label>
              <input
                type="text"
                name="category"
                placeholder="e.g. Cloud Computing, AI, Web Dev"
                className="form-control"
                value={formData.category}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Certifying Company / Vendor</label>
              <input
                type="text"
                name="company"
                placeholder="e.g. AWS, Microsoft, Google, Cisco"
                className="form-control"
                value={formData.company}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Certification Title</label>
              <input
                type="text"
                name="title"
                placeholder="e.g. AWS Certified Solutions Architect"
                className="form-control"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Proficiency Level</label>
              <select
                name="level"
                className="form-control"
                value={formData.level}
                onChange={handleChange}
                required
              >
                <option value="">Select Level</option>
                <option value="Foundational">Foundational</option>
                <option value="Associate">Associate</option>
                <option value="Professional">Professional</option>
                <option value="Expert">Expert</option>
              </select>
            </div>

            <div className="form-group">
              <label>Examination Type</label>
              <input
                type="text"
                name="examtype"
                placeholder="e.g. Proctored Online, Pearson VUE"
                className="form-control"
                value={formData.examtype}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Official Certificate ID / Serial Number</label>
              <input
                type="text"
                name="certificateid"
                placeholder="e.g. CERT-AWS-84920"
                className="form-control"
                value={formData.certificateid}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Date of Issuance</label>
              <input
                type="date"
                name="issueddate"
                className="form-control"
                value={formData.issueddate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Expiration Date</label>
              <input
                type="date"
                name="expiarydate"
                className="form-control"
                value={formData.expiarydate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label>Upload Certificate Document (PDF or Image - Max 10MB)</label>
              <input
                type="file"
                accept=".pdf, image/*"
                className="form-control"
                onChange={handleFileChange}
                required
              />
              {file && (
                <div style={{ marginTop: '0.5rem', fontSize: '0.88rem', color: 'var(--primary)', fontWeight: 600 }}>
                  📎 Selected File: {file.name} ({(file.size / 1024).toFixed(1)} KB)
                </div>
              )}
            </div>
          </div>

          <div className="form-button-row">
            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? "Uploading & Submitting..." : "Submit Application with Certificate"}
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
