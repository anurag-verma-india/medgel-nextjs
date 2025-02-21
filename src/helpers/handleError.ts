import { MongooseError } from "mongoose";

export default function handleError(error: unknown, message: string) {
  console.log(message);
  console.log(error);
  if (error instanceof MongooseError) {
    return new Response(
      JSON.stringify({
        message,
        error: error.toString(),
      }),
      { status: 500 },
    );
  } else {
    return new Response(
      JSON.stringify({
        message,
        error: "Unknown error",
      }),
      { status: 500 },
    );
  }
}
