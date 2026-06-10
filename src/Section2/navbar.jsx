import React from 'react'

const Navbar = () => {
  return (                        
    <div className='fixed inset-x-0 top-0 z-50 w-full bg-white/95 backdrop-blur border-b border-gray-200 shadow-sm'>
      <div className='mx-auto flex max-w-screen-xl justify-between items-center py-4 px-6 md:px-16'>
        <h4 className='bg-black text-white flex items-center py-2 px-4 uppercase rounded-3xl h-10 text-xs hover:bg-black/50 hover:text-black'>Target Audiance</h4>
        <button className='bg-gray-200 py-3 uppercase px-4 rounded-full tracking-widest text-xs hover:bg-gray-300'>Digital Banking Platform</button>
      </div>
    </div>
  )
}

export default Navbar