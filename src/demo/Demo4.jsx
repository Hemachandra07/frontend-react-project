import React, { useState } from 'react'
import empdata from './data.json' 
export default function Demo4() {

  const[data,setData]=useState(empdata)

  return (
    <div>
      <table border={2}>
        <tr>
            <td>ID</td>
            <td>Name</td>
            <td>Salary</td>
        </tr>
        {
           data.map((emp,index)=>(
            <tr key={emp.id}> 

                <td>{emp.id}</td>
                <td>{emp.name}</td>
                <td>{emp.salary}</td>
            </tr>
         
           ) )
        }
      </table>
    </div>
  )
}
