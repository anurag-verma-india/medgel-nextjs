// import React from "react";
import { checkAdminFromCookie } from "@/helpers/checkAdmin";
import ProductList from "./ProductList";
import { ProductListParams } from "@/types";
import ProductListEditPopup from "./ProductListEditPopup";

const page = async ({ params }: ProductListParams) => {
  const isAdmin = await checkAdminFromCookie();

  return (
    <>
      {/* Edit Button */}
      {/* {isAdmin && <ProductListEditPopup />} */}
      <ProductList checkAdmin={isAdmin} params={params}>
        {/* {isAdmin && <ProductListEditPopup />} */}
      </ProductList>
    </>
  );
};

export default page;
