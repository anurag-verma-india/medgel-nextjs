import jwt from "jsonwebtoken";
// import { TokenData } from "@/types";
import { decodedToken } from "@/types";

export default function verifyJwtToken(token: string) {
  let decoded: decodedToken = { iat: 0, exp: 0, id: "" };
  try {
    const decodedTemp = jwt.verify(token, process.env.TOKEN_SECRET!);
    if (typeof decodedTemp !== "string") {
      // decoded = decodedTemp;
      decoded = {
        id: decodedTemp["id"],
        iat: decodedTemp["iat"] || 0,
        exp: decodedTemp["exp"] || 0,
      };
      // console.log(decoded)
    } else {
      // If decoded token is a string
      decoded = {
        id: decodedTemp,
        iat: 0,
        exp: 0,
      };
    }
  } catch (error) {
    console.log(
      "JSON web token error occurred token passed may not be valid, see details below",
    );
    console.log(error);
  }
  return decoded;
  // TODO: Handle token expired error
  // try {
  //   const decoded = jwt.verify(token, process.env.TOKEN_SECRET!);
  //   console.log("Decoded token", decoded);
  //   return decoded;
  //   // if (Date.now() / 1000 > decoded.exp) {
  //   // if (decoded) return decoded;
  //   // }
  // } catch (error) {
  //   console.log(
  //     "JSON web token error occurred token passed may not be valid, see details below",
  //   );
  //   console.log(error);
  //   return { error: "An error occurred during verification of the token" };
  // }
}
