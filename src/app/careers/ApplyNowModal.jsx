"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Modal } from "antd";

const ApplyNowModal = ({ openEditModal, setOpenEditModal,JobDetails }) => {
  const [showspin, setShowSpin] = useState(false);
//   console.log(JobDetails)
  
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobilenumber: "",
    resume:""
  });

  const submit = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleOk = async (e) => {
    e.preventDefault();
    setShowSpin(true);
    console.log(form)
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("mobilenumber", form.mobilenumber);
    formData.append("resume", form.resume);
    formData.append("deptid", JobDetails._id);
    formData.append("designation", JobDetails.designation);
    formData.append("experience", JobDetails.experience);
    formData.append("qualification", JobDetails.qualification);
    formData.append("jobdesc", JobDetails.job_description);
    try {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/apply`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            },
          );
        //   console.log(res)
        if(res.status===201){
    setShowSpin(false);

            alert("Applied Successfully!!!")
              setOpenEditModal(false);
        }
        } catch (err) {
          console.error("Error uploading anual Report:", err);
        }
    
  };

  const handleCancel = () => {
    setOpenEditModal(false);
    setForm({});
  };
  const handleDelete = async (id) => {
    setShowSpin(true);
    // alert(id)
    try {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/news?id=${id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      console.log("News Deleted:", res.data);
      if (res.data.success === true) {
        setShowSpin(false);
        alert("News Deleted successfully");
        window.location.href = "/";
      }
      setOpenEditModal(false);
    } catch (err) {
      console.error("Error Updating News:", err);
    }
    // setOpenEditModal(false);
  };

  return (
    <Modal
      title={<span className="text-[#3F5D97]">Apply Now</span>}
      open={openEditModal}
      onOk={handleOk}
      onCancel={handleCancel}
      width={450}
      height={800}
      footer={
        <div className="flex justify-center space-x-4">
          <button
            type="button"
            onClick={handleOk}
            className="w-full rounded-md border border-[#3F5D97] bg-[#3F5D97] p-2 font-semibold text-white hover:bg-[#5d7cb9] hover:text-[#3F5D97]"
          >
            Apply
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="w-full rounded-md border border-red-500 bg-red-600 p-2 font-semibold text-white hover:bg-red-500 hover:text-white"
          >
            Cancel
          </button>
        </div>
      }
      // className="bg-gray-100 rounded-lg" // <-- Modal background color
    >
      <div className="shadsow-md rounded-lg p-1">
        {showspin ? (
          <div className="flex items-center justify-center">
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-dashed border-blue-500"></div>
          </div>
        ) : (
          <></>
        )}

        <div className="mb-4 flex space-x-3 justify-center">
          <label className="block text-lg font-bold text-gray-700">
            Designation:
          </label>
                        <h1 className="block text-lg font-bold text-gray-700">{JobDetails.designation}</h1>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Name:
          </label>

          <input
            type="text"
            id="AddNewOffer"
            className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Your Name"
            name="name"
            onChange={submit}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Email:
          </label>

          <input
            type="email"
            id="AddNewOffer"
            className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Your Email"
            name="email"
            onChange={submit}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Mobile Number:
          </label>

          <input
            type="text"
            id="AddNewOffer"
            className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Phone Number"
            name="mobilenumber"
            onChange={submit}
          />
        </div>

        <div className="mb-4">
          <div className="mb-4">
            <label
              htmlFor="product-images"
              className="mb-2 block text-nowrap font-bold capitalize"
            >
              Upload resume
            </label>


          <input
              className="form-control"
              type="file"
              accept="application/pdf"
              name="resume"
              id="product-images"
              onChange={(e) => {
                setForm({ ...form, resume: e.target.files[0] });
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

export default ApplyNowModal;
