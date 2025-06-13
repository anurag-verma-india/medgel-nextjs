// file_path: "@/src/app/_common_component/EditModalContainer.tsx"

"use client";

"use client";
import { useEffect, useState } from "react";
import FormWithModal from "./EditModal";
import { BasePageContent, PageObject, ImageObj } from "@/types";
import axios from "axios";

type LoadingModalPrams = {
  setModalOpen: (modalOpen: boolean) => void;
};

function LoadingModal({ setModalOpen }: LoadingModalPrams) {
  return (
    <>
      <div className="fixed inset-0 z-10 bg-black bg-opacity-50" />

      {/* Modal content */}
      <div className="fixed inset-0 z-50 flex h-5/6 flex-col items-center justify-center pt-20">
        <div
          className="scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 mx-auto flex w-5/6 flex-col overflow-y-auto rounded-xl bg-white p-6 shadow-lg"
          style={{
            scrollbarWidth: "auto",
            scrollbarColor: "#A0AEC0 #EDF2F7",
          }}
        >
          {/* Close button */}
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
          <div className="mb-2 block w-full text-center text-3xl font-medium text-gray-700">
            Loading...
          </div>
        </div>
      </div>
    </>
  );
}

export default function EditModalContainer({ title }: { title: string }) {
  // console.log("Direct Title: ", title);
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
        // console.log("Title received in Modal: ", title);
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
      {modalOpen && isLoading && (
        // <div>Loading...</div>
        <LoadingModal setModalOpen={setModalOpen} />
      )}
      <div className="relative">
        <button
          onClick={onClick}
          className="absolute right-0 top-0 mr-5 mt-5 rounded bg-[#00a5a5] px-4 py-2 text-white shadow hover:bg-[#197777] focus:outline-none focus:ring-2 focus:ring-black"
        >
          Edit
        </button>
      </div>
    </>
  );
}
