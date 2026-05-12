import React from 'react'
import Navbar from '../Section2/navbar'
import Page1content from '../Section1/Page1content'


const Section1 = (props) => {
  
  return (
    <div className='h-screen   '>
     

      <Navbar/>
      <Page1content users={props.users} />
    </div>
     
  )
}

export default Section1