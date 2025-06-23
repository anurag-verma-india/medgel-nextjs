// PopupContextProvider.tsx
import { useState } from "react";
import EmailPopupContext from "./EmailPopupContext";

type EmailPopupContextProviderType = {
  children: React.ReactNode;
};

export default function EmailPopupContextProvider({
  children,
}: EmailPopupContextProviderType) {
  const [emailPopupState, setEmailPopupState] = useState({
    tokenValid: false,
    popupOpen: false,
    loading: false,
    emailSent: false,
    canResend: false,
    allowVerificationAfter: 0,
    email: "",
    errorMessage: "",
    message: "Please verify your email to view products.",
    submessage: "If email already requested check your inbox & spam folder",
  });

  return (
    <EmailPopupContext.Provider value={{ emailPopupState, setEmailPopupState }}>
      {children}
    </EmailPopupContext.Provider>
  );
}
