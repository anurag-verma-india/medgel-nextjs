import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest) => {
    try {
        const token = request.cookies.get("token")?.value || "";
        if (token === "") {
            console.log("No token provided in the request");
        }
        console.log("token: ", token);
        if (!process.env.TOKEN_SECRET) {
            console.log("No secret token in environment variables");
            process.exit(1);
        }
        const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);
        console.log("Decoded token", decodedToken);
        return decodedToken.id;
    } catch (error: any) {
        throw new Error(error.message);
    }
};
