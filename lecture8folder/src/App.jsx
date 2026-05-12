
import React,{Children, useState} from 'react'

import Page3 from './page3'
const App = () => {
  const[title,setTitle]=useState("")
  const formSubmmited=(e)=>{
    e.preventDefault();
     setTitle()
     
    console.log(title)
    console.log('button was clicke',title )
  } 
   const [num, setNum] = useState({name:"ehtisham ",age:21,})
  const [array, setarray] = useState([12,13,14,15,16, " ",])
  return (
   <div className="m-12">
    <form className='justify-center  ' onSubmit={(e)=>{
      formSubmmited(e)
    }}>
      <input className='p-4 border-amber-600 bg-gray-400 rounded-2xl'
       type="text"
        name="userName" placeholder='enter the name'
         id=""
         value={title}
         onChange={(e)=>{
        // console.log("thanks",)
        if (e.target.value>=18) {
          alert("eligible")
          
        }
        setTitle(e.target.value)
       

      }}/>
      <button className='p-4 bg-red-100 rounded-2xl ml-1'  >submit</button>
    </form>  
    <h1 className="bg-gray-600 m-6 text-amber-50  capitalize text-3xl font-bold w-fit p-19 pr-36 flex justify-center rounded-2xl">name: {title}  <br />age: {num.age } <br /> {array} <br /> 
    </h1>
    <button className='bg-amber-200 m-10 p-4 rounded-2xl border-2 capitalize cursor-pointer' 
    onClick={()=>{
      setNum(prev=>(false))
      const newArray=[...array]
      newArray.push(["thanks "])
      setarray(newArray)
      const newData={...num}
      newData.name="hassan";
      newData.age=43;
      // setNum({name:"ali hassan", age:32})
      console.log(newData)
      setNum(newData)
      // setNum(num+1)
    }}
    >increase</button>
    <button className='bg-amber-200 m-10 p-4 rounded-2xl border-2 capitalize cursor-pointer'
       onClick={()=>{
        
        setNum({name:"ehtisham ",age:21})
         const newArray=[...array]
      newArray.pop()
      setarray(newArray)
  // setNum(num-1)
    }}
    >decrease</button>
    < Page3/>
   </div>
  )

}
export default App   