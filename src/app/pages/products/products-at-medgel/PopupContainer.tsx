"use client";

import PopupContext from "@/app/contexts/PopupContext";
import { useContext, useEffect } from "react";
import EmailPopup from "./EmailPopup";
import Cookies from "universal-cookie";

const PopupContainer = ({ tokenValid }: { tokenValid: boolean }) => {
  const { popupState, setPopupState } = useContext(PopupContext);
  const cookies = new Cookies();

  // To set whatever value is obtained from server into this client component
  useEffect(() => {
    const allowVerificationAfter = cookies.get("allowVerificationAfter");
    console.log("verification after from cookies: ", allowVerificationAfter);
    setPopupState({
      ...popupState,
      tokenValid: tokenValid,
      allowVerificationAfter: allowVerificationAfter || 0,
    });
  }, []);

  return <>{popupState.popupOpen && <EmailPopup />}</>;
};

export default PopupContainer;
