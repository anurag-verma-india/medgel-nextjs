/*
Working:
  GET
  POST
  PUT (add and remove)
  DELETE
*/

import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
// import { MongooseError } from "mongoose";

import dbConnect from "@/lib/dbConnect";

// import Product from "@/models/products";
// import ProductList from "@/models/productList";
import ProductCategory from "@/models/productCategory";
// import { MongooseError } from "mongoose";
import handleError from "@/helpers/handleError";

/*
----- Authentication levels ----- No authentication
Get Categories and list names

Email verified check
Get product details

User is admin check
PUT, POST, DELETE
*/

/*
GET
Get all list ids from a list

POST (Create a new resource)
Create a new category (optionally also include listIDs)

PUT (Replace an existing resource)
Edit a category (add or remove listIDs from it)

------
DELETE
Delete a list
 */

export async function GET() {
  // Used in ProductsContextProvider
  try {
    await dbConnect();
    const categories = await ProductCategory.find({});

    if (categories) {
      return NextResponse.json({
        success: true,
        categories,
      });
    }

    return NextResponse.json(
      {
        success: false,
        message: "Product categories were not found in the database",
      },
      { status: 404 },
    );
  } catch (error) {
    console.error("Error in getting categories: ", error); // Log the complete error object
    return handleError(error, "Failed to get lists from category");
  }
}
// export async function GET(request: NextRequest) {
//   // No authentication to get categories
//   try {
//     // throw new Error("This is a custom error");
//     // throw new MongooseError("This is a custom mongoose error");
//     await dbConnect();
//     const { searchParams } = new URL(request.url);
//     const product_category_name = searchParams.get("product_category_name");
//     const product_category_id = searchParams.get("product_category_id");

//     // const body = await request.json();
//     // const { product_category_name, product_category_id } = body;

//     console.log(
//       "product_category_name: ",
//       product_category_name,
//       "product_category_id: ",
//       product_category_id,
//     );

//     // const category = new ProductCategory({
//     //   product_category_name: product_category_name,
//     //   productLists: product_category_id_list,
//     // });

//     // const savedCategory = await category.save();
//     let category;
//     if (product_category_id) {
//       category = await ProductCategory.findById(product_category_id);
//     } else if (product_category_name) {
//       category = await ProductCategory.findOne({
//         product_category_name,
//       });
//     }
//     console.log("Category found: ", category);
//     if (category) {
//       return NextResponse.json({
//         success: true,
//         category,
//       });
//     }
//     return NextResponse.json(
//       {
//         success: false,
//         message: "Provided id or name does not exit in the categories list",
//       },
//       { status: 404 },
//     );
//   } catch (error) {
//     console.error("Error in getting lists from category: ", error); // Log the complete error object
//     return handleError(error, "Failed to get lists from category");
//   }
// }

export async function PUT(request: NextRequest) {
  // TODO: Make sure the user is admin
  /*
  Add products to existing category (identify by id or name)
  */
  // No authentication to get categories
  try {
    await dbConnect();
    // const { searchParams } = new URL(request.url);
    // const product_category_name = searchParams.get("product_category_name");
    // const product_category_id = searchParams.get("product_category_id");

    const body = await request.json();
    const {
      product_category_name,
      product_category_id,
      product_lists_to_add,
      product_lists_to_delete,
    } = body;

    console.log(
      "product_category_name: ",
      product_category_name,
      "product_category_id: ",
      product_category_id,
      "product_lists_to_add: ",
      product_lists_to_add,
      "product_lists_to_delete: ",
      product_lists_to_delete,
    );

    let addition_details;
    if (product_lists_to_add) {
      if (product_category_id) {
        addition_details = await ProductCategory.updateOne(
          { _id: product_category_id },
          { $push: { productLists: product_lists_to_add } },
        );
      } else {
        addition_details = await ProductCategory.updateOne(
          { product_category_name },
          { $push: { productLists: product_lists_to_add } },
        );
      }
    }
    let deleteion_details;
    if (product_lists_to_delete) {
      if (product_category_id) {
        deleteion_details = await ProductCategory.updateOne(
          { _id: product_category_id },
          { $pullAll: { productLists: product_lists_to_delete } },
        );
      } else {
        deleteion_details = await ProductCategory.updateOne(
          { product_category_name },
          { $pullAll: { productLists: product_lists_to_delete } },
        );
      }
    }

    if (addition_details || deleteion_details) {
      return NextResponse.json({
        addition_details,
        deleteion_details,
      });
    }

    // TODO: use findByIdAndUpdate instead of getting and posting
    // let category;
    // if (product_category_id) {
    //   category = await ProductCategory.findById(product_category_id);
    // } else if (product_category_name) {
    //   category = await ProductCategory.findOne({
    //     product_category_name,
    //   });
    // }
    // console.log("Category found: ", category);
    // if (category) {
    //   category.productLists = category.productLists.concat(productLists);
    //   const savedCategory = await category.save();
    //   return NextResponse.json({
    //     savedCategory,
    //   });
    // }
    return NextResponse.json(
      {
        success: false,
        message:
          "Provided id or name does not exit in the categories list, send a post request to create a new category",
      },
      { status: 404 },
    );
  } catch (error) {
    console.error("Error in getting lists from category: ", error); // Log the complete error object
    return handleError(error, "Failed to get lists from category");
    // return new Response(
    //   JSON.stringify({
    //     message: ,
    //     error,
    //   }),
    //   { status: 500 },
    // );
  }
}

export async function POST(request: NextRequest) {
  // TODO: Make sure the user is admin

  /* Working
  Make a new product category
  (optionally with a list of list_ids)
  */
  try {
    await dbConnect();
    const body = await request.json();

    const {
      product_category_name,
      product_category_id_list, // (Optional)
    } = body;

    console.log(
      "product_category_name: ",
      product_category_name,
      "product_category_id_list: ",
      product_category_id_list,
    );

    const category = new ProductCategory({
      product_category_name: product_category_name,
      productLists: product_category_id_list,
    });

    const savedCategory = await category.save();

    return NextResponse.json({
      savedCategory,
    });
  } catch (error) {
    console.error("Error in adding product: ", error); // Log the complete error object
    return handleError(error, "Failed to post product");
    // return new Response(
    //   JSON.stringify({
    //     message: "Failed to post product",
    //     error,
    //   }),
    //   { status: 500 },
    // );
  }
}

export async function DELETE(request: NextRequest) {
  // TODO: Make sure the user is admin
  /*
  Delete a product category
  */
  try {
    await dbConnect();

    const body = await request.json();
    const { product_category_name, product_category_id } = body;

    console.log(
      "product_category_name: ",
      product_category_name,
      "product_category_id: ",
      product_category_id,
    );

    let category;
    if (product_category_id) {
      category = await ProductCategory.findByIdAndDelete(product_category_id);
    } else {
      category = await ProductCategory.findOneAndDelete({
        product_category_name,
      });
    }
    return NextResponse.json({
      message: "Category Deleted successfully",
      deleted_category: category,
    });
  } catch (error: unknown) {
    console.error("Error in deleting category: ", error); // Log the complete error object
    return handleError(error, "Failed to delete category");
    // return new Response(
    //   JSON.stringify({
    //     message: "Failed to delete category",
    //     error,
    //   }),
    //   { status: 500 },
    // );
  }
}
