import User from "@/models/user";
import dbConnect from "@/lib/dbConnect";
import { cookies } from "next/headers";
import verifyJwtToken from "@/helpers/jwtHelper";
import { TokenData } from "@/types";
import { NextResponse } from "next/server";

export async function checkAdminFromId(id: string) {
  try {
    await dbConnect();
    const user = await User.findById(id);
    return user?.isAdmin || false;
  } catch (error) {
    console.error("Error while checking admin status from database", error);
    return false;
  }
}

export async function GET() {
  try {
    const cookieStore = await cookies(); // ✅ Fix applied
    const token = cookieStore.get("token");
    let userIsAdmin = false;

    if (token) {
      const verifiedTokenData: TokenData = verifyJwtToken(token.value);
      if (verifiedTokenData?.id) {
        userIsAdmin = await checkAdminFromId(verifiedTokenData.id);
      }
    }

    return NextResponse.json({ isAdmin: userIsAdmin });
  } catch (error) {
    console.error("Error occurred while checking admin status from cookies:", error);
    return NextResponse.json({ isAdmin: false });
  }
}
