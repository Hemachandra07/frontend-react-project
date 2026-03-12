import React from 'react'

export default function Demo3() {
    const courses=["OS","AWS","DEVOPS","FSAD","DBMS"]
      const count=courses.length 
     
  return (
    <div>
      <h1>No of Courses = {count}</h1>
      <table border={2}>
        <tr>
            <th>SI.NO</th>
            <th>Courses</th>
        </tr>
      

      {
        courses.map((value,index)=>(
            <tr key={index}>
                <td>{index+1}</td>
                <td>{value}</td>
            </tr>

        ) )
      }
      </table>
    </div>
  )
}


//arrow function is also called as anonimous function