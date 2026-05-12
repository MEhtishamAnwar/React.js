

// const App = () => {
//   return (
//     <div className=""
//   >
//     <div className=" mainclass flex justify-center bg-amber-300 h-123 pt-40 p-8">
//       <form action="">
//         <input type="text" name="" placeholder='enter notes headings' className='bg-emerald-800 pt-7 '  id="" />
//         <textarea name="" placeholder='enter notes details ' className='bg-red-700' id=""></textarea> 
//       </form>
//     </div>
//   </div>
//   )
// }

// export default App
import React from 'react'
import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [result, setResult] = useState("");

  const checkEligibility = () => {
    if (!age) {
      setResult("⚠️ Please enter your age");
      return;
    }
       if (!name) {
      setResult("⚠️ Please enter your name");
      return;
    }

    if (age >= 18) {
      setResult(`✅ ${name || "User"}, you are eligible to vote.`);
    } else {
      setResult(`❌ ${name || "User"}, you are NOT eligible to vote.`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-400 flex items-center justify-center capitalize">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-80 text-center ">
        <h1 className="text-2xl font-bold mb-6 text-gray-600 bg-amber0 border-3 rounded-2xl h-19 justify-center align-center">
          🗳️ Voting Checker
          
        </h1>

        <input
          type="text"
          placeholder="Enter your name"
          className="w-full p-4 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100  mt-3 capitalize"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Enter your age"
          className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />

        <button
          onClick={checkEligibility}
          className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition capitalize"
        >
          Check Eligibility
        </button>
     
        {result  && (
          <h2 className="mt-4 text-lg font-semibold capitalize">{result}</h2>
        )}
      </div>
    </div>
  );
}

export default App;