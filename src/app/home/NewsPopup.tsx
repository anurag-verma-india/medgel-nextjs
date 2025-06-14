"use client";
import axios from "axios";
import React, { useState } from "react";
import { Modal } from "antd";
const NewsPopup = ({ openEditModal, setOpenEditModal }) => {
  const [showspin, setShowSpin] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
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
    formData.append("description", form.description);

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/news`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      console.log("News created:", res.data);
      if (res.data.message === "News Created SuccessFully") {
        setShowSpin(false);
        alert("News Added successfully");
        window.location.reload();
      }
      setOpenEditModal(false);
      setForm({ title: "", description: "" });
    } catch (err) {
      console.error("Error uploading News:", err);
    }
  };

  const handleCancel = () => {
    setOpenEditModal(false);
    setForm({});
  };

  return (
    <Modal
      title={<span className="text-[#3F5D97]">Add News</span>}
      open={openEditModal}
      onOk={handleOk}
      onCancel={handleCancel}
      width={850}
      height={800}
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
            placeholder="Enter News Title"
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
              Add Description
            </label>

            <textarea
              rows="10"
              type="text"
              id="AddNewOffer"
              className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter News Description"
              name="description"
              value={form.description}
              onChange={submit}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default NewsPopup;
