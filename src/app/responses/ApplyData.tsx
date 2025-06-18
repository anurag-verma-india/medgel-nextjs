"use client"
import axios from "axios";
import React, { useEffect, useState } from "react";
export default  function Applydata(){
    const [applyData,setApplyData]=useState([])
    
    const fetchApply = async () => {
      try {
      const applyResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/applies`,
      );
      console.log(applyResponse.data)
      if (applyResponse.data) {
        setApplyData(applyResponse.data)
      }
    } catch (error) {
      console.log(error);
    }
    };
    
    useEffect(()=>{
        fetchApply()
    },[])
    const openpdf = (url: string) => {
    // console.log(`${process.env.NEXT_PUBLIC_SITE_URL}/${url}`)
    window.open(`${process.env.NEXT_PUBLIC_SITE_URL}/${url}`, "_blank");
  };
  const DeleteData=async(id:number,resume:string)=>{
    var con=confirm("You Sure You Want To Delete This?")
    // alert(id)
    if(con){
      try {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/applies?id=${id}&resume=${resume}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      console.log("Response Deleted:", res.data);
      if (res.data.success === true) {
        alert("Response Deleted successfully");
        window.location.href = "/responses";
      }
    } catch (err) {
      console.error("Error Updating News:", err);
    }
    }
    
  }
    return(
        <>
        
  {/* Table */}
 
    <div className="overflow-x-auto w-full">
      <table className="w-full border border-gray-300 shadow-md rounded-md">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-4 border border-gray-300">Designation</th>
            <th className="p-4 border border-gray-300">Qualification</th>
            <th className="p-4 border border-gray-300">Job Description</th>
            <th className="p-4 border border-gray-300">Name</th>
            <th className="p-4 border border-gray-300">Email</th>
            <th className="p-4 border border-gray-300">Mobile</th>
            <th className="p-4 border border-gray-300">Resume</th>
            <th className="p-4 border border-gray-300">Delete</th>
          </tr>
        </thead>
        <tbody>
          {applyData.map((item, index) => (
            <tr key={index} className="even:bg-gray-50 hover:bg-gray-100 transition">
              <td className="p-4 border border-gray-300">{item.designation}</td>
              <td className="p-4 border border-gray-300">{item.qualification}</td>
              <td className="p-4 border border-gray-300">{item.jobdesc}</td>
              <td className="p-4 border border-gray-300">{item.name}</td>
              <td className="p-4 border border-gray-300">{item.email}</td>
              <td className="p-4 border border-gray-300">{item.mobilenumber}</td>
              <td className="p-4 border border-gray-300 text-center">
                <button
                  onClick={() => openpdf(item.resume)}
                  className="bg-blue-600 hover:bg-blue-800 text-white py-1 px-3 rounded-xl  transition"
                >
                  View Resume
                </button>
              </td>
              <td className="p-4 border border-gray-300 text-center">
                <button
                  onClick={() => DeleteData(item._id, item.resume)}
                  className="bg-red-600 hover:bg-red-800 text-white py-1 px-3 rounded-xl transition"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>


        </>
    )
}