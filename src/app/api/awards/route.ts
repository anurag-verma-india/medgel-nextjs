// file_name: "@/app/api/page/route.ts"

import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Award from "@/models/awards";
import { revalidateTag } from "next/cache";
import handleError from "@/helpers/handleError";
import path from "path";
import fs from "fs/promises";

export async function GET(request: NextRequest) {


  try {
    await dbConnect();
    const award = await Award.find({ });

    if (!award) {
      return NextResponse.json({ error: "Awards not found" }, { status: 404 });
    }

    return NextResponse.json(award);
  } catch (error) {
    return handleError(error, "Server error");
    // return NextResponse.json(
    //   { error: "Server error", details: error.message },
    //   { status: 500 },
    // );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { awardid, imagePath } = body;

    if (!awardid || !imagePath) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide both award ID and image path.",
        },
        { status: 400 }
      );
    }

    await dbConnect();

    // Delete award from DB
    const deletedAward = await Award.findByIdAndDelete(awardid);

    if (!deletedAward) {
      return NextResponse.json(
        {
          success: false,
          message: "Award not found.",
        },
        { status: 404 }
      );
    }

    // Delete image from filesystem
    const fullImagePath = path.join(process.cwd(), "public", imagePath);
    try {
      await fs.unlink(fullImagePath);
      console.log("Image deleted:", fullImagePath);
    } catch (fsErr) {
  const err = fsErr as Error;
  console.warn("Failed to delete image:", err.message);
}

    return NextResponse.json({
      success: true,
      message: "Award and image deleted successfully.",
      deletedAward,
    });

  } catch (error) {
    return handleError(error, "Failed to delete award");
  }
}
// export async function POST(request: NextRequest) {
//   try {
//     await dbConnect();

//     const body = await request.json();
//     const { title } = body;
//     console.log("creating page: ", body);

//     // search title in the database
//     const page = await Pages.findOne({ title });

//     // if page exists send the response that it already exists
//     if (page) {
//       return NextResponse.json(
//         { error: "Page already exists" },
//         { status: 400 },
//       );
//     }

//     // otherwise add it to database and save
//     const newPage = new Pages(body);
//     const savedPage = await newPage.save();

//     // call revalidation function for that title
//     revalidateTag(body.title);
//     return new Response(JSON.stringify(savedPage), { status: 201 });
//   } catch (error) {
//     console.error("Error creating page: ", error); // Log the complete error object
//     return handleError(error, "Failed to create page");
//     // return new Response(
//     //   JSON.stringify({
//     //     message: "Failed to create page",
//     //     error: error.toString(),
//     //   }),
//     //   { status: 500 },
//     // );
//   }
// }

// export async function PUT(request: NextRequest) {
//   try {
//     await dbConnect();
//     const body = await request.json();
//     const { title } = body;

//     // console.log("editing page: ", body);
//     if (!title) {
//       return NextResponse.json(
//         { error: "Title parameter is required" },
//         { status: 400 },
//       );
//     }

//     // search title in the database
//     const page = await Pages.findOne({ title });

//     if (!page) {
//       return NextResponse.json({ error: "Page not found" }, { status: 404 });
//     }

//     // edit page with current details
//     if (body.content) {
//       await Pages.findOneAndUpdate(
//         { title: title },
//         { $set: { content: body.content } },
//       );
//     }
//     if (body.images) {
//       await Pages.findOneAndUpdate(
//         { title: title },
//         { $set: { images: body.images } },
//       );
//     }
//     const pageAfterUpdate = await Pages.findOne({ title });
//     console.log("Edited page from database: ", pageAfterUpdate);
//     revalidateTag(title);
//     return new Response(pageAfterUpdate, { status: 200 });
//   } catch (error) {
//     console.error("Error editing page: ", error); // Log the complete error object
//     return handleError(error, "Failed to edit page");
//     // return new Response(
//     //   JSON.stringify({
//     //     message: "Failed to edit page",
//     //     error: error.toString(),
//     //   }),
//     //   { status: 500 },
//     // );
//   }
// }
