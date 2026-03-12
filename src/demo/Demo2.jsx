import React, { useState } from 'react'

export default function Demo2() {
     {/* flag is a state object and setFlag is a function to modify the flag value */}
      const [flag,setFlag]=useState(false)

      function change(){
        setFlag(!flag)
      }
  return (
    <div>
        <h1>Conditional Rendering</h1>
       <button onClick={change}>Change</button>
       <br/><br/>
       {
        flag?<b>KLU</b>:<b>KLEF</b>
       }
    </div>
  )
}
