import React from 'react'
import Section1 from './Section1/Section1'
import Navbar from './Section2/navbar'
import Section2 from './Section2/Section2'
import { Users } from 'lucide-react'

const App = () => {
   const users=[
    {
      img:'https://media.istockphoto.com/id/2162785149/photo/she-is-proud-of-her-work.jpg?s=1024x1024&w=is&k=20&c=RnHdQGr_qNL3VfhcKGAzrnM0LxFkIJ_vk0Hvq3tokyA=',
      intro: '' ,
      tag:'satisfied',
      id:'1',
      color:'lightgreen'
    },
        {
      img:'https://images.unsplash.com/photo-1746046936854-b3432592b1a1?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      intro: '' ,
      tag:'undesirved',
      id:'2',
      color:'red'
    },
        {
      img:'https://images.unsplash.com/photo-1697931537292-745ec06fb835?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      intro: '' ,
      tag:'unsatisfied',
      id:'3',
      color:'lightgreen'
    },
      {
      img:'https://images.unsplash.com/photo-1748680099075-b52ee887c690?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      intro: '' ,
      tag:'satisfy',
      id:'4',
      color:'lightgreen'

    }
    
   ];

  return (
    <div className="relative">
      <Navbar />
      <div className="pt-28">
        <Section1 users={users}/>
        <Section2/>
      </div>
    </div>
  )
}

export default App