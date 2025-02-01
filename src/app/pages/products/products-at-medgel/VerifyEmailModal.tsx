// Remake this modal after defining the structure more clearly

// import React from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

interface VerifyModalOpenParams {
  openCloseFn: () => void;
}

// Test send email to valid email address and invalid email address
const VerifyEmailModal = ({ openCloseFn }: VerifyModalOpenParams) => {
  const [email, setEmail] = useState("");
  const [invalidEmailError, setInvalidEmailError] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const onSubmit = async () => {
    // console.log("email: ", email);
    const emailRegex = /[a-zA-Z0-9_\.\+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-\.]+/;
    if (emailRegex.test(email)) {
      setInvalidEmailError("");
      try {
        await axios
          .post("/api/users/signup", {
            email: email,
          })
          .then(function (response) {
            // console.log("Signup response", response);
            if (response.data.success) {
              toast.success("Email sent successfully", {
                position: "top-center",
              });
              setEmailSent(true);
            } else {
              toast.error("Some error occured", {
                position: "top-center",
              });
              console.log("Error occurred: ", response);
            }
          });
        //   .catch(function (err) {});
      } catch (err: any) {
        toast.error(`Sending email failed with this message \n${err.message}`, {
          position: "top-center",
        });
        console.log("Signup error", err);
      }
      console.log("Valid email address");
    } else {
      setInvalidEmailError("Invalid email address");
    }
  };
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
            <div className="mb-6">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                className="mt-3 w-full resize-none rounded-lg border border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="user@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
          )}
          {emailSent && (
            <p className="pb-6 text-xl">
              A please check your email inbox and possibly spam folder for
              verification
            </p>
          )}
          {/* Error */}
          {invalidEmailError && (
            <div className="pb-4 text-red-600">{invalidEmailError}</div>
          )}
          {/* Bottom Buttons */}
          <div className="flex w-full flex-row">
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
          </div>
        </div>
      </div>
    </>
  );
};

export default VerifyEmailModal;
