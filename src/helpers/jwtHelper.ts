import jwt from "jsonwebtoken";

export default function verifyJwtToken(token: string) {
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET!);
        if (Date.now() / 1000 > decoded.exp) {
        }
        // console.log(decoded);
        return decoded;
    } catch (error) {
        console.log(
            "JSON web token error occurred token passed may not be valid, see details below"
        );
        console.log(error);
    }
}
