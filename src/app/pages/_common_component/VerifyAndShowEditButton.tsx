import React from "react";
import EditModalContainer from "@/app/pages/_common_component/EditModalContainer";
import { cookies } from "next/headers";
import fetchPage from "@/helpers/getPage";
import verifyJwtToken from "@/helpers/jwtHelper";
import checkIfUserIsAdmin from "@/helpers/checkAdminFromId";

type VerifyParams = {
    title: string;
};

const VerifyAndShowEditButton = async ({ title }: VerifyParams) => {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token");
        let userIsAdmin: boolean = false;
        if (token) {
            const verifiedTokenData = verifyJwtToken(token.value);
            if (verifiedTokenData) {
                userIsAdmin =
                    (await checkIfUserIsAdmin(verifiedTokenData.id)) || false;
            }
        }
        let page;
        if (userIsAdmin) page = await fetchPage(title);

        return (
            <>
                {userIsAdmin && page && (
                    <EditModalContainer title={title} page={page} />
                )}
                {/* {!userIsAdmin && <div>User is not admin</div>} */}
            </>
        );
    } catch (error) {
        console.log("Error occured: ", error);
    }
};

export default VerifyAndShowEditButton;
