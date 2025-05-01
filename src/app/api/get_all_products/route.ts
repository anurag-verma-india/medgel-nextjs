import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Product from "@/models/products";
import handleError from "@/helpers/handleError";
import { MongooseError } from "mongoose";

export async function POST(request: NextRequest) {
  // Get multiple products by id from database
  try {
    await dbConnect();
    const body = await request.json();

    const { product_id_array } = body;

    console.log("product_id_array:", product_id_array);

    if (!product_id_array || product_id_array.length <= 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide an array of product ids",
        },
        { status: 400 },
      );
    }

    const products = await Product.find({
      _id: { $in: product_id_array },
    });
    return NextResponse.json(
      {
        success: true,
        products,
      },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof MongooseError && error.name == "CastError") {
      return NextResponse.json(
        { success: false, message: "Please provide valid product ids" },
        { status: 400 },
      );
    }
    return handleError(error, "Failed to fetch products");
    // return new Response(
    //   JSON.stringify({
    //     message: "Failed to post product",
    //     error,
    //   }),
    //   { status: 500 },
    // );
  }
}
