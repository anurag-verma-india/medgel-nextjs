// EmailPopup.tsx

"use client";

import { useEmailPopup } from "@/contexts/EmailPopupContext";
import {  useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { Modal, Input, Button, Alert, Typography, Spin } from "antd";

const { Title, Text } = Typography;

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
    <Modal
      open={emailPopupState.popupOpen}
      onCancel={() =>
        setEmailPopupState({ ...emailPopupState, popupOpen: false })
      }
      footer={null}
      centered
      width={420}
      maskClosable={false}
      destroyOnClose
    >
      <div className="flex flex-col items-center justify-center">
        <Title level={4} className="mb-1 w-full text-center">
          {emailPopupState.message}
        </Title>
        <Text type="secondary" className="mb-4 w-full text-center">
          {emailPopupState.submessage}
        </Text>
        {/* Only show email input if email not sent or can resend */}
        {(!emailPopupState.emailSent || emailPopupState.canResend) && (
          <div className="mb-4 w-full">
            <label htmlFor="email" className="mb-1 block text-lg">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="user@example.com"
              value={emailPopupState.email}
              onChange={(e) =>
                setEmailPopupState({
                  ...emailPopupState,
                  email: e.target.value,
                })
              }
              disabled={emailPopupState.loading}
              size="large"
            />
          </div>
        )}
        {/* Timer - show only when waiting for resend cooldown */}
        {emailPopupState.emailSent &&
          emailPopupState.allowVerificationAfter > 0 &&
          !emailPopupState.canResend && <VerificationTimer />}
        {/* Error */}
        {emailPopupState.errorMessage && (
          <Alert
            className="mb-4 w-full"
            message={emailPopupState.errorMessage}
            type="error"
            showIcon
          />
        )}
        {/* Action Buttons */}
        <div className="mt-2 flex w-full gap-2">
          {/* Submit/Resend Button */}
          {emailPopupState.loading ? (
            <Button className="flex-1" type="primary" disabled block>
              <Spin size="small" /> Sending email...
            </Button>
          ) : emailPopupState.emailSent && !emailPopupState.canResend ? (
            <Button className="flex-1" type="primary" disabled block>
              Email Sent
            </Button>
          ) : emailPopupState.canResend ? (
            <Button
              className="flex-1"
              type="primary"
              onClick={handleResendEmail}
              block
            >
              Resend Email
            </Button>
          ) : (
            <Button
              className="flex-1"
              type="primary"
              onClick={sendVerificationEmail}
              block
            >
              Submit
            </Button>
          )}
          {/* Cancel Button */}
          <Button
            className="flex-1"
            danger
            onClick={() => {
              if (!emailPopupState.loading) {
                setEmailPopupState({ ...emailPopupState, popupOpen: false });
              }
            }}
            disabled={emailPopupState.loading}
            block
          >
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default EmailPopup;
