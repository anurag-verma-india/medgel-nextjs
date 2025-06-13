import fs from "fs";
import path from "path";
import { IncomingForm, File as FormidableFile, Fields } from "formidable";
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import Anual from "@/models/anual";

// Disable Next.js default body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

interface CustomFormidableFiles {
  anual_Report?: FormidableFile | FormidableFile[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  await dbConnect();

  const uploadDir = path.join(process.cwd(), "public", "anual_Report");

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const form = new IncomingForm({
    uploadDir,
    keepExtensions: true,
    multiples: false,
    filename: (_name, _ext, part) =>
      `${Date.now()}-${part.originalFilename?.replace(/\s+/g,"") || "file"}`,
  });

  form.parse(req, async (err, fields: Fields, files: CustomFormidableFiles) => {
    if (err) {
      console.error("Form error:", err);
      return res.status(500).json({ error: "Form parsing error" });
    }

    try {
      if(fields.title === undefined || fields.title.length === 0) {
        return res.status(400).json({ error: "Title is required" });
      }
      const title = fields.title[0] as string;
      console.log("Title received:" ,title);
      const rawFile = files.anual_Report;

if (!rawFile) {
  return res.status(400).json({ error: "pdf file missing" });
}

const file = Array.isArray(rawFile) ? rawFile[0] : rawFile;

if (!file.filepath) {
  return res.status(400).json({ error: "File path is missing" });
}
      console.log("File received:", file);

      if (!file || !file.filepath) {
        return res.status(400).json({ error: "pdf file is missing" });
      }

      const imageRelativePath = `anual_Report/${path.basename(file.filepath)}`;

      const newAnualReport = new Anual({
        title,
        anual_Report: imageRelativePath,
      });

      await newAnualReport.save();

      return res.status(201).json({
        message: "Anual Report created successfully",
        report: newAnualReport,
      });
    } catch (err) {
      console.error("Upload logic error:", err);
      return res.status(500).json({ error: "Server error" });
    }
  });
}
