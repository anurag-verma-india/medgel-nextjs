"use client";
// import React from "react";

const ProductListEditPopup = () => {
  return (
    <div className="relative right-0 top-0">
      <button
        onClick={() => {
          // setModalOpen(!modalOpen);
          console.log("Edit Clicked");
        }}
        className="absolute right-0 top-0 rounded bg-[#00a5a5] px-4 py-2 text-black opacity-40 shadow hover:bg-[#197777] focus:outline-none focus:ring-2 focus:ring-black"
      >
        Edit
      </button>
    </div>
  );
};

export default ProductListEditPopup;
