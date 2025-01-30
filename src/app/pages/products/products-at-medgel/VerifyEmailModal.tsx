import React from "react";

const VerifyEmailModal = () => {
    return (
        <>
            {/* Overlay */}
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50" />
            {/* Modal */}
            <div className="flex flex-col fixed inset-0 flex items-center justify-center z-50 pt-20 h-5/6">
                <div
                    className="bg-white rounded-xl shadow-lg w-5/6  mx-auto p-6 flex flex-col overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200"
                    style={{
                        scrollbarWidth: "auto",
                        scrollbarColor: "#A0AEC0 #EDF2F7",
                    }}
                >
                    <div className="mb-6">
                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            className="w-full border border-gray-300 rounded-lg p-3 mt-3 resize-none shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder=""
                        />
                        {/* <label
                            htmlFor={}
                            className="block text-sm font-medium text-gray-700 mb-2"
                        > */}
                        {/* {key.replace(/_/g, " ").toUpperCase()} */}
                        {/* </label> */}
                        {/* <textarea
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
                        /> */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default VerifyEmailModal;
