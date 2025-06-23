// src/app/api/product_category/route.ts
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect"; // Assumption: database connection utility
import ProductCategory from "@/models/productCategory";
import ProductList from "@/models/productList";
import Product from "@/models/products";

// Type definitions
interface ProductCategoryItemDB {
  _id: string;
  product_category_name: string;
  productLists: string[];
}

interface ProductListItemDB {
  _id: string;
  product_list_name: string;
  product_ids: string[];
}

// interface ProductItemDB {
//   _id: string;
//   innovator: string;
//   product: string;
//   code: string;
//   composition: string;
//   color: string;
//   lastUpdated: Date;
// }

interface DeleteRequestBody {
  product_category_id: string;
}

interface CascadeDeletionResult {
  deletedProductsCount: number;
  deletedListsCount: number;
  deletedProductIds: string[];
  deletedListIds: string[];
}

/**
 * Performs cascading deletion of products associated with given list IDs
 * @param listIds - Array of product list IDs
 * @returns Promise containing deletion results and product IDs
 */
async function cascadeDeleteProducts(listIds: string[]): Promise<{
  deletedProductIds: string[];
  deletedProductsCount: number;
}> {
  const allProductIds: string[] = [];

  // Get all product IDs from all lists
  const lists = await ProductList.find<ProductListItemDB>({
    _id: { $in: listIds },
  }).select("product_ids");

  // Combine all product IDs from all lists
  for (const list of lists) {
    allProductIds.push(...list.product_ids);
  }
  // Remove duplicates using Set
  const uniqueProductIds = [...new Set(allProductIds)];

  // Delete all products
  const deleteProductsResult = await Product.deleteMany({
    _id: { $in: uniqueProductIds },
  });

  return {
    deletedProductIds: uniqueProductIds,
    deletedProductsCount: deleteProductsResult.deletedCount || 0,
  };
}

/**
 * Performs cascading deletion of lists associated with a category
 * @param listIds - Array of product list IDs to delete
 * @returns Promise containing deletion count
 */
async function cascadeDeleteLists(listIds: string[]): Promise<number> {
  const deleteListsResult = await ProductList.deleteMany({
    _id: { $in: listIds },
  });

  return deleteListsResult.deletedCount || 0;
}

/**
 * Main function to perform complete cascading deletion
 * @param categoryId - ID of the category to delete
 * @returns Promise containing complete deletion results
 */
async function performCascadingDeletion(
  categoryId: string,
): Promise<CascadeDeletionResult> {
  // Get the category with its associated list IDs
  const category =
    await ProductCategory.findById<ProductCategoryItemDB>(categoryId);

  if (!category) {
    throw new Error("Category not found");
  }

  const listIds = category.productLists;

  // Step 1: Delete all products in all lists
  const { deletedProductIds, deletedProductsCount } =
    await cascadeDeleteProducts(listIds);

  // Step 2: Delete all lists in the category
  const deletedListsCount = await cascadeDeleteLists(listIds);

  // Step 3: Delete the category itself
  await ProductCategory.findByIdAndDelete(categoryId);

  return {
    deletedProductsCount,
    deletedListsCount,
    deletedProductIds,
    deletedListIds: listIds,
  };
}

/**
 * DELETE endpoint for product categories with cascading deletion
 * @param request - NextJS request object containing category ID
 * @returns NextResponse with deletion results or error message
 */
export async function CascadeDelete(
  request: NextRequest,
): Promise<NextResponse> {
  try {
    // Parse and validate request body
    const body: DeleteRequestBody = await request.json();
    const { product_category_id } = body;

    console.log("product_category_id: ", product_category_id);

    // Validate required parameters
    if (!product_category_id) {
      return NextResponse.json(
        {
          message: "Category ID is required",
          problems: true,
        },
        {
          status: 400,
        },
      );
    }

    // Establish database connection
    await dbConnect();

    // Validate category exists before deletion
    const categoryExists =
      await ProductCategory.findById<ProductCategoryItemDB>(
        product_category_id,
      );

    if (!categoryExists) {
      return NextResponse.json(
        {
          message: "Provided category does not exist",
          problems: true,
        },
        {
          status: 404,
        },
      );
    }

    // Perform cascading deletion
    const deletionResult = await performCascadingDeletion(product_category_id);

    return NextResponse.json({
      success: true,
      message: "Category and all associated data deleted successfully",
      problems: false,
      deletion_summary: {
        category_id: product_category_id,
        category_name: categoryExists.product_category_name,
        products_deleted: deletionResult.deletedProductsCount,
        lists_deleted: deletionResult.deletedListsCount,
        deleted_product_ids: deletionResult.deletedProductIds,
        deleted_list_ids: deletionResult.deletedListIds,
      },
    });
  } catch (error: unknown) {
    console.error("Error in deleting category: ", error);

    // Type-safe error handling
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";

    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while deleting the category",
        problems: true,
        // error_details: errorMessage,
        errors: [errorMessage],
      },
      {
        status: 500,
      },
    );
  }
}
