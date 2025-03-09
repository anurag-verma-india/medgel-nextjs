// import { cookies } from "next/headers";
import { decodedToken } from "@/types";
import verifyJwtToken from "@/helpers/jwtHelper";
// import jwt from "jsonwebtoken";

export default async function UserInfo() {
  // const cookieStore = await cookies();
  // const tokenObj = cookieStore.get("token");
  // const token = tokenObj ? tokenObj.value : "";
  //   console.log("Cookies: ", cookieStore);

  // Test
  // const tokenData = {
  //   // id: user._id,
  //   id: "89283w89i",
  // };
  // const token = jwt.sign(tokenData, process.env.TOKEN_SECRET || "", {
  //   expiresIn: "1s",
  // });
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg5Mjgzdzg5aSIsImlhdCI6MTc0MTUyMDg1MiwiZXhwIjoxNzQxNTIwODUzfQ.twADziUrtsSklBxZW3zxt0q5UhQhDO9-OlhMYoxZdeE";
  const decoded: decodedToken = verifyJwtToken(token);

  console.log("token: ", token);
  console.log("decoded: ", decoded);
  return (
    <div className="px-20 py-10">
      <h1>Token</h1>
      <div>{token}</div>
      <br />
      <h2>Decrypted token</h2>
      <div>{`{`}</div>
      <div className="pl-10">
        id: {decoded.id},
        <br />
        iat: {decoded.iat},
        <br />
        exp: {decoded.exp}
        <br />
      </div>
      <div>{`}`}</div>
    </div>
  );
}
