import mongoose from "mongoose";

const product_category = new mongoose.Schema({
  product_category_name: {
    type: String,
    required: [true, "Please provide a category name"],
    unique: true,
  },
  productLists: [String],
});

const ProductCategory =
  mongoose.models.product_category ||
  mongoose.model("product_category", product_category);

export default ProductCategory;
