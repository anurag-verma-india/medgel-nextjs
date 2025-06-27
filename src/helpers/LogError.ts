// import { MongooseError } from "mongoose";

export default function LogError(error: unknown, message: string) {
  console.log(message);
  console.log(error);
}
