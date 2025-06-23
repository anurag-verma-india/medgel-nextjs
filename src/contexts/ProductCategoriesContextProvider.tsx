"use client";

import { useEffect, useState } from "react";
import ProductsContext from "./ProductCategoriesContext";
import {
  ProductsCategoriesStateType,
  ProductCategoryItemState as ProductCategoryItemState,
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
  const [productsState, setProductsState] =
    useState<ProductsCategoriesStateType>({
      activeCategory: 0,
      loading: true, // Start with loading true
      categories: [],
      errors: [],
    });

  const errors: string[] = [];
  async function refetchData() {
    try {
      // Set loading state
      setProductsState((prev) => ({ ...prev, loading: true }));

      // Fetch all categories first
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/product_category`,
      );
      if (!response || !response.data || !response.data.categories) {
        errors.push("There was an error while getting product categories");
        // No need to process categories if they don't exist
        setProductsState((prev) => ({ ...prev, errors, loading: false }));
        return;
      }

      // console.log("Response from get product_category")
      // console.log(response)
      const categoriesData: ProductCategoryItemDB[] = response.data.categories;
      // console.log("Response categories:", categoriesData);

      // Prepare an array to collect all processed categories
      const processedCategories: ProductCategoryItemState[] = [];

      // Process each category sequentially
      for (const category of categoriesData) {
        // console.log("Categories fetched: ");
        // console.log(category.productLists);
        const categoryToSet: ProductCategoryItemState = {
          _id: category._id,
          name: category.product_category_name,
          listEntries: [],
          // number_of_products: category.productLists.length,
        };

        // Fetch lists for this category
        const lists: {
          data: { success: boolean; product_lists: ProductListEntryDB[] };
        } = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/get_list_name`,
          {
            product_id_array: category.productLists,
          },
        );
        // console.log(`Lists found in ${category.product_category_name}`);
        // console.log(lists);

        if (!lists || !lists.data || !lists.data.success) {
          errors.push("An error occurred while getting product lists");
        }
        // console.log("from get_list_name (in context)");
        // console.log(lists);
        const product_lists = lists.data.product_lists;

        // console.log("Product lists found (context)");
        // console.log(product_lists);

        // Process each list
        product_lists.forEach((list) => {
          const listEntryToSet: ProductListEntry = {
            id: list._id,
            name: list.product_list_name,
            products: list.product_ids.length,
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
        errors,
      });
    } catch (error) {
      handleError(
        error,
        "Error occurred while getting product lists from categories",
        // Even on error the loading state is set to false
      );
      setProductsState((prev) => ({ ...prev, errors, loading: false }));
    }
  }

  useEffect(() => {
    // For the first time
    refetchData();
    // console.log("Finally state");
    // console.log(productsState);
  }, []);

  return (
    <ProductsContext.Provider
      value={{ productsState, setProductsState, refetchData }}
    >
      {children}
    </ProductsContext.Provider>
  );
}
