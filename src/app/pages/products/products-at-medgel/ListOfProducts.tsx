"use client";
import PopupContextProvider from "@/app/contexts/PopupContextProvider";

import ListItem from "./ListItem";
import PopupContainer from "./PopupContainer";
// import PopupContainer from "./PopupContainer";
// import EmailPopup from "./EmailPopup";

// import { useContext, useEffect } from "react";
// import PopupContext from "@/app/contexts/PopupContext";

type ListOfProductsParams = {
  tokenValid: boolean;
};

export default function ListOfProducts({ tokenValid }: ListOfProductsParams) {
  return (
    <>
      <PopupContextProvider>
        <PopupContainer tokenValid={tokenValid} />
        {/* Have to pass tokenValid because context can't be changed from outside wrapper*/}
        <ListItem ListTitle={"Row 1"} NumberOfProducts={4} ListId="1234" />
      </PopupContextProvider>
    </>
  );
}
