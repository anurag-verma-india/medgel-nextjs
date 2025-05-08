// src/helpers/checkAdmin.ts
import User from "@/models/user";
import dbConnect from "@/lib/dbConnect";

// import React, { ReactElement } from "react";
// import EditModalContainer from "@/app/_common_component/EditModalContainer";
import { cookies } from "next/headers";
// import fetchPage from "@/helpers/getPage";
import verifyJwtToken from "@/helpers/jwtHelper";
import { TokenData } from "@/types";

export async function checkAdminFromId(id: string) {
  try {
    dbConnect();
    const user = await User.findById(id);
    if (user && user.isAdmin) {
      return true;
    }
    return false;
    // if (user.isAdmin) userIsAdmin = true;
  } catch (error) {
    console.log("Error while checking admin status from database");
    console.log(error);
  }
}

export async function checkAdminFromCookie(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");
    let userIsAdmin: boolean = false;

    if (token) {
      const verifiedTokenData: TokenData = verifyJwtToken(token.value);
      if (verifiedTokenData) {
        userIsAdmin = (await checkAdminFromId(verifiedTokenData.id)) || false;
      }
    }
    return userIsAdmin;
  } catch (error) {
    console.error(
      "Error occurred while checking admin status from cookies:",
      error,
    );
    return false;
  }
}
