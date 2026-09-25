import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import './style.css'

export default function Registration() {
  const navigate = useNavigate();
  const [role, setRole] = useState('Student');
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    gender: 'Male',
    department: 'CSE',
    designation: 'Assistant Professor',
    salary: '50000',
    contact: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
    if (message) setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      let url = "";
      let payload = {};

      if (role === 'Student') {
        url = "http://localhost:1235/adminapi/addstudent";
        payload = {
          id: formData.id ? Number(formData.id) : Math.floor(100000 + Math.random() * 900000),
          name: formData.name,
          gender: formData.gender,
          department: formData.department,
          email: formData.email,
          contact: formData.contact,
          password: formData.password
        };
      } else if (role === 'Faculty') {
        url = "http://localhost:1235/adminapi/addfaculty";
        payload = {
          id: formData.id ? Number(formData.id) : Math.floor(1000 + Math.random() * 9000),
          name: formData.name,
          gender: formData.gender,
          department: formData.department,
          designation: formData.designation,
          salary: formData.salary ? Number(formData.salary) : 50000,
          email: formData.email,
          contact: formData.contact,
          password: formData.password
        };
      } else if (role === 'Admin') {
        url = "http://localhost:1235/adminapi/registeradmin";
        payload = {
          username: formData.email,
          password: formData.password
        };
      }

      const response = await axios.post(url, payload);
      if (response.status === 201 || response.status === 200) {
        setMessage(`${role} account created successfully! Redirecting to login...`);
        setTimeout(() => {
          if (role === 'Student') navigate('/studentlogin');
          if (role === 'Faculty') navigate('/facultylogin');
          if (role === 'Admin') navigate('/adminlogin');
        }, 1500);
      }
    } catch (err) {
      setError(err.response?.data || err.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper fade-in">
      <div className="auth-card" style={{ maxWidth: '540px' }}>
        <div className="auth-header">
          <div className="auth-icon-badge" style={{ background: '#ecfdf5', color: '#10b981' }}>
            📝
          </div>
          <h2 className="auth-title">Create Account</h2>
          <p className="auth-subtitle">Register for your academic portal access</p>
        </div>

        <div className="role-tabs">
          <button
            type="button"
            className={`role-tab-btn ${role === 'Student' ? 'active' : ''}`}
            onClick={() => setRole('Student')}
          >
            Student
          </button>
          <button
            type="button"
            className={`role-tab-btn ${role === 'Faculty' ? 'active' : ''}`}
            onClick={() => setRole('Faculty')}
          >
            Faculty
          </button>
          <button
            type="button"
            className={`role-tab-btn ${role === 'Admin' ? 'active' : ''}`}
            onClick={() => setRole('Admin')}
          >
            Admin
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

        <form onSubmit={handleSubmit} className="auth-form">
          {role !== 'Admin' && (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label>ID Number</label>
                  <input
                    type="number"
                    name="id"
                    placeholder="e.g. 2100030001"
                    className="form-control"
                    value={formData.id}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    className="form-control"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label>Gender</label>
                  <select name="gender" className="form-control" value={formData.gender} onChange={handleChange}>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Others">Others</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Department</label>
                  <select name="department" className="form-control" value={formData.department} onChange={handleChange}>
                    <option value="CSE">CSE</option>
                    <option value="ECE">ECE</option>
                    <option value="EEE">EEE</option>
                    <option value="MECH">MECH</option>
                    <option value="CIVIL">CIVIL</option>
                    <option value="Others">Others</option>
                  </select>
                </div>
              </div>

              {role === 'Faculty' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label>Designation</label>
                    <select name="designation" className="form-control" value={formData.designation} onChange={handleChange}>
                      <option value="Assistant Professor">Assistant Professor</option>
                      <option value="Associate Professor">Associate Professor</option>
                      <option value="Professor">Professor</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Salary</label>
                    <input
                      type="number"
                      name="salary"
                      className="form-control"
                      value={formData.salary}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              )}

              <div className="form-group">
                <label>Contact Number</label>
                <input
                  type="tel"
                  name="contact"
                  placeholder="9876543210"
                  className="form-control"
                  value={formData.contact}
                  onChange={handleChange}
                  required
                />
              </div>
            </>
          )}

          <div className="form-group">
            <label>{role === 'Admin' ? 'Username / Email' : 'Email Address'}</label>
            <input
              type={role === 'Admin' ? 'text' : 'email'}
              name="email"
              placeholder={role === 'Admin' ? 'admin' : `${role.toLowerCase()}@college.edu`}
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="auth-btn-submit" disabled={loading}>
            {loading ? "Creating Account..." : `Register as ${role}`}
          </button>
        </form>

        <div className="auth-footer">
          <span>Already have an account? </span>
          <Link
            to={role === 'Student' ? '/studentlogin' : role === 'Faculty' ? '/facultylogin' : '/adminlogin'}
            style={{ fontWeight: 600 }}
          >
            Sign in
          </Link>
          <span style={{ margin: '0 8px' }}>•</span>
          <Link to="/" style={{ fontWeight: 600 }}>Home</Link>
        </div>
      </div>
    </div>
  );
}
