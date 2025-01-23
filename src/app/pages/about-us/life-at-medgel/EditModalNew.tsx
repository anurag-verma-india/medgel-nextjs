"use client";

import { useEffect, useState } from "react";
import axios from "axios";

const EditModal = ({ children, title, setModalOpen }) => {
    const [localData, setLocalData] = useState(children.content);

    const handleTaskSave = async (e) => {
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
            <div className="fixed inset-0 bg-black bg-opacity-50 z-10" />
            {/* Modal */}
            <div className="flex flex-col fixed inset-0 flex items-center justify-center z-50 pt-20 h-5/6">
                <div
                    className="bg-white rounded-xl shadow-lg w-5/6  mx-auto p-6 flex flex-col overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200"
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
                            className="text-2xl bg-transparent border-none cursor-pointer"
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
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    {key.replace(/_/g, " ").toUpperCase()}
                                </label>
                                <textarea
                                    id={key}
                                    name={key}
                                    className="w-full border border-gray-300 rounded-lg p-3 resize-none shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    rows="4"
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
            <div
                className="absolute bottom-0 left-0 w-screen bg-gray-800 p-4 flex flex-col space-y-2 justify-center items-center z-50 sm:flex-row sm:space-y-0 sm:space-x-4 "
            >
                <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="w-full sm:w-auto px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-300"
                >
                    Cancel
                </button>
                <button
                    type="button"
                    onClick={handleReset}
                    className="w-full sm:w-auto px-6 py-3 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring focus:ring-yellow-300"
                >
                    Reset
                </button>
                <button
                    type="submit"
                    onClick={handleTaskSave}
                    className="w-full sm:w-auto px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                >
                    Save
                </button>
            </div>
        </>
    );
};

export default EditModal;
