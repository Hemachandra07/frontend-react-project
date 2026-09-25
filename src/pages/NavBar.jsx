import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import './style.css';

import AdminLogin from "./AdminLogin";
import FacultyLogin from "./FacultyLogin";
import StudentLogin from "./StudentLogin";
import Registration from "./Registration";

function HomePage() {
  return (
    <div className="fade-in">
      <section className="hero-section">
        <div className="hero-badge">
          <span>✨</span> Streamlined Academic Verification
        </div>
        <h1 className="hero-title">
          Verify, Track & Issue <br />
          <span className="hero-gradient-text">Student Certifications</span>
        </h1>
        <p className="hero-desc">
          CertifyHub provides a seamless ecosystem for students to upload professional credentials,
          faculty to review and validate applications, and administrators to govern issuance.
        </p>
        <div className="hero-cta-group">
          <Link to="/studentlogin" className="btn-primary-lg">Student Portal →</Link>
          <Link to="/facultylogin" className="btn-outline-lg">Faculty Portal →</Link>
          <Link to="/adminlogin" className="btn-outline-lg">Admin Console →</Link>
        </div>
      </section>

      <div className="feature-grid">
        <div className="feature-card">
          <div className="feature-icon-box" style={{ background: '#e0e7ff', color: '#4f46e5' }}>
            🎓
          </div>
          <h3 className="feature-title">For Students</h3>
          <p className="feature-desc">
            Submit your certifications from Microsoft, AWS, Cisco, and more. Track your application status live and access your verified certificate documents.
          </p>
          <Link to="/studentlogin" className="feature-link">Access Student Portal →</Link>
        </div>

        <div className="feature-card">
          <div className="feature-icon-box" style={{ background: '#e0f2fe', color: '#0284c7' }}>
            👨‍🏫
          </div>
          <h3 className="feature-title">For Faculty</h3>
          <p className="feature-desc">
            Review submitted student certification requests with full credential metadata. Evaluate and approve or reject submissions in real-time.
          </p>
          <Link to="/facultylogin" className="feature-link">Review Submissions →</Link>
        </div>

        <div className="feature-card">
          <div className="feature-icon-box" style={{ background: '#f5f3ff', color: '#8b5cf6' }}>
            🛡️
          </div>
          <h3 className="feature-title">For Administrators</h3>
          <p className="feature-desc">
            Full governance across all enrolled students, assigned faculty members, and institutional certifications with revocation authority.
          </p>
          <Link to="/adminlogin" className="feature-link">Manage System →</Link>
        </div>
      </div>
    </div>
  );
}

function AboutPage() {
  return (
    <div className="about-section fade-in">
      <div className="about-card">
        <h2>About CertifyHub</h2>
        <p>
          CertifyHub is an enterprise-grade academic certification management portal engineered to bridge students, faculty evaluators, and academic administrators into one centralized, transparent workflow.
        </p>
        <p>
          Our platform simplifies the verification of industry certifications, ensures institutional standards, and empowers students to showcase verified professional milestones.
        </p>

        <div className="role-highlights">
          <div className="role-highlight-box">
            <h3>⚡ Fast Approvals</h3>
            <p>Direct pipeline between student submissions and faculty evaluators.</p>
          </div>
          <div className="role-highlight-box">
            <h3>🔒 Verified Credentialing</h3>
            <p>Unique certificate URL generation and centralized administrative auditing.</p>
          </div>
          <div className="role-highlight-box">
            <h3>📊 Live Tracking</h3>
            <p>Real-time status indicators (Pending, Approved, Rejected) for full transparency.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function NavBar() {
  return (
    <div>
      <div className="public-nav-wrapper">
        <nav className="navbar">
          <div className="nav-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/about" className="nav-link">About</Link>
          </div>

          <div className="nav-auth-buttons">
            <Link to="/studentlogin" className="nav-login-btn">Student Login</Link>
            <Link to="/facultylogin" className="nav-login-btn">Faculty Login</Link>
            <Link to="/adminlogin" className="nav-login-btn">Admin Login</Link>
            <Link to="/register" className="nav-register-btn">Register</Link>
          </div>
        </nav>
      </div>

      <div className="content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/facultylogin" element={<FacultyLogin />} />
          <Route path="/studentlogin" element={<StudentLogin />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </div>
    </div>
  );
}