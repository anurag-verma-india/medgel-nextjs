// import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

import dbConnect from "@/lib/dbConnect";

// import Product from "@/models/products";
// import ProductList from "@/models/productList";
import ProductCategory from "@/models/productCategory";

/*
POST (Create a new resource)
PUT (Replace an existing resource)
 */

export async function POST(request: NextRequest) {
  /*
  Create a new product category 
   */
  try {
    await dbConnect();
    const body = await request.json();

    const {
      product_category_id,
      product_category_name,
      product_list_id,
      product_details_arr,
    } = body;

    console.log(
      "product_category_id: ",
      product_category_id,
      "product_category_name: ",
      product_category_name,
      "product_list_id: ",
      product_list_id,
      "product_details_arr: ",
      product_details_arr,
    );
    /*
    If name passed instead of id search that, if not found then add a new one then add product in that category
     */
    if (!product_category_id && !product_category_name) {
      return new Response(
        JSON.stringify({
          message:
            "Please provide either product_category_id or product_category_name",
        }),
        { status: 400 },
      );
    }

    // const category = await ProductCategory.findOne({ id: product_category_id });
    // Try to find the category
    let category;
    if (product_category_id) {
      category = await ProductCategory.findById(product_category_id);
    } else if (product_category_name) {
      category = await ProductCategory.findOne({ name: product_category_name });
    }

    if (!category) {
    }
    console.log("productLists: ", category.productLists);
    // Check if the list id provided in request is present in the category
    if (category.productLists.indexOf(product_list_id) === -1) {
      return new Response(
        JSON.stringify({
          message:
            "The product id you provided is not present in the product list",
        }),
        { status: 400 },
      );
    }

    // const list = await ProductList.findById(product_list_id);
  } catch (error) {
    console.error("Error in adding product: ", error); // Log the complete error object
    return new Response(
      JSON.stringify({
        message: "Failed to post product",
        error: error.toString(),
      }),
      { status: 500 },
    );
  }
}

export async function PUT(request: NextRequest) {
  /*
  Add new lists or products to product categories
   */
  try {
    await dbConnect();
    const body = await request.json();

    const {
      product_category_id,
      product_category_name,
      product_list_id,
      product_details_arr,
    } = body;

    console.log(
      "product_category_id: ",
      product_category_id,
      "product_category_name: ",
      product_category_name,
      "product_list_id: ",
      product_list_id,
      "product_details_arr: ",
      product_details_arr,
    );
    /*
    If name passed instead of id search that, if not found then add a new one then add product in that category
     */
    if (!product_category_id && !product_category_name) {
      return new Response(
        JSON.stringify({
          message:
            "Please provide either product_category_id or product_category_name",
        }),
        { status: 400 },
      );
    }

    // const category = await ProductCategory.findOne({ id: product_category_id });
    // Try to find the category
    let category;
    if (product_category_id) {
      category = await ProductCategory.findById(product_category_id);
    } else if (product_category_name) {
      category = await ProductCategory.findOne({ name: product_category_name });
    }

    if (!category) {
    }
    console.log("productLists: ", category.productLists);
    // Check if the list id provided in request is present in the category
    if (category.productLists.indexOf(product_list_id) === -1) {
      return new Response(
        JSON.stringify({
          message:
            "The product id you provided is not present in the product list",
        }),
        { status: 400 },
      );
    }

    // const list = await ProductList.findById(product_list_id);
  } catch (error) {
    console.error("Error in editing product: ", error); // Log the complete error object
    return new Response(
      JSON.stringify({
        message: "Failed to put product",
        error: error.toString(),
      }),
      { status: 500 },
    );
  }
}
