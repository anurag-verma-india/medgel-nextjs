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
import ProductList from "@/models/productList";
import { AnyBulkWriteOperation } from "mongoose";

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

// Helper function to generate unique name by appending dashes

const generateUniqueName = async (
  baseName: string,
  excludeId?: string,
): Promise<string> => {
  let uniqueName = baseName;
  let counter = 0;

  while (true) {
    // Build query to check if name exists
    const query: { product_list_name: string; _id?: { $ne: string } } = {
      product_list_name: uniqueName,
    };

    // If we're editing, exclude the current document from the check
    if (excludeId) {
      query._id = { $ne: excludeId };
    }

    const existingList = await ProductList.findOne(query);

    if (!existingList) {
      return uniqueName;
    }

    // If name exists, append a dash and try again
    counter++;
    uniqueName = baseName + "-".repeat(counter);
  }
};

// type received_list_edit_object =
type put_request_type = {
  product_category_id: string;
  lists_to_edit: { _id: string; product_list_name: string }[];
  list_names_to_add: string[];
  lists_to_delete: string[];
  product_category_name: string[];
  lists_to_move: { _id: string; category_id: string };
};

export async function PUT(request: NextRequest) {
  // TODO: Make sure the user is admin
  /*
  Add products to existing category (identify by id or name)
  */
  try {
    await dbConnect();

    const body = await request.json();
    let res;
    const {
      product_category_id, // Category Identifier
      lists_to_edit, // List
      list_names_to_add, // List & Category
      lists_to_delete, // List & Category
      product_category_name, // Category
      lists_to_move, // Category
    }: put_request_type = body;

    console.log("product_category_id");
    console.log(product_category_id);
    console.log("product_category_name");
    console.log(product_category_name);
    console.log("lists_to_move");
    console.log(lists_to_move);
    console.log("lists_to_edit");
    console.log(lists_to_edit);
    console.log("list_names_to_add");
    console.log(list_names_to_add);
    console.log("lists_to_delete");
    console.log(lists_to_delete);

    // Handling invalid requests first
    if (!product_category_id) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide the id of product categories",
        },
        { status: 404 },
      );
    }
    const product_category = ProductCategory.findById(product_category_id);
    if (!product_category) {
      return NextResponse.json(
        {
          success: false,
          message: "Provided category does not exist",
        },
        { status: 404 },
      );
    }

    // Performing Operations on DB

    // -> Operations on ProductList
    // Prepare Operations to perform
    const productList_operations: AnyBulkWriteOperation[] = [];

    if (lists_to_edit && lists_to_edit.length > 0) {
      for (const list_obj of lists_to_edit) {
        // Only adding the editing operation for valid ids
        if (list_obj._id && list_obj._id.match(/^[0-9a-fA-F]{24}$/)) {
          // Generate unique name, excluding the current document
          const uniqueName = await generateUniqueName(
            list_obj.product_list_name,
            list_obj._id,
          );

          productList_operations.push({
            updateOne: {
              filter: { _id: list_obj._id },
              update: {
                $set: {
                  product_list_name: uniqueName,
                },
              },
            },
          });
        }
      }
    }

    if (list_names_to_add && list_names_to_add.length > 0) {
      for (const name of list_names_to_add) {
        // Generate unique name for new list
        const uniqueName = await generateUniqueName(name);

        productList_operations.push({
          insertOne: {
            document: {
              product_list_name: uniqueName,
              product_ids: [],
            },
          },
        });
      }
    }

    if (lists_to_delete && lists_to_delete.length > 0) {
      lists_to_delete.forEach((_id: string) => {
        productList_operations.push({
          deleteOne: { filter: { _id } },
        });
      });
    }

    // // -> Operations on ProductCategory

    // const {
    //   product_category_id, // Category Identifier
    //   product_category_name, // Category
    //   lists_to_edit, // List
    //   list_names_to_add, // List & Category
    //   lists_to_delete, // List & Category
    //   lists_to_move, // Category
    // }: put_request_type = body;

    // if(product_category_name) {
    // }
    //  productCategory_op_details
    // res = {...res, productCategory_op_details}

    // Perform Operations
    // let productList_op_details;
    const productList_op_details = await ProductList.bulkWrite(
      productList_operations,
    );

    res = {
      productList_op_details,
    };

    return NextResponse.json(
      {
        success: true,
        message: "Successfully completed all operations",
        details: res,
      },
      { status: 200 },
    );

    // Notes (Gemini)
    // Using push with $each (recommended)
    // await Model.updateOne(
    //   { _id: someId },
    //   { $push: { arrayField: { $each: [value1, value2, value3] } } }
    // );

    // // Using push to add a single value
    // await Model.updateOne(
    //   { _id: someId },
    //   { $push: { arrayField: newValue } }
    // );
  } catch (error) {
    return handleError(
      error,
      "Failed to edit product details in ProductCategory or ProductList",
    );
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
