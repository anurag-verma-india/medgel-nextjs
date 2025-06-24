"use client";

import React, { ReactNode } from "react";
import "@ant-design/v5-patch-for-react-19";
import ProductsContextProvider from "@/contexts/ProductCategoriesContextProvider";
import EmailPopupContextProvider from "@/contexts/EmailPopupContextProvider";
// import { useEmailPopup } from "@/contexts/EmailPopupContext";

const ClientSideContextHandler = ({
  children,
  // tokenValid,
  // allowVerificationAfter,
  // emailSent,
}: {
  children: ReactNode;
  // tokenValid: boolean;
  // allowVerificationAfter: number;
  // emailSent: boolean;
}) => {
  return (
    <>
      <EmailPopupContextProvider>
        <ProductsContextProvider>
          {/* <ClientSideContextSetter
            tokenValid={tokenValid}
            allowVerificationAfter={allowVerificationAfter}
            emailSent={emailSent}
          > */}
          {children}
          {/* </ClientSideContextSetter> */}
        </ProductsContextProvider>
      </EmailPopupContextProvider>
    </>
  );
};

export default ClientSideContextHandler;

// const ClientSideContextSetter = ({
//   children,
//   tokenValid,
//   allowVerificationAfter,
//   emailSent,
// }: {
//   children: ReactNode;
//   tokenValid: boolean;
//   allowVerificationAfter: number;
//   emailSent: boolean;
// }) => {
//   const { emailPopupState, setEmailPopupState } = useEmailPopup();
//   useEffect(() => {
//     setEmailPopupState({
//       ...emailPopupState,
//       tokenValid,
//       allowVerificationAfter,
//       emailSent,
//     });
//   }, []);

//   return <>{children}</>;
// };
