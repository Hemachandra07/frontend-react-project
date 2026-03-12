import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import './style.css'

import AdminLogin from "./AdminLogin";
import FacultyLogin from "./FacultyLogin";
import StudentLogin from "./StudentLogin";

export default function NavBar() {
  return (
    <div>

        <nav className="navbar">
          <Link to="/">Home</Link>
          <Link to="about">About</Link>
          <Link to="adminlogin">Admin Login</Link>
           <Link to="facultylogin">Faculty Login</Link>
            <Link to="studentlogin">Student Login</Link>
        </nav>

      <div className="content">
      <Routes>
        <Route path="/" element={<h2>Home Page</h2>} />
        <Route path="/about" element={<h2>About Page</h2>} />
        <Route path="/contact" element={<h2>Contact Page</h2>} />
        <Route path="search" element={<h3> Search Page</h3>}/>

        <Route path="adminlogin" element={<AdminLogin/>}/>
        <Route path="facultylogin" element={<FacultyLogin/>}/>
        <Route path="studentlogin" element={<StudentLogin/>}/>
        
        <Route path="*" element={<h3>Page Not Found</h3>}/>

      </Routes>
      </div>
    </div>
  );
}