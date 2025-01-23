"use client";

// import { useEffect } from "react";
import { useState } from "react";
// import EditModal from "./EditModal";
import FormWithModal from "./EditModalNew";

export default function EditModalContainer({ page, title }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalContainerState, setModalContainerState] = useState(page);
    const onClick = () => {
        setModalOpen(!modalOpen);
    };
    // useEffect(() => {
    //     console.log("children ", children);
    // }, []);
    return (
        <>
            {/* {modalOpen && (
                <EditModal setModalOpen={setModalOpen} title={title}>{modalContainerState}</EditModal>
            )} */}
            {modalOpen && (
                <FormWithModal setModalOpen={setModalOpen} title={title}>
                    {modalContainerState}
                </FormWithModal>
            )}

            <div className="relative">
                <button
                    onClick={onClick}
                    className="absolute top-0 right-0 bg-[#00a5a5] text-black px-4 py-2 rounded shadow hover:bg-[#197777] focus:outline-none focus:ring-2 focus:ring-black opacity-40"
                >
                    Edit
                </button>
            </div>
        </>
    );
}
