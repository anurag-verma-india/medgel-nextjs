import User from "@/models/user";
import dbConnect from "@/lib/dbConnect";
export default async function checkIfUserIsAdmin(id: string) {
    try {
        dbConnect();
        const user = await User.findById(id);
        if (user && user.isAdmin) {
            return true;
        }
        return false;
        // if (user.isAdmin) userIsAdmin = true;
    } catch (error: any) {
        console.log("Checking if user is admin error");
        console.log(error);
    }
}
