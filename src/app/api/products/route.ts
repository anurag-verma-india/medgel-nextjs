

// Google: how to store hierachical data in mongodb
// https://stackoverflow.com/questions/67741010/best-practices-for-structuring-hierarchical-classified-data-in-mongodb
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
// import Pages from "@/models/pages";
// import Products from "@/models/products";
import CategoryList from "@/models/products";
import { revalidateTag } from "next/cache";
import { NextRequest } from "next/server";

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
    await dbConnect();
    // const savedProduct = await product.save();

    const body = await request.json();
    const { category_from_body } = body;

    // TODO: (low priority) validate category_from_body
    console.log("creating page: ", body);

    const category = new CategoryList(category_from_body);

    console.log("----------------- received category: \n", category_from_body);

    // const category = new CategoryList({
    //   categoryName: "example_category",
    //   productList: [
    //     [
    //       {
    //         innovator: "Example Text",
    //         product: "Example Text",
    //         code: "Example Text",
    //         composition: "Example Text",
    //         color: "Example Text",
    //       },
    //     ],
    //     [
    //       {
    //         innovator: "Example Text 2",
    //         product: "Example Text 2",
    //         code: "Example Text 2",
    //         composition: "Example Text 2",
    //         color: "Example Text 2",
    //       },
    //     ],
    //   ],
    // });

    const savedCategory = await category.save();

    return NextResponse.json({
      message: "Product created successfully",
      success: true,
      // savedProduct,
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

export default function PUT() {
  try {
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
