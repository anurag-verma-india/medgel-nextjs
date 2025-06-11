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

const EditModal = ({ children, closeModalFunction, setChildren }) => {
    const [localData, setLocalData] = useState(children);
    const handleTaskSave = async (e) => {
        e.preventDefault();
        console.log(localData);
        setChildren(localData);
        // console.log("In handleTaskSave: \npage_title: ", data.page_title);
        try {
            const res = await axios.put(
                `${process.env.NEXT_PUBLIC_API_URL}/api/careers`,
                localData
            );
            console.log(
                "app/pages/life-at-medgel-editModal.tsx, save (put res)-------------->\n",
                res
            );
        } catch (error) {
            console.log("Error: ", error);
        }
        closeModalFunction();
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
                                    onClick={closeModalFunction}
                                    className="text-2xl bg-transparent border-none cursor-pointer"
                                >
                                    x
                                </button>
                            </div>

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
                                    value={children && children.page_title}
                                    onChange={(e) => {
                                        setChildren({
                                            ...children,
                                            page_title: e.target.value,
                                        });
                                    }}
                                />
                            </div> */}

                            {/* <GetEditableData data={data} setData={setData} /> */}
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
                                            // className="border-black border-4 rounded-lg  h-12 w-full"
                                            type="text"
                                            name="page_title"
                                            value={value}
                                            onChange={(e) => {
                                                setLocalData({
                                                    ...localData,
                                                    [key]: e.target.value,
                                                });
                                                // console.log(e.target.value);
                                            }}
                                        />
                                    </div>
                                )
                            )}

                            <div className="flex justify-center items-center mt-8">
                                <button
                                    id="cancelBtn"
                                    onClick={closeModalFunction}
                                    type="button"
                                    className="w-36 h-12 mx-2 bg-red-600 text-white rounded-lg text-xl cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    // id="cancelBtn"
                                    onClick={() => {
                                        setLocalData(children);
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
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditModal;
