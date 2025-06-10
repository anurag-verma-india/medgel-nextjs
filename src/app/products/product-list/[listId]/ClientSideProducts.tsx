"use client";

import { ProductListParams } from "@/types";
import React, { ReactNode } from "react";

const ClientSideProducts = ({
  children,
}: {
  children: ReactNode;
  params: ProductListParams;
}) => {
  return <>{children}</>;
};

export default ClientSideProducts;
