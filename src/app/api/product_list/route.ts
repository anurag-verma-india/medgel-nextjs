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
import { AnyBulkWriteOperation } from "mongoose";
import Product from "@/models/products";
import { product } from "@/types";
import { checkAdminFromCookie } from "@/helpers/checkAdmin";

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
  // Used in product-list page
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

// src/app/api/product_list/route.ts
export async function PUT(request: NextRequest) {
  const isAdmin = await checkAdminFromCookie();

  if (!isAdmin) {
    return NextResponse.json(
      {
        success: false,
        message: "You are not authorized to make this request",
      },
      { status: 403 },
    );
  }

  type received_product_edit_object = {
    _id: string;
    product_details: product;
  };

  type received_product_move_object = {
    move_to_list_id: string;
    product_id: string;
  };

  type put_request_body = {
    product_list_id: string;
    products_to_edit: received_product_edit_object[];
    product_list_name: string;
    product_details_to_add: product[];
    products_to_delete: string[];
    products_to_move: received_product_move_object[];
  };

  try {
    await dbConnect();

    const body: put_request_body = await request.json();

    const {
      product_list_id,
      product_list_name, // List
      products_to_move, // List
      products_to_edit, // Product
      product_details_to_add, // Product & List
      products_to_delete, // Product & List
    } = body;

    console.log("product_list_id");
    console.log(product_list_id);
    console.log("products_to_edit");
    console.log(products_to_edit);
    console.log("product_list_name");
    console.log(product_list_name);
    console.log("product_details_to_add");
    console.log(product_details_to_add);
    console.log("products_to_delete");
    console.log(products_to_delete);
    console.log("products_to_move");
    console.log(products_to_move);

    if (!product_list_id) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide the id of product list",
        },
        { status: 400 },
      );
    }

    if (!product_list_id.match(/^[0-9a-fA-F]{24}$/)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid product list id",
        },
        { status: 400 },
      );
    }

    // Check if the product list exists
    const product_list = await ProductList.findById(product_list_id);
    if (!product_list) {
      return NextResponse.json(
        {
          success: false,
          message: "Provided product list does not exist",
        },
        { status: 404 },
      );
    }

    // -> Operations on Products
    const problems: string[] = [];
    const product_operations: AnyBulkWriteOperation[] = [];

    // Add products to edit command to products operations
    if (products_to_edit && products_to_edit.length > 0) {
      for (const product_obj of products_to_edit) {
        // Validate MongoDB ID format
        if (product_obj._id.match(/^[0-9a-fA-F]{24}$/)) {
          product_operations.push({
            updateOne: {
              filter: { _id: product_obj._id },
              update: {
                $set: {
                  innovator: product_obj.product_details.innovator,
                  product: product_obj.product_details.product,
                  code: product_obj.product_details.code,
                  composition: product_obj.product_details.composition,
                  color: product_obj.product_details.color,
                  lastUpdated: Date.now(),
                },
              },
            },
          });
        } else {
          problems.push(
            `Given ID in products_to_edit is not valid: ${product_obj._id}`,
          );
        }
      }
    }

    // Add product_details_to_add array to product_operations
    if (product_details_to_add && product_details_to_add.length > 0) {
      for (const product_detail of product_details_to_add) {
        product_operations.push({
          insertOne: {
            document: {
              innovator: product_detail.innovator,
              product: product_detail.product,
              code: product_detail.code,
              composition: product_detail.composition,
              color: product_detail.color,
              lastUpdated: Date.now(),
            },
          },
        });
      }
    }

    // Remove products_to_delete from the products list
    if (products_to_delete && products_to_delete.length > 0) {
      for (const product_id of products_to_delete) {
        if (product_id.match(/^[0-9a-fA-F]{24}$/)) {
          product_operations.push({
            deleteOne: { filter: { _id: product_id } },
          });
        } else {
          problems.push(`Given Product id to delete is invalid: ${product_id}`);
        }
      }
    }

    // Apply all operations in product_operations
    const product_op_details = await Product.bulkWrite(product_operations);

    // -> Perform operations on ProductList
    const productList_operations: AnyBulkWriteOperation[] = [];

    // Add product_list_name change command to ProductList_operations
    if (product_list_name && product_list_name.length > 0) {
      // Check if list with same name already exists
      const found_list_name = await ProductList.findOne({
        product_list_name: product_list_name,
        _id: { $ne: product_list_id },
      });

      if (!found_list_name) {
        productList_operations.push({
          updateOne: {
            filter: { _id: product_list_id },
            update: {
              $set: {
                product_list_name: product_list_name,
              },
            },
          },
        });
      } else {
        problems.push(`Product list name already exists: ${product_list_name}`);
      }
    }

    // Add command to add product_details_to_add in ProductList_operations
    if (product_details_to_add && product_details_to_add.length > 0) {
      if (product_op_details && product_op_details.insertedIds) {
        const insertedProductIds: string[] = [];
        // Converting received MongoDB array in this format {"0": ObjectId(example)} to this format ["example"]
        Object.values(product_op_details.insertedIds).forEach(
          (value: string) => {
            // Validating mongoDB ID
            if (value.toString().match(/^[0-9a-fA-F]{24}$/)) {
              insertedProductIds.push(value);
            }
          },
        );

        if (insertedProductIds.length > 0) {
          productList_operations.push({
            updateOne: {
              filter: { _id: product_list_id },
              update: {
                $push: {
                  product_ids: { $each: insertedProductIds },
                },
              },
            },
          });
        }
      }
    }

    // Add command to remove products_to_delete ids in ProductList_operations
    if (products_to_delete && products_to_delete.length > 0) {
      productList_operations.push({
        updateOne: {
          filter: { _id: product_list_id },
          update: {
            $pullAll: {
              product_ids: products_to_delete,
            },
          },
        },
      });
    }

    // Add commands to remove products_to_move from current list and add to the given list id in ProductList_operations
    if (products_to_move && products_to_move.length > 0) {
      // Extract product IDs to move
      const move_product_ids: string[] = [];
      for (const move_obj of products_to_move) {
        // Validate destination list ID
        if (move_obj.move_to_list_id.match(/^[0-9a-fA-F]{24}$/)) {
          // Validate product ID
          if (move_obj.product_id.match(/^[0-9a-fA-F]{24}$/)) {
            move_product_ids.push(move_obj.product_id);
          } else {
            problems.push(
              `Given Product ID to move is invalid: ${move_obj.product_id}`,
            );
          }
        } else {
          problems.push(
            `Given destination list ID is invalid: ${move_obj.move_to_list_id}`,
          );
        }
      }

      // Remove from current list
      if (move_product_ids.length > 0) {
        productList_operations.push({
          updateOne: {
            filter: { _id: product_list_id },
            update: {
              $pullAll: {
                product_ids: move_product_ids,
              },
            },
          },
        });

        // Add to each specified list
        products_to_move.forEach((move_obj) => {
          if (
            move_obj.move_to_list_id.match(/^[0-9a-fA-F]{24}$/) &&
            move_obj.product_id.match(/^[0-9a-fA-F]{24}$/)
          ) {
            productList_operations.push({
              updateOne: {
                filter: { _id: move_obj.move_to_list_id },
                update: {
                  $push: {
                    product_ids: move_obj.product_id,
                  },
                },
              },
            });
          }
        });
      }
    }

    // Apply all operations in ProductList_operations
    const productList_op_details = await ProductList.bulkWrite(
      productList_operations,
    );

    // Return final response
    // let res = {
    const res = {
      product_op_details,
      productList_op_details,
      problems,
    };

    // If problems then add to response
    // if (problems && problems.length > 0) {
    //   res = { ...res, problems };
    // }

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
  } catch (error) {
    return handleError(error, "Failed to edit product list");
  }
}

