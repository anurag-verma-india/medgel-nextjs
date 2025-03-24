"use client";

// import { useState } from "react";
import VerifyEmailModal from "./VerifyEmailModal";
import Cookies from "universal-cookie";

type ModalContainerArgs = {
  modalOpen: boolean;
  openCloseFn: () => void;
};

const ModalContainer = ({ modalOpen, openCloseFn }: ModalContainerArgs) => {
  const cookies = new Cookies();
  const emailSent = cookies.get("sent");

  return (
    <>
      {modalOpen && (
        <VerifyEmailModal openCloseFn={openCloseFn} emailSent={emailSent} />
      )}
    </>
  );
};

export default ModalContainer;
