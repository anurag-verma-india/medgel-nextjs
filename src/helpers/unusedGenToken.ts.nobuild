// import bcryptjs from "bcryptjs";
// import jwt from "jsonwebtoken";
const jsonwebtoken = require("jsonwebtoken");
const jwt = jsonwebtoken.jwt;

// const hashedToken = await bcryptjs.hash("abcd", 10);
const jwtToken = jwt.sign(
  "abcd",
  "fc602bacc72a9ff6b94e0313bd088cdc3555bc69cd2fd6295e2dc809e76b3324",
  {
    expiresIn: "1d",
  },
);

// console.log(hashedToken);
console.log(jwtToken);