/*
FUNCTION SUMMARY:

PUT(request: NextRequest): Promise<NextResponse>
- Purpose: Handles updating product lists and their associated products with bulk operations
- Input: 
  - request: NextRequest containing JSON body with product list update data
  - Body type: put_request_body with fields:
    - product_list_id: string (MongoDB ObjectId of the product list to update)
    - products_to_edit: received_product_edit_object[] (array of products to edit with their new details)
    - product_list_name: string (new name for the product list)
    - product_details_to_add: product[] (array of new products to add)
    - products_to_delete: string[] (array of product IDs to delete)
    - products_to_move: received_product_move_object[] (array of products to move to other lists)
- Output: NextResponse<{ success: boolean, message: string, details?: object }>
- Operations performed:
  1. Admin authorization check
  2. Input validation (product_list_id format and existence)
  3. Product operations (edit, add, delete via bulkWrite)
  4. ProductList operations (name update, product ID management via bulkWrite)
  5. Product movement between lists
- Error handling: Returns appropriate HTTP status codes and error messages
- Side effects: Modifies Product and ProductList collections in MongoDB

Type Definitions:
- received_product_edit_object: { _id: string, product_details: product }
- received_product_move_object: { move_to_list_id: string, product_id: string }
- put_request_body: Contains all the input parameters for the PUT operation

Assumptions made about the codebase:
1. checkAdminFromCookie() function exists and returns boolean for admin authorization
2. dbConnect() function exists for database connection
3. Product and ProductList are Mongoose models with bulkWrite support
4. handleError() function exists for consistent error handling
5. product type is defined with fields: innovator, product, code, composition, color, lastUpdated
6. NextRequest and NextResponse are imported from Next.js
7. AnyBulkWriteOperation type is available (likely from MongoDB/Mongoose)
8. MongoDB ObjectId validation regex /^[0-9a-fA-F]{24}$/ is the standard used
9. ProductList model has fields: product_list_name, product_ids (array of ObjectIds)
10. Product model has fields matching the product type definition
*/

