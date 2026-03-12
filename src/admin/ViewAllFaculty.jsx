import React, { useState } from 'react'
import { useEffect } from 'react'
import axios from "axios"

export default function ViewAllFaculty() 
{
   const [data,setData] = useState([])
   const [message,setMessage] = useState("")
   const [error,setError] = useState("")

   const fetchFaculty = async () => {
       try
       {
        const response = await axios.get("http://localhost:1235/adminapi/viewallfaculty")
        if(response.status === 200)
            {
                setData(response.data)
            } 
            else
            {
                setMessage(response.data)
            }
       }
       catch(err)
       {
          setError(err.message)
       }
   }

    useEffect(() => {
        fetchFaculty()
    }, []);  // empty dependency (input) - runs only once
       

  return (
    <div>
      <h3 style={{textAlign:"center"}}><u>View All Faculty </u></h3>
      {
        error && <p style={{textAlign:"center",color:"red"}}>{error}</p>
      }
      <table border={1}>
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>GENDER</th>
            <th>DEPARTMENT</th>
            <th>DESIGNATION</th>
            <th>SALARY</th>
            <th>EMAIL</th>
            <th>CONTACT</th>
          </tr>
        </thead>
        <tbody>
          {
               data.map( (faculty,index) => (
                   <tr key={index}>
                    <td>{faculty.id}</td>
                    <td>{faculty.name}</td>
                    <td>{faculty.gender}</td>
                    <td>{faculty.department}</td>
                    <td>{faculty.designation}</td>
                    <td>{faculty.salary}</td>
                    <td>{faculty.email}</td>
                    <td>{faculty.contact}</td>
                   </tr>
               ))
          }
        </tbody>
      </table>
    </div>
  )
}