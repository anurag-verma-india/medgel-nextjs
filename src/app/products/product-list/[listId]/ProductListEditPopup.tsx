"use client";
import React from "react";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import ProductDataContext from "@/contexts/ProductDataContext";
import { ProductContextProps, ProductsStateType } from "@/types";
type EditProductsPopupParams = {
  setModalOpen: (ModalOpen: boolean) => void;
};


const EditProductsPopup = ({ setModalOpen }: EditProductsPopupParams) => {
  const [categoryId, setCategoryId] = useState<string | null>(null);
//  const { productsState } = useContext<ProductContextProps>(ProductsContext);

 // Create a deep copy of productsState for local edits
  //  const [localProductsState, setLocalProductsState] =
  //    useState<ProductsStateType>(
  //      JSON.parse(JSON.stringify(productsState)), // Deep copy to prevent reference issues
  //    );
      // Re-initialize localProductsState if productsState changes
  useEffect(() => {
    // setLocalProductsState(JSON.parse(JSON.stringify(productsState)));
    setCategoryId(window.localStorage.getItem("activeCategoryId"));
  }, []);
  // console.log("EditProductsPopup", localProductsState);
  return (
  <div className="fixed inset-0 z-50 bg-white shadow-lg p-4">
    <p>Edit Product Popup</p>
    <button onClick={() => setModalOpen(false)}>Close</button>
  </div>
);
}
const ProductListEditPopup = () => {
const [ModalOpen,setModalOpen] = useState(false);

  return (
    <>
    {ModalOpen && <EditProductsPopup setModalOpen={setModalOpen} />}
    <div className="relative right-0 top-0">
      <button
        onClick={() => {
          setModalOpen(!ModalOpen);
          console.log("Edit Clicked");
        }}
        className="absolute right-0 top-0 rounded bg-[#00a5a5] px-4 py-2 text-black opacity-40 shadow hover:bg-[#197777] focus:outline-none focus:ring-2 focus:ring-black"
      >
        Edit
      </button>
    </div>
    </>
  );
};

export default ProductListEditPopup;
