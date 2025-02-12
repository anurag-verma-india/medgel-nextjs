/*

Category 1

Category 2

------

List 1

List 2

----

Product 1 

Product 2


*/

import mongoose from "mongoose";

const singleProduct = new mongoose.Schema({
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
// const productList = new mongoose.Schema({
//   productListName: String,
//   products: [singleProduct],
// });
const categoryList = new mongoose.Schema({
  categoryName: String,
  productList: [[singleProduct]],
});

const CategoryList =
  mongoose.models.categoryList || mongoose.model("categoryList", categoryList);

export default CategoryList;
