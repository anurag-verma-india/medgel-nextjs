"use client";

import { useEffect, useState } from "react";
import axios from "axios";
// import { constants } from "fs/promises";

// interface ModalProps {
//     closeModalFunction: (value: boolean) => void;
// }

// interface TaskState {
//     title: string;
//     list: string;
// }

const EditModal = ({ children, title, setModalOpen }) => {
    const [localData, setLocalData] = useState(children.content);
    const handleTaskSave = async (e) => {
        e.preventDefault();
        try {
            console.log(children);
            // console.log(`EditModal title${title}`);
            const res = await axios.put("/api/page", {
                title: title,
                content: localData,
            });
            console.log("res:\n", res);
        } catch (error) {
            console.log("Error: ", error);
        }
        // close modal
        setModalOpen(false);
        location.reload();
    };

    return (
        <>
            <div>
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50" />
                {/* Overlay */}
                <div className="fixed inset-0 flex items-center justify-center z-50 pt-20">
                    <div className="bg-white rounded-xl shadow-lg w-full max-w-lg mx-4 p-6 flex flex-col overflow-y-auto max-h-[90vh]">
                        {/* Modal Content */}
                        <form onSubmit={handleTaskSave}>
                            <div className="flex justify-end">
                                <button
                                    // onClick={closeModalFunction}
                                    className="text-2xl bg-transparent border-none cursor-pointer"
                                >
                                    x
                                </button>
                            </div>

                            {/* Static form */}
                            {/* <div>
                                <label htmlFor="page_title" className="">
                                    Page Title
                                </label>
                                <br />
                                <input
                                    className="border-black border-4 rounded-lg  h-12"
                                    type="text"
                                    name="page_title"
                                    // value={localData && localData.page_title}
                                    // value={children && children.page_title}
                                    // onChange={(e) => {
                                    //     setChildren({
                                    //         ...children,
                                    //         page_title: e.target.value,
                                    //     });
                                    // }}
                                />
                            </div> */}

                            {/* Map entried to inputs */}
                            {Object.entries(localData).map(
                                ([key, value], index) => (
                                    <div key={key}>
                                        <label
                                            htmlFor="page_title"
                                            className=""
                                        >
                                            {key}
                                        </label>
                                        <br />
                                        <textarea
                                            className="border-black border-4 rounded-lg w-full h-24 p-2 resize-none"
                                            type="text"
                                            name="page_title"
                                            value={value}
                                            onChange={(e) => {
                                                setLocalData({
                                                    ...localData,
                                                    [key]: e.target.value,
                                                });
                                            }}
                                        />
                                    </div>
                                )
                            )}

                            {/* <div className="flex justify-center items-center mt-8">
                                <button
                                    id="cancelBtn"
                                    // onClick={closeModalFunction}
                                    type="button"
                                    className="w-36 h-12 mx-2 bg-red-600 text-white rounded-lg text-xl cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    // id="cancelBtn"
                                    onClick={() => {
                                        // setLocalData(children);
                                    }}
                                    type="button"
                                    className="w-36 h-12 mx-2 bg-red-600 text-white rounded-lg text-xl cursor-pointer"
                                >
                                    Reset
                                </button>
                                <input
                                    type="submit"
                                    value="Save"
                                    id="saveTask"
                                    className="w-36 h-12 mx-2 bg-blue-500 text-white rounded-lg text-xl cursor-pointer border-none"
                                />
                            </div> */}

                            {/* Buttons */}
                            <div className="fixed bottom-0 left-0 right-0 bg-gray-800 p-4 flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center items-center">
                                <button className="w-full sm:w-auto px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300">
                                    Button 1
                                </button>
                                <button className="w-full sm:w-auto px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300">
                                    Button 2
                                </button>
                                <button className="w-full sm:w-auto px-6 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300">
                                    Button 3
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditModal;
