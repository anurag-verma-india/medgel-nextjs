import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/user";
// import EditModalContainer from "../_common_component/EditModalContainer";

const CheckLogin = async () => {
    let user;
    let userIsVerified: boolean = false;
    let userIsAdmin: boolean = false;
    // let decoded;
    const cookieStore = await cookies();
    const token = cookieStore.get("token");
    console.log("Cookie token: \n", cookieStore.get("token"));
    try {
        await dbConnect();
        // const a =
        // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3OTc5NWFjODk5ODg2OTUwODk0ZmJjMiIsImlhdCI6MTczNzk4NzUyMiwiZXhwIjoxNzM4MDczOTIyfQ.GMgnxKWK5rzDY0pJXgKvUuqfhEgopwMahGfQE2rg8JU";
        const decoded = jwt.verify(token!.value, process.env.TOKEN_SECRET!);
        // const decoded = jwt.verify(a, process.env.TOKEN_SECRET!);

        console.log("decoded: ", decoded);
        const currentTimestamp = Math.floor(Date.now() / 1000);
        console.log("current timestamp", currentTimestamp);

        if (decoded.exp > currentTimestamp) {
            // userIsVerified = false;
            console.log("Token is valid");
            // const user = await User.findById(decoded.id);
            user = await User.findById(decoded.id);
            if (user.verificationExpiry > Date.now()) userIsVerified = true;
            else console.log("Expired");
            if (user.isAdmin) userIsAdmin = true;

            // const user = await User.findOne({
            //     _id: decoded.id,
            // });
            console.log("User from token: ", user);
        } else console.log("Expired user token");
    } catch (err) {
        console.log("Check login error:", err);
    }
    return (
        <>
            {/* <div className="w-fit">{token && token.value}</div> */}
            <br />
            {/* <div className="">{decoded && decoded.id}</div> */}

            {userIsVerified && <div>User is verified</div>}
            {userIsAdmin && <div>User is admin</div>}
            {!userIsAdmin && <div>User is not  admin</div>}

            <div>{user.email}</div>
        </>
    );
};

export default CheckLogin;
