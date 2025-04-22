// pages/products/products-at-medgel/ListOfProducts.tsx
"use client";
import PopupContextProvider from "@/contexts/PopupContextProvider";
import ListItem from "./ListItem";
import PopupContainer from "./PopupContainer";

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
        {/* You can add more ListItems here or filter them based on active category */}
      </PopupContextProvider>
    </>
  );
}
