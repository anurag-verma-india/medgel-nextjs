// file_name: "@/app/api/page/route.ts"

import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import anual from "@/models/anual";
import { revalidateTag } from "next/cache";
import handleError from "@/helpers/handleError";
import path from "path";
import fs from "fs/promises";

export async function GET(request: NextRequest) {


  try {
    await dbConnect();
    const anualreport = await anual.find({ });

    if (!anualreport) {
      return NextResponse.json({ error: "reports not found" }, { status: 404 });
    }

    return NextResponse.json(anualreport);
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
    const {  reportid,reportpath } = body;

    if (!reportid || !reportpath) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide both report ID and report path.",
        },
        { status: 400 }
      );
    }

    await dbConnect();

    // Delete award from DB
    const deletedAward = await anual.findByIdAndDelete(reportid);

    if (!deletedAward) {
      return NextResponse.json(
        {
          success: false,
          message: "Report not found.",
        },
        { status: 404 }
      );
    }

    // Delete image from filesystem
    const fullPdfPath = path.join(process.cwd(), "public", reportpath);
    try {
      await fs.unlink(fullPdfPath);
      console.log("pdf deleted:", fullPdfPath);
    } catch (fsErr) {
  const err = fsErr as Error;
  console.warn("Failed to delete pdf:", err.message);
}

    return NextResponse.json({
      success: true,
      message: "Report deleted successfully.",
      deletedAward,
    });

  } catch (error) {
    return handleError(error, "Failed to delete Report");
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
