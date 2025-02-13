/*

Category 1

Category 2

------
Category 1 ->
List 1

List 2

----
List 1 ->
Product 1 

Product 2


*/

import mongoose from "mongoose";

const product = new mongoose.Schema({
  innovator: String,
  product: String,
  code: String,
  composition: String,
  color: String,
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});
// const categoryList = new mongoose.Schema({
//   categoryName: String,
//   productList: [[singleProduct]],
// });

// const CategoryList =
//   mongoose.models.categoryList || mongoose.model("categoryList", categoryList);

// export default CategoryList;

const Product = mongoose.models.product || mongoose.model("product", product);

export default Product;
