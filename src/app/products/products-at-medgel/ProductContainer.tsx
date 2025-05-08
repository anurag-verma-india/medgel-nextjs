// src/app/products/products-at-medgel/ProductContainer.tsx
"use client";

import React from "react";
import ProductCategories from "./ProductCategories";
import ListOfProducts from "./ListOfProducts";
import ProductsContextProvider from "@/contexts/ProductsContextProvider";

type ProductContainerParams = {
  tokenValid: boolean;
  allowVerificationAfter: number;
  emailSent: boolean;
};

const ProductContainer = ({
  tokenValid,
  allowVerificationAfter,
  emailSent,
}: ProductContainerParams) => {
  // const categories = [
  //   "OTC Products",
  //   "Natraceuticals Products",
  //   "Food Supplements",
  //   "Products Under Development",
  // ];
  // categories.forEach(async (category) => {
  //   const category_details = await fetch(
  //     // `${process.env.NEXT_PUBLIC_API_URL}/page/?title=${title}`,
  //     `${process.env.NEXT_PUBLIC_API_URL}/product_category?product_category_name=${category}`,
  //     {
  //       cache: "no-store",
  //       // cache: "force-cache",
  //       // next: { tags: [title] },
  //     },
  //   );
  //   console.log(`Product name: ${category}`);
  //   console.log(`Product details: ${category_details}`);
  // });
  return (
    <>
      <ProductsContextProvider>
        {/* <ProductCategories categories={categories} /> */}
        <ProductCategories  />
        <ListOfProducts
          tokenValid={tokenValid}
          allowVerificationAfter={allowVerificationAfter}
          emailSent={emailSent}
        />
      </ProductsContextProvider>
    </>
  );
};

export default ProductContainer;
