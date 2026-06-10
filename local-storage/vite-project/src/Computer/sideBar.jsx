import React from 'react'

const SideBar = () => {
    localStorage.setItem("rollno1"," pass")
        localStorage.setItem("rollno2"," fail") 
        localStorage.removeItem("rollno2")
        localStorage.clear()
        localStorage.setItem("rollno3"," pass") 
        const data = localStorage.getItem("rollno3","rollno3")
   console.log(data)
  const user={
    userName:"ali",
    age:21,
    city:"the quick brown fox jumps over the lazy dog"
  }
    localStorage.setItem("user",JSON.stringify(user))
    const userData=JSON.parse(localStorage.getItem("user"))
    console.log(userData)
    




  return (
    <div className="bg-gray-200 p-4 h-200 w-1/4">
      sideBar
    </div>
  )
}

export default SideBar