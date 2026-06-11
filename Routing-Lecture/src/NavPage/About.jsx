import React from 'react'
import { useNavigate } from 'react-router-dom'
const About = () => {
  const navigate =useNavigate()
  const aboutReload=()=>{
    
    // navigate('/home')
    navigate(+1)
  }
  return (
    <div>
  <h1 className=''bg-gray-500 >About</h1>
  <button className='bg-gray-500  text-black pl-3 pr-3 cursor-pointer rounded-2xl font-bold capitalize' onClick={aboutReload} >click here</button>   

    </div>
  )
}
export default About 