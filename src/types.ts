import { JwtPayload } from "jsonwebtoken";

export type PageObject = {
  _id: string;
  title: string;
  content: object;
  lastUpdated: Date;
  __v: number;
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
