"use client";

import { useEffect, useState } from "react";
import axios from "axios";
// import { cookies } from "next/headers";
import Cookies from "universal-cookie";
import { redirect } from "next/navigation";

interface VerifyModalOpenParams {
  openCloseFn: () => void;
}

interface SendEmailInputsParams {
  openCloseFn: () => void;
  setErrorMessage: (str: string) => void;
  setEmailSent: (b: boolean) => void;
}

// Test send email to valid email address and invalid email address
const VerifyEmailModal = ({ openCloseFn }: VerifyModalOpenParams) => {
  // const cookieStore = await cookies();
  // const tokenObj = cookieStore.get("token");
  // const token = tokenObj ? tokenObj.value : "";
  // const email = cookies.get("email");
  // console.log("Email in cookies:", email);

  const [errorMessage, setErrorMessage] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 z-10 bg-black bg-opacity-50" />
      {/* Modal */}
      <div className="fixed inset-0 z-20 flex h-5/6 flex-col items-center justify-center pt-20">
        <div className="scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 mx-auto flex w-5/6 flex-col overflow-y-auto rounded-xl bg-white p-6 shadow-lg sm:w-1/2">
          {/* Close Button (×) */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={openCloseFn}
              // onClick={() => setModalOpen(false)}
              className="cursor-pointer border-none bg-transparent text-2xl"
              aria-label="Close"
            >
              ×
            </button>
          </div>
          {/* Inputs */}

          {!emailSent && (
            <SendEmailInputs
              setErrorMessage={setErrorMessage}
              setEmailSent={setEmailSent}
              openCloseFn={openCloseFn}
            />
          )}
          {/* Error */}
          {errorMessage && (
            <>
              <div className="pb-4 text-red-600">{errorMessage}</div>
            </>
          )}

          {emailSent && (
            <>
              <p className="pb-6 text-xl">
                A please check your email inbox and possibly spam folder for
                verification email
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
};

const SendEmailInputs = ({
  setErrorMessage,
  setEmailSent,
  openCloseFn,
}: SendEmailInputsParams) => {
  const cookies = new Cookies();
  const [email, setEmail] = useState(cookies.get("email"));
  const [emailMessage, setEmailMessage] = useState("");
  useEffect(() => {
    if (email) {
      setEmailMessage(
        "Email verification expired, please reverify to continue",
      );
    } else {
      setEmailMessage("Please verify your email to view products");
    }
  }, []);

  // const [email, setEmail] = useState(email);

  const [loading, setLoading] = useState(false);
  const onSubmit = async () => {
    // console.log("email: ", email);
    setLoading(true);
    const emailRegex = /[a-zA-Z0-9_\.\+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-\.]+/;
    if (emailRegex.test(email)) {
      setErrorMessage("");
      try {
        await axios
          .post("/api/users/signup", {
            email: email,
          })
          .then(function (response) {
            if (response.data.success) {
              setEmailSent(true);
            } else {
              console.log(
                "Error occurred when creating a new user: \n",
                response,
              );
              setErrorMessage(
                "Error occurred while sending email to this address",
              );
            }
          });
        //   .catch(function (err) {});
      } catch (err) {
        console.log("Signup error\n", err);
      }
    } else {
      setErrorMessage("Invalid email address");
    }
    setLoading(false);
  };

  return (
    <>
      <div className="mb-6">
        <p className="flex w-full items-center justify-center text-xl">
          {emailMessage}
        </p>
        <br />
        <label htmlFor="email">Email</label>
        <input
          type="text"
          className="mt-3 w-full resize-none rounded-lg border border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="user@example.com"
          value={email ? email : ""}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>
      <div className="flex w-full flex-row">
        {!loading && (
          <>
            <div className="flex flex-auto justify-center">
              <button
                className="w-1/2 min-w-min rounded-lg bg-green-300 py-2"
                onClick={onSubmit}
              >
                Submit
              </button>
            </div>
            <div className="flex flex-auto justify-center">
              <button
                className="w-1/2 min-w-min rounded-lg bg-red-500 py-2"
                onClick={() => {
                  openCloseFn();
                }}
              >
                Cancel
              </button>
            </div>
          </>
        )}
        {loading && (
          <>
            <div className="flex flex-auto justify-center">
              <button className="w-1/2 min-w-min rounded-lg bg-green-100 py-2">
                Sending email
              </button>
            </div>
            <div className="flex flex-auto justify-center">
              <button className="w-1/2 min-w-min rounded-lg bg-red-300 py-2">
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default VerifyEmailModal;
