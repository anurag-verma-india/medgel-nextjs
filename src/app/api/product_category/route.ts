/*
Working:
  GET
  POST
  PUT (add and remove)
  DELETE
*/ import { NextResponse } from "next/server";
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
import { checkAdminFromCookie } from "@/helpers/checkAdmin";
// import { ProductCategoryItemDB } from "@/types";
import { CascadeDelete } from "./CascadeDelete";
import { product_category_put_request_body } from "./types";
// import { Key } from "lucide-react";

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

export async function GET(request: NextRequest) {
  // Used in ProductsContextProvider
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    console.log(searchParams);
    if (id) {
      const productCategoriesItem = await ProductCategory.findById(id);
      if (!productCategoriesItem) {
        return NextResponse.json({ error: "News not found" }, { status: 404 });
      } else {
        return NextResponse.json({
          success: true,
          productCategoriesItem,
        });
      }
    } else {
      const categories = await ProductCategory.find({});
      return NextResponse.json({
        success: true,
        categories,
      });
    }
  } catch (error) {
    console.error("Error in getting categories: ", error); // Log the complete error object
    return handleError(error, "Failed to get lists from category");
  }
}

export async function PUT(request: NextRequest) {
  const isAdmin = await checkAdminFromCookie();
  const problems: string[] = [];

  if (!isAdmin) {
    problems.push("Unauthorized User");
    return NextResponse.json(
      {
        success: false,
        message: "You are not authorized to make this request",
        problems,
      },
      { status: 503 },
    );
  }

  try {
    await dbConnect();

    const body: product_category_put_request_body = await request.json();
    // let res;
    const {
      product_category_id, // Category Identifier
      product_category_name, // Category
      lists_to_edit, // List
      list_names_to_add, // List & Category
      lists_to_delete, // List & Category
      lists_to_move, // Category
    } = body;

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
      problems.push("No category ID provided");
      return NextResponse.json(
        {
          success: false,
          message: "Please provide the id of product categories",
          problems,
        },
        { status: 400 },
      );
    }

    const ValidMongoDBId = /^[0-9a-fA-F]{24}$/;
    if (!product_category_id.match(ValidMongoDBId)) {
      problems.push(`Invalid Category ID: ${product_category_id}`);
      return NextResponse.json(
        {
          success: false,
          message: "Please provide a valid category ID",
          problems,
        },
        { status: 400 },
      );
    }
    const product_category =
      await ProductCategory.findById(product_category_id);
    if (!product_category) {
      problems.push(
        `Given product category ID does not exist "${product_category_id}"`,
      );
      return NextResponse.json(
        {
          success: false,
          message: "Provided category does not exist",
          problems,
        },
        { status: 404 },
      );
    }

    // Performing Operations on DB

    // Check if the ids are valid or not whenever they are used (reduce or prevent errors)
    // https://stackoverflow.com/questions/14940660/whats-mongoose-error-cast-to-objectid-failed-for-value-xxx-at-path-id
    /*
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      // Yes, it's a valid ObjectId, proceed with `findById` call.
    }
    */

    // -> Operations on ProductList
    // Prepare Operations to perform
    const productList_operations: AnyBulkWriteOperation[] = [];
    if (lists_to_edit && lists_to_edit.length > 0) {
      for (const list_obj of lists_to_edit) {
        // lists_to_edit.forEach(async (list_obj: received_list_edit_object) => {
        // Validating Mongodb id

        if (list_obj._id.match(/^[0-9a-fA-F]{24}$/)) {
          // Check if list with same name already exists
          const found_list_name = await ProductList.findOne({
            product_list_name: list_obj.product_list_name,
            _id: { $ne: list_obj._id },
          });
          // console.log("Found list name: ");
          // console.log(found_list_name);
          if (!found_list_name) {
            productList_operations.push({
              updateOne: {
                filter: { _id: list_obj._id },
                update: {
                  $set: {
                    product_list_name: list_obj.product_list_name,
                  },
                },
              },
            });
          } else {
            problems.push(
              `A list with the name "${list_obj.product_list_name}" already exists, unable to edit`,
            );
          }
        } else {
          problems.push(`Invalid List ID to edit: ${list_obj._id}`);
        }
      }
    }

    if (list_names_to_add && list_names_to_add.length > 0) {
      for (const name of list_names_to_add) {
        const found_list_name = await ProductList.findOne({
          product_list_name: name,
        });
        if (!found_list_name) {
          productList_operations.push({
            insertOne: {
              document: {
                product_list_name: name,
                product_ids: [],
              },
            },
          });
        } else {
          //});
          problems.push(
            `A list with the name "${name}" already exists, unable to add`,
          );
        }
      }
    }

    if (lists_to_delete && lists_to_delete.length > 0) {
      for (const _id of lists_to_delete) {
        if (_id.match(/^[0-9a-fA-F]{24}$/)) {
          productList_operations.push({
            deleteOne: { filter: { _id } },
          });
        } else {
          problems.push(`Invalid List ID to delete: ${lists_to_delete}`);
        }
      }
    }

    const productList_op_details = await ProductList.bulkWrite(
      productList_operations,
    );

    // -> Operations on ProductCategory
    const productCategory_operations: AnyBulkWriteOperation[] = [];

    if (product_category_name && product_category_name.length > 0) {
      const found_category_name = await ProductCategory.findOne({
        product_category_name: product_category_name,
        _id: { $ne: product_category_id },
      });

      if (found_category_name) {
        problems.push(
          `A category with the name "${product_category_name}" already exists, unable to edit`,
        );
      } else {
        productCategory_operations.push({
          updateOne: {
            filter: {
              _id: product_category_id,
            },
            update: {
              $set: {
                product_category_name,
              },
            },
          },
        });
      }
    }

    if (list_names_to_add && list_names_to_add.length > 0) {
      if (productList_op_details && productList_op_details.insertedIds) {
        const insertedListIds: string[] = [];
        // Converting received MongoDB array in this format {"0": ObjectId(example)} to this format ["example"]
        Object.values(productList_op_details.insertedIds).forEach(
          (value: string) => {
            // Validating mongoDB ID
            if (value.toString().match(/^[0-9a-fA-F]{24}$/)) {
              insertedListIds.push(value);
            }
          },
        );

        productCategory_operations.push({
          updateOne: {
            filter: { _id: product_category_id },
            update: {
              $push: {
                productLists: { $each: insertedListIds },
              },
            },
          },
        });
      }
    }

    if (lists_to_delete && lists_to_delete.length > 0) {
      productCategory_operations.push({
        updateOne: {
          filter: { _id: product_category_id },
          update: {
            $pullAll: {
              productLists: lists_to_delete,
            },
          },
        },
      });
    }

    if (lists_to_move && lists_to_move.length > 0) {
      // Delete  from current and add to other category

      // Delete from current category
      // pull just the list ids from lists_to_move array
      const move_ids: string[] = [];
      lists_to_move.forEach((move_obj) => {
        move_ids.push(move_obj.product_list_id);
      });

      productCategory_operations.push({
        updateOne: {
          filter: { _id: product_category_id },
          update: {
            $pullAll: {
              productLists: move_ids,
            },
          },
        },
      });

      // Add to each specified category
      lists_to_move.forEach((move_obj) => {
        productCategory_operations.push({
          updateOne: {
            filter: { _id: move_obj.move_to_category_id },
            update: {
              $push: {
                productLists: move_obj.product_list_id,
              },
            },
          },
        });
      });
    }

    const productCategory_op_details = await ProductCategory.bulkWrite(
      productCategory_operations,
    );

    // let res;
    // res = {
    //   productList_op_details,
    //   productCategory_op_details,
    // };

    // If problems then add to response
    // if (problems && problems.length > 0) {
    //   res = { ...res, problems };
    // }

    // return NextResponse.json(
    //   {
    // success: true,
    // problems: problems && problems.length > 0 ? true : false,
    // message:
    //   problems && problems.length > 0
    //     ? "Some failures happened"
    //     : "Successfully completed all operations",
    // details: res,
    //   },
    //   { status: 200 },
    // );

    // let details;
    const details = {
      productList_op_details,
      productCategory_op_details,
    };
    let res;
    if (!problems || problems.length === 0) {
      res = {
        success: true,
        partial_success: true,
        message: "All operations completed successfully",
        problems: [],
        details,
      };
    } else {
      res = {
        success: false,
        partial_success: true,
        message: "Some Operations completed successfully",
        problems,
        details,
      };
    }

    return NextResponse.json(res, { status: 200 });

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
    // return handleError(
    //   error,
    //   "Failed to edit product details in ProductCategory or ProductList",
    // );
    console.log(
      "Failed to edit product details in ProductCategory or ProductList",
    );
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        partial_success: false,
        message: "Unknown critical error happened",
        problems,
      },
      { status: 500 },
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
      success: true,
      message: "Category added successfully",
      savedCategory,
    });
  } catch (error) {
    console.error("Error in adding product: ", error); // Log the complete error object
    return NextResponse.json(
      {
        success: false,
        message: ["Some unknown error happened during category creation"],
      },
      { status: 500 },
    );
    // return handleError(error, "Failed to post product");
    // return new Response(
    //   JSON.stringify({
    //     message: "Failed to post product",
    //     error,
    //   }),
    //   { status: 500 },
    // );
  }
}

// TODO: Make sure the user is admin
/*
Delete a product category
*/
// src/app/api/product_category/route.ts
export async function DELETE(request: NextRequest) {
  return CascadeDelete(request);
}
