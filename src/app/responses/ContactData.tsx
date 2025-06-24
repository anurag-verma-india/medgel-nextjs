"use client"
import axios from "axios";
import React, { useEffect, useState } from "react";
export default  function ContactData(){
    const [ContactData,setContactData]=useState([])
    
    
    const fetchContact = async () => {
      try {
      const contactResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/contactus`,
      );
      console.log(contactResponse.data)
      if (contactResponse.data) {
        setContactData(contactResponse.data)
      }
    } catch (error) {
      console.log(error);
    }
    };
    useEffect(()=>{
        fetchContact()
    },[])
  const DeleteData=async(id:number)=>{
    // var con=confirm("Are You Sure You Want To Delete This?")
    const con=confirm("Are You Sure You Want To Delete This?")
    if(con){
try {
          const res = await axios.delete(
            `${process.env.NEXT_PUBLIC_API_URL}/contactus?id=${id}`,
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
            <th className="p-4 border border-gray-300">Name</th>
            <th className="p-4 border border-gray-300">Email</th>
            <th className="p-4 border border-gray-300">Subject</th>
            <th className="p-4 border border-gray-300">Message</th>
            <th className="p-4 border border-gray-300">Delete</th>
          </tr>
        </thead>
        <tbody>
          {ContactData.map((item, index) => (
            <tr key={index} className="even:bg-gray-50 hover:bg-gray-100 transition">
              <td className="p-4 border border-gray-300">{item.name}</td>
              <td className="p-4 border border-gray-300">{item.email}</td>
              <td className="p-4 border border-gray-300">{item.subject}</td>
              <td className="p-4 border border-gray-300">{item.message}</td>
              <td className="p-4 border border-gray-300 text-center">
                <button
                  onClick={() => DeleteData(item._id)}
                  className="bg-red-600 hover:bg-red-800 text-white py-1 px-3 rounded transition"
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