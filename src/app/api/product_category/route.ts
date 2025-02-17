import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

import dbConnect from "@/lib/dbConnect";

// import Product from "@/models/products";
// import ProductList from "@/models/productList";
import ProductCategory from "@/models/productCategory";

/*
No authentication
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
  // No authentication to get categories
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const product_category_name = searchParams.get("product_category_name");
    const product_category_id = searchParams.get("product_category_id");

    // const body = await request.json();
    // const { product_category_name, product_category_id } = body;

    console.log(
      "product_category_name: ",
      product_category_name,
      "product_category_id: ",
      product_category_id,
    );

    // const category = new ProductCategory({
    //   product_category_name: product_category_name,
    //   productLists: product_category_id_list,
    // });

    // const savedCategory = await category.save();
    let category;
    if (product_category_id) {
      category = await ProductCategory.findById(product_category_id);
    } else if (product_category_name) {
      category = await ProductCategory.findOne({
        product_category_name,
      });
    }
    console.log("Category found: ", category);
    if (category) {
      return NextResponse.json({
        success: true,
        category,
      });
    }
    return NextResponse.json(
      {
        success: false,
        message: "Provided id or name does not exit in the categories list",
      },
      { status: 404 },
    );
  } catch (error) {
    console.error("Error in getting lists from category: ", error); // Log the complete error object
    return new Response(
      JSON.stringify({
        message: "Failed to get lists from category",
        error: error.toString(),
      }),
      { status: 500 },
    );
  }
}
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
    const { product_category_name, product_category_id, productLists } = body;

    console.log(
      "product_category_name: ",
      product_category_name,
      "product_category_id: ",
      product_category_id,
      "productLists: ",
      productLists,
    );

    // const category = new ProductCategory({
    //   product_category_name: product_category_name,
    //   productLists: product_category_id_list,
    // });

    // const savedCategory = await category.save();
    let category;
    if (product_category_id) {
      category = await ProductCategory.findById(product_category_id);
    } else if (product_category_name) {
      category = await ProductCategory.findOne({
        product_category_name,
      });
    }
    console.log("Category found: ", category);
    if (category) {
      category.productLists = category.productLists.concat(productLists);
      const savedCategory = await category.save();
      return NextResponse.json({
        savedCategory,
      });
    }
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
    return new Response(
      JSON.stringify({
        message: "Failed to get lists from category",
        error: error.toString(),
      }),
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
      savedCategory,
    });
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
