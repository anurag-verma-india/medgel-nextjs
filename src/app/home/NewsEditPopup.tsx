"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Modal } from "antd";

const NewsEditPopup = ({ openEditModal, setOpenEditModal, NewsId }) => {
  const [showspin, setShowSpin] = useState(false);
  const [newsList, setNewsList] = useState({});
  const fetchNews = async () => {
    try {
      const newsResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/news?id=${NewsId}`,
      );
      console.log(newsResponse.data);
      if (newsResponse.data) {
        setNewsList(newsResponse.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchNews();
  }, []);
  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  const submit = (e) => {
    setNewsList({
      ...newsList,
      [e.target.name]: e.target.value,
    });
  };

  const handleOk = async (e) => {
    e.preventDefault();
    setShowSpin(true);

    const formData = new FormData();
    formData.append("title", newsList.title);
    formData.append("description", newsList.description);

    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/news`,
        newsList,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      console.log("News Updated:", res.data);
      if (res.data.success === true) {
        setShowSpin(false);
        alert("News Upadted successfully");
        window.location.reload();
      }
      setOpenEditModal(false);
      setForm({ title: "", description: "" });
    } catch (err) {
      console.error("Error Updating News:", err);
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
      title={<span className="text-[#3F5D97]">Edit News</span>}
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
            Update
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="w-full rounded-md border border-red-500 bg-red-600 p-2 font-semibold text-white hover:bg-red-500 hover:text-white"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => handleDelete(newsList._id)}
            className="w-full rounded-md border border-red-500 bg-red-600 p-2 font-semibold text-white hover:bg-red-500 hover:text-white"
          >
            Delete
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
            value={newsList.title}
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
              value={newsList.description}
              onChange={submit}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default NewsEditPopup;
