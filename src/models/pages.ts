// file_path: "@/"models/pages.js"

import mongoose from "mongoose";

const ImageObj = new mongoose.Schema({
  url: {
    type: String,
    unique: true,
    required: [true, "Image URL is required"],
    // Not using full urls just the image name
    // validate: {
    //   validator: function (url) {
    //     // Regular expression for URL validation
    //     return /^(ftp|http|https):\/\/[a-z0-9-]+(\.[a-z0-9-]+)+(\/[^\s]*)?$/i.test(
    //       url,
    //     );
    //   },
    //   message: "Invalid URL format",
    // },
  },
  width: Number, // In Pixels
  height: Number, // In Pixels
  aspectratio: Number,
  size: Number, // In KB
});

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
  images: [ImageObj],
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Pages || mongoose.model("Pages", pagesSchema);
