// src/app/products/products-at-medgel/EditProductsPopup.tsx
"use client";

import ProductsContext from "@/contexts/ProductsContext";
import { ProductContextProps, ProductsStateType } from "@/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Clipboard } from "lucide-react";
import { useContext, useEffect, useState } from "react";
// import ListItem from "./ListItem";
// import ProductsContextProvider from "@/contexts/ProductsContextProvider";

type EditProductsPopupParams = {
  setModalOpen: (modalOpen: boolean) => void;
};

const EditProductsPopup = ({ setModalOpen }: EditProductsPopupParams) => {
  const { productsState, setProductsState } =
    useContext<ProductContextProps>(ProductsContext);

  // Create a deep copy of productsState for local edits
  const [localProductsState, setLocalProductsState] =
    useState<ProductsStateType>(
      JSON.parse(JSON.stringify(productsState)), // Deep copy to prevent reference issues
    );

  // Re-initialize localProductsState if productsState changes
  useEffect(() => {
    setLocalProductsState(JSON.parse(JSON.stringify(productsState)));
  }, [productsState]);
  const activeCategory =
    localProductsState.categories[localProductsState.activeList];

  // const [activeCategory, setActiveCategory] = useState(
  //   localProductsState.categories[localProductsState.activeList],
  // );

  // const { productsState, setProductsState } =
  //   useContext<ProductContextProps>(ProductsContext);
  // // console.log("Products state: \n");
  // // console.log(productsState);
  // const [localProductsState, setLocalProductsState] =
  //   useState<ProductsStateType>(productsState);

  // // Get the active category based on activeList index
  // // const activeCategory =
  // //   localProductsState.categories[localProductsState.activeList];
  // const [activeCategory, setActiveCategory] = useState(
  //   localProductsState.categories[localProductsState.activeList],
  // );

  // --------------

  // console.log("Categories: ");
  // for (const category of productsState.categories[productsState.activeList]
  //   .listEntries) {
  //   console.log(category.name);
  // }

  const updateListEntry = (
    entryIndex: number,
    field: "name" | "products",
    value: string | number,
  ) => {
    const updatedState = { ...localProductsState };
    const updatedEntries = [
      ...updatedState.categories[updatedState.activeList].listEntries,
    ];

    updatedEntries[entryIndex] = {
      ...updatedEntries[entryIndex],
      [field]: value,
    };

    updatedState.categories[updatedState.activeList].listEntries =
      updatedEntries;

    setLocalProductsState(updatedState);

    // setProductsState(updatedState);

    // onUpdate(updatedState);
  };

  const handleClosePopup = () => {
    const confirmation = confirm(
      "Are you sure?\nClosing this section will lose all the changes you have currently made",
    );
    if (!confirmation) return;
    setModalOpen(false);
  };

  const handleReset = (): void => {
    const confirmation = confirm(
      "Are you sure?\nResetting will lose all the changes you have currently made",
    );
    if (!confirmation) return;
    setLocalProductsState(productsState);
  };

  const handleSave = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ): Promise<void> => {
    e.preventDefault();

    const shouldSave = confirm(
      "Are you sure you want to save these changes?\nYou won't be able to reset after save.",
    );
    if (!shouldSave) return;

    // try {
    //   await axios.put("/api/page", {
    //     title,
    //     content: formData,
    //   });

    //   // Close modal and refresh page to show updates
    //   setModalOpen(false);
    //   location.reload();
    // } catch (error) {
    //   console.error("Failed to save page content:", error);
    //   alert("Failed to save changes. Please try again.");
    // }
  };

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
              // onClick={() => setModalOpen(false)}
              onClick={handleClosePopup}
              className="cursor-pointer border-none bg-transparent text-2xl"
              aria-label="Close"
            >
              ×
            </button>
          </div>
          <div className="mb-2 block w-full text-center text-3xl font-medium text-gray-700">
            {productsState.categories[productsState.activeList].name}
          </div>
          {activeCategory.listEntries.map((entry, index) => (
            <div key={entry.id} className="space-y-4 rounded-lg border p-4">
              <div className="mb-4">
                <label
                  htmlFor={`entry-name-${entry.id}`}
                  className="mb-2 flex w-1/2 items-center text-sm font-medium text-gray-700 hover:cursor-pointer"
                  onClick={() => {
                    try {
                      navigator.clipboard.writeText(entry.id);
                      alert(`Copied to clipboard \nid: ${entry.id}`);
                    } catch (error) {
                      console.log("Error while id to clipboard");
                      console.log(error);
                    }
                  }}
                >
                  {index + 1}. Product List ID:{" "}
                  {/* List Id (with clipboard icon) */}
                  <div className="group flex items-center rounded-sm bg-gray-400 p-1 text-black">
                    <span className="group-hover:hidden">{entry.id}</span>
                    <span className="hidden group-hover:inline">
                      Click to copy this ID to clipboard
                    </span>
                    <Clipboard className="h-5" />
                  </div>
                  {/* 
                  <div className="flex items-center rounded-sm bg-gray-400 p-1 text-black">
                    {entry.id}
                    <Clipboard className="h-5" />
                  </div> */}
                </label>
                <input
                  id={`entry-name-${entry.id}`}
                  name={`entry-name-${entry.id}`}
                  className="w-full rounded-lg border border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={entry.name}
                  onChange={(e) =>
                    updateListEntry(index, "name", e.target.value)
                  }
                />
              </div>
              {/* Number of Products (Unimplemented) */}
              {/* <div>
                <label
                  htmlFor={`entry-products-${entry.id}`}
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Number of Products
                </label>
                <input
                  id={`entry-products-${entry.id}`}
                  name={`entry-products-${entry.id}`}
                  type="number"
                  className="w-full rounded-lg border border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={entry.products}
                  onChange={(e) =>
                    updateListEntry(
                      index,
                      "products",
                      parseInt(e.target.value, 10) || 0,
                    )
                  }
                />
              </div> */}
            </div>
          ))}
        </div>

        {/* Action buttons */}
        <div className="fixed bottom-0 left-0 z-50 flex w-screen flex-row items-center justify-center space-x-4 space-y-0 bg-gray-800 p-4">
          <button
            type="button"
            onClick={handleClosePopup}
            // onClick={() => setModalOpen(false)}
            className="w-full rounded-lg bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-300 sm:w-auto"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="w-full rounded-lg bg-yellow-500 px-6 py-3 font-semibold text-white hover:bg-yellow-600 focus:outline-none focus:ring focus:ring-yellow-300 sm:w-auto"
          >
            Reset
          </button>
          <button
            type="submit"
            onClick={handleSave}
            className="w-full rounded-lg bg-blue-500 px-6 py-3 font-semibold text-white hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 sm:w-auto"
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
};

const EditProductsPopupContainer = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
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
    </>
  );
};

export default EditProductsPopupContainer;
