// TODO: Added email is verified check if not then only show message that you are not verified
// TODO: Also add the email verification popup
// import React from "react";
import { checkAdminFromCookie } from "@/helpers/checkAdmin";
import ProductList from "./ProductList";
import { ProductListParams } from "@/types";
// import ProductListEditPopup from "./ProductListEditPopup";

const page = async ({ params }: ProductListParams) => {
  const isAdmin = await checkAdminFromCookie();
  const { listId } = await params;
  // console.log("params");
  // console.log(params);
  // console.log("listId");
  // console.log(listId);

  return (
    <>
      {/* Edit Button */}
      {/* {isAdmin && <ProductListEditPopup />} */}
      {/* <ProductList checkAdmin={isAdmin} params={params}> */}
      <ProductList checkAdmin={isAdmin} listId={listId}>
        {/* {isAdmin && <ProductListEditPopup />} */}
      </ProductList>
    </>
  );
};

export default page;
