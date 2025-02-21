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
