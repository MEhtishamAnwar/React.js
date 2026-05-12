import React from 'react'

const Card = (pro) => {
   console.log(pro)
 
  return (
    <div className="container">
     
      <div className="card">
      <h2>

        {pro.name } age {pro.age}
      </h2>
       <img src={pro.pic} alt="" />
      
      
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed, commodi.</p>
         {/* <img src="https://images.unsplash.com/photo-1768479397383-49806c934167?q=80&w=464&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" /> */}
       
         <button><a href={pro.pic}>click here</a></button>
         </div>
    </div>
         )

  
}
export default Card;
