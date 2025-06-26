// app/api/upload/route.ts
import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";
import Pages from "@/models/pages";
import { imageSize } from "image-size";
import { readFileSync } from "fs";
import dbConnect from "@/lib/dbConnect";
import { checkAdminFromCookie } from "@/helpers/checkAdmin";

export async function POST(request: NextRequest): Promise<NextResponse> {
  const isAdmin = await checkAdminFromCookie();
  console.log("isAdmin", isAdmin);
  if (!isAdmin) {
    return NextResponse.json(
      { success: false, error: "You are not authorized to make this request" },
      { status: 401 },
    );
  }
  try {
    await dbConnect();
    // Get the form data
    const formData = await request.formData();
    const image = formData.get("image") as File;
    const title = formData.get("title") as string;
    const key = Number(formData.get("index"));
    console.log(`title = ${title} and key=${key}`);

    if (!image) {
      return NextResponse.json(
        { success: false, error: "No image file provided" },
        { status: 400 },
      );
    }

    // Generate a unique filename to prevent overwriting
    const timestamp = Date.now();
    const filename = `${timestamp}-${image.name.replace(/\s+/g, "-")}`;

    // Ensure the uploads directory exists
    const uploadsDir = join(process.cwd(), "public", "uploads");
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true });
    }

    // Convert the image file to a buffer
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Write the file to the public/uploads directory
    const filePath = join(uploadsDir, filename);
    await writeFile(filePath, buffer);
    const imageIndex = `images.${key}`;
    const imageRelativePath = `uploads/${filename}`;
    const bufferForSize = readFileSync(filePath);
    const dimensions = imageSize(bufferForSize);
    if (!dimensions.width || !dimensions.height) {
      return NextResponse.json(
        { success: false, error: "Failed to get image size" },
        { status: 500 },
      );
    }
    // console.log(`FileName=${imageRelativePath}`)
    // const image_path_update_result = await Pages.updateOne(
    await Pages.updateOne(
      {
        title: title,
      },
      {
        $set: {
          [imageIndex]: {
            url: imageRelativePath,
            width: dimensions.width,
            height: dimensions.height,
          },
        },
      },
    );
    // console.log(image_path_update_result);
    // Return the path to the uploaded file (relative to public)
    return NextResponse.json({
      success: true,
      message: "File uploaded successfully",
      filePath: `/uploads/${filename}`,
      // image_path_update_result,
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      { success: false, error: "Failed to upload image" },
      { status: 500 },
    );
  }
}

/**
 * FUNCTION SUMMARY:
 *
 * 1. POST
 *    - Description: API route handler for POST requests to upload an image
 *    - Parameters:
 *      - request: NextRequest - The incoming request object with form data
 *    - Returns: Promise<NextResponse> - JSON response with upload status and file path
 *    - Process: Extracts file from form data, creates uploads directory if needed, saves file to disk
 */
