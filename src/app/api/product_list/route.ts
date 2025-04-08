/*
GET: Working 
  ID, Name
POST: 
  Working (with and without product_ids)
PUT: 

DELETE: 
  ID, Name
*/

import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

import dbConnect from "@/lib/dbConnect";

// import Product from "@/models/products";
// import ProductList from "@/models/productList";
// import ProductCategory from "@/models/productCategory";
import ProductList from "@/models/productList";
// import { MongooseError } from "mongoose";
import handleError from "@/helpers/handleError";

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

export async function GET(request: NextRequest) {
  // TODO: Check user's token and send error if not verified
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);

    const product_list_name = searchParams.get("product_list_name");
    const product_list_id = searchParams.get("product_list_id");

    // const body = await request.json();
    // const { product_category_name, product_category_id } = body;

    console.log(
      "product_list_name: ",
      product_list_name,
      "product_list_id: ",
      product_list_id,
    );

    // const category = new ProductCategory({
    //   product_category_name: product_category_name,
    //   productLists: product_category_id_list,
    // });

    // const savedCategory = await category.save();
    let product_list;
    if (product_list_id) {
      product_list = await ProductList.findById(product_list_id);
    } else if (product_list_name) {
      product_list = await ProductList.findOne({
        product_list_name,
      });
    }
    console.log("List found: ", product_list);
    if (product_list) {
      return NextResponse.json({
        success: true,
        product_list,
      });
    }
    return NextResponse.json(
      {
        success: false,
        message: "Provided id or name does not exist in the product_list",
      },
      { status: 404 },
    );
  } catch (error) {
    return handleError(error, "Failed to find product list");
  }
}
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
    return handleError(error, "Failed to add new product list");
  }
}

export async function PUT(request: NextRequest) {
  // TODO: Check user is admin
  try {
    const body = await request.json();
    const {
      product_list_name,
      product_list_id,
      product_ids_to_add,
      product_ids_to_delete,
    } = body;

    console.log(
      "product_list_name: ",
      product_list_name,
      "\n",
      "product_list_id: ",
      product_list_id,
      "\n",
      "product_ids_to_add: ",
      product_ids_to_add,
      "\n",
      "product_ids_to_delete: ",
      product_ids_to_delete,
    );

    let product_list;
    if (product_list_id) {
      product_list = await ProductList.findById(product_list_id);
    } else if (product_list_name) {
      product_list = await ProductList.findOne({
        product_list_name,
      });
    }

    if (!product_list) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Provided id or name does not exit in the product_list, send a post request to create a new list",
        },
        { status: 404 },
      );
    }

    let addition_details;
    let deletion_details;
    if (product_list_id) {
      // Finding the list by id
      if (product_ids_to_add) {
        addition_details = await ProductList.updateOne(
          { _id: product_list_id },
          { $push: { product_ids: product_ids_to_add } },
        );
      }
      if (product_ids_to_delete) {
        deletion_details = await ProductList.updateOne(
          { _id: product_list_id },
          { $pullAll: { product_ids: product_ids_to_delete } },
        );
      }
    } else {
      // Finding the list by name
      if (product_ids_to_add) {
        addition_details = await ProductList.updateOne(
          { product_list_name },
          { $push: { product_ids: product_ids_to_add } },
        );
      }
      if (product_ids_to_delete) {
        deletion_details = await ProductList.updateOne(
          { product_list_name },
          { $pullAll: { product_ids: product_ids_to_delete } },
        );
      }
    }

    if (addition_details || deletion_details) {
      return NextResponse.json({
        addition_details,
        deletion_details,
      });
    }

    return NextResponse.json(
      {
        success: false,
        message:
          "Provided id or name does not exit in the product_list, send a post request to create a new list",
      },
      { status: 404 },
    );
  } catch (error) {
    return handleError(error, "Failed to edit product list");
  }
}

export async function DELETE(request: NextRequest) {
  // TODO: Make sure the user is admin
  try {
    await dbConnect();
    const body = await request.json();
    const { product_list_id, product_list_name, product_ids } = body;

    console.log(
      "product_list_id",
      product_list_id,
      "product_list_name: ",
      product_list_name,
      "product_ids: ",
      product_ids,
    );
    let product_list;
    if (product_list_id) {
      product_list = await ProductList.findByIdAndDelete(product_list_id);
    } else {
      product_list = await ProductList.findOneAndDelete({ product_list_name });
    }

    // const product_list = new ProductList({ product_list_name, product_ids });
    // const savedProductList = await product_list.save();
    return NextResponse.json({
      deleted_product_list: product_list,
    });
  } catch (error) {
    // console.error("Error in deleting product list: ", error); // Log the complete error object
    return handleError(error, "Failed to delete product list");
    // return new Response(
    //   JSON.stringify({
    //     message: "Failed to delete product list",
    //     error: error.toString(),
    //   }),
    //   { status: 500 },
    // );
  }
}
