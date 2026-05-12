import React from 'react'
import RightContent from './RightContent'
import LeftContent from './LeftContent'

const Page1content = (props) => {
  return (
    <div className='py-3   px-18 flex flex-nowrap items-centerh-[84.3vh] gap-1'>
    <LeftContent/>
    
    <RightContent users={props.users}  />
    
    </div>
  )
}

export default Page1content