// src/models/productList.ts

import mongoose from "mongoose";

const product_list = new mongoose.Schema({
  product_list_name: {
    type: String,
    required: [true, "Please provide a product list name"],
    unique: true,
  },
  product_ids: [String],
});

const ProductList =
  mongoose.models.product_list || mongoose.model("product_list", product_list);

export default ProductList;
