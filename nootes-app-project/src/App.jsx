import React, { useState } from 'react'
const App = () => {
  const [notes, setNotes] = useState("");
  const [details, setDetails] = useState("");
const [allNotes, setAllNotes] = useState(() => {
  const savedNotes = localStorage.getItem("notes");
  return savedNotes ? JSON.parse(savedNotes) : [];
});
  const formHandler=(e )=>{
   e.preventDefault()
    console.log(notes,details);
    setNotes("")
    setDetails("");
    const copyNotes = [...allNotes];
   copyNotes.push({notes, details });
   console.log(copyNotes);
    setAllNotes(copyNotes);
 localStorage.setItem("notes", JSON.stringify(copyNotes));
  const storedNotes = localStorage.getItem("notes");
  console.log("Stored Notes:", JSON.parse(storedNotes));
  }
  return (
    <div className="bg-gray-400 h-screen w-screen  flex  items-center justify-start gap-5 " >
<form  onSubmit={(e)=>{
  formHandler(e);
}} className="flex flex-col items-start gap-3 lg:ml-50 lg:w-200">
<h1 className=' text-2xl text-black font-bold capitalize'>Add notes</h1>
  <input
    type="text"
    placeholder="Enter notes heading"
    className="
      h-10
      w-[400px]
      lg:w-[600px]
      capitalize
      rounded-md
      bg-amber-50
      p-2
      border-2
      border-black
      focus:border-blue-500
      focus:ring-2
      focus:ring-green-200
      outline-none
    "
    value={notes}
    onChange={(e) => setNotes(e.target.value)}
  />
  <textarea
    placeholder="Enter notes details..."
    className="
      h-40
      w-[400px]
      lg:w-[600px]
      p-2
      capitalize
      bg-amber-50
      border-2
      border-black
      rounded-md
      resize-none
      focus:border-blue-500
      focus:ring-2
      focus:ring-green-200
      outline-none
    "
    value={details}
    onChange={(e) => setDetails(e.target.value)}
  ></textarea>
  <button className="bg-black rounded-md active:bg-gray-800 active:scale-95 transition transform
     lg:w-[600px]
  text-white h-10 w-[400px] cursor-pointer">
    Add Text
  </button>
</form>
<div className="   flex flex-wrap gap-7 px-4 mt-3 w-[600px] h-[300px] rounded-md  overflow-auto flex-row  lg:mr-10 hide-scrollbar">
  <h2 className="text-xl font-bold mb-2  sticky w-full rounded-md flex justify-center lg:justify-center
      top-0 h-13  py-2  z-10  bg-gray-500">Your Notes:</h2>
   {allNotes.map((item, index) => {
    return (
      <div key={index} className=" h-50 w-45 lg:w-45   bg-amber-800 bg-[url('https://static.vecteezy.com/system/resources/thumbnails/010/793/873/small/a-lined-note-paper-covered-with-transparent-tape-on-a-yellow-background-with-a-white-checkered-pattern-free-png.png')] bg-cover rounded-md  ">
        <h3 className='text-gray-700 font-bold sentence p-2 pt-4 flex justify-center capitalize text-1xl'>{item.notes}</h3>
 <div className="  overflow-auto h-40 w-45 lg:w-45  pl-2.5  rounded-md  ">
        <p className='text-gray-700 sentence'>{item.details}</p>
            <button className='bg-red-700 text-amber-50   rounded-md cursor-pointer  flex  justify-center ml-10 scale-95  pl-3 pr-3 ' onClick={() => {
       const updatedNotes = [...allNotes]; 
       updatedNotes.splice(index, 1);
       setAllNotes(updatedNotes);
       localStorage.clear();
        localStorage.setItem("notes", JSON.stringify(updatedNotes));
     }}>delete </button>
      </div>
 </div>
     
    );
  })} 
  <div>  
     {/* <div className=" h-25 w-19 lg:w-21 bg-amber-50 rounded-md"></div>   */}
       
  </div>
</div>
    </div>
  )
}

export default App


//import { useState } from "react";
// function App() {
//   const [name, setName] = useState("");
//   const [age, setAge] = useState("");
//   const [result, setResult] = useState("");

//   const checkEligibility = () => {
//     if (!age) {
//       setResult("⚠️ Please enter your age");
//       return;
//     }
//        if (!name) {
//       setResult("⚠️ Please enter your name");
//       return;
//     }

//     if (age >= 18) {
//       setResult(`✅ ${name || "User"}, you are eligible to vote.`);
//     } else {
//       setResult(`❌ ${name || "User"}, you are NOT eligible to vote.`);
//     }
//   };
//   return (
//     <div className="min-h-screen bg-gray-400 flex items-center justify-center capitalize">
//       <div className="bg-white p-8 rounded-2xl shadow-lg w-80 text-center ">
//         <h1 className="text-2xl font-bold mb-6 text-gray-600 bg-amber0 border-3 rounded-2xl h-19 justify-center align-center">
//           🗳️ Voting Checker
          
//         </h1>

//         <input
//           type="text"
//           placeholder="Enter your name"
//           className="w-full p-4 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100  mt-3 capitalize"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />

//         <input
//           type="number"
//           placeholder="Enter your age"
//           className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
//           value={age}
//           onChange={(e) => setAge(e.target.value)}
//         />

//         <button
//           onClick={checkEligibility}
//           className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition capitalize"
//         >
//           Check Eligibility
//         </button>
     
//         {result  && (
//           <h2 className="mt-4 text-lg font-semibold capitalize">{result}</h2>
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;
