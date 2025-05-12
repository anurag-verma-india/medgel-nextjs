"use client";

import React, { ReactNode } from "react";
import ProductsContextProvider from "@/contexts/ProductsContextProvider";

const ClientSideProducts = ({ children }: { children: ReactNode }) => {
  return <ProductsContextProvider>{children}</ProductsContextProvider>;
};

export default ClientSideProducts;
