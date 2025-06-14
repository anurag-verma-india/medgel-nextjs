"use client"
import axios from "axios";
import React, { useState } from "react";
import { Modal } from "antd";
const AnualReportPopup = ({ openEditModal, setOpenEditModal }) => {
  const [showspin,setShowSpin]=useState(false)
  const [form, setForm] = useState({
    title:"",
    anual_Report:""
  });
  
  const submit = (e) => {
    
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  
  const handleOk = async (e) => {
   e.preventDefault();
   setShowSpin(true)

  const formData = new FormData();
  formData.append("title", form.title);
// for (let pair of formData.entries()) {
//         console.log(pair[0], pair[1]); // Now price will be logged as a proper JSON string
//     }
  // Ensure it's a File before appending
  if (form.anual_Report instanceof File) {
    formData.append("anual_Report", form.anual_Report); // 👈 send actual file
  } else {
   
    alert("Please upload a valid pdf file");
    return;
  }

  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/anualreport`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("Anual Report created:", res.data);
    if(res.data.message==="Anual Report created successfully"){
       setShowSpin(false)
        alert("Anual Report created successfully");
        window.location.reload()
    }
    setOpenEditModal(false);
    setForm({ title: "", award_Image: "" });
  } catch (err) {
    console.error("Error uploading anual Report:", err);
  }
      };

  const handleCancel = () => {
    setOpenEditModal(false);
    setForm({})
  };
  

  return (
    <Modal
      title={<span className="text-[#3F5D97]">Add Anual Report PDF</span>}
      open={openEditModal}
      onOk={handleOk}
      onCancel={handleCancel}
      width={350}
      height={300}
      footer={
        <div className="flex justify-center space-x-4">
          <button
            type="button"
            onClick={handleOk}
            className="p-2 w-full bg-[#3F5D97] border border-[#3F5D97] text-white hover:text-[#3F5D97] hover:bg-[#5d7cb9] font-semibold rounded-md"
          >
            Add
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="p-2 w-full bg-red-600 border border-red-500 font-semibold rounded-md text-white hover:text-white  hover:bg-red-500"
          >
            Cancel
          </button>
        </div>
      }
    // className="bg-gray-100 rounded-lg" // <-- Modal background color
    >
      <div className="p-1 rounded-lg shadsow-md">
        {showspin ?<div className="flex items-center justify-center ">
      <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
    </div>:<></>}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Title:
          </label>

          <input

            type="text"
            id="AddNewOffer"
            className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Anual Report Title"
            name="title"
            value={form.title}
            onChange={submit}
          />
        </div>

        <div className="mb-4">
         <div className="mb-4">
         <label htmlFor="product-images" className="text-nowrap mb-2 block font-bold capitalize">File Image</label>
                  

         <input
                    className="form-control"
                    type="file"
                    accept="application/pdf"
                    name="anual_Report"
                    id="product-images"
                    onChange={(e) => {
  setForm({ ...form, anual_Report: e.target.files[0] }); 
}}
                    // onChange={submit}
                    required
                  />
        </div>
                
        </div>
      </div>
    </Modal>
  );
};

export default AnualReportPopup;