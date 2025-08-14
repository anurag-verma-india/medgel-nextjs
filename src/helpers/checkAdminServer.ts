import { NextResponse } from "next/server";
import { checkAdminFromCookie } from "./checkAdmin";

async function checkAdminRequestIntercept(): Promise<NextResponse | null> {
  let isAdmin = false;
  try {
    isAdmin = await checkAdminFromCookie();
  } catch (error) {
    console.log("Error while checking authorization level");
    console.log(error);
  }

  if (!isAdmin) {
    return NextResponse.json(
      {
        success: false,
        error: "Unauthorized",
      },
      {
        status: 401,
      },
    );
  }
  // console.log("Admin is authorized");
  return null;
}

export default checkAdminRequestIntercept;
