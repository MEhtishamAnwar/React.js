import React from 'react'
import { Link,Outlet } from 'react-router-dom'
const Home = () => {
  return (
    <div className='flex justify-center gap-5'>
      <Link to='/home/male' >Male</Link>
      <Link to='/home/female' >Female</Link>
            <Outlet/>  
    </div>
  )
}
export default Home