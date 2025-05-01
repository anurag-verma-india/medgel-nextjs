// pages/products/products-at-medgel/ProductCategories.tsx
// TODO: When the state changes update it in the ProductsContext
"use client";
// import { useContext, useState } from "react";
import { useContext, useEffect } from "react";
import ProductsContext from "@/contexts/ProductsContext";
import { ProductContextProps, ProductCategoryItem } from "@/types";

export default function ProductCategories() {
  const { productsState, setProductsState } =
    useContext<ProductContextProps>(ProductsContext);
  // const productContext = useContext(ProductsContext);
  // const productsState: productsStateType = productContext.productsState;
  // const setProductsState = (arg: productsStateType) => {
  //   productContext.setProductsState(arg);
  // };
  // const activeList = productsState.activeList;
  const { categories, activeList } = productsState;
  const handlePrevious = () => {
    let previousList = activeList - 0;
    if (previousList < 0) {
      // We are going past the -1th element so loop back around from back
      previousList += productsState.categories.length;
    }
    setProductsState({ ...productsState, activeList: previousList });
    // console.log("Active List: ", activeList);
  };

  const handleNext = () => {
    // We are going past the last (n-1th) element so loop back around from front
    const length = productsState.categories.length;
    let nextList = activeList + 1;
    if (nextList >= length) {
      nextList -= length;
    }
    setProductsState({ ...productsState, activeList: nextList });
    // console.log("Active List: ", activeList);
  };
  const handleCategoryClick = (index: number) => {
    setProductsState({ ...productsState, activeList: index });
    // You can implement additional logic here to filter products
  };

  // -------------------------- Return starts from here
  if (!productsState || productsState.categories.length <= 0) {
    // If there are no categories in the context show loading
    return (
      <div className="w-full">
        {/* Mobile View - Show one category with arrows */}
        <div className="flex min-h-36 w-full flex-row items-center justify-between bg-white text-center text-2xl font-bold lg:hidden">
          <button
            className="p-4 text-2xl text-neutral-500 hover:text-[#1D8892]"
            aria-label="Previous category"
          >
            &#10094;
          </button>
          <div className="flex flex-grow justify-center p-8">Loading...</div>
          <button
            className="p-4 text-2xl text-neutral-500 hover:text-[#1D8892]"
            // onClick={handleNext}
            aria-label="Next category"
          >
            &#10095;
          </button>
        </div>

        {/* Desktop View - Show all categories */}
        <div className="hidden w-full flex-row justify-evenly bg-white text-2xl font-bold lg:flex">
          <div
            className={`flex w-full cursor-pointer justify-center border-b-2 border-r-2 border-neutral-200 p-8 text-center`}
          >
            Loading...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Mobile View - Show one category with arrows */}
      <div className="flex min-h-36 w-full flex-row items-center justify-between bg-white text-center text-2xl font-bold lg:hidden">
        <button
          className="p-4 text-2xl text-neutral-500 hover:text-[#1D8892]"
          onClick={handlePrevious}
          aria-label="Previous category"
        >
          &#10094;
        </button>
        <div className="flex flex-grow justify-center p-8">
          {productsState.categories[activeList].name}
        </div>
        <button
          className="p-4 text-2xl text-neutral-500 hover:text-[#1D8892]"
          onClick={handleNext}
          aria-label="Next category"
        >
          &#10095;
        </button>
      </div>

      {/* Desktop View - Show all categories */}
      <div className="hidden w-full flex-row justify-evenly bg-white text-2xl font-bold lg:flex">
        {categories.map((category: ProductCategoryItem, index: number) => (
          <div
            key={index}
            className={`flex w-full cursor-pointer justify-center border-b-2 border-r-2 border-neutral-200 p-8 text-center ${
              activeList === index ? "bg-neutral-100" : ""
            }`}
            onClick={() => handleCategoryClick(index)}
          >
            {category.name}
          </div>
        ))}
      </div>
    </div>
  );
}
