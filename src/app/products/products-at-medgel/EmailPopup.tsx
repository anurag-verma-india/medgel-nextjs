// EmailPopup.tsx

"use client";

import EmailPopupContext, { useEmailPopup } from "@/contexts/EmailPopupContext";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";

const VerificationTimer = () => {
  // const { popupState: emailPopupState, setPopupState: setEmailPopupState } = useContext(EmailPopupContext);
  const { emailPopupState, setEmailPopupState } = useEmailPopup();
  const target = emailPopupState && emailPopupState.allowVerificationAfter;
  //   const target = 1745058568385;
  console.log("target: ", target);
  const [timeRemaining, setTimeRemaining] = useState(0);
  useEffect(() => {
    console.log("Email Popup state: (email Popup): ");
    console.log(emailPopupState);
  }, []);

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date().getTime();
      return Math.max(0, Math.floor((target - now) / 1000));
    };

    // Calculate initial time remaining
    setTimeRemaining(calculateTimeRemaining());

    // Update every second
    const interval = setInterval(() => {
      const remaining = calculateTimeRemaining();
      setTimeRemaining(remaining);

      if (remaining <= 0) {
        clearInterval(interval);
        setEmailPopupState({ ...emailPopupState, canResend: true });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timeRemaining]);

  return (
    <div className="text-center">
      <p className="pb-4 text-lg">
        {timeRemaining > 0
          ? `You can request another verification email in ${timeRemaining} seconds`
          : "Loading..."}
      </p>
    </div>
  );
};

const EmailPopup = () => {
  // const { popupState: emailPopupState, setPopupState: setEmailPopupState } = useContext(EmailPopupContext);
  const { emailPopupState, setEmailPopupState } = useEmailPopup();
  const cookies = new Cookies();

  // if email is in cookies set it in state too
  // useEffect(() => {
  //   setPopupState({ ...popupState, email: cookies.get("email") });
  //   console.log("Email from cookies: ", cookies.get("email"));
  // }, []);

  const sendVerificationEmail = async () => {
    setEmailPopupState({ ...emailPopupState, loading: true, errorMessage: "" });
    const emailRegex = /[a-zA-Z0-9_\.\+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-\.]+/;
    const email = emailPopupState.email;

    if (!emailRegex.test(email)) {
      setEmailPopupState({
        ...emailPopupState,
        errorMessage: "Invalid email address",
        loading: false,
      });
      return;
    }

    try {
      const response = await axios.post("/api/users/signup", {
        email: email,
      });

      const allowVerificationAfter = cookies.get("allowVerificationAfter");

      console.log(
        "Allow verification after from cookies: ",
        allowVerificationAfter,
      );
      console.log(`Current time ${Date.now()}`);

      if (response.data.success) {
        setEmailPopupState({
          ...emailPopupState,
          emailSent: true,
          loading: false,
          allowVerificationAfter: allowVerificationAfter,
          canResend: false,
          message:
            "Verification email sent! (Please check your inbox and spam folder)",
          submessage: "refresh this page after verification",
          errorMessage: "",
        });
        console.log("State after sending email:", emailPopupState);
      } else {
        console.log("Error occurred when creating a new user: \n", response);
        setEmailPopupState({
          ...emailPopupState,
          errorMessage: "Error occurred while sending email to this address",
          loading: false,
        });
      }
    } catch (err) {
      console.log("Signup error\n", err);
      setEmailPopupState({
        ...emailPopupState,
        errorMessage: "Failed to send verification email. Please try again.",
        loading: false,
      });
    }
  };

  const handleResendEmail = () => {
    setEmailPopupState({
      ...emailPopupState,
      emailSent: false,
      canResend: false,
      message: "Please verify your email to view products.",
      submessage:
        "If verification already requested please check your email inbox & spam folder",
    });
    sendVerificationEmail();
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
              onClick={() =>
                setEmailPopupState({ ...emailPopupState, popupOpen: false })
              }
              className="cursor-pointer border-none bg-transparent text-2xl"
              aria-label="Close"
            >
              ×
            </button>
          </div>

          {/* Message */}
          <div className="">
            <p className="flex w-full items-center justify-center text-center text-xl">
              {emailPopupState.message}
            </p>
            <p className="flex w-full items-center justify-center text-center text-base text-stone-500">
              {emailPopupState.submessage}
            </p>
            <br />

            {/* Only show email input if email not sent or can resend */}
            {(!emailPopupState.emailSent || emailPopupState.canResend) && (
              <>
                <label className="text-3xl" htmlFor="email">
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  className="mb-5 mt-3 w-full resize-none rounded-lg border border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="user@example.com"
                  value={emailPopupState.email}
                  onChange={(e) => {
                    setEmailPopupState({
                      ...emailPopupState,
                      email: e.target.value,
                    });
                  }}
                  disabled={emailPopupState.loading}
                />
              </>
            )}
          </div>

          {/* Timer - show only when waiting for resend cooldown */}
          {emailPopupState.emailSent &&
            emailPopupState.allowVerificationAfter > 0 &&
            !emailPopupState.canResend && <VerificationTimer />}

          {/* Error */}
          {emailPopupState.errorMessage && (
            <div className="pb-4 text-center text-red-600">
              {emailPopupState.errorMessage}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex w-full flex-row">
            {/* Submit/Resend Button */}
            <div className="flex flex-auto justify-center">
              {emailPopupState.loading ? (
                <button className="w-1/2 min-w-min cursor-not-allowed rounded-lg bg-green-100 py-2">
                  Sending email...
                </button>
              ) : emailPopupState.emailSent && !emailPopupState.canResend ? (
                <button
                  className="w-1/2 min-w-min cursor-not-allowed rounded-lg bg-green-100 py-2"
                  disabled
                >
                  Email Sent
                </button>
              ) : emailPopupState.canResend ? (
                <button
                  className="w-1/2 min-w-min rounded-lg bg-green-300 py-2 hover:bg-green-400"
                  onClick={handleResendEmail}
                >
                  Resend Email
                </button>
              ) : (
                <button
                  className="w-1/2 min-w-min rounded-lg bg-green-300 py-2 hover:bg-green-400"
                  onClick={sendVerificationEmail}
                >
                  Submit
                </button>
              )}
            </div>

            {/* Cancel Button */}
            <div className="flex flex-auto justify-center">
              <button
                className={`w-1/2 min-w-min rounded-lg py-2 ${
                  emailPopupState.loading
                    ? "cursor-not-allowed bg-red-300"
                    : "bg-red-500 text-white hover:bg-red-600"
                }`}
                onClick={() => {
                  if (!emailPopupState.loading) {
                    setEmailPopupState({
                      ...emailPopupState,
                      popupOpen: false,
                    });
                  }
                }}
                disabled={emailPopupState.loading}
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

export default EmailPopup;
