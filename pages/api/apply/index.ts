import fs from "fs";
import path from "path";
import { IncomingForm, File as FormidableFile, Fields } from "formidable";
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import Apply from "@/models/apply";

// Disable Next.js default body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

interface CustomFormidableFiles {
  resume?: FormidableFile | FormidableFile[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, error: "Method not allowed" });
  }

  await dbConnect();

  // const uploadDir = path.join(process.cwd(), "public", "resume");
  const uploadDir = path.join(process.cwd(), "private-files", "resume");

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const form = new IncomingForm({
    uploadDir,
    keepExtensions: true,
    multiples: false,
    filename: (_name, _ext, part) =>
      `${Date.now()}-${part.originalFilename?.replace(/\s+/g, "") || "file"}`,
  });

  form.parse(req, async (err, fields: Fields, files: CustomFormidableFiles) => {
    if (err) {
      console.error("Form error:", err);
      return res
        .status(500)
        .json({ success: false, error: "Form parsing error" });
    }

    try {
      const rawFile = files.resume;

      // Validate resume
      if (!rawFile) {
        return res
          .status(400)
          .json({ success: false, error: "Resume is required." });
      }
      const file = Array.isArray(rawFile) ? rawFile[0] : rawFile;
      if (!file.filepath) {
        return res
          .status(400)
          .json({ success: false, error: "File path is missing." });
      }
      if (!file.mimetype || file.mimetype !== "application/pdf") {
        return res
          .status(400)
          .json({ success: false, error: "Resume must be a PDF file." });
      }
      if (file.size && file.size > 10 * 1024 * 1024) {
        return res
          .status(400)
          .json({ success: false, error: "Resume must be less than 10MB." });
      }

      // Helper to get field value safely
      const getField = (key: string) => {
        const val = fields[key];
        if (Array.isArray(val)) return val[0];
        return val;
      };

      // Validate required fields
      const name = getField("name");
      const email = getField("email");
      const mobilenumber = getField("mobilenumber");
      const deptid = getField("deptid");
      const designation = getField("designation");
      const experience = getField("experience");
      const qualification = getField("qualification");
      const jobdesc = getField("jobdesc");

      // Name validation
      if (!name || typeof name !== "string" || name.length === 0) {
        return res
          .status(400)
          .json({ success: false, error: "Name is required." });
      }
      if (name.length > 100) {
        return res.status(400).json({
          success: false,
          error: "Name must be at most 100 characters.",
        });
      }
      // Email validation
      if (!email || typeof email !== "string" || email.length === 0) {
        return res
          .status(400)
          .json({ success: false, error: "Email is required." });
      }
      if (!/^\S+@\S+\.\S+$/.test(email)) {
        return res
          .status(400)
          .json({ success: false, error: "Invalid email address." });
      }
      // Mobile validation
      if (
        !mobilenumber ||
        typeof mobilenumber !== "string" ||
        mobilenumber.length === 0
      ) {
        return res
          .status(400)
          .json({ success: false, error: "Mobile number is required." });
      }
      if (!/^[0-9]{10}$/.test(mobilenumber)) {
        return res.status(400).json({
          success: false,
          error: "Mobile number must be exactly 10 digits.",
        });
      }
      // Other required fields
      if (!deptid) {
        return res
          .status(400)
          .json({ success: false, error: "Department ID is required." });
      }
      if (!designation) {
        return res
          .status(400)
          .json({ success: false, error: "Designation is required." });
      }
      if (!experience) {
        return res
          .status(400)
          .json({ success: false, error: "Experience is required." });
      }
      if (!qualification) {
        return res
          .status(400)
          .json({ success: false, error: "Qualification is required." });
      }
      if (!jobdesc) {
        return res
          .status(400)
          .json({ success: false, error: "Job description is required." });
      }

      // const PdfRelativePath = `resume/${path.basename(file.filepath)}`;
      const PdfPathInResumeFolder = `${path.basename(file.filepath)}`;

      const ApplyData = new Apply({
        deptid,
        designation,
        experience,
        qualification,
        jobdesc,
        name,
        email,
        mobilenumber,
        // resume: PdfRelativePath,
        resume: PdfPathInResumeFolder,
      });

      await ApplyData.save();

      return res.status(201).json({
        success: true,
        message: "Applied SuccessFully created successfully",
        data: ApplyData,
      });
    } catch (err) {
      console.error("Upload logic error:", err);
      return res.status(500).json({ success: false, error: "Server error" });
    }
  });
}
