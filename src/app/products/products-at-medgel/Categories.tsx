"use client";

import ProductCategoriesContext from "@/contexts/ProductCategoriesContext";
import { ProductCategoryItemState, ProductContextProps } from "@/types";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useContext, useEffect, useRef, useState } from "react";
import EditProductCategoryPopup from "./popups/EditProductCategoryPopup";
import AddProductCategoryPopup from "./popups/AddProductCategoryPopup";

import { useSwipeable } from "react-swipeable";

const Categories = ({ isAdmin }: { isAdmin: boolean }) => {
  // return <div {...handlers}> You can swipe here </div>;

  // const isAdmin = false;
  // const isAdmin = true;
  // const context = useContext(ProductCategoriesContext);
  // const { productsState, setProductsState, refetchData } =
  const { productsState, setProductsState } = useContext<ProductContextProps>(
    ProductCategoriesContext,
  );
  const [editCategoryModalVisible, setEditCategoryModalVisible] =
    useState<boolean>(false);
  const [addCategoryModalVisible, setAddCategoryModalVisible] =
    useState<boolean>(false);

  // if (!context) {
  if (!productsState) {
    throw new Error(
      "ProductCategories must be used within a ProductsContextProvider",
    );
  }

  const { activeCategory, categories, loading, errors } = productsState;

  const refetchData = () => {
    window.location.reload();
  };

  // const { productsState, setProductsState, refetchData } = context;
  // const { categories, activeCategoryIndex, loading } = productsState;

  // State for category edit modal
  // const [isCategoryEditModalVisible, setIsCategoryEditModalVisible] =
  //   useState<boolean>(false);
  // const [selectedCategoryForEdit, setSelectedCategoryForEdit] =
  //   useState<ApiProductCategoryData | null>(null); // Use ApiProductCategoryData

  const [selectedCategoryForEdit, setSelectedCategoryForEdit] =
    useState<ProductCategoryItemState>();

  // Ref for the scrollable container
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  // Ref for individual category elements to scroll into view
  const categoryRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Effect to scroll active category into view
  useEffect(() => {
    if (categoryRefs.current[activeCategory] && scrollContainerRef.current) {
      categoryRefs.current[activeCategory]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [activeCategory, loading]);

  const handlePrevious = (): void => {
    const previousList =
      (activeCategory - 1 + categories.length) % categories.length;
    // setProductsState({ ...productsState, activeCategoryIndex: previousList });
    setProductsState({ ...productsState, activeCategory: previousList });
  };

  const handleNext = (): void => {
    const nextList = (activeCategory + 1) % categories.length;
    // setProductsState({ ...productsState, activeCategoryIndex: nextList });
    setProductsState({ ...productsState, activeCategory: nextList });
  };

  const handleCategoryClick = (index: number): void => {
    // setProductsState({ ...productsState, activeCategoryIndex: index });
    setProductsState({ ...productsState, activeCategory: index });
  };

  const handleEditCategoryClick = (
    category: ProductCategoryItemState,
  ): void => {
    // setIsCategoryEditModalVisible(true);
    setSelectedCategoryForEdit(category);
    setEditCategoryModalVisible(true);
  };

  const swipeHandlers = useSwipeable({
    // onSwiped: (eventData) => console.log("User Swiped!", eventData),
    // ...config,
    onSwipedLeft: () => handlePrevious(),
    onSwipedRight: () => handleNext(),
    swipeDuration: 500,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  if (loading) {
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

  // Handle case where no categories are loaded (e.g., fetch error or empty data)
  if (categories.length === 0) {
    return (
      <div className="w-full">
        <div className="flex min-h-36 w-full flex-row items-center justify-center bg-white text-center text-2xl font-bold">
          No categories found.
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="w-full" {...swipeHandlers}>
        {/* Mobile View - Show one category with arrows */}
        <div className="flex min-h-36 w-full flex-row items-center justify-between bg-white text-center text-2xl font-bold lg:hidden">
          <button
            className="p-4 text-2xl text-neutral-500 hover:text-[#1D8892]"
            onClick={handlePrevious}
            aria-label="Previous category"
          >
            &#10094;
          </button>
          <div className="flex flex-grow flex-col items-center justify-center p-8">
            <span className="flex items-center">
              {categories[activeCategory]?.name || "No category selected"}
              {isAdmin && categories[activeCategory] && (
                <Button
                  type="text"
                  icon={<EditOutlined />}
                  className="ml-2 !text-neutral-500 hover:!text-[#1D8892]"
                  // onClick={() =>
                  //   handleEditCategoryClick(categories[activeCategoryIndex])
                  // }
                  // onClick={() => {
                  //   setEditModalVisible(true);
                  // }}
                  onClick={() => {
                    handleEditCategoryClick(categories[activeCategory]);
                  }}
                  aria-label={`Edit ${categories[activeCategory]?.name}`}
                  title="Edit Category Name"
                />
              )}
            </span>
            <br />
            {/* Mobile View - Add Category */}
            {isAdmin && (
              <span
                // className="flex items-center"
                // className="cursor-pointer rounded bg-[#00a5a5] text-white shadow hover:bg-[#197777] focus:outline-none focus:ring-2 focus:ring-black"
                className="cursor-pointer rounded bg-[#1d8892cb] text-white shadow hover:bg-[#1d8892] focus:outline-none focus:ring-2 focus:ring-black"
                onClick={() => {
                  // console.log("Category + Mobile");
                  setAddCategoryModalVisible(true);
                }}
              >
                <div className="px-3">Add Category</div>
                <PlusOutlined className="cursor-pointer" />
              </span>
            )}
            {/* {isAdmin && categories[activeCategoryIndex] && (
            <div className="text-sm font-normal text-gray-500">
              Edit Category Name
            </div>
          )} */}
          </div>
          <button
            className="p-4 text-2xl text-neutral-500 hover:text-[#1D8892]"
            onClick={handleNext}
            aria-label="Next category"
          >
            &#10095;
          </button>
        </div>

        {/* Desktop View - Show all categories with navigation buttons */}
        <div className="hidden w-full items-center bg-white text-2xl font-bold lg:flex">
          <button
            className="p-4 text-2xl text-neutral-500 hover:text-[#1D8892]"
            onClick={handlePrevious}
            aria-label="Previous category desktop"
          >
            &#10094;
          </button>
          {/* Scrollable container with ref */}
          <div
            ref={scrollContainerRef}
            className="flex flex-grow overflow-x-auto"
          >
            <div className="flex w-fit flex-nowrap">
              {/* Desktop - Add Category button*/}
              {isAdmin && (
                <div
                  className="flex w-40 cursor-pointer flex-col justify-center rounded bg-[#1d8892cb] align-middle text-white shadow hover:bg-[#1d8892] focus:outline-none focus:ring-2 focus:ring-black"
                  onClick={() => {
                    console.log("Category +");
                    setAddCategoryModalVisible(true);
                  }}
                >
                  <PlusOutlined className="flex w-full justify-center pb-3 align-middle" />
                  <div className="justify-center text-center align-middle">
                    Add Category
                  </div>
                </div>
              )}
              {categories.map(
                (category: ProductCategoryItemState, index: number) => (
                  <div
                    key={category._id} // Use API 'id' as key
                    ref={(el) => (categoryRefs.current[index] = el)} // Assign ref to element
                    className={`group relative min-w-[10rem] max-w-56 flex-none cursor-pointer justify-center border-b-2 border-r-2 border-neutral-200 p-8 text-center ${
                      activeCategory === index ? "bg-neutral-100" : ""
                    }`}
                    onClick={() => handleCategoryClick(index)} // Only change active category on click
                  >
                    <span className="flex items-center justify-center">
                      {category.name}
                      {isAdmin && (
                        <Button
                          type="text"
                          icon={<EditOutlined />}
                          className="ml-2 !text-base !text-gray-500 group-hover:!text-[#1D8892]"
                          // onClick={(e) => {
                          //   e.stopPropagation(); // Prevent category tab click when button is clicked
                          //   // handleEditCategoryClick(category);
                          // }}
                          // onClick={(e) => {
                          //   e.stopPropagation(); // Prevent category tab click when button is clicked
                          //   setSelectedCategoryForEdit(category);
                          //   setEditModalVisible(true);
                          // }}
                          // onClick={() => setSelectedCategoryForEdit(category)}
                          onClick={() => handleEditCategoryClick(category)}
                          aria-label={`Edit ${category.name}`}
                          title="Edit Category Name"
                        />
                      )}
                    </span>
                    {/* Tooltip visible on group hover */}
                    {/* {isAdmin && (
                      <div className="pointer-events-none invisible absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 transform whitespace-nowrap rounded bg-slate-300 px-2 py-1 text-xs text-black opacity-0 transition-opacity duration-200 group-hover:visible group-hover:opacity-100">
                        <span className="mr-1">&#9998;</span> Edit Category Name
                      </div>
                    )} */}
                  </div>
                ),
              )}
              {/* <div
                className={
                  "group relative min-w-[10rem] max-w-56 flex-none cursor-pointer justify-center border-b-2 border-r-2 border-neutral-200 p-8 text-center"
                }
              >
                +
              </div> */}
            </div>
          </div>
          <button
            className="p-4 text-2xl text-neutral-500 hover:text-[#1D8892]"
            onClick={handleNext}
            aria-label="Next category desktop"
          >
            &#10095;
          </button>
        </div>
      </div>

      {/* {productsState.errors.length > 0 && (
        <ErrorDisplayModal
          visible={productsState.errors.length > 0}
          onClose={() =>
            // setProductsState((productsState) => ({ ...prev, errors: [] }))
            setProductsState({ ...productsState, errors: [] })
          }
          // messages={productsState.fetchErrors}
          messages={productsState.errors}
        />
      )} */}
      {isAdmin && (
        <EditProductCategoryPopup
          // visible={isCategoryEditModalVisible}
          // onClose={handleCategoryPopupClose}
          // category={selectedCategoryForEdit}
          // onSuccess={handleCategoryPopupSuccess}
          visible={editCategoryModalVisible}
          onClose={() => {
            setEditCategoryModalVisible(false);
          }}
          // category={categories[activeCategory]}
          category={selectedCategoryForEdit || categories[activeCategory]}
          // onSuccess={handleEditPopupSuccess}
          onSuccess={() => refetchData()}
        />
      )}
      {isAdmin && (
        <AddProductCategoryPopup
          visible={addCategoryModalVisible}
          onClose={() => {
            setAddCategoryModalVisible(false);
          }}
          onSuccess={() => refetchData()}
        />
      )}
    </>
  );
};

export default Categories;
