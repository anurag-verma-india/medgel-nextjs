import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

import dbConnect from "@/lib/dbConnect";

// import Product from "@/models/products";
import ProductList from "@/models/productList";
// import ProductCategory from "@/models/productCategory";

/*
----- Authentication levels -----
No authentication
Get product names
*/

export async function GET(request: NextRequest) {
  /* Working
   */
  // No authentication to get Product List names
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    // const product_list_name = searchParams.get("product_list_name");
    const product_list_id = searchParams.get("product_list_id");

    console.log(
      // "product_list_name: ",
      // product_list_name,
      "product_list_id: ",
      product_list_id,
    );

    // let product_list;
    // if (product_list_id) {
    const product_list = await ProductList.findById(product_list_id);
    // } else if (product_list_name) {
    //   product_list = await ProductList.findOne({
    //     product_list_name,
    //   });
    // }
    console.log("product_list found: ", product_list);
    if (product_list) {
      return NextResponse.json({
        success: true,
        name: product_list.product_list_name,
      });
    }
    return NextResponse.json(
      {
        success: false,
        message: "Provided id or name does not exit in the product_list",
      },
      { status: 404 },
    );
  } catch (error) {
    console.error("Error in getting lists from category: ", error); // Log the complete error object
    return new Response(
      JSON.stringify({
        message: "Failed to get lists from category",
        error: error.toString(),
      }),
      { status: 500 },
    );
  }
}
