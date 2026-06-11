import React  from 'react'
import Error  from './NavPage/404'
import Header from './NavPage/header'
import Footer from './NavPage/footer'
import Home   from './NavPage/Home'
import About  from './NavPage/About'
import Contact from './NavPage/Contact' 
import { Route,Routes,Link } from 'react-router-dom'
import Male from './NavPage/Gender/Male'
import { Female } from './NavPage/Gender/Female'
import Course from './NavPage/Gender/Course'
import CoursesDetails from './NavPage/Gender/CoursesDetails'
const App =()=> {
  return (
    <div className="bg-black text-amber-50 h-screen w-full">
     {<Header/>}
     <Routes>
      <Route path='/home' element={<Home/>} >
            <Route path='male' element={<Male/>}/>
            <Route path='female' element={<Female/>}/>
      </Route>

      <Route path='/course' element={<Course/>}/>
      <Route path='/course/:CourseId' element={<CoursesDetails/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/contact us' element={<Contact/>}/>
      <Route path='*' element={<Error/>}/>
     </Routes>

     <div className="flex"></div>
     {<Footer/>} 
    </div>
  )
}
export default App