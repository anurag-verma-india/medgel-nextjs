// src/types.ts

import { JwtPayload } from "jsonwebtoken";
// import { ReactNode } from "react";
export interface BasePageContent {
  [key: string]: string;
  // | number
  // | boolean
  // | null
  // | undefined
  // | Record<string, unknown>
  // | Array<unknown>;
}
export type ImageObj = {
  url: string;
  width: number;
  height: number;
  aspectratio: number;
  size: number;
};

export interface PageObject<T extends BasePageContent = BasePageContent> {
  _id: string;
  title: string;
  content: T;
  // images: [ImageObj];
  // // This is incorrect syntax for defining array of objects it defines a tuple with single element
  images: ImageObj[];
  lastUpdated: Date;
  __v: number;
}

export enum EmailTypes {
  VERIFY = "VERIFY",
  RESET = "RESET",
}

export type TokenData = {
  id: string;
  iat: number;
  exp: number;
};

export interface decodedToken extends JwtPayload {
  id: string;
  iat: number;
  exp: number;
}

export interface ProductListEntry {
  name: string;
  products: number;
  id: string;
}

export interface ProductCategoryItem {
  _id: string;
  name: string;
  listEntries: ProductListEntry[];
}

export interface ProductsCategoriesStateType {
  activeList: number;
  categories: ProductCategoryItem[];
  loading: boolean;
  error: string;
}

export interface ProductDataStateType {
  activeCategoryId: string;
  products: product[];
  loading: boolean;
  error: string;
}

export interface ProductContextProps {
  productsState: ProductsCategoriesStateType;
  setProductsState: (object: ProductsCategoriesStateType) => void;
}

export interface ProductCategoryItemDB {
  _id: string;
  product_category_name: string;
  productLists: string[];
}

export interface ProductListEntryDB {
  _id: string;
  product_list_name: string;
  product_ids: string[];
}

export type ProductListParams = {
  params: Promise<{ listId: string }>;
};

export type product = {
  innovator: string;
  product: string;
  code: string;
  composition: string;
  color: string;
  lastUpdated: number;
};
