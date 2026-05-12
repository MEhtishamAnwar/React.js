import React from 'react'

const Navbar = () => {
  return (                        
    <div className='flex justify-between items-center py-8 px-16'>
        <h4 className='bg-black text-white flex items-center  py-2 px-4 uppercase rounded-3xl h-10 text-xs hover:bg-black/50 hover:text-black '>Target Audiance</h4>
        <button className='bg-gray-200 py-3 uppercase px-4 rounded-full tracking-widest text-xs hover:bg-gray-300'> Digital Banking Platform</button>
    
    </div>
  )
}

export default Navbar