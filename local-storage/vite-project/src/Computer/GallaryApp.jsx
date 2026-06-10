
import axios, { Axios } from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
const GallaryApp = () => {
  let printData="loading"
  const [print,setPrint]=useState("")
  const [data,setData]=useState([])
  const [page,setPage]=useState(1)
        const getData=async(pageNumber = 1)=>{
           setPrint("loading...")
           setData([])
          const response1= await axios.get(`https://picsum.photos/v2/list?page=${pageNumber}&limit=4`)
          const data=response1.data
          console.log(data)
          setData(data)
          setPrint("")
           setData((prev) => [...prev, ...data]);
        // try {  
        //   const response =await  fetch('https://picsum.photos/v2/list?page=2&limit=100');
        //   const data = await response.json();
        //   console.log(data);
        //   setData(data)
        //         alert("data is fetching")
        // } catch (error) {
        // alert("error loading")
        //   console.error('Error fetching data:', error);
        // }
      // };
        // } catch (error) {
        //   console.error('Error fetching data:', error);
        // }
      } 
const handleScroll = () => {
  if (
    window.innerHeight +
      document.documentElement.scrollTop >=
    document.documentElement.scrollHeight - 10
  ) {
    setPage((prev) => prev + 1);
  }
};

            useEffect(()=>{
                getData()
              },[])
              const prev=async()=>{
                if(page>1){
                  setData([])
                  printData="loading"
                  setPrint("loading....")
                  const response1= await axios.get(`https://picsum.photos/v2/list?page=${page - 1}&limit=10`)
           const data=response1.data
           console.log(data)
           setPage(page - 1)
            setData(data)
            setPrint("")
                }
                else{
                  alert("you entered the incorrect page number")
                }
              }
              const next=async()=>{
                  setData([])
                  setPrint("loading....") 
                    const response1= await axios.get(`https://picsum.photos/v2/list?page=${page + 1}&limit=5`)
             const data=response1.data
             console.log(data)
             setPage(page + 1)
             setData(data)
              setPrint("")
              }
              const handlePageChange=async(pageNum)=>{
                setPage(pageNum)
                setData([])
                setPrint("loading....")
                const response1= await axios.get(`https://picsum.photos/v2/list?page=${pageNum}&limit=5`)
                const data=response1.data
                console.log(data)
                setData(data)
                setPrint("")
              }
              const page1=async(pageNum)=>{
                setPage(pageNum)
                        const response1= await axios.get(`https://picsum.photos/v2/list?page=${page===1}&limit=5`)
             const data=response1.data
            //  console.log(data)
            //  setPage(page )
              setData(data)
              setPrint("")
              }
  return (
    <div className='bg-black text-white   w-full'>
      <input type="image" src="" alt="" />
  
       <div className="mt-4 flex flex-wrap gap-4 justify-center  h-full">
         <div className=" italic h-full w-full flex items-center justify-center p-4 font-bold  "><h1>{print}</h1></div>
          {data.map((item) => ( 
            <div key={item.id} className="flex flex-col items-center gap-2 bg-white/10 rounded-xl p-2">
              <a href={item.download_url} target="_blank" rel="noopener noreferrer">
                <img
                  src={item.download_url}
                  alt={item.author}
                  className="h-28 w-48 rounded-lg object-cover"
                          />
              </a>
              <span className=" text-green-300 font-semibold  ">{item.author}</span>
              <span className="text-lg font-bold">${item.id}</span>
            </div>
          ))}
         </div>
         <div className=" flex gap-4 mt-4 justify-center align-middle">
         {/* <button className="bg-green-500 text-white px-4 py-2 rounded-lg mt-4" onClick={() =>  getData()}>Refresh</button>
         <button className="bg-green-500 text-white px-4 py-2 rounded-lg mt-4" onClick={() => setData([])}>Clear</button>   */}
         </div>
         <div className=" flex gap-4 mt-4 justify-center align-middle">
         </div>
         <div className=" flex justify-center mt-4">

         <div className=" flex justify-center gap-2.5 border-amber-50 bg-gray-700  w-fit p-3 rounded-md  " >
          {page > 1 && (
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg cursor-pointer  active:scale-95 text-3xl font-bold mt-4"  onClick={prev}>   ←  </button>
          )}
          <button  className='bg-red-500 text-white px-4 py-2 rounded-lg cursor-pointer mt-4' onClick={()=>{
            page1(1)
          }}>                             <h4 className=''>{page}</h4>
  </button>        
                          <button className={`px-4 py-2 rounded-lg cursor-pointer mt-4 ${page === 1 ? 'bg-yellow-500 text-black font-bold' : 'bg-green-500 text-white'}`} onClick={() => handlePageChange(1)}>1</button>
                         <button className={`px-4 py-2 rounded-lg cursor-pointer mt-4 ${page === 2 ? 'bg-yellow-500 text-black font-bold' : 'bg-green-500 text-white'}`} onClick={() => handlePageChange(2)}>2</button>
                         <button className={`px-4 py-2 rounded-lg cursor-pointer mt-4 ${page === 3 ? 'bg-yellow-500 text-black font-bold' : 'bg-green-500 text-white'}`} onClick={() => handlePageChange(3)}>3</button>
                         <button className={`px-4 py-2 rounded-lg cursor-pointer mt-4 ${page === 4 ? 'bg-yellow-500 text-black font-bold' : 'bg-green-500 text-white'}`} onClick={() => handlePageChange(4)}>4</button>
                         <button className={`px-4 py-2 rounded-lg cursor-pointer mt-4 ${page === 5 ? 'bg-yellow-500 text-black font-bold' : 'bg-green-500 text-white'}`} onClick={() => handlePageChange(5)}>5</button>
          <button className="bg-green-500 text-white px-4 py-2 rounded-lg cursor-pointer active:scale-95 font-bold text-3xl mt-4" onClick={next}>  → </button>
          <div className="">
            
          </div>
         </div>
         </div>
         <div className="h-screen w-full flex  justify-center p-4">
           <p className="text-white text-lg">End of Gallery</p>
         </div>
       </div>
     
    )
}
export default GallaryApp