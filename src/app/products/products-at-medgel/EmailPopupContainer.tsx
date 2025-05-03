"use client";

import PopupContext from "@/contexts/PopupContext";
import { useContext, useEffect } from "react";
import EmailPopup from "./EmailPopup";
import Cookies from "universal-cookie";

type PopupContainerParams = {
  tokenValid: boolean;
  allowVerificationAfter: number;
  emailSent: boolean;
};

const EmailPopupContainer = ({
  tokenValid,
  allowVerificationAfter,
  emailSent,
}: PopupContainerParams) => {
  const { popupState, setPopupState } = useContext(PopupContext);
  const cookies = new Cookies();

  // To set whatever value is obtained from server into this client component
  useEffect(() => {
    // const allowVerificationAfter = cookies.get("allowVerificationAfter");
    // console.log("verification after from cookies :", allowVerificationAfter);
    console.log("verification after from server:", allowVerificationAfter);
    setPopupState({
      ...popupState,
      email: cookies.get("email"),
      tokenValid: tokenValid || false,
      // allowVerificationAfter: allowVerificationAfter || 0,
      emailSent: emailSent || false,
      allowVerificationAfter: allowVerificationAfter || 0,
    });
  }, []);

  return <>{popupState.popupOpen && <EmailPopup />}</>;
};

export default EmailPopupContainer;
