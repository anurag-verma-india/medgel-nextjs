// EmailPopup.tsx

"use client";

import PopupContext from "@/contexts/PopupContext";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";

const VerificationTimer = () => {
  const { popupState, setPopupState } = useContext(PopupContext);
  const target = popupState && popupState.allowVerificationAfter;
  //   const target = 1745058568385;
  console.log("target: ", target);
  const [timeRemaining, setTimeRemaining] = useState(0);

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
        setPopupState({ ...popupState, canResend: true });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timeRemaining]);

  return (
    <div className="text-center">
      <p className="pb-4 text-lg">
        {timeRemaining > 0
          ? `You can request another verification email in ${timeRemaining} seconds`
          : "You can now request another verification email"}
      </p>
    </div>
  );
};

const EmailPopup = () => {
  const { popupState, setPopupState } = useContext(PopupContext);
  const cookies = new Cookies();

  // if email is in cookies set it in state too
  useEffect(() => {
    setPopupState({ ...popupState, email: cookies.get("email") });
  }, []);

  const sendVerificationEmail = async () => {
    setPopupState({ ...popupState, loading: true, errorMessage: "" });
    const emailRegex = /[a-zA-Z0-9_\.\+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-\.]+/;
    const email = popupState.email;

    if (!emailRegex.test(email)) {
      setPopupState({
        ...popupState,
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
        setPopupState({
          ...popupState,
          emailSent: true,
          loading: false,
          allowVerificationAfter: allowVerificationAfter,
          canResend: false,
          message:
            "Verification email sent! Please check your inbox (refresh this page afterwards)",
          errorMessage: "",
        });
        console.log("State after sending email:", popupState);
      } else {
        console.log("Error occurred when creating a new user: \n", response);
        setPopupState({
          ...popupState,
          errorMessage: "Error occurred while sending email to this address",
          loading: false,
        });
      }
    } catch (err) {
      console.log("Signup error\n", err);
      setPopupState({
        ...popupState,
        errorMessage: "Failed to send verification email. Please try again.",
        loading: false,
      });
    }
  };

  const handleResendEmail = () => {
    setPopupState({
      ...popupState,
      emailSent: false,
      canResend: false,
      message: "Please verify your email to view products.",
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
              onClick={() => setPopupState({ ...popupState, popupOpen: false })}
              className="cursor-pointer border-none bg-transparent text-2xl"
              aria-label="Close"
            >
              ×
            </button>
          </div>

          {/* Message */}
          <div className="">
            <p className="flex w-full items-center justify-center text-center text-xl">
              {popupState.message}
            </p>
            <br />

            {/* Only show email input if email not sent or can resend */}
            {(!popupState.emailSent || popupState.canResend) && (
              <>
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  id="email"
                  className="mb-5 mt-3 w-full resize-none rounded-lg border border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="user@example.com"
                  value={popupState.email}
                  onChange={(e) => {
                    setPopupState({ ...popupState, email: e.target.value });
                  }}
                  disabled={popupState.loading}
                />
              </>
            )}
          </div>

          {/* Timer - show only when waiting for resend cooldown */}
          {popupState.emailSent &&
            popupState.allowVerificationAfter > 0 &&
            !popupState.canResend && <VerificationTimer />}

          {/* Error */}
          {popupState.errorMessage && (
            <div className="pb-4 text-center text-red-600">
              {popupState.errorMessage}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex w-full flex-row">
            {/* Submit/Resend Button */}
            <div className="flex flex-auto justify-center">
              {popupState.loading ? (
                <button className="w-1/2 min-w-min cursor-not-allowed rounded-lg bg-green-100 py-2">
                  Sending email...
                </button>
              ) : popupState.emailSent && !popupState.canResend ? (
                <button
                  className="w-1/2 min-w-min cursor-not-allowed rounded-lg bg-green-100 py-2"
                  disabled
                >
                  Email Sent
                </button>
              ) : popupState.canResend ? (
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
                  popupState.loading
                    ? "cursor-not-allowed bg-red-300"
                    : "bg-red-500 text-white hover:bg-red-600"
                }`}
                onClick={() => {
                  if (!popupState.loading) {
                    setPopupState({ ...popupState, popupOpen: false });
                  }
                }}
                disabled={popupState.loading}
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
