import axios from 'axios'
import React, { useState } from 'react'


export default function FacultyLogin() {

const [formdata,setFormdata]=useState({
  email:"",
  password:""
})

function handleChange(e){
  const{name,value}=e.target
  setFormdata({...formdata,[name]:value})
}

const handleSubmit=async (e)=>{
  e.preventDefault()
  try{
    const response=await axios.post("http://localhost:1235/facultyapi/login",formdata)
    if(response.status==200){
       sessionStorage.setItem("isFaculty",true)
    }else{
      alert("Login Failed")
    }


  }catch(err){
    alert(err.response.data)
  }
}

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Faculty Login</h2>
        <label >Email</label>
        <input type="email" name='email' required onChange={handleChange}></input>
        <br/><br/>
        <label>Password</label>
        <input type="password" name='password' required onChange={handleChange}/>
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}
