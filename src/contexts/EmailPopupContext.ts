// import { createContext, useState } from "react";

// const [popupState, setPopupState] = useState({
//   tokenValid: false,
//   popupOpen: false,
//   loading: false,
//   emailSent: false,
//   canResend: false,
//   allowVerificationAfter: 0,
//   email: "",
//   errorMessage: "",
//   message: "Please verify your email to view products.",
//   submessage: "If email already requested check your inbox & spam folder",
// });

// const PopupContext = createContext({popupState, setPopupState});

// export default PopupContext;

// PopupContext.tsx
import { createContext } from "react";
import { useContext } from "react";

type EmailPopupState = {
  tokenValid: boolean;
  popupOpen: boolean;
  loading: boolean;
  emailSent: boolean;
  canResend: boolean;
  allowVerificationAfter: number;
  email: string;
  errorMessage: string;
  message: string;
  submessage: string;
};

type EmailPopupContextType = {
  emailPopupState: EmailPopupState;
  setEmailPopupState: React.Dispatch<React.SetStateAction<EmailPopupState>>;
};

const EmailPopupContext = createContext<EmailPopupContextType | null>(null);

export default EmailPopupContext;

// import PopupContext from "./PopupContext";

export const useEmailPopup = () => {
  const context = useContext(EmailPopupContext);
  if (!context) {
    throw new Error("usePopup must be used within a PopupContextProvider");
  }
  return context;
};
