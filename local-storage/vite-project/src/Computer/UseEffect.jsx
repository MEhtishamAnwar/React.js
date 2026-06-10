import React from 'react'
import {useState} from 'react'
import { useEffect } from 'react'
const UseEffect = () => {
    const [a,setA]=useState(0)
    const [b,setB]=useState(0)
  const aValue=()=>{
    setA(a+10)
  }
    const bValue=()=>{
    setB(b-10)
  }
useEffect(()=>{
    aValue();
    console.log("useEffect is called")  },[])
  return (
    <div>
        <h1 className="text-2xl font-bold m-5 bg-black text-white w-1/4 flex justify-center align-baseline rounded-2xl" >{a}</h1>
   <button className="btn btn-primary bg-gray-700 p-5   m-5 text-white rounded-2xl"  onClick={()=>{
   aValue();
   }
   }>increase</button>
   <h1 className="text-2xl font-bold m-5 bg-black text-white w-1/4 flex justify-center align-baseline rounded-2xl" >{b}</h1>
   <button className="btn btn-primary bg-gray-700 p-5 m-5 text-white rounded-2xl "  onClick={()=>{
    bValue();
   }}> decrease</button>
    </div>
  )
}

export default UseEffect