// file_path: "@/"models/pages.js"

import mongoose from "mongoose";

const pagesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  content: {
    type: Object,
    required: true,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Pages || mongoose.model("Pages", pagesSchema);
