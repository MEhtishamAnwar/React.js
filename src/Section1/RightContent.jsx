import React from 'react';
import RightCard from './RightCard';
const RightContent = (props) => {
  
 
  return (
    <div id='right' className='h-full w-full flex rounded-6xl overflow-x-auto flex-nowrap ml-30' >
  {props.users.map(function(elem){
    return <RightCard color={elem.color}  img={elem.img}  tag={elem.tag} id={elem.id} />
  })}

    
     
    </div>
  )
}

export default RightContent