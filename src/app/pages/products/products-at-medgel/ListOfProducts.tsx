"use client";
// Make this a server component

import { useState } from "react";
// import VerifyEmailModal from "./VerifyEmailModal";
import { redirect } from "next/navigation";
import VerifyEmailModal from "./VerifyEmailModal";
// import VerifyEmailPopup from "./VerifyEmailPopup";

function RightPointerBracketSvg() {
  return (
    <svg
      fill="#a6a6a6"
      // height="800px"
      // width="800px"
      className="w-6"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 330 330"
      xmlSpace="preserve"
      // {...props}
    >
      <path d="M250.606 154.389l-150-149.996c-5.857-5.858-15.355-5.858-21.213.001-5.857 5.858-5.857 15.355.001 21.213l139.393 139.39L79.393 304.394c-5.857 5.858-5.857 15.355.001 21.213C82.322 328.536 86.161 330 90 330s7.678-1.464 10.607-4.394l149.999-150.004a14.996 14.996 0 000-21.213z" />
    </svg>
  );
}

type ListOfProductsParams = {
  tokenValid: boolean;
};


// const ModalContainer = () => {
//   "use client"
//   const [modalOpen, setModalOpen] = useState(false);
//   return (
//   )
// }


// Unlinked List of products
export default function ListOfProducts({ tokenValid }: ListOfProductsParams) {
  const [modalOpen, setModalOpen] = useState(false);
  // const [emailSent, setEmailSent] = useState(false);
  function openCloseFn() {
    setModalOpen(!modalOpen);
  }

  const HandleListClick = (listId: string) => {
    if (tokenValid) {
      redirect(`/pages/product-list/${listId}`);
    } else openCloseFn();
  };

  return (
    <>
      {modalOpen && <VerifyEmailModal openCloseFn={openCloseFn} />}
      {/* {modalOpen && <VerifyEmailPopup openCloseFn={openCloseFn} />} */}

      <div className="text-2xl text-orange-400">
        <div
          className="m-6 flex flex-row rounded-xl bg-white px-2 py-3"
          onClick={() => HandleListClick("1")}
        >
          <p className="w-full">Row 1</p>
          <div className="flex min-w-fit flex-row text-neutral-500">
            <p className="min-w-fit">4 Products</p>
            <RightPointerBracketSvg />
          </div>
        </div>
        {/* <div
          className="m-6 flex flex-row rounded-xl bg-white px-2 py-3"
          // onClick={() => {
          //   openCloseFn();
          // }}
          onClick={() => {
            HandleListClick("1");
          }}
        >
          <p className="w-full">Row 1</p>
          <div className="flex min-w-fit flex-row text-neutral-500">
            <p className="min-w-fit">4 Products</p>
            <RightPointerBracketSvg />
          </div>
        </div>
        <div className="m-6 flex flex-row rounded-xl bg-white px-2 py-3">
          <p className="w-full">Row 2</p>
          <div className="flex min-w-fit flex-row text-neutral-500">
            <p className="min-w-fit">4 Products</p>
            <RightPointerBracketSvg />
          </div>
        </div>
        <div className="m-6 flex flex-row rounded-xl bg-white px-2 py-3">
          <p className="w-full">Row 3</p>
          <div className="flex min-w-fit flex-row text-neutral-500">
            <p className="min-w-fit">4 Products</p>
            <RightPointerBracketSvg />
          </div>
        </div> */}
      </div>
    </>
  );
}
