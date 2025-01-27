"use client";

// import React from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
// import { useState } from "react";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";

const VerifyEmail = () => {
    // const [verificationResponse, setVerificationResponse] = useState("empty");
    const params = useSearchParams();

    const token = params.get("token");
    console.log("Token Parameter:", token);

    const verifyOnClick = async () => {
        try {
            const response = await axios.post(`/api/users/verifyemail`, {
                token,
            });
            console.log("Making axios post call with token: ", token);
            console.log("response from verify: ", response);
            if (response.data.success) {
                // setVerificationResponse("ok");
                redirect("/");
            }
        } catch (error: any) {
            console.log("Verifiaction error\n", error);
            // toast.error(
            //     `Verification failed with this message: \n${error.response.data}`,
            //     { position: "top-center" }
            // );
        }
    };

    return (
        <>
            <div>Token: {token}</div>
            {/* <div>Response: {verificationResponse}</div> */}
            <button
                onClick={() => {
                    verifyOnClick();
                }}
            >
                Click here to verify
            </button>
        </>
    );
};

export default VerifyEmail;
