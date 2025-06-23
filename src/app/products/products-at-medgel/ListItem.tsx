"use client";

import ProductCategoriesContext from "@/contexts/ProductCategoriesContext";
import { ProductContextProps, ProductListEntry } from "@/types";
import { Button } from "antd";
import { useContext, useState } from "react";
import EditProductListPopup from "./popups/EditProductListPopup";
import { LoaderCircle } from "lucide-react"; // Added LoaderCircle for loading spinner
import { redirect, RedirectType } from "next/navigation";
import { useEmailPopup } from "@/contexts/EmailPopupContext";

const ListItem = ({
  isAdmin,
  categoryId,
  list,
  onlyText,
}: {
  isAdmin: boolean;
  categoryId: string;
  list: ProductListEntry;
  onlyText: boolean;
}) => {
  // Check if loading form product state
  // const { productsState, setProductsState } = useContext<ProductContextProps>(
  //   ProductCategoriesContext,
  // );
  const { productsState } = useContext<ProductContextProps>(
    ProductCategoriesContext,
  );
  const [editListPopupVisible, setEditListPopupVisible] = useState(false);
  if (!productsState) {
    throw new Error(
      "ProductCategories must be used within a ProductsContextProvider",
    );
  }
  const { loading: categoriesContextLoading } = productsState;

  const numberOfProducts = list.products;
  const formattedProducts =
    numberOfProducts < 10 ? `0${numberOfProducts}` : `${numberOfProducts}`;

  const [isPageLoading, setIsPageLoading] = useState<boolean>(false);
  // const emailContext = useEmailPopup();
  const { emailPopupState, setEmailPopupState } = useEmailPopup();

  const HandleListClick = (listId: string) => {
    console.log(listId);
    // console.log(popupState);
    console.log("Email context (in new list item):");
    console.log(emailPopupState);
    // redirect(`/products/product-list/${listId}`, RedirectType.push);

    // if (!onlyText) {
    //   setIsPageLoading(true); // Show loading spinner
    // }

    // if (popupState.tokenValid) {
    if (emailPopupState.tokenValid) {
      // TODO: The page redirected to here should should also check user's JWT token from cookies (prevent)
      setIsPageLoading(true); // Show loading spinner
      // No need to explicitly navigate here, Next.js <Link> handles it
      redirect(`/products/product-list/${listId}`, RedirectType.push);
    } else {
      // setPopupState({ ...popupState, popupOpen: !popupState.popupOpen });
      setEmailPopupState({ ...emailPopupState, popupOpen: true });
    }
  };

  return (
    <>
      <div
        className="flex cursor-pointer items-center border-b border-neutral-200 p-4 last:border-b-0 hover:bg-neutral-50"
        onClick={() => {
          HandleListClick(list.id);
        }}
      >
        <div className="flex flex-grow items-center">
          <h3 className="text-xl font-medium text-neutral-800">
            {/* {productListItem.name} */}
            {list.name}
          </h3>
          {!onlyText && (
            <span className="ml-auto mr-2 text-lg text-neutral-600 md:mr-4">
              {!categoriesContextLoading && (
                <span className="md:hidden">({formattedProducts})</span>
              )}
              <span className="hidden md:inline">
                {/* {!Number.isNaN(list.products) && <>{formattedProducts} Products</>} */}
                {!categoriesContextLoading && <>{formattedProducts} Products</>}
              </span>
            </span>
          )}
        </div>
        {!categoriesContextLoading && !onlyText && (
          <div className="flex space-x-2">
            {/* View details button */}
            <Button
              type="text"
              className="p-2 text-2xl !text-neutral-500 hover:!text-[#1D8892]"
              aria-label="View details"
              title="View Details"
            >
              &#10095;
            </Button>
            {isAdmin && (
              <>
                {/* Edit Button */}
                <Button
                  className="rounded-md bg-[#1D8892] px-3 py-1 text-sm text-white hover:bg-opacity-90"
                  onClick={(e) => {
                    // To prevent opening the list when clicking on edit
                    e.stopPropagation();
                    setEditListPopupVisible(true);
                  }}
                >
                  Edit
                </Button>
              </>
            )}
          </div>
        )}
      </div>
      {isPageLoading && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gray-800 bg-opacity-75 backdrop-blur-sm">
          <LoaderCircle className="h-12 w-12 animate-spin text-[#008080]" />
        </div>
      )}
      {isAdmin && (
        <EditProductListPopup
          key={list.id}
          categoryId={categoryId}
          list={list}
          onClose={() => setEditListPopupVisible(false)}
          onSuccess={() => {
            window.location.reload();
          }}
          visible={editListPopupVisible}
        />
      )}
    </>
  );
};

export default ListItem;
