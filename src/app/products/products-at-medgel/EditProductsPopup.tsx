// src/app/products/products-at-medgel/EditProductsPopup.tsx
"use client";

import ProductsContext from "@/contexts/ProductsContext";
import { ProductContextProps, ProductsStateType } from "@/types";
import { useContext, useState } from "react";
// import ListItem from "./ListItem";
// import ProductsContextProvider from "@/contexts/ProductsContextProvider";

type EditProductsPopupParams = {
  setModalOpen: (modalOpen: boolean) => void;
};

const EditProductsPopup = ({ setModalOpen }: EditProductsPopupParams) => {
  const { productsState } = useContext<ProductContextProps>(ProductsContext);
  console.log("Products state: \n");
  console.log(productsState);
  const [localProductsState, setLocalProductsState] =
    useState<ProductsStateType>(productsState);

  console.log("Categories: ");
  for (const category of productsState.categories[productsState.activeList]
    .listEntries) {
    console.log(category.name);
  }

  return (
    <>
      <div className="fixed inset-0 z-10 bg-black bg-opacity-50" />

      {/* Modal content */}
      <div className="fixed inset-0 z-50 flex h-5/6 flex-col items-center justify-center pt-20">
        <div
          className="scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 mx-auto flex w-5/6 flex-col overflow-y-auto rounded-xl bg-white p-6 shadow-lg"
          style={{
            scrollbarWidth: "auto",
            scrollbarColor: "#A0AEC0 #EDF2F7",
          }}
        >
          {/* Close button */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="cursor-pointer border-none bg-transparent text-2xl"
              aria-label="Close"
            >
              ×
            </button>
          </div>
          <div className="mb-2 block w-full text-center text-3xl font-medium text-gray-700">
            {productsState.categories[productsState.activeList].name}
          </div>
          {/* {Object.entries(activeCategory.listEntries).map(([key, value]) => {
            return (
              <ListItem
                key={key}
                ListTitle={value.name}
                NumberOfProducts={value.products}
                ListId={value.id}
              />
            );
          })} */}
          {
            <div key={""} className="mb-6">
              <label
                htmlFor={""}
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                {/* {key.replace(/_/g, " ").toUpperCase()} */}
              </label>
              <textarea
                id={""}
                name={""}
                className="w-full resize-none rounded-lg border border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                rows={4}
                value={"Sample value"}
                // onChange={(e) => updateFormField(key, e.target.value)}
                onChange={(e) => {}}
              />
            </div>
          }
        </div>
      </div>
    </>
  );
};

const EditProductsPopupContainer = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      {/* <ProductsContextProvider> */}
      {modalOpen && <EditProductsPopup setModalOpen={setModalOpen} />}
      <div className="relative">
        <button
          onClick={() => {
            setModalOpen(!modalOpen);
          }}
          className="absolute right-0 top-0 rounded bg-[#00a5a5] px-4 py-2 text-black opacity-40 shadow hover:bg-[#197777] focus:outline-none focus:ring-2 focus:ring-black"
        >
          Edit
        </button>
      </div>
      {/* </ProductsContextProvider> */}
    </>
  );
};

export default EditProductsPopupContainer;
