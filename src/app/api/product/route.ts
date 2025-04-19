/*
GET: Working 
  ID, Name
POST: 
  Working
PUT: 
  Working
DELETE: 
  Working
*/

import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import dbConnect from "@/lib/dbConnect";
// import ProductList from "@/models/productList";
import Product from "@/models/products";
import handleError from "@/helpers/handleError";

/*
----- Authentication levels -----
Email verified check
Get product details

User is admin check
PUT, POST, DELETE
*/


export async function POST(request: NextRequest) {
  // TODO: Make sure the user is admin
  try {
    await dbConnect();
    const body = await request.json();
    const product = new Product(body.product);
    const savedProduct = await product.save();

    return NextResponse.json({
      savedProduct,
    });
  } catch (error) {
    return handleError(error, "Failed to add new product");
  }
}

export async function GET(request: NextRequest) {
  // TODO: Check user's token and send error if not verified
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);

    const product_id = searchParams.get("product_id");
    console.log("product_id: ", product_id);

    const product = await Product.findById(product_id);

    console.log("Product found: ", product);
    if (product) {
      return NextResponse.json({
        success: true,
        product,
      });
    }
    return NextResponse.json(
      {
        success: false,
        message: "Provided id does not exist in products",
      },
      { status: 404 },
    );
  } catch (error) {
    return handleError(error, "Failed to find product");
  }
}

export async function PUT(request: NextRequest) {
  try {
    // TODO: Make sure user is admin
    const body = await request.json();
    const product = body.product;
    const { product_id } = body;
    console.log("Product received\n", product);
    // const { innovator, product, code, composition, color } = body.product;
    if (!product) {
      return NextResponse.json(
        {
          success: false,
          message: "please provide a product body to edit",
        },
        { status: 400 },
      );
    }
    await dbConnect();

    console.log("Finding product: \nid: ", product_id);

    const ProductDocument = await Product.findById(product_id);
    console.log("Found product");

    for (const key in product) {
      ProductDocument[key] = product[key];
    }

    const edited_product = await ProductDocument.save();

    return NextResponse.json({
      success: true,
      edited_product,
    });
  } catch (error) {
    return handleError(error, "Failed to edit product");
  }
}

export async function DELETE(request: NextRequest) {
  // TODO: Make sure the user is admin
  try {
    const body = await request.json();
    const { product_id } = body;
    // console.log(product_id);
    if (!product_id) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide a product id",
        },
        { status: 400 },
      );
    }
    await dbConnect();
    const deleted_product = await Product.findByIdAndDelete(product_id);
    return NextResponse.json({
      deleted_product,
    });
  } catch (error) {
    return handleError(error, "Failed to delete product");
  }
}
