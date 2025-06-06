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

  type received_list_edit_object = {
    _id: string;
    product_list_name: string;
  };

  type received_list_move_object = {
    move_to_category_id: string;
    product_list_id: string;
  };

  type put_request_body = {
    product_category_id: string;
    lists_to_edit: received_list_edit_object[];
    product_category_name: string;
    list_names_to_add: string[];
    lists_to_delete: string[];
    lists_to_move: received_list_move_object[];
  };
  try {
    await dbConnect();

    const body: put_request_body = await request.json();
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

    // Check if the ids are valid or not whenever they are used (reduce or prevent errors)
    // https://stackoverflow.com/questions/14940660/whats-mongoose-error-cast-to-objectid-failed-for-value-xxx-at-path-id
    /*
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      // Yes, it's a valid ObjectId, proceed with `findById` call.
    }
    */

    // -> Operations on ProductList
    const problems: string[] = [];
    // Prepare Operations to perform
    const productList_operations: AnyBulkWriteOperation[] = [];
    if (lists_to_edit && lists_to_edit.length > 0) {
      for (const list_obj of lists_to_edit) {
        // lists_to_edit.forEach(async (list_obj: received_list_edit_object) => {
        // Validating Mongodb id

        const found_list_name = await ProductList.findOne({
          product_list_name: list_obj.product_list_name,
          _id: {$ne: list_obj._id}
        });
        // console.log("Found list name: ");
        // console.log(found_list_name);

        if (list_obj._id.match(/^[0-9a-fA-F]{24}$/)) {
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
            // productList_operations.push({
            //   updateOne: {
            //     filter: { _id: list_obj._id },
            //     update: {
            //       $set: {
            //         product_list_name: list_obj.product_list_name + "-",
            //       },
            //     },
            //   },
            // });
            problems.push(
              `Name provided to be edited to, already exists: ${list_obj.product_list_name}`,
            );
          }
        } else {
          problems.push(
            `Given ID in lists_to_edit is not valid: ${list_obj._id}`,
          );
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
          // productList_operations.push({
          //   insertOne: {
          //     document: {
          //       product_list_name: name + "-",
          //       product_ids: [],
          //     },
          //   },
          // });
          problems.push(
            `Given list name (${name}) already existed in the list of products document`,
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
          problems.push(
            `Given List id to delete from product list is invalid: ${lists_to_delete}`,
          );
        }
      }
    }

    const productList_op_details = await ProductList.bulkWrite(
      productList_operations,
    );

    // -> Operations on ProductCategory
    const productCategory_operations: AnyBulkWriteOperation[] = [];
    if (product_category_name && product_category_name.length > 0) {
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

    let res;
    res = {
      productList_op_details,
      productCategory_op_details,
    };

    // If problems then add to response
    if (problems && problems.length > 0) {
      res = { ...res, problems };
    }

    return NextResponse.json(
      {
        success: true,
        message:
          problems && problems.length > 0
            ? "Some failures happened"
            : "Successfully completed all operations",
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
