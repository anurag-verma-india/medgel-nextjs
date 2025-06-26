/* TODO: Get file path from request
send file as response
*/

import { NextRequest, NextResponse } from "next/server";
import { checkAdminFromCookie } from "@/helpers/checkAdmin";
import path from "path";
import fs from "fs/promises";

// GET /api/applies_resume?filename=FILENAME
export async function GET(request: NextRequest) {
  // Check admin
  const isAdmin = await checkAdminFromCookie();
  if (!isAdmin) {
    return NextResponse.json(
      { success: false, message: "Forbidden: Admins only." },
      { status: 403 },
    );
  }

  // Get filename from query
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get("filename");
  if (!filename) {
    return NextResponse.json(
      { success: false, message: "Missing filename parameter." },
      { status: 400 },
    );
  }

  // Only allow files from the /private-files/resume directory
  const resumeDir = path.join(process.cwd(), "private-files", "resume");
  const filePath = path.join(resumeDir, filename);

  // Prevent path traversal
  if (!filePath.startsWith(resumeDir)) {
    return NextResponse.json(
      { success: false, message: "Invalid file path." },
      { status: 400 },
    );
  }

  try {
    const fileBuffer = await fs.readFile(filePath);
    // Set appropriate headers for PDF or other files
    const ext = path.extname(filename).toLowerCase();
    let contentType = "application/octet-stream";
    if (ext === ".pdf") contentType = "application/pdf";
    // Add more content types if needed

    return new Response(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename=\"${filename}\"`,
        success: "true",
      },
    });
  } catch (error) {
    console.error("Error reading file:", error);
    return NextResponse.json(
      { success: false, message: "File not found." },
      { status: 404 },
    );
  }
}
