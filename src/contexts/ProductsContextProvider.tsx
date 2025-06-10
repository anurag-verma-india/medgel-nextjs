"use client";

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
    loading: true, // Start with loading true
    categories: [],
    error: "",
  });

  useEffect(() => {
    async function fetchData() {
      try {
        // Set loading state
        setProductsState((prev) => ({ ...prev, loading: true }));

        // Fetch all categories first
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/product_category`,
        );
        // console.log("Response from get product_category")
        // console.log(response)
        const categoriesData: ProductCategoryItemDB[] =
          response.data.categories;
        // console.log("Response categories:", categoriesData);

        // Prepare an array to collect all processed categories
        const processedCategories: ProductCategoryItem[] = [];

        // Process each category sequentially
        for (const category of categoriesData) {
          const categoryToSet: ProductCategoryItem = {
            _id: category._id,
            name: category.product_category_name,
            listEntries: [],
          };

          // Fetch lists for this category
          const lists = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/get_list_name`,
            { product_id_array: category.productLists },
          );

          const product_lists: ProductListEntryDB[] = lists.data.product_lists;


        // console.log("Product lists found (context)");
        // console.log(product_lists);

          // Process each list
          product_lists.forEach((list) => {
            const listEntryToSet: ProductListEntry = {
              id: list._id,
              name: list.product_list_name,
              products: NaN,
            };
            categoryToSet.listEntries.push(listEntryToSet);
          });

          // Add this category to our collection
          processedCategories.push(categoryToSet);
        }

        // Update state once with all categories
        setProductsState({
          ...productsState,
          loading: false,
          categories: processedCategories,
        });
      } catch (error) {
        handleError(
          error,
          "Error occurred while getting product lists from categories",
        );
        // Even on error the loading state is set to false
        setProductsState((prev) => ({ ...prev, loading: false }));
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
