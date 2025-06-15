"use client";
import axios from "axios";
import React, { useState } from "react";
import { Modal } from "antd";
// import { useDispatch } from "react-redux";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { MdDelete } from "react-icons/md";
// import { GetProductByIdFetcher } from "../../Features/Product/GetProductByid";
// import { GetProductBySubTypeIdFetcher } from "../../Features/Product/ProductsBySubTypeId";
// import { ProductTypes } from "../ProductTypes";
// import { API_URL } from "../../Features/NwConfig";
// import { ProductUpdateFetcher } from "../../Features/Product/ProductUpdate";
// import { useNavigate } from "react-router-dom";
const PolicyPopup = ({ openEditModal, setOpenEditModal }) => {
  const [showspin, setShowSpin] = useState(false);
  const [form, setForm] = useState({
    title: "",
    policy_Report: "",
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

    const formData = new FormData();
    formData.append("title", form.title);
    // for (let pair of formData.entries()) {
    //         console.log(pair[0], pair[1]); // Now price will be logged as a proper JSON string
    //     }
    // Ensure it's a File before appending
    if (form.policy_Report instanceof File) {
      formData.append("policy_Report", form.policy_Report); // 👈 send actual file
    } else {
      alert("Please upload a valid policy file");
      return;
    }

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/policy`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      console.log("Policy File created:", res.data);
      if (res.data.message === "Policy Report created successfully") {
        setShowSpin(false);
        alert("Policy File created successfully");
        window.location.reload();
      }
      setOpenEditModal(false);
      setForm({ title: "", policy_Report: "" });
    } catch (err) {
      console.error("Error uploading Policy File:", err);
    }
  };

  const handleCancel = () => {
    setOpenEditModal(false);
    setForm({});
  };

  return (
    <Modal
      title={<span className="text-[#3F5D97]">Add Policy PDF</span>}
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
            className="w-full rounded-md border border-[#3F5D97] bg-[#3F5D97] p-2 font-semibold text-white hover:bg-[#5d7cb9] hover:text-[#3F5D97]"
          >
            Add
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
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Title:
          </label>

          <input
            type="text"
            id="AddNewOffer"
            className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Policy Title"
            name="title"
            value={form.title}
            onChange={submit}
          />
        </div>

        <div className="mb-4">
          <div className="mb-4">
            <label
              htmlFor="product-images"
              className="mb-2 block text-nowrap font-bold capitalize"
            >
              File Image
            </label>

            <input
              className="form-control"
              type="file"
              accept="application/pdf"
              name="policy_Report"
              id="product-images"
              onChange={(e) => {
                setForm({ ...form, policy_Report: e.target.files[0] });
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

export default PolicyPopup;
