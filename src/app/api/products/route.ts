import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

import dbConnect from "@/lib/dbConnect";

import Product from "@/models/products";
import ProductList from "@/models/productList";
import ProductCategory from "@/models/productCategory";

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();

    const { product_category_id, product_list_id, product_details } = body;
    /*
    If name passed instead of id search that, if not found then add a new one then add product in that category
     */

    console.log("Details: \n");
    console.log(product_category_id, product_list_id, product_details);

    // const category = await ProductCategory.findOne({ id: product_category_id });
    const category = await ProductCategory.findById(product_category_id);
    if (category) {
      return NextResponse.json({
        category,
      });
    }
    return NextResponse.json({
      message: "Product not found",
    });
  } catch (error: any) {
    console.error("Error in adding product: ", error); // Log the complete error object
    return new Response(
      JSON.stringify({
        message: "Failed to put product",
        error: error.toString(),
      }),
      { status: 500 },
    );
  }
}
