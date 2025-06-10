// src/app/products/products-at-medgel/ProductCategories.tsx
// TODO: When the state changes update it in the ProductsContext

"use client";

import { useContext } from "react";
import ProductsContext from "@/contexts/ProductCategoriesContext";
import { ProductContextProps, ProductCategoryItem } from "@/types";

export default function ProductCategories() {
  const { productsState, setProductsState } =
    useContext<ProductContextProps>(ProductsContext);

  const { categories, activeList, loading } = productsState;

  const handlePrevious = () => {
    const previousList =
      (activeList - 1 + categories.length) % categories.length;
    setProductsState({ ...productsState, activeList: previousList });
  };

  const handleNext = () => {
    const nextList = (activeList + 1) % categories.length;
    setProductsState({ ...productsState, activeList: nextList });
  };

  const handleCategoryClick = (index: number) => {
    setProductsState({ ...productsState, activeList: index });
    console.log("Changing active products state: ", index);
  };

  // Show loading state
  if (loading || categories.length === 0) {
    return (
      <div className="w-full">
        {/* Mobile View - Loading */}
        <div className="flex min-h-36 w-full flex-row items-center justify-between bg-white text-center text-2xl font-bold lg:hidden">
          <button
            className="p-4 text-2xl text-neutral-500"
            aria-label="Previous category"
            disabled
          >
            &#10094;
          </button>
          <div className="flex flex-grow justify-center p-8">Loading...</div>
          <button
            className="p-4 text-2xl text-neutral-500"
            aria-label="Next category"
            disabled
          >
            &#10095;
          </button>
        </div>

        {/* Desktop View - Loading */}
        <div className="hidden w-full flex-row justify-evenly bg-white text-2xl font-bold lg:flex">
          <div className="flex w-full cursor-pointer justify-center border-b-2 border-r-2 border-neutral-200 p-8 text-center">
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
          {categories[activeList]?.name || "No category selected"}
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
