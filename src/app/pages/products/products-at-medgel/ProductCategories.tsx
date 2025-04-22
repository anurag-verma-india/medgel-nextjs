// pages/products/products-at-medgel/ProductCategories.tsx
"use client";
import { useState } from "react";

type ProductCategoriesProps = {
  categories: string[];
};

export default function ProductCategories({
  categories,
}: ProductCategoriesProps) {
  const [activeCategory, setActiveCategory] = useState(0);

  const handlePrevious = () => {
    setActiveCategory((prev) =>
      prev === 0 ? categories.length - 1 : prev - 1,
    );
  };

  const handleNext = () => {
    setActiveCategory((prev) =>
      prev === categories.length - 1 ? 0 : prev + 1,
    );
  };

  const handleCategoryClick = (index: number) => {
    setActiveCategory(index);
    // You can implement additional logic here to filter products
  };

  return (
    <div className="w-full">
      {/* Mobile View - Show one category with arrows */}
      <div className="flex w-full flex-row items-center justify-between bg-white text-2xl font-bold md:hidden">
        <button
          className="p-4 text-2xl text-neutral-500 hover:text-[#1D8892]"
          onClick={handlePrevious}
          aria-label="Previous category"
        >
          &#10094;
        </button>
        <div
          className="flex flex-grow cursor-pointer justify-center border-b-2 border-neutral-200 bg-neutral-100 p-8"
          onClick={() => handleCategoryClick(activeCategory)}
        >
          {categories[activeCategory]}
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
      <div className="hidden w-full flex-row justify-evenly bg-white text-2xl font-bold md:flex">
        {categories.map((category, index) => (
          <div
            key={index}
            className={`flex w-full cursor-pointer justify-center border-b-2 border-r-2 border-neutral-200 p-8 ${
              activeCategory === index ? "bg-neutral-100" : ""
            }`}
            onClick={() => handleCategoryClick(index)}
          >
            {category}
          </div>
        ))}
      </div>
    </div>
  );
}
