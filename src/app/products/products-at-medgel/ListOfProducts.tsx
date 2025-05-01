// pages/products/products-at-medgel/ListOfProducts.tsx
"use client";
import PopupContextProvider from "@/contexts/PopupContextProvider";
import PopupContainer from "./PopupContainer";
import ProductsContext from "@/contexts/ProductsContext";
import ListItem from "./ListItem";
import { useContext } from "react";
import { ProductContextProps } from "@/types";

type ListOfProductsParams = {
  tokenValid: boolean;
  allowVerificationAfter: number;
  emailSent: boolean;
};

export default function ListOfProducts({
  tokenValid,
  allowVerificationAfter,
  emailSent,
}: ListOfProductsParams) {
  // const { productsState, setProductsState } =
  const { productsState } = useContext<ProductContextProps>(ProductsContext);
  // const categories = productsState.categories;
  const activeCategory = productsState.categories[productsState.activeList];
  // const list = ["Row 1", "Row 2", "Row 3"];
  // const list = productsState.items.list;

  return (
    <>
      <PopupContextProvider>
        <PopupContainer
          tokenValid={tokenValid}
          allowVerificationAfter={allowVerificationAfter}
          emailSent={emailSent}
        />
        {/* Have to pass tokenValid because context can't be changed from outside wrapper*/}
        {/* {Object.entries(list).map(([key, value]) => {
          return (
            <ListItem
              key={key}
              ListTitle={value}
              NumberOfProducts={4}
              ListId={value}
            />
          );
        })} */}

        {/* Products present in the state */}
        {productsState &&
          productsState.categories.length >= 1 &&
          Object.entries(activeCategory.listEntries).map(([key, value]) => {
            return (
              <ListItem
                key={key}
                ListTitle={value.name}
                NumberOfProducts={value.products}
                ListId={value.id}
              />
            );
          })}

        {/* If There are no products in the state */}
        {(!productsState || productsState.categories.length <= 0) && (
          <ListItem ListTitle={"Loading..."} NumberOfProducts={0} ListId="" />
        )}
        {/* <ListItem ListTitle={"Row 1"} NumberOfProducts={4} ListId="1234" /> */}
        {/* You can add more ListItems here or filter them based on active category */}
      </PopupContextProvider>
    </>
  );
}
