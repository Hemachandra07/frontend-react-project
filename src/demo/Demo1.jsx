import React, { useState } from 'react'

export default function Demo1() {
//count is a state variable and setCount is a method to modify the count value
  const [count,setCount]=useState(0);

//event handlig -> onClick, etc..
  function increment(){
    // alert("increment")
    setCount(count+1)

  }

  function decrement(){
    // alert("decrement")
    setCount(count-1)
    
  }


  return (
    <div>
      <h2>Counter App</h2>
      COUNT ={ count}
      <br/> <br/>
      <button onClick={increment}>increment</button>
      <br/> <br/>
      <button onClick={decrement}>decrement</button>
    </div>
  )
}
