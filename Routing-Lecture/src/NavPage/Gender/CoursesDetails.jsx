import React from 'react'
import { useParams } from 'react-router-dom'
const CoursesDetails = () => {
    const dataID= useParams()
    console.log(dataID.CourseId)
  return (
    <div className='capitilize text-2xl text bg-red-400  '>CoursesDetails     {dataID.CourseId}</div>
  )
}
export default CoursesDetails