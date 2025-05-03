"use client";

import axios from "axios";
// import { redirect, RedirectType } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Suspense } from "react";

const VerifyEmail = () => {
  const params = useSearchParams();
  const [isVerified, setIsVerified] = useState(false);
  const [tokenValid, setTokenValid] = useState(true);

  const token = params.get("token");
  console.log("Token Parameter:", token);

  const verifyOnClick = async () => {
    console.log("\nInside verifyOnClick\n");
    try {
      console.log("Making axios post call with token: ", token);
      const response = await axios.post(`/api/users/verifyemail`, {
        token,
      });
      // .then(() => {
      //   setIsVerified(true);
      //   // redirect("/");
      // })
      // .catch(() => {
      //   setTokenValid(false);
      // });
      console.log("response from verify: ", response);
      if (response.data.success) {
        setIsVerified(true);
        // redirect(`/pages/products/products-at-medgel`, RedirectType.push);
        // redirect("/"); (Giving error)
      }
    } catch (error) {
      setTokenValid(false);
      console.log("Verification error\n", error);
    }
  };

  return (
    <>
      <div className="m-10 flex h-20 justify-center">
        {!tokenValid && (
          <div className="flex text-center">
            An error occurred.
            <br />
            Please try clicking the link from the email again.
            <br />
            or generate a new verification link.
          </div>
        )}
        {tokenValid && (
          <>
            {!isVerified && (
              <button
                className="rounded-xl bg-green-500 p-3 text-3xl"
                onClick={() => {
                  verifyOnClick();
                }}
              >
                Click here to verify your email
              </button>
            )}
            {isVerified && <div>User verified successfully</div>}
          </>
        )}
      </div>
    </>
  );
};

const VerifyEmailContainer = () => {
  // https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout
  /*
    Added suspense to fix build error (will not opt out of c)

    Error occurred prerendering page "/verifyemail". Read more: https://nextjs.org/docs/messages/prerender-error

    useSearchParams() should be wrapped in a suspense boundary at page "/verifyemail". Read more: https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout
  */
  return (
    <>
      <Suspense>
      <VerifyEmail />
      </Suspense>
    </>
  );
};
export default VerifyEmailContainer;

// export default VerifyEmail;
