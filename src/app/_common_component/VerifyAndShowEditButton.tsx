// file_path: "@/src/app/_common_component/VerifyAndShowEditButton.tsx"

import React, { ReactElement } from "react";
// import EditModalContainer from "@/app/_common_component/EditModalContainer";
import { cookies } from "next/headers";
// import fetchPage from "@/helpers/getPage";
import verifyJwtToken from "@/helpers/jwtHelper";
import checkIfUserIsAdmin from "@/helpers/checkAdminFromId";
import { TokenData } from "@/types";

type VerifyComponentParams = {
  // title: string;
  children: ReactElement;
};

const VerifyAndShowEditButton = async ({
  // title,
  children,
}: VerifyComponentParams) => {
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
        {userIsAdmin && { children }}
        {/* {userIsAdmin && <EditModalContainer title={title} />} */}
        {/* {userIsAdmin && <EditModalContainer title={title} />} */}
        {/* {userIsAdmin && page && (
          <EditModalContainer title={title} page={page} />
        )} */}
        {/* {!userIsAdmin && <div>User is not admin</div>} */}
      </>
    );
  } catch (error) {
    console.log("Error occured: ", error);
  }
};

export default VerifyAndShowEditButton;
