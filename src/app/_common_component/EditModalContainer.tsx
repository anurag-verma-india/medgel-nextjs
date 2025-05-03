// file_path: "@/src/app/_common_component/EditModalContainer.tsx"

"use client";

"use client";
import { useEffect, useState } from "react";
import FormWithModal from "./EditModal";
import { BasePageContent, PageObject, ImageObj } from "@/types";
import axios from "axios";

type ModalContainer = {
  title: string;
};

export default function EditModalContainer({ title }: ModalContainer) {
  const [modalOpen, setModalOpen] = useState(false);
  // const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Create a default/empty PageObject that satisfies the type requirements
  const emptyPageObject: PageObject<BasePageContent> = {
    _id: "",
    title: "",
    content: {},
    images: [] as ImageObj[],
    lastUpdated: new Date(),
    __v: 0,
  };

  const [modalContainerState, setModalContainerState] =
    useState<PageObject<BasePageContent>>(emptyPageObject);

  const onClick = () => {
    setModalOpen(!modalOpen);
  };

  useEffect(() => {
    setIsLoading(true);
    try {
      async function fetchPage() {
        const page_res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/page/?title=${title}`,
        );
        const page: PageObject<BasePageContent> = page_res.data;
        // console.log("Page received from request");
        // console.log(page);
        setModalContainerState(page);
        setIsLoading(false);
      }
      fetchPage();
    } catch (error) {
      console.log("Error occurred while fetching page data for edit modal");
      console.log(error);
      // setError(true);
      setIsLoading(false);
    }
  }, [title]);

  return (
    <>
      {modalOpen && !isLoading && (
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
