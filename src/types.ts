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

export interface NewsObject {
  _id: string;
  title: string;
  description: string;
  // ...other fields
}

export type NewsType = {
  _id: string;
  title: string;
  description: string;
};

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
  id: string;
  name: string;
  products: number;
}

export interface ProductCategoryItemState {
  _id: string;
  name: string;
  listEntries: ProductListEntry[];
  // listEntries: string[];
  // number_of_products: number;
}

// export interface ProductsStateType {
// export interface ProductsCategoriesStateType {
export interface ProductsCategoriesStateType {
  activeCategory: number;
  categories: ProductCategoryItemState[];
  loading: boolean;
  // error: string;
  errors: string[];
}

// export interface ProductDataStateType {
//   activeCategoryId: string;
//   products: product[];
//   loading: boolean;
//   error: string;
// }

// export interface ProductDataStateType {
//   activeCategoryId: string;
//   products: product[];
//   loading: boolean;
//   error: string;
// }

export interface ProductContextProps {
  productsState: ProductsCategoriesStateType;
  setProductsState: (object: ProductsCategoriesStateType) => void;
  refetchData: () => void; // Just updates the data from the API
}

// export interface ProductContextProps {
//   productsState: ProductsStateType;
//   setProductsState: (objct: ProductsStateType) => void;
// }

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

// Job Related Types

export interface JobType {
  designation: string;
  experience: string;
  qualification: string;
  job_description: string;
  requirement: number;
}
export interface JobDepartmentType {
  department_name: string;
  sequence: number;
  jobs: JobType[];
}
export interface JobTypeDB extends JobType {
  _id: string;
}
export interface JobDepartmentTypeDB extends JobDepartmentType {
  _id: string;
  jobs: JobTypeDB[];
}

// Job Related Types end
