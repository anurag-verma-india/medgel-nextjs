// Auth Complete
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import dbConnect from "@/lib/dbConnect";
import ProductList from "@/models/productList";
import handleError from "@/helpers/handleError";
import { MongooseError } from "mongoose";

/*
----- Authentication levels -----
No auth
GET
POST

*/

export async function GET(request: NextRequest) {
  // get a single product list name
  // No authentication to get Product List names
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const product_list_id = searchParams.get("product_list_id");

    console.log("product_list_id: ", product_list_id);

    const product_list = await ProductList.findById(product_list_id);
    console.log("product_list found: ", product_list);
    if (!product_list) {
      return NextResponse.json(
        {
          success: false,
          message: "Provided id does not exit in the product lists",
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      name: product_list.product_list_name,
    });
  } catch (error) {
    console.error("Error in getting lists from category: ", error); // Log the complete error object
    return handleError(error, "Failed to get lists from category");
  }
}

export async function POST(request: NextRequest) {
  // Used in ProductsContextProvider
  // Get Multiple list names from an array
  try {
    await dbConnect();
    const body = await request.json();

    const { product_id_array } = body;

    // console.log("product_id_array:", product_id_array);

    if (!product_id_array || product_id_array.length <= 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide an array of product list ids",
          product_lists: [
            // {
            //   _id: "",
            //   product_list_name: "This category is empty",
            //   product_ids: [],
            // },
          ],
        },
        { status: 200 },
      );
    }

    const product_lists = await ProductList.find({
      _id: { $in: product_id_array },
    });

    // console.log("===========================================");
    // console.log("in get_list_name route");
    // console.log("category_name");
    // console.log(category_name);
    // console.log("product_lists found");
    // console.log(product_lists);
    // console.log("===========================================");

    return NextResponse.json(
      {
        success: true,
        product_lists,
      },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof MongooseError && error.name == "CastError") {
      return NextResponse.json(
        { success: false, message: "Please provide valid list ids" },
        { status: 400 },
      );
    }
    console.error("Error in finding product names from id:", error); // Log the complete error object
    return handleError(error, "Failed to fetch product list names");
    // return new Response(
    //   JSON.stringify({
    //     message: "Failed to post product",
    //     error,
    //   }),
    //   { status: 500 },
    // );
  }
}
