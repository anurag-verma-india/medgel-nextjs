"use client";

// import { useEffect } from "react";
import { useState } from "react";
// import EditModal from "./EditModal";
import FormWithModal from "./EditModalv2";
import { PageObject } from "@/types";

type ModalContainer = {
  title: string;
  page: PageObject;
};

// TODO: Reverify email option

export default function EditModalContainer({ page, title }: ModalContainer) {
  const [modalOpen, setModalOpen] = useState(false);
  // const [modalContainerState, setModalContainerState] = useState(page);
  const [modalContainerState] = useState(page);
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
          className="absolute right-0 top-0 rounded bg-[#00a5a5] px-4 py-2 text-black opacity-40 shadow hover:bg-[#197777] focus:outline-none focus:ring-2 focus:ring-black"
        >
          Edit
        </button>
      </div>
    </>
  );
}
