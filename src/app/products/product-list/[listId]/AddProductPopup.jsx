"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Modal } from "antd";

const AddProductPopup = ({ openEditModal, setOpenEditModal,listId }) => {
  const [showspin, setShowSpin] = useState(false);

  const [form, setForm] = useState({
    innovator: "",
    product: "",
    code: "",
    composition: "",
    color: "",
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
    formData.append("innovator", form.innovator);
    formData.append("product", form.product);
    formData.append("code", form.code);
    formData.append("composition", form.composition);
    formData.append("color", form.color);

    // console.log(form)
    try {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/product`,
            formData,
            {
              headers: {
                "Content-Type": "application/json",
              },
            },
          );
    
          console.log("Product created:", res.data.savedProduct._id);

          if (res.status === 200) {
            setShowSpin(false);
            const formData = new FormData();
            formData.append("_id", res.data.savedProduct._id);
            formData.append("listId", listId);
            try {
          const res = await axios.put(
            `${process.env.NEXT_PUBLIC_API_URL}/product_list`,
            formData,
            {
              headers: {
                "Content-Type": "application/json",
              },
            },
          );
        //   console.log(res)
        }catch(error){
            console.log(error)
        }
        if(res.status===200){
            alert("Product Added successfully");
            window.location.reload();
            setOpenEditModal(false);
        }
            
          }
        } catch (err) {
          console.error("Error Adding product:", err);
        
      };
  }

  const handleCancel = () => {
    setOpenEditModal(false);
    setForm({});
  };
  

  return (
    <Modal
      title={<span className="text-[#3F5D97]">Add Product</span>}
      open={openEditModal}
      onOk={handleOk}
      onCancel={handleCancel}
      width={550}
      height={400}
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
            Innovator:
          </label>

          <input
            type="text"
            id="AddNewOffer"
            className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Innovator"
            name="innovator"
            value={form.innovator}
            onChange={submit}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Product:
          </label>

          <input
            type="text"
            id="AddNewOffer"
            className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Product"
            name="product"
            value={form.product}
            onChange={submit}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Code:
          </label>

          <input
            type="text"
            id="AddNewOffer"
            className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Code"
            name="code"
            value={form.code}
            onChange={submit}
          />
        </div>

        <div className="mb-4">
          <div className="mb-4">
            <label
              htmlFor="product-images"
              className="mb-2 block text-nowrap font-bold capitalize"
            >
              Add Composition
            </label>

            <textarea
              rows="5"
              type="text"
              id="AddNewOffer"
              className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Composition"
              name="composition"
              value={form.composition}
              onChange={submit}
            />
          </div>

          <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Color:
          </label>

          <input
            type="text"
            id="AddNewOffer"
            className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Color"
            name="color"
            value={form.color}
            onChange={submit}
          />
        </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddProductPopup;
