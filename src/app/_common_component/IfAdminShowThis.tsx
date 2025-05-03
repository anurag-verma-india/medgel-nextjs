// file_path: "@/src/app/_common_component/VerifyAndShowEditButton.tsx"

import React, { ReactElement } from "react";
// import EditModalContainer from "@/app/_common_component/EditModalContainer";
import { cookies } from "next/headers";
// import fetchPage from "@/helpers/getPage";
import verifyJwtToken from "@/helpers/jwtHelper";
import checkIfUserIsAdmin from "@/helpers/checkAdminFromId";
import { TokenData } from "@/types";

type IfAdminShowThisParams = {
  // title: string;
  children: ReactElement;
};

const IfAdminShowThis = async ({
  // title,
  children,
}: IfAdminShowThisParams) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");
    let userIsAdmin: boolean = false;

    if (token) {
      const verifiedTokenData: TokenData = verifyJwtToken(token.value);
      if (verifiedTokenData) {
        userIsAdmin = (await checkIfUserIsAdmin(verifiedTokenData.id)) || false;
      }
    }
    // let page;
    // if (userIsAdmin) page = await fetchPage(title);

    return (
      <>
        {userIsAdmin && children}
        {/* {userIsAdmin && <EditModalContainer title={title} />} */}
        {/* {userIsAdmin && <EditModalContainer title={title} />} */}
        {/* {userIsAdmin && page && (
          <EditModalContainer title={title} page={page} />
        )} */}
        {/* {!userIsAdmin && <div>User is not admin</div>} */}
      </>
    );
  } catch (error) {
    console.error("Error occurred: ", error);
    return null; // Return null in case of an error
  }
};

export default IfAdminShowThis;

/**
 * Summary of functions:
 *
 * VerifyAndShowEditButton:
 * - Description: A server-side component that conditionally renders its children only if the current user is an admin.
 * - Input:
 *   - children (ReactElement): The component to render if the user is an admin.
 * - Output:
 *   - ReactElement | null: Returns the children component if user is admin, otherwise returns an empty fragment.
 *   - Returns null in case of an error.
 * - Process:
 *   1. Retrieves the token from cookies
 *   2. Verifies the JWT token
 *   3. Checks if the user is an admin using the user ID from the token
 *   4. Renders the children component only if the user is confirmed as an admin
 */
