"use client";
// import axios from "axios";
// import React, { useEffect, useState } from "react";
import React, { useState } from "react";
import Applydata from "./ApplyData";
import ContactData from "./ContactData";
export default function Responses() {
  const [showApplyData, setshowApplyData] = useState(true);
  const [showContactData, setshowContactData] = useState(false);

  const change = (id: number) => {
    if (id === 1) {
      setshowApplyData(true);
      setshowContactData(false);
    } else {
      setshowApplyData(false);
      setshowContactData(true);
    }
  };
  return (
    <>
      <div className="flex flex-col items-center p-10">
        <h1 className="mb-6 text-center text-4xl font-bold text-gray-800">
          Responses
        </h1>

        {/* Header */}
        <div className="mb-8 mt-4 flex w-full justify-center gap-4">
          <button
            onClick={() => change(1)}
            className={`rounded-lg px-6 py-3 text-lg font-semibold transition-colors duration-200 ${
              showApplyData
                ? "bg-green-700 text-white"
                : "bg-green-500 text-white hover:bg-green-600"
            }`}
          >
            Apply Responses
          </button>
          <button
            onClick={() => change(2)}
            className={`rounded-lg px-6 py-3 text-lg font-semibold transition-colors duration-200 ${
              showContactData
                ? "bg-green-700 text-white"
                : "bg-green-500 text-white hover:bg-green-600"
            }`}
          >
            Contact Responses
          </button>
        </div>

        {/* Table */}
        {showApplyData && <Applydata />}

        {showContactData && <ContactData />}
      </div>
    </>
  );
}
