// file_path: "@/types.ts"

import { JwtPayload } from "jsonwebtoken";

export interface BasePageContent {
  [key: string]:
    | string
    | number
    | boolean
    | null
    | undefined
    | Record<string, unknown>
    | Array<unknown>;
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
  images: [ImageObj];
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
