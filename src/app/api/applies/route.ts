import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Apply from "@/models/apply";
import handleError from "@/helpers/handleError";
import path from "path";
import fs from "fs/promises";


export async function GET(request: NextRequest) {


  try {
    await dbConnect();
    const applies = await Apply.find({ });

    if (!applies) {
      return NextResponse.json({ error: "responses not found" }, { status: 404 });
    }

    return NextResponse.json(applies);
  } catch (error) {
    return handleError(error, "Server error");
    
  }
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const resume = searchParams.get("resume");
  try {

    await dbConnect();

    // Delete award from DB
    const deletedResponse = await Apply.findByIdAndDelete(id);

    if (!deletedResponse) {
      return NextResponse.json(
        {
          success: false,
          message: "response not found.",
        },
        { status: 404 }
      );
    }

    // Delete image from filesystem
    const fullPdfPath = path.join(process.cwd(), "public", resume);
    try {
      await fs.unlink(fullPdfPath);
      console.log("pdf deleted:", fullPdfPath);
    } catch (fsErr) {
  const err = fsErr as Error;
  console.warn("Failed to delete pdf:", err.message);
}

    return NextResponse.json({
      success: true,
      message: "Response deleted successfully.",
      deletedResponse,
    });

  } catch (error) {
    return handleError(error, "Failed to delete Response");
  }
}

