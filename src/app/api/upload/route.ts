// app/api/upload/route.ts
import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // Get the form data
    const formData = await request.formData();
    const image = formData.get("image") as File;

    if (!image) {
      return NextResponse.json(
        { error: "No image file provided" },
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

    // Return the path to the uploaded file (relative to public)
    return NextResponse.json({
      message: "File uploaded successfully",
      filePath: `/uploads/${filename}`,
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      { error: "Failed to upload image" },
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
