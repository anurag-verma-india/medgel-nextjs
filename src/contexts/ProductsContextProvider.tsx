// "use client";
// TODO: Get the data from server and also initialize the state

import { useEffect, useState } from "react";
import ProductsContext from "./ProductsContext";
import {
  ProductsStateType,
  ProductCategoryItem,
  ProductListEntry,
  ProductListEntryDB,
  ProductCategoryItemDB,
} from "@/types";
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
    categories: [],
    // [
    //   {
    //     name: "OTC Products",
    //     listEntries: [
    //       { name: "List 1", products: 1, id: "sampleid" },
    //       { name: "List 2", products: 1, id: "sampleid" },
    //       { name: "List 3", products: 1, id: "sampleid" },
    //     ],
    //   },
    //   {
    //     name: "Natraceuticals Products",
    //     listEntries: [
    //       { name: "List 4", products: 2, id: "sampleid" },
    //       { name: "List 5", products: 2, id: "sampleid" },
    //       { name: "List 6", products: 2, id: "sampleid" },
    //     ],
    //   },
    //   {
    //     name: "Food Supplements",
    //     listEntries: [
    //       { name: "List 7", products: 3, id: "sampleid" },
    //       { name: "List 8", products: 3, id: "sampleid" },
    //     ],
    //   },
    //   {
    //     name: "Products Under Development",
    //     listEntries: [
    //       { name: "List 9", products: 4, id: "sampleid" },
    //       { name: "List 10", products: 4, id: "sampleid" },
    //     ],
    //   },
    // ],
  });

  useEffect(() => {
    // let ProductsContextToSet: ProductsStateType = {
    setProductsState({ ...productsState, loading: true });
    const ProductsContextToSet: ProductsStateType = {
      ...productsState,
      loading: false,
      categories: [],
    };
    async function fetchData() {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/product_category`,
        );
        const categories: ProductCategoryItemDB[] = response.data.categories;
        console.log("Response categories:", response.data.categories);

        Object.entries(categories).map(async ([catKey, category]) => {
          const categoryToSet: ProductCategoryItem = {
            name: category.product_category_name,
            listEntries: [],
          };
          console.log(`${catKey}: ${category.product_category_name}`);
          const lists = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/get_list_name`,
            { product_id_array: category.productLists },
          );

          const product_lists: ProductListEntryDB[] = lists.data.product_lists;

          Object.entries(product_lists).map(([listKey, list]) => {
            const listEntryToSet: ProductListEntry = {
              id: list._id,
              name: list.product_list_name,
              products: NaN,
            };
            categoryToSet.listEntries.push(listEntryToSet);
          });
          ProductsContextToSet.categories.push(categoryToSet);
          setProductsState(ProductsContextToSet);
        });
      } catch (error) {
        handleError(
          error,
          "Error occurred while getting product lists from categories",
        );
      }
    }
    fetchData();
  }, []);

  return (
    <ProductsContext.Provider value={{ productsState, setProductsState }}>
      {children}
    </ProductsContext.Provider>
  );
}
