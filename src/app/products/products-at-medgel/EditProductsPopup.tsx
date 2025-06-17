// src/app/products/products-at-medgel/EditProductsPopup.tsx
"use client";

import ProductsContext from "@/contexts/ProductCategoriesContext";
import { ProductContextProps, ProductsStateType } from "@/types";
import axios from "axios";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { Clipboard } from "lucide-react";
import { ChangeEvent, useContext, useEffect, useState } from "react";
// import ListItem from "./ListItem";
// import ProductsContextProvider from "@/contexts/ProductsContextProvider";

type EditProductsPopupParams = {
  setModalOpen: (modalOpen: boolean) => void;
};

const EditProductsPopup = ({ setModalOpen }: EditProductsPopupParams) => {
  // const { productsState, setProductsState } =
  const { productsState } = useContext<ProductContextProps>(ProductsContext);

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

  const updateActiveListName = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const updatedState = { ...localProductsState };

    const updatedCategories = [...updatedState.categories];

    updatedCategories[updatedState.activeList] = {
      ...updatedCategories[updatedState.activeList],
      name: e.target.value,
    };

    updatedState.categories = updatedCategories;

    setLocalProductsState(updatedState);
  };

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

  const [lists_to_delete, set_lists_to_delete] = useState<string[]>([]);

  const handleListDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // console.log(e.target.id);
    // console.log("List id:", e.currentTarget.id);
    const list_id_to_be_deleted = e.currentTarget.id;
    set_lists_to_delete([...lists_to_delete, list_id_to_be_deleted]);

    const activeListEntries = activeCategory.listEntries;
    const updatedActiveListEntries = activeListEntries.filter(
      (list) => list.id !== list_id_to_be_deleted,
    );

    const updatedProductsState = localProductsState;

    updatedProductsState.categories[updatedProductsState.activeList] = {
      ...activeCategory,
      listEntries: updatedActiveListEntries,
    };

    setLocalProductsState(updatedProductsState);
    // setProductsState(updatedProductsState);
  };

  const [list_names_to_add, set_list_names_to_add] = useState<string[]>([]);

  const handleListAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // console.log(e.currentTarget.classList);
    set_list_names_to_add([...list_names_to_add, ""]);
  };

  const [lists_to_move, set_lists_to_move] = useState<
    {
      move_to_category_id: string;
      product_list_id: string;
    }[]
  >([]);
  // "lists_to_move": [
  //     {
  //         "move_to_category_id": "682f466c01ad7b9fb616bc96",
  //         "product_list_id": "683d667254f80909062e4d59"
  //     }
  // ]
  const handleListMove = (
    e: React.ChangeEvent<HTMLSelectElement>,
    list_id: string,
  ) => {
    e.preventDefault();
    // console.log(localProductsState);
    // console.log("List: ", list_id);
    // console.log("category: ", e.target.value);

    // };

    // const handleListMove = (e) => {
    const selectedCategoryId = e.target.value;

    // Update the lists_to_move state
    set_lists_to_move((prev) => {
      // Remove existing entry for this product list if it exists
      const filtered = prev.filter(
        (item) => item.product_list_id !== activeCategory._id,
      );
      // Add new entry (only if different from original category)
      if (selectedCategoryId !== activeCategory._id) {
        return [
          ...filtered,
          {
            move_to_category_id: selectedCategoryId,
            product_list_id: list_id,
            // product_list_id: activeCategory._id,
          },
        ];
      }
      return filtered;
    });
  };

  const handleSave = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ): Promise<void> => {
    e.preventDefault();

    const shouldSave = confirm(
      "Are you sure you want to save these changes?\nYou won't be able to reset after save.",
    );
    if (!shouldSave) return;

    // const activeCategoryElements = activeCategory.listEntries

    // console.log(
    //   "Local Products state active category listEntries: ",
    //   activeCategory.listEntries,
    // );

    // console.log("Local Products state: ");
    // console.log(localProductsState);

    console.log("Active category");
    console.log(activeCategory.listEntries);

    const lists_to_edit = [];
    for (const list of activeCategory.listEntries) {
      lists_to_edit.push({
        _id: list.id,
        product_list_name: list.name,
      });
    }

    try {
      const response = await axios.put("/api/product_category", {
        product_category_id: activeCategory._id, // Test Category
        // product_category_id: "682f466c01ad7b9fb616bc96", // Test Category
        // product_category_id: "683c3a253294ff27a99a3ce1", // Test Category 2
        product_category_name: activeCategory.name,
        lists_to_edit,
        // [
        // {
        //   _id: "683d653f54f80909062e4d44", // List Aquaman
        //   product_list_name: "",
        // },
        // ],
        lists_to_delete,
        // lists_to_delete: ["683f1d57cbb958c497a7a2ac"],
        list_names_to_add,
        // list_names_to_add: [
        //   // 683d653f54f80909062e4d44
        //   // "List Batman"
        //   // , //
        //   "List Superman",
        // ],
        lists_to_move,
        // lists_to_move: [
        //   {
        //     move_to_category_id: "682f466c01ad7b9fb616bc96",
        //     product_list_id: "683d667254f80909062e4d59",
        //   },
        // ],
      });

      console.log("Saved category axios response: ", response);

      // Close modal and refresh page to show updates
      setModalOpen(false);
      location.reload();

      // Instead of reloading updating the context product state with local one (from popup)
      // Not worth the hassle while adding a new list name
      // if (response.data.success) {
      //   setProductsState(localProductsState);
      // }
    } catch (error) {
      console.error("Failed to save products content:", error);
      alert("Failed to save product changes. Please try again.");
    }
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
          {/* Category Name */}
          <h1 className="flex justify-center text-xl font-bold">
            Category Name
          </h1>
          <div className="flex justify-center">
            <input
              // id={`entry-name-${entry.id}`}
              // name={`entry-name-${entry.id}`}
              className="mb-3 w-full rounded-lg border border-gray-300 p-3 text-3xl font-bold shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={
                localProductsState.categories[localProductsState.activeList]
                  .name
              }
              onChange={(e) => {
                updateActiveListName(e);
              }}
            />
          </div>

          <h1 className="flex justify-center text-xl font-bold">Lists</h1>
          {activeCategory.listEntries.map((entry, index) => (
            <div
              key={entry.id}
              className="mb-5 space-y-4 rounded-lg border p-4"
            >
              <div>
                <label htmlFor={`entry-name-${entry.id}`}>
                  {index + 1}. List: {entry.id}
                </label>
                {/* <label
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
                  {index + 1}. Product List ID:{" "} */}
                {/* List Id (with clipboard icon) */}
                {/* <div className="group flex items-center rounded-sm bg-gray-400 p-1 text-black">
                    <span className="group-hover:hidden">{entry.id}</span>
                    <span className="hidden group-hover:inline">
                      Click to copy this ID to clipboard
                    </span>
                    <Clipboard className="h-5" />
                  </div> */}
                {/* 
                  <div className="flex items-center rounded-sm bg-gray-400 p-1 text-black">
                    {entry.id}
                    <Clipboard className="h-5" />
                  </div> */}
                {/* </label> */}
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

              <div className="flex w-full">
                <div className="mr-3">
                  <div className="flex w-full justify-center text-blue-400">
                    Move List
                  </div>
                  <select
                    className="rounded-xl bg-slate-300 p-3"
                    defaultValue={activeCategory._id}
                    onChange={(e) => handleListMove(e, entry.id)}
                  >
                    {localProductsState.categories.map((value, idx) => {
                      return (
                        <option value={value._id} key={idx}>
                          {value.name}
                        </option>
                      );
                    })}
                  </select>
                  {/* <select className="rounded-xl bg-slate-300 p-3">
                    <option value="">Option 1</option>
                    <option value="">Option 2</option>
                  </select> */}
                </div>
                <button
                  className="rounded-xl bg-slate-300 p-3 text-red-400"
                  id={entry.id}
                  onClick={(e) => {
                    handleListDelete(e);
                  }}
                >
                  Delete List
                </button>
              </div>
            </div>
          ))}
          {/*  */}
          <div className="flex justify-center text-2xl font-bold">
            Add new List
          </div>
          {list_names_to_add.map((entry, index) => (
            // {activeCategory.listEntries.map((entry, index) => (
            <div key={index} className="mb-5 space-y-4 rounded-lg border p-4">
              <div>
                <label htmlFor={`list-to-add-${index}`}>{index + 1}</label>
                <input
                  // name={`list-to-add-${index}`}
                  id={`list-to-add-${index}`}
                  className="w-full rounded-lg border border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={entry}
                  onChange={(e) => {
                    e.preventDefault();
                    set_list_names_to_add(
                      list_names_to_add.map(
                        (item, idx) => (idx === index ? e.target.value : item),
                        // If list index is equal to the index of the input field => then return target value, otherwise just return the item
                      ),
                    );
                  }}
                />
              </div>
            </div>
          ))}
          {/*  */}

          <div className="flex justify-center">
            <button
              className="w-1/3 rounded-lg bg-slate-300 text-3xl text-black"
              onClick={(e) => handleListAdd(e)}
            >
              +
            </button>
          </div>
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
          className="absolute right-0 top-0 mr-5 mt-5 rounded bg-[#00a5a5] px-4 py-2 text-white shadow hover:bg-[#197777] focus:outline-none focus:ring-2 focus:ring-black"
        >
          Edit
        </button>
      </div>
    </>
  );
};

export default EditProductsPopupContainer;
