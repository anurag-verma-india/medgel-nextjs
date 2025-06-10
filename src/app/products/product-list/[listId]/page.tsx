// import React from "react";
import { checkAdminFromCookie } from "@/helpers/checkAdmin";
import ProductList from "./ProductList";
import { ProductListParams } from "@/types";
import ProductListEditPopup from "./ProductListEditPopup";
import ClientSideProducts from "./ClientSideProducts";

const page = async ({ params }: ProductListParams) => {
  const isAdmin = await checkAdminFromCookie();

  return (
    <>
      {/* Edit Button */}
      {/* {isAdmin && <ProductListEditPopup />} */}
      <ClientSideProducts>
        {isAdmin && <ProductListEditPopup />}
        <ProductList params={params}></ProductList>
      </ClientSideProducts>
    </>
  );
};

export default page;
