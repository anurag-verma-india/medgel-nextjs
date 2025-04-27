// PopupContextProvider.tsx
import { useState } from "react";
import PopupContext from "./PopupContext";

type PopupContextProviderType = {
  children: React.ReactNode;
};

export default function PopupContextProvider({
  children,
}: PopupContextProviderType) {
  const [popupState, setPopupState] = useState({
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
    <PopupContext.Provider value={{ popupState, setPopupState }}>
      {children}
    </PopupContext.Provider>
  );
}
