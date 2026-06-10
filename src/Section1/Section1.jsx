import React from 'react'
import Page1content from '../Section1/Page1content'


const Section1 = (props) => {
  
  return (
    <div className='h-screen'>
      <Page1content users={props.users} />
    </div>
     
  )
}

export default Section1