// export async function PUT(request: NextRequest) {
//   // TODO: Check user is admin

//   type received_product_edit_object = {
//     _id: string;
//     product_details: product;
//   };

//   type received_product_move_object = {
//     move_to_list_id: string;
//     product_id: string;
//   };

//   type put_request_body = {
//     product_list_id: string;
//     products_to_edit: received_product_edit_object[];
//     product_list_name: string;
//     product_details_to_add: product[];
//     products_to_delete: string[];
//     products_to_move: received_product_move_object[];
//   };

//   try {
//     const body: put_request_body = await request.json();

//     const {
//       product_list_id,
//       product_list_name, // List
//       products_to_move, // List
//       products_to_edit, // Product
//       product_details_to_add, // Product & List
//       products_to_delete, // Product & List
//     } = body;

//     console.log("product_list_id");
//     console.log(product_list_id);
//     console.log("products_to_edit");
//     console.log(products_to_edit);
//     console.log("product_list_name");
//     console.log(product_list_name);
//     console.log("product_details_to_add");
//     console.log(product_details_to_add);
//     console.log("products_to_delete");
//     console.log(products_to_delete);
//     console.log("products_to_move");
//     console.log(products_to_move);

//     if (!product_list_id) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "Please provide the id of product list",
//         },
//         { status: 400 },
//       );
//     }

//     if (!product_list_id.match(/^[0-9a-fA-F]{24}$/)) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "Invalid product list id",
//         },
//         { status: 400 },
//       );
//     }
//     // console.log()

//     // TODO: Check is the product list id provided is valid

//     // -> Operations on Products
//     const problems: string[] = [];

//     const product_operations: AnyBulkWriteOperation[] = [];

//     /*

//     ## Make sure that you check the format of id is correct by this regex

//     if (id.match(/^[0-9a-fA-F]{24}$/)) {
//     // ID is valid perform operation on it
//     } else {
//      // ID is invalid add a message to problems array
//     }

//     */

//     // TODO: Add products to edit command to products operations

//     // TODO: Add product_details_to_add array to product_operations

//     // TODO: Remove products_to_delete from the products list

//     // TODO: apply all operations in product_operations

//     // -> Perform operations on ProductList

//     // TODO: Add product_list_name change command to ProductList_operations

//     // TODO: Add commands to remove products_to_move from current list and add to the given list id in ProductList_operations

//     // TODO: Add command to add product_details_to_add in ProductList_operations

//     // TODO: Add command to remove products_to_delete ids in ProductList_operations

//     // TODO: apply all operations in ProductList_operations

//     // TODO: Return final response

//     return NextResponse.json(
//       {
//         success: true,
//         message: "success",
//         // problems && problems.length > 0
//         //   ? "Some failures happened"
//         //   : "Successfully completed all operations",
//         // details: res,
//       },
//       { status: 200 },
//     );

