import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { revalidateTag } from "next/cache";

import dbConnect from "@/lib/dbConnect";
// import Pages from "@/models/pages";
// import Products from "@/models/products";
// import CategoryList from "@/models/products";

import Product from "@/models/products";
import ProductList from "@/models/productList";
import ProductCategory from "@/models/productCategory";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const categoryName = searchParams.get("category");

    console.log("Category: ", categoryName);
    const category = await CategoryList.findOne({ categoryName });

    // TODO: Only send the products if the user has a valid token (his email is verified for the dat)
    // TODO: Handle missing request parameters

    return NextResponse.json({ success: "true", category });
  } catch (error: any) {
    console.error("Error in getting product: ", error); // Log the complete error object
    return new Response(
      JSON.stringify({
        message: "Failed to get product",
        error: error.toString(),
      }),
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // TODO: Only let admin users POST to database
    // TODO: (low priority) validate category_from_body
    /*
    Handle values not passed
    If Category id 
    If List id
    If Product id
      find object and use that
      else create new from passed data
    */
    await dbConnect();
    const body = await request.json();

    const { product_category_name, product_list_name, received_product } = body;
    console.log("Details: \n");
    console.log(product_category_name, product_list_name, received_product);

    const product = new Product(received_product);
    const savedProduct = await product.save();

    const list = new ProductList({
      product_list_name,
      products: [savedProduct.id],
    });
    const savedList = await list.save();

    const category = new ProductCategory({
      product_category_name,
      productLists: [savedList.id],
    });

    const savedCategory = await category.save();

    return NextResponse.json({
      message: "Product created successfully",
      success: true,
      // savedProduct,
      // savedList,
      savedCategory,
    });
  } catch (error: any) {
    console.error("Error in putting product: ", error); // Log the complete error object
    return new Response(
      JSON.stringify({
        message: "Failed to put product",
        error: error.toString(),
      }),
      { status: 500 },
    );
  }
}

export default async function PUT() {
  try {
    /*
    Category id
    List id
    Product id
    */
    // await dbConnect();
  } catch (error: any) {
    console.error("Error in putting product: ", error); // Log the complete error object
    return new Response(
      JSON.stringify({
        message: "Failed to put product",
        error: error.toString(),
      }),
      { status: 500 },
    );
  }
}
