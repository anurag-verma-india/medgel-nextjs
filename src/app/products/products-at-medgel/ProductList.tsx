"use client";
import ProductCategoriesContext from "@/contexts/ProductCategoriesContext";

import { ProductContextProps } from "@/types";
import { useContext, useState } from "react";
import ListItem from "./ListItem";
import { PlusOutlined } from "@ant-design/icons";
import AddProductListPopup from "./popups/AddProductListPopup";
// import { LoaderCircle } from "lucide-react";
// import { redirect, RedirectType } from "next/navigation";
// import EmailPopupContext from "@/contexts/EmailPopupContext";

// export default ProductList;

const ListOfProducts = ({
  // tokenValid,
  // allowVerificationAfter,
  // emailSent,
  isAdmin,
  // }: ListOfProductsParams) => {
}: {
  isAdmin: boolean;
}) => {
  const { productsState } = useContext<ProductContextProps>(
    ProductCategoriesContext,
  );
  // if (!context) {
  if (!productsState) {
    throw new Error(
      "ProductCategories must be used within a ProductsContextProvider",
    );
  }
  const { activeCategory, categories, loading } = productsState;

  const [addProductListPopupVisible, setAddProductListPopupVisible] =
    useState(false);

  // const { popupState, setPopupState } = useContext(PopupContext);
  // if (!popupState) {
  //   throw new Error("ListItem must be used within a PopupContextProvider");
  // }
  // const [isPageLoading, setIsPageLoading] = useState<boolean>(false);

  // const HandleListClick = (listId: string) => {
  // console.log(listId);
  // console.log(popupState);
  // // redirect(`/products/product-list/${listId}`, RedirectType.push);

  // setIsPageLoading(true); // Show loading spinner

  // if (popupState.tokenValid) {
  //   // TODO: The page redirected to here should should also check user's JWT token from cookies (prevent)
  //   setIsPageLoading(true); // Show loading spinner
  //   // No need to explicitly navigate here, Next.js <Link> handles it
  //   redirect(`/products/product-list/${listId}`, RedirectType.push);
  // } else {
  //   setPopupState({ ...popupState, popupOpen: !popupState.popupOpen });
  // }
  // };

  if (loading) {
    return (
      <ListItem
        categoryId={"no-cat"}
        key={"no-list"}
        isAdmin={isAdmin}
        onlyText={true}
        list={{
          id: "no-list",
          name: "Loading...",
          products: NaN,
        }}
      />
    );
  }

  return (
    <>
      {/* <EmailPopupContainer
        tokenValid={tokenValid}
        allowVerificationAfter={allowVerificationAfter}
        emailSent={emailSent}
      /> */}

      {!loading &&
      productsState.categories.length > 0 &&
      // activeCategory &&
      // &&
      // activeCategory.productLists.length > 0 ? (
      categories[activeCategory].listEntries.length > 0 ? (
        // activeCategory.productLists.map((listId: string) => {
        productsState.categories[activeCategory].listEntries.map((list) => {
          // const productListData = allProductListsMap.current.get(listId);
          // if (productListData) {
          if (list) {
            return (
              <div key={list.id}>
                <ListItem
                  isAdmin={isAdmin}
                  categoryId={productsState.categories[activeCategory]._id}
                  list={list}
                  onlyText={false}
                />
              </div>
            );
          }
          return null; // Should not happen if data is consistent, but good for type safety
        })
      ) : (
        <ListItem
          isAdmin={isAdmin}
          key={"0"}
          categoryId={productsState.categories[activeCategory]._id}
          list={{
            id: "",
            name: "No products found",
            products: 0,
          }}
          onlyText={true}
        />
      )}

      {isAdmin && (
        <>
          <div
            // className="flex cursor-pointer items-center border-b border-neutral-200 bg-[#1d8892cb] p-4 last:border-b-0 hover:bg-[#1d8892]"
            className="flex cursor-pointer items-center bg-[#1d8892cb] p-4 last:border-b-0 hover:bg-[#1d8892]"
            onClick={() => {
              setAddProductListPopupVisible(true);
            }}
          >
            <div className="flex flex-grow items-center">
              <h3 className="text-xl font-medium text-white">
                <PlusOutlined className="mr-5" />
                Add new list
              </h3>
            </div>
          </div>
          <AddProductListPopup
            key={activeCategory}
            onClose={() => setAddProductListPopupVisible(false)}
            onSuccess={() => window.location.reload()}
            visible={addProductListPopupVisible}
            categoryId={categories[activeCategory]._id}
          />
        </>
      )}
    </>
  );
};

export default ListOfProducts;
