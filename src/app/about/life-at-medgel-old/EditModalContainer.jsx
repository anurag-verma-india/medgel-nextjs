"use client";

import { useState } from "react";
import EditModal from "./editModal.jsx";

export default function EditModalContainer({ children }) {
    // console.log(children);
    // const [isAdmin, setAdmin] = useState(false);
    const [data, setData] = useState({ ...children });
    const [isAdmin, setAdmin] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <>
            {isModalOpen && (
                <EditModal
                    closeModalFunction={() => {
                        setIsModalOpen(!isModalOpen);
                    }}
                    setChildren={setData}
                >
                    {data}
                </EditModal>
            )}
            {isAdmin && (
                <button
                    className="self-end bg-[#00a5a5] p-5 text-xl rounded-xl"
                    onClick={() => {
                        setIsModalOpen(!isModalOpen);
                    }}
                >
                    Edit
                </button>
            )}
        </>
    );
}
