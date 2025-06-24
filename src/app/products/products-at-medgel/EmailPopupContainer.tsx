"use client";

// import EmailPopupContext, { useEmailPopup } from "@/contexts/EmailPopupContext";
import { useEmailPopup } from "@/contexts/EmailPopupContext";
// import { useContext, useEffect } from "react";
import { useEffect } from "react";
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
  // const { popupState: emailPopupState, setPopupState: setEmailPopupState } = useContext(EmailPopupContext);
  const { emailPopupState, setEmailPopupState } = useEmailPopup();
  const cookies = new Cookies();

  console.log("Email popup state (email popup container): ");
  console.log(emailPopupState);

  // To set whatever value is obtained from server into this client component
  useEffect(() => {
    // const allowVerificationAfter = cookies.get("allowVerificationAfter");
    // console.log("verification after from cookies :", allowVerificationAfter);
    console.log("verification after from server:", allowVerificationAfter);
    setEmailPopupState({
      ...emailPopupState,
      email: cookies.get("email"),
      tokenValid: tokenValid || false,
      // allowVerificationAfter: allowVerificationAfter || 0,
      emailSent: emailSent || false,
      allowVerificationAfter: allowVerificationAfter || 0,
    });
  }, []);

  return <>{emailPopupState.popupOpen && <EmailPopup />}</>;
};

export default EmailPopupContainer;
