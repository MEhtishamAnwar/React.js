import React from 'react'

const RightCard = (props) => {
  console.log(props.color)
  return (
    <div className=' h-100 w-50 m-7 relative rounded-4xl overflow-hidden shrink-0'>
        <img className='h-100 w-full object-cover rounded-4xl  ' src={props.img} alt="" />
         <div className="absolute top-0 left-0 w-full h-full  p-6 flex flex-col justify-between bg-black/40" >
            <h2 className='bg-white rounded-full h-10 w-9  flex justify-center items-center text- font-bold'>{props.id}</h2>
            <div className="">
                <p className='text-shadow-black text-lg leading-[1.1]  text-gray-100   mt-26'>Lorem ipsum, this brand is new in market  they have high demand in market of all uk countries dolor sit amet consec alias sit.
                </p>
            </div>
           
            <div className='flex   justify-between'>
              <button
               style={{backgroundColor:props.color}}  
               className='bg-blue-700/70 text-white rounded-full p-2 cursor-pointer'>
                {props.tag}
              </button>
            <button className='bg-blue-700 text-white rounded-full p-2 h-10 w-10 font-bold text-4xl flex items-center justify-center pb-4 cursor-pointer'><i >+</i></button>
            </div>
            
             </div>
    </div>
  )
}

export default RightCard