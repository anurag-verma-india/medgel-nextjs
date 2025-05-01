// "use client";
// TODO: Get the data from server and also initialize the state

import { useEffect, useState } from "react";
import ProductsContext from "./ProductsContext";
import { ProductsStateType } from "@/types";
import axios from "axios";
import handleError from "@/helpers/handleError";

type PopupContextProviderType = {
  children: React.ReactNode;
};

export default function PopupContextProvider({
  children,
}: PopupContextProviderType) {
  const [productsState, setProductsState] = useState<ProductsStateType>({
    activeList: 0,
    loading: false,
    categories: [
      {
        name: "OTC Products",
        listEntries: [
          { name: "List 1", products: 1, id: "sampleid" },
          { name: "List 2", products: 1, id: "sampleid" },
          { name: "List 3", products: 1, id: "sampleid" },
        ],
      },
      {
        name: "Natraceuticals Products",
        listEntries: [
          { name: "List 4", products: 2, id: "sampleid" },
          { name: "List 5", products: 2, id: "sampleid" },
          { name: "List 6", products: 2, id: "sampleid" },
        ],
      },
      {
        name: "Food Supplements",
        listEntries: [
          { name: "List 7", products: 3, id: "sampleid" },
          { name: "List 8", products: 3, id: "sampleid" },
        ],
      },
      {
        name: "Products Under Development",
        listEntries: [
          { name: "List 9", products: 4, id: "sampleid" },
          { name: "List 10", products: 4, id: "sampleid" },
        ],
      },
    ],
  });

  // useEffect(() => {
  // // let ProductsContextToSet: ProductsStateType = {
  // const ProductsContextToSet: ProductsStateType = {
  //   activeList: 0,
  //   loading: false,
  //   categories: [
  //     // {
  //     //   name: "",
  //     //   listEntries: [{ name: "", products: 0, id: "" }],
  //     // },
  //   ],
  // };
  // setProductsState(ProductsContextToSet);
  //-----------
  // Object.entries(productsState.categories).map(async ([key, value]) => {
  //   try {
  //     const response = await axios.get(
  //       `${process.env.NEXT_PUBLIC_API_URL}/product_category?product_category_name=${value.name}`,
  //     );
  //     // console.log(response);
  //     console.log(`${key}: ${value.name}1\n`);
  //     Object.entries(response.data.category.productLists).map(
  //       ([key1, value1]) => {
  //         console.log(`    ${key1} -> ${value1}`);
  //       },
  //     );
  //     console.log("");
  //   } catch (error) {
  //     handleError(
  //       error,
  //       "Error occurred while getting product lists from categories",
  //     );
  //   }
  // });
  // }, []);

  return (
    <ProductsContext.Provider value={{ productsState, setProductsState }}>
      {children}
    </ProductsContext.Provider>
  );
}
