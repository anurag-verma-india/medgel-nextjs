"use client";
import axios from "axios";
import React, { ChangeEvent, useState } from "react";
import { Modal } from "antd";
import { JobTypeDB } from "@/types";

const ApplyNowModal = ({
  openApplyModal,
  setOpenApplyModal,
  JobDetails,
}: {
  openApplyModal: boolean;
  setOpenApplyModal: (openEditModal: boolean) => void;
  JobDetails: JobTypeDB;
}) => {
  const [showspin, setShowSpin] = useState(false);
  //   console.log(JobDetails)
  const emptyApply = {
    name: "",
    email: "",
    mobilenumber: "",
    resume: null as File | null,
  };

  const [form, setForm] = useState({
    name: "",
    email: "",
    mobilenumber: "",
    resume: null as File | null,
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    mobilenumber: "",
    resume: "",
    api: "",
  });

  // Validation functions
  const validateName = (name: string) => {
    if (!name) return "Name is required.";
    if (name.length > 100) return "Name must be at most 100 characters.";
    return "";
  };
  const validateEmail = (email: string) => {
    if (!email) return "Email is required.";
    // Simple email regex
    if (!/^\S+@\S+\.\S+$/.test(email)) return "Invalid email address.";
    return "";
  };
  const validateMobile = (mobile: string) => {
    if (!mobile) return "Mobile number is required.";
    if (!/^[0-9]{10}$/.test(mobile))
      return "Mobile number must be exactly 10 digits.";
    return "";
  };
  const validateResume = (resume: File | null) => {
    if (!resume) return "Resume is required.";
    if (resume.size > 10 * 1024 * 1024) return "Resume must be less than 10MB.";
    if (resume.type !== "application/pdf") return "Resume must be a PDF file.";
    return "";
  };

  const submit = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Validate on change
    if (name === "name")
      setErrors((prev) => ({ ...prev, name: validateName(value) }));
    if (name === "email")
      setErrors((prev) => ({ ...prev, email: validateEmail(value) }));
    if (name === "mobilenumber")
      setErrors((prev) => ({ ...prev, mobilenumber: validateMobile(value) }));
  };

  const handleResumeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setForm((prev) => ({ ...prev, resume: file || null }));
    setErrors((prev) => ({ ...prev, resume: validateResume(file || null) }));
  };

  const validateAll = () => {
    const nameErr = validateName(form.name);
    const emailErr = validateEmail(form.email);
    const mobileErr = validateMobile(form.mobilenumber);
    const resumeErr = validateResume(form.resume);
    setErrors((prev) => ({
      ...prev,
      name: nameErr,
      email: emailErr,
      mobilenumber: mobileErr,
      resume: resumeErr,
      api: "",
    }));
    return !(nameErr || emailErr || mobileErr || resumeErr);
  };

  const handleOk = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    setErrors((prev) => ({ ...prev, api: "" }));
    if (!validateAll()) return;
    setShowSpin(true);
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("mobilenumber", form.mobilenumber);
    if (form.resume) formData.append("resume", form.resume);
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
      if (res.status === 201) {
        setShowSpin(false);
        alert("Applied Successfully!!!");
        setOpenApplyModal(false);
      }
    } catch (err: unknown) {
      setShowSpin(false);
      let errorMsg = "An error occurred. Please try again.";
      if (err && typeof err === "object" && err !== null && "response" in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        if (axiosErr.response?.data?.message) {
          errorMsg = axiosErr.response.data.message;
        }
      }
      setErrors((prev) => ({ ...prev, api: errorMsg }));
    }
  };

  const handleCancel = () => {
    setOpenApplyModal(false);
    setForm(emptyApply);
    setErrors({ name: "", email: "", mobilenumber: "", resume: "", api: "" });
  };
  // const handleDelete = async (id) => {
  //   setShowSpin(true);
  //   // alert(id)
  //   try {
  //     const res = await axios.delete(
  //       `${process.env.NEXT_PUBLIC_API_URL}/news?id=${id}`,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       },
  //     );

  //     console.log("News Deleted:", res.data);
  //     if (res.data.success === true) {
  //       setShowSpin(false);
  //       alert("News Deleted successfully");
  //       window.location.href = "/";
  //     }
  //     setOpenEditModal(false);
  //   } catch (err) {
  //     console.error("Error Updating News:", err);
  //   }
  //   // setOpenEditModal(false);
  // };

  return (
    <Modal
      title={<span className="text-[#3F5D97]">Apply Now</span>}
      open={openApplyModal}
      onOk={handleOk}
      onCancel={handleCancel}
      width={450}
      height={800}
      footer={
        <div className="flex justify-center space-x-4">
          <button
            type="button"
            onClick={handleOk}
            // onClick={(e)=>{e}}
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

        <div className="mb-4 flex justify-center space-x-3">
          <label className="block text-lg font-bold text-gray-700">
            Designation:
          </label>
          <h1 className="block text-lg font-bold text-gray-700">
            {JobDetails.designation}
          </h1>
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
            value={form.name}
            onChange={submit}
          />
          {errors.name && (
            <div className="mt-1 text-xs text-red-600">{errors.name}</div>
          )}
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
            value={form.email}
            onChange={submit}
          />
          {errors.email && (
            <div className="mt-1 text-xs text-red-600">{errors.email}</div>
          )}
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
            value={form.mobilenumber}
            onChange={submit}
          />
          {errors.mobilenumber && (
            <div className="mt-1 text-xs text-red-600">
              {errors.mobilenumber}
            </div>
          )}
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
              onChange={handleResumeChange}
              required
            />
            {errors.resume && (
              <div className="mt-1 text-xs text-red-600">{errors.resume}</div>
            )}
          </div>
        </div>
        {errors.api && (
          <div className="mt-2 text-center text-xs text-red-600">
            {errors.api}
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ApplyNowModal;
