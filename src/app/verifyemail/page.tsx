"use client";

// import React from "react";
import { useSearchParams } from "next/navigation";

const VerifyEmail = () => {
    const params = useSearchParams();

    const token = params.get("token");
    console.log("Token Parameter:", token);
    return <div>VerifyEmail</div>;
};

export default VerifyEmail;
