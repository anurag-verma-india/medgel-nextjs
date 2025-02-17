import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

import dbConnect from "@/lib/dbConnect";

// import Product from "@/models/products";
// import ProductList from "@/models/productList";
// import ProductCategory from "@/models/productCategory";
import ProductList from "@/models/productList";

/*
----- Authentication levels -----
Email verified check
Get product_ids list

User is admin check
PUT, POST, DELETE
*/

/*
GET (Get resource)

POST (Create a new resource)
Create a new list (optionally also include product_ids)

PUT (Replace an existing resource)
Edit a list (add or remove productIDs from it)

------
DELETE
Delete a list
 */
export async function POST(request: NextRequest) {
  // TODO: Make sure the user is admin

  /* Working
  Make a new product_list entry 
  (optionally with individual product ids)
  */
  try {
    await dbConnect();
    const body = await request.json();

    const { product_list_name, product_ids } = body;

    console.log(
      "product_list_name: ",
      product_list_name,
      "product_ids: ",
      product_ids,
    );

    const product_list = new ProductList({ product_list_name, product_ids });

    const savedProductList = await product_list.save();

    return NextResponse.json({
      savedProductList,
    });
  } catch (error) {
    console.error("Error in adding product list: ", error); // Log the complete error object
    return new Response(
      JSON.stringify({
        message: "Failed to add new product list",
        error: error.toString(),
      }),
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest) {}
export async function PUT(request: NextRequest) {}

export async function DELETE(request: NextRequest) {
  // TODO: Make sure the user is admin
  try {
    await dbConnect();
    const body = await request.json();
    const { product_list_id, product_list_name, product_ids } = body;

    console.log(
      "product_list_name: ",
      product_list_name,
      "product_ids: ",
      product_ids,
    );
    // let product_list;
    // if (product_list_id) {
      // product_list = await ProductList.findByIdAndDelete({});
    // } else {
    // }

    // const product_list = new ProductList({ product_list_name, product_ids });

    // const savedProductList = await product_list.save();

    // return NextResponse.json({
    //   savedProductList,
    // });
  } catch (error) {
    console.error("Error in deleting product list: ", error); // Log the complete error object
    return new Response(
      JSON.stringify({
        message: "Failed to delete product list",
        error: error.toString(),
      }),
      { status: 500 },
    );
  }
}
