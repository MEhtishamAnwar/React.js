import React, { useState } from 'react'
import axios from 'axios'

 
const Api = () => {
  const[value,setValue]=useState([])
     
   
     const dataChange= async()=>{
  const response=  await   axios.get("https://jsonplaceholder.typicode.com/todos/")
  console.log(response)
  console.log(response.data)
setValue(response.data)
// .then((response)=>response.json())
// .then((data)=>console.log(data)) 
    // const response1=  await fetch("https://jsonplaceholder.typicode.com/todos/")
    // const data= await response1.json()
    // console.log(data)
    // setValue(data)
    // .then((response)=>response.json())
    // .then((data)=>console.log(data))    
    }
  return (
    <div>
  <button onClick={dataChange}>click </button>
  {
    value.map((indexedDB, indx) =>  {
      return(
        <div key={indexedDB.id} className='bg-gray-300 p-4 m-2 rounded-md flex justify-center items-center flex-col'>
          <h1>Roll No {indexedDB.id}</h1>
          <h1>{indexedDB.title}</h1>
        </div>
      )
    })
  }
    </div>
  )
}

export default Api