import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './style.css'

export default function AdminLogin() 
{
   const navigate=useNavigate()

    const [formdata,setFormdata] = useState({
      username:"",
      password:""
    })

    function handleChange(e)
    {
       //console.log(e.target.value)
       const {name,value} =  e.target
       //spread operator -> it iterates 
       setFormdata({...formdata,[name]:value})                
    }
    
//e == event
    const handleSubmit = async (e) => 
   {
      e.preventDefault()
      try
      {
         const response = await axios.post("http://localhost:1235/adminapi/login",formdata)
          if(response.status==200)
          {
            // alert("Login Valid")
            sessionStorage.setItem("isAdmin",true)
            navigate("/admin/home")
            
          }else{
            alert("Login Fail")
          }
      }
      catch(err)
      {
         alert(err.response.data)
      }
    }
   return (
    <div className="login-container">
        <h2 className="login-title">Admin Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
                <label>UserName</label>
                <input type="text" name='username' onChange={handleChange} required/>
            </div>
            <div className="form-group">
                <label>Password</label>
                <input type="password" name='password' onChange={handleChange} required/>
            </div>
            <button type="submit" className="login-btn">Login</button>
        </form>
    </div>
  )
}