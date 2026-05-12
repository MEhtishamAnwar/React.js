import React from 'react'
import { FaArrowUpRightFromSquare } from "react-icons/fa6";


const LeftContent = () => {
  return (
    <div className='h-full  flex flex-col justify-between pt-5 w-70  pr-8'>
    <div >
      <h3 className='text-4xl font-bold leading-[1.2]'>Prospective <br /> <span>Customer</span>  <br />Segmentation</h3>
      <p className="text-lg text-gray-700 w-100">Lorem ipsum dolor sit amet this is new brand of our company  consectetur adipisicing elit it Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sed, tempora. continue free ly . Laboriosam voluptas laudantium officia nihil atque?</p>
    </div>
   <div className='text-3xl pt-30'>
      <FaArrowUpRightFromSquare/>

   </div>


    </div>
  )
}

export default LeftContent