//     // const product_list = await ProductList.findById(product_list_id);
//     // console.log("Found product list");
//     // console.log(product_list);
//     // if (!product_list) {
//     //   return NextResponse.json(
//     //     {
//     //       success: false,
//     //       message: "List not found",
//     //     },
//     //     { status: 404 },
//     //   );
//     // }

//     // if (products_to_edit && products_to_edit.length > 0) {
//     //   for (const product_obj of products_to_edit) {
//     //     // console.log("Received product id");
//     //     // console.log(product_list_id);
//     //     // const found_product_details = await Product.findOne({
//     //     //   _id: product_obj._id,
//     //     // });

//     //     if (product_obj._id.match(/^[0-9a-fA-F]{24}$/)) {
//     //       const found_product = await Product.findById(product_obj._id);
//     //       if (!found_product) {
//     //         problems.push(`Given ID not found in products: ${product_obj._id}`);
//     //       } else {
//     //         const currentTime = Date.now();
//     //         console.log("CurrentTime: ", currentTime);
//     //         const product_to_push: product = {
//     //           ...product_obj.product_details,
//     //           lastUpdated: currentTime,
//     //         };
//     //         product_operations.push({
//     //           updateOne: {
//     //             filter: { _id: product_obj._id },
//     //             update: {
//     //               $set: { product_to_push },
//     //             },
//     //           },
//     //         });
//     //       }
//     //     } else {
//     //       problems.push(
//     //         `Given ID in products_to_edit is not valid: ${product_obj._id}`,
//     //       );
//     //     }
//     //   }
//     // }
//   } catch (error) {
//     return handleError(error, "Failed to edit product list");
//   }
//   // try {
//   //   const body = await request.json();
//   //   const {
//   //     product_list_name,
//   //     product_list_id,
//   //     product_ids_to_add,
//   //     product_ids_to_delete,
//   //   } = body;

//   //   console.log(
//   //     "product_list_name: ",
//   //     product_list_name,
//   //     "\n",
//   //     "product_list_id: ",
//   //     product_list_id,
//   //     "\n",
//   //     "product_ids_to_add: ",
//   //     product_ids_to_add,
//   //     "\n",
//   //     "product_ids_to_delete: ",
//   //     product_ids_to_delete,
//   //   );

//   //   let product_list;
//   //   if (product_list_id) {
//   //     product_list = await ProductList.findById(product_list_id);
//   //   } else if (product_list_name) {
//   //     product_list = await ProductList.findOne({
//   //       product_list_name,
//   //     });
//   //   }

//   //   if (!product_list) {
//   //     return NextResponse.json(
//   //       {
//   //         success: false,
//   //         message:
//   //           "Provided id or name does not exit in the product_list, send a post request to create a new list",
//   //       },
//   //       { status: 404 },
//   //     );
//   //   }

//   //   let addition_details;
//   //   let deletion_details;
//   //   if (product_list_id) {
//   //     // Finding the list by id
//   //     if (product_ids_to_add) {
//   //       addition_details = await ProductList.updateOne(
//   //         { _id: product_list_id },
//   //         { $push: { product_ids: product_ids_to_add } },
//   //       );
//   //     }
//   //     if (product_ids_to_delete) {
//   //       deletion_details = await ProductList.updateOne(
//   //         { _id: product_list_id },
//   //         { $pullAll: { product_ids: product_ids_to_delete } },
//   //       );
//   //     }
//   //   } else {
//   //     // Finding the list by name
//   //     if (product_ids_to_add) {
//   //       addition_details = await ProductList.updateOne(
//   //         { product_list_name },
//   //         { $push: { product_ids: product_ids_to_add } },
//   //       );
//   //     }
//   //     if (product_ids_to_delete) {
//   //       deletion_details = await ProductList.updateOne(
//   //         { product_list_name },
//   //         { $pullAll: { product_ids: product_ids_to_delete } },
//   //       );
//   //     }
//   //   }

//   //   if (addition_details || deletion_details) {
//   //     return NextResponse.json({
//   //       addition_details,
//   //       deletion_details,
//   //     });
//   //   }

//   //   return NextResponse.json(
//   //     {
//   //       success: false,
//   //       message:
//   //         "Provided id or name does not exit in the product_list, send a post request to create a new list",
//   //     },
//   //     { status: 404 },
//   //   );
//   // } catch (error) {
//   //   return handleError(error, "Failed to edit product list");
//   // }
// }

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
