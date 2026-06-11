import React from 'react'
import { Link } from 'react-router-dom'
import Home from './Home'
const Header = () => {
    
  return (
    <div className= 'bg-cyan-500 text-white flex justify-end   font-bold h-10 w-full pr-10 '>
        <nav>
            <Link className='p-5' to='/home'>Home</Link>
            <Link  className='p-5' to='/about'>About</Link>
            <Link  className='p-5' to='/contact us'>Contact</Link>
            <Link to='/course'>Course</Link>
            
        </nav>
    </div>

  )
}

export default Header