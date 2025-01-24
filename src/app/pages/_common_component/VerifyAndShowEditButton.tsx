import React from "react";
import EditModalContainer from "@/app/pages/_common_component/EditModalContainer";
import { cookies } from "next/headers";
import fetchPage from "@/helpers/getPage";

const VerifyAndShowEditButton = async ({ title }) => {
    const cookieStore = await cookies();
    const page = await fetchPage(title);
    // console.log("Cookie token: ", cookieStore.get("token"));
    const isVerified = true;
    // const isVerified = false;
    return (
        <>{isVerified && <EditModalContainer title={title} page={page} />}</>
    );
};

export default VerifyAndShowEditButton;
