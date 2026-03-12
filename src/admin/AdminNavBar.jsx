

import React from 'react'
import { Link, Route, Routes, useNavigate } from 'react-router-dom'
import AdminHome from './AdminHome'
import AddStudent from './AddStudent'
import ViewAllStudents from './ViewAllStudents'
import './admin.css'
import AddFaculty from './AddFaculty'
import ViewAllFaculty from './ViewAllFaculty';

export default function AdminNavBar() 
{
    const navigate = useNavigate()

      const adminLogout = () => {
             //removeItem--> remove only removes particular data

            sessionStorage.removeItem("isAdmin")
            navigate("/adminlogin")
            window.location.reload()
      }

  return (
    <div>

        <nav className='navbar'>
            <Link to="/admin/home">Home</Link>
            <Link to="/admin/addstudent">Add Student</Link>
            <Link to="/admin/viewallstudents">View All Students</Link>
             <Link to="admin/addfaculty">Add Faculty</Link>
            <Link to="admin/viewallfaculty">View All Faculty</Link>
            
        <button onClick={adminLogout} className="logout-btn">Logout</button>

        </nav>

     <Routes>
    
      <Route path="admin/home" element={<AdminHome/>}  />
      <Route path="admin/addstudent" element={<AddStudent/>}/>
      <Route path="admin/viewallstudents" element={<ViewAllStudents/>}/>
      <Route path="admin/addfaculty" element={<AddFaculty/>}/>
      <Route path="admin/viewallfaculty" element={<ViewAllFaculty/>}/>

     </Routes>


    </div>
  )
}