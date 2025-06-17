"use client"
import axios from "axios";
import React, { useEffect, useState } from "react";
import Applydata from "./ApplyData";
import ContactData from "./ContactData";
export default  function Responses(){
    
    const [showApplyData,setshowApplyData]=useState(true)
    const [showContactData,setshowContactData]=useState(false)
    
    
  const change=(id:number)=>{
    if(id===1){
        setshowApplyData(true)
        setshowContactData(false)
    }
    else{
        setshowApplyData(false)
        setshowContactData(true)
    }
  }
    return(
        <>
        <div className="p-10 flex flex-col items-center">
  <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">Responses</h1>

  {/* Header */}
  <div className="flex gap-4 justify-center w-full mt-4 mb-8">
    <button
      onClick={() => change(1)}
      className={`px-6 py-3 rounded-lg text-lg font-semibold transition-colors duration-200 ${
        showApplyData ? 'bg-green-700 text-white' : 'bg-green-500 hover:bg-green-600 text-white'
      }`}
    >
      Apply Responses
    </button>
    <button
      onClick={() => change(2)}
      className={`px-6 py-3 rounded-lg text-lg font-semibold transition-colors duration-200 ${
        showContactData ? 'bg-green-700 text-white' : 'bg-green-500 hover:bg-green-600 text-white'
      }`}
    >
      Contact Responses
    </button>
  </div>

  {/* Table */}
  {showApplyData && <Applydata/>}

  {showContactData && <ContactData />}
</div>

        </>
    )
}