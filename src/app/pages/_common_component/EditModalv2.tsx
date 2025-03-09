"use client";

import { useState } from "react";
// import { useEffect } from "react";
import axios from "axios";
import { PageObject } from "@/types";

type EditModalType = {
  children: PageObject;
  title: string;
  setModalOpen: (a: boolean) => void;
};

const EditModal = ({ children, title, setModalOpen }: EditModalType) => {
  const [localData, setLocalData] = useState(children.content);

  const handleTaskSave = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    const confirmation = confirm("Are you sure?");
    try {
      if (confirmation) {
        console.log(children);
        const res = await axios.put("/api/page", {
          title: title,
          content: localData,
        });
        console.log("res:\n", res);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
    setModalOpen(false);
    location.reload();
  };

  const handleReset = () => {
    setLocalData(children.content);
  };

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 z-10 bg-black bg-opacity-50" />
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex h-5/6 flex-col items-center justify-center pt-20">
        <div
          className="scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 mx-auto flex w-5/6 flex-col overflow-y-auto rounded-xl bg-white p-6 shadow-lg"
          style={{
            scrollbarWidth: "auto",
            scrollbarColor: "#A0AEC0 #EDF2F7",
          }}
        >
          {/* Close Button */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="cursor-pointer border-none bg-transparent text-2xl"
              aria-label="Close"
            >
              ×
            </button>
          </div>

          {/* Dynamic Inputs */}
          {Object.entries(localData).map(([key, value]) => (
            <>
              <div key={key} className="mb-6">
                <label
                  htmlFor={key}
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  {key.replace(/_/g, " ").toUpperCase()}
                </label>
                <textarea
                  id={key}
                  name={key}
                  className="w-full resize-none rounded-lg border border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  rows={4}
                  value={value}
                  onChange={(e) =>
                    setLocalData({
                      ...localData,
                      [key]: e.target.value,
                    })
                  }
                />
              </div>
            </>
          ))}
        </div>
        {/* Buttons */}
      </div>
      <div className="absolute bottom-0 left-0 z-50 flex w-screen flex-col items-center justify-center space-y-2 bg-gray-800 p-4 sm:flex-row sm:space-x-4 sm:space-y-0">
        <button
          type="button"
          onClick={() => setModalOpen(false)}
          className="w-full rounded-lg bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-300 sm:w-auto"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="w-full rounded-lg bg-yellow-500 px-6 py-3 font-semibold text-white hover:bg-yellow-600 focus:outline-none focus:ring focus:ring-yellow-300 sm:w-auto"
        >
          Reset
        </button>
        <button
          type="submit"
          onClick={handleTaskSave}
          className="w-full rounded-lg bg-blue-500 px-6 py-3 font-semibold text-white hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 sm:w-auto"
        >
          Save
        </button>
      </div>
    </>
  );
};

export default EditModal;
