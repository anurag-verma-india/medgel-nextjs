"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";

interface VerifyModalOpenParams {
  emailSent: boolean;
  openCloseFn: () => void;
}

interface SendEmailInputsParams {
  openCloseFn: () => void;
  setErrorMessage: (str: string) => void;
  setEmailSent: (b: boolean) => void;
  setAllowVerificationAfter: (d: number) => void;
  emailMessage: string;
  setEmailMessage: (m: string) => void;
  emailSentLocal: boolean;
}

const VerificationTimer = ({
  allowVerificationAfter,
  onTimerComplete,
}: {
  allowVerificationAfter: number;
  onTimerComplete: () => void;
}) => {
  const [timeRemaining, setTimeRemaining] = useState(0);

  useEffect(() => {
    // Calculate initial time remaining
    const calculateTimeRemaining = () => {
      const now = new Date().getTime();
      const target = allowVerificationAfter;
      return Math.max(0, Math.floor((target - now) / 1000));
    };

    setTimeRemaining(calculateTimeRemaining());

    // Update every second
    const interval = setInterval(() => {
      const remaining = calculateTimeRemaining();
      setTimeRemaining(remaining);

      if (remaining <= 0) {
        clearInterval(interval);
        onTimerComplete();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [allowVerificationAfter, onTimerComplete]);

  return (
    <div className="my-4 text-center">
      <p className="text-lg font-medium">
        {timeRemaining > 0
          ? `You can request another verification email in ${timeRemaining} seconds`
          : "You can now request another verification email"}
      </p>
    </div>
  );
};

const VerifyEmailModal = ({
  openCloseFn,
  emailSent,
}: VerifyModalOpenParams) => {
  const cookies = new Cookies();

  const [emailMessage, setEmailMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [emailSentLocal, setEmailSentLocal] = useState(emailSent);
  const [allowVerificationAfter, setAllowVerificationAfter] = useState(
    cookies.get("allowVerificationAfter") || 0,
  );
  const [canResend, setCanResend] = useState(false);
  const [showInputs, setShowInputs] = useState(false);

  useEffect(() => {
    // Check if we can already resend on first load
    console.log(
      "Allow verification after from first load",
      allowVerificationAfter,
    );
    console.log(`(Current time: ${Date.now()})`);
    const now = new Date().getTime();
    if (!allowVerificationAfter || now > allowVerificationAfter) {
      setCanResend(true);
    }
  }, [allowVerificationAfter]);

  const handleTimerComplete = () => {
    setCanResend(true);
  };

  const handleResendClick = () => {
    setShowInputs(true);
  };

  // const handleChangeEmail = () => {
  //   const cookies = new Cookies();
  //   cookies.remove("email");
  //   setShowInputs(true);
  // };

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
              className="cursor-pointer border-none bg-transparent text-2xl"
              aria-label="Close"
            >
              ×
            </button>
          </div>

          {/* Show Email Inputs */}
          {(!emailSentLocal || showInputs) && (
            <SendEmailInputs
              setErrorMessage={setErrorMessage}
              setEmailSent={setEmailSentLocal}
              openCloseFn={openCloseFn}
              setAllowVerificationAfter={setAllowVerificationAfter}
              emailMessage={emailMessage}
              setEmailMessage={setEmailMessage}
              emailSentLocal={emailSentLocal}
            />
          )}

          {/* Error */}
          {errorMessage && (
            <div className="pb-4 pt-4 text-center text-red-600">
              {errorMessage}
            </div>
          )}

          {/* Email Sent State */}
          {emailSentLocal && !showInputs && (
            <>
              <p className="pb-4 text-center text-xl">
                Please check your email inbox and possibly spam folder for
                verification email
              </p>

              {/* <VerificationTimer
                allowVerificationAfter={0}
                onTimerComplete={handleTimerComplete}
              /> */}

              {/* Timer */}
              {!canResend && (
                <VerificationTimer
                  allowVerificationAfter={allowVerificationAfter}
                  onTimerComplete={handleTimerComplete}
                />
              )}

              {/* Resend/Change Email Buttons */}
              {canResend && (
                <div className="mt-4 flex flex-col space-y-3">
                  <button
                    className="w-full rounded-lg bg-blue-500 py-2 text-white hover:bg-blue-600"
                    onClick={handleResendClick}
                  >
                    Resend Verification Email
                  </button>
                  {/* <button
                    className="w-full rounded-lg bg-gray-300 py-2 hover:bg-gray-400"
                    onClick={handleResendClick}
                  >
                    Change Email Address
                  </button> */}
                </div>
              )}
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
  setAllowVerificationAfter,
  emailMessage,
  setEmailMessage,
  emailSentLocal,
}: SendEmailInputsParams) => {
  const cookies = new Cookies();
  const [email, setEmail] = useState(cookies.get("email") || "");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (email && !emailSentLocal) {
      setEmailMessage(
        "Email verification expired, please reverify to continue.",
      );
    } else if (email) {
      setEmailMessage(
        "Please check your email if verification email not received then click submit again.",
      );
    } else {
      setEmailMessage("Please verify your email to view products.");
    }
  }, [email]);

  const onSubmit = async () => {
    setLoading(true);
    const emailRegex = /[a-zA-Z0-9_\.\+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-\.]+/;
    if (emailRegex.test(email)) {
      setErrorMessage("");
      try {
        const response = await axios.post("/api/users/signup", {
          email: email,
        });

        // console.log(
        //   "AllowVerificationAfter: ",
        //   response.data.savedUser.allowVerificationAfter,
        // );

        // Store allowVerificationAfter in cookies and state
        // cookies.set(
        //   "allowVerificationAfter",
        //   response.data.savedUser.allowVerificationAfter,
        // );
        // Server sends allowVerificaitonAfter cookies so checking from that
        setAllowVerificationAfter(
          // response.data.savedUser.allowVerificationAfter,
          cookies.get("allowVerificationAfter"),
        );
        console.log(
          "Allow verification after from cookies: ",
          cookies.get("allowVerificationAfter"),
        );
        console.log(`Current time ${Date.now()}`);

        // console.log("Response of signup: ", response);
        if (response.data.success) {
          setEmailSent(true);
        } else {
          console.log("Error occurred when creating a new user: \n", response);
          setErrorMessage("Error occurred while sending email to this address");
        }
      } catch (err) {
        console.log("Signup error\n", err);
        setErrorMessage("Failed to send verification email. Please try again.");
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
          value={email}
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
                className="w-1/2 min-w-min rounded-lg bg-green-300 py-2 hover:bg-green-400"
                onClick={onSubmit}
              >
                Submit
              </button>
            </div>
            <div className="flex flex-auto justify-center">
              <button
                className="w-1/2 min-w-min rounded-lg bg-red-500 py-2 text-white hover:bg-red-600"
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
              <button className="w-1/2 min-w-min cursor-not-allowed rounded-lg bg-green-100 py-2">
                Sending email
              </button>
            </div>
            <div className="flex flex-auto justify-center">
              <button className="w-1/2 min-w-min cursor-not-allowed rounded-lg bg-red-300 py-2">
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

// ----------------------

// "use client";

// import { useEffect, useState } from "react";
// import axios from "axios";
// // import { cookies } from "next/headers";
// import Cookies from "universal-cookie";
// // import { redirect } from "next/navigation";

// interface VerifyModalOpenParams {
//   emailSent: boolean;
//   openCloseFn: () => void;
// }

// interface SendEmailInputsParams {
//   openCloseFn: () => void;
//   setErrorMessage: (str: string) => void;
//   setEmailSent: (b: boolean) => void;
//   // allowVerificationAfter: number;
//   setAllowVerificationAfter: (d: number) => void;
// }

// // const Timer = () => {
// //   const [seconds, setSeconds] = useState(60);

// //   useEffect(() => {
// //     const interval = setInterval(() => {
// //       setSeconds((prevSeconds) => prevSeconds - 1);
// //     }, 1000);
// //     return () => clearInterval(interval);
// //   }, []);

// //   return (
// //     <div>
// //       <h1>Timer: {seconds} seconds</h1>
// //     </div>
// //   );
// // };

// // TODO: Test send email to valid email address and invalid email address
// const VerifyEmailModal = ({
//   openCloseFn,
//   emailSent,
// }: VerifyModalOpenParams) => {
//   // const cookieStore = await cookies();
//   // const tokenObj = cookieStore.get("token");
//   // const token = tokenObj ? tokenObj.value : "";
//   // const email = cookies.get("email");
//   // console.log("Email in cookies:", email);
//   const cookies = new Cookies();

//   const [errorMessage, setErrorMessage] = useState("");
//   const [emailSentLocal, setEmailSentLocal] = useState(emailSent);
//   const [allowVerificationAfter, setAllowVerificationAfter] = useState(
//     cookies.get("allowVerificationAfter"),
//   );
//   return (
//     <>
//       {/* Overlay */}
//       <div className="fixed inset-0 z-10 bg-black bg-opacity-50" />
//       {/* Modal */}
//       <div className="fixed inset-0 z-20 flex h-5/6 flex-col items-center justify-center pt-20">
//         <div className="scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 mx-auto flex w-5/6 flex-col overflow-y-auto rounded-xl bg-white p-6 shadow-lg sm:w-1/2">
//           {/* Close Button (×) */}
//           <div className="flex justify-end">
//             <button
//               type="button"
//               onClick={openCloseFn}
//               // onClick={() => setModalOpen(false)}
//               className="cursor-pointer border-none bg-transparent text-2xl"
//               aria-label="Close"
//             >
//               ×
//             </button>
//           </div>
//           {/* Inputs */}

//           {!emailSentLocal && (
//             <SendEmailInputs
//               setErrorMessage={setErrorMessage}
//               setEmailSent={setEmailSentLocal}
//               openCloseFn={openCloseFn}
//               // allowVerificationAfter={allowVerificationAfter}
//               setAllowVerificationAfter={setAllowVerificationAfter}
//             />
//           )}
//           {/* Error */}
//           {errorMessage && (
//             <>
//               <div className="pb-4 text-red-600">{errorMessage}</div>
//             </>
//           )}

//           {emailSentLocal && (
//             <>
//               <p className="pb-6 text-xl">
//                 {/* <Timer /> */}
//                 <br />
//                 please check your email inbox and possibly spam folder for
//                 verification email
//                 <br />
//                 {allowVerificationAfter}
//                 {/* <VerificationComponent
//                   allowVerificationAfter={allowVerificationAfter}
//                 /> */}
//                 <br />
//               </p>
//             </>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// const SendEmailInputs = ({
//   setErrorMessage,
//   setEmailSent,
//   openCloseFn,
//   // allowVerificationAfter,
//   setAllowVerificationAfter,
// }: SendEmailInputsParams) => {
//   // 1min 1 sec before next email request
//   const cookies = new Cookies();
//   const [email, setEmail] = useState(cookies.get("email"));
//   const [emailMessage, setEmailMessage] = useState("");
//   const [loading, setLoading] = useState(false);
//   useEffect(() => {
//     if (email) {
//       setEmailMessage(
//         "Email verification expired, please reverify to continue",
//       );
//     } else {
//       setEmailMessage("Please verify your email to view products");
//     }
//   }, []);

//   // const [email, setEmail] = useState(email);

//   const onSubmit = async () => {
//     // console.log("email: ", email);
//     setLoading(true);
//     const emailRegex = /[a-zA-Z0-9_\.\+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-\.]+/;
//     if (emailRegex.test(email)) {
//       setErrorMessage("");
//       try {
//         await axios
//           .post("/api/users/signup", {
//             email: email,
//           })
//           .then(function (response) {
//             console.log(
//               "AllowVerificationAfter: ",
//               response.data.savedUser.allowVerificationAfter,
//             );
//             setAllowVerificationAfter(cookies.get("allowVerificationAfter"));
//             // cookies.set(
//             //   "allowVerificationAfter",
//             //   response.data.savedUser.allowVerificationAfter,
//             // );
//             console.log("Response of signup: ", response);
//             if (response.data.success) {
//               setEmailSent(true);
//               // cookies.set("sent", true);
//             } else {
//               console.log(
//                 "Error occurred when creating a new user: \n",
//                 response,
//               );
//               setErrorMessage(
//                 "Error occurred while sending email to this address",
//               );
//             }
//           });
//         // .catch(function (err) {});
//       } catch (err) {
//         console.log("Signup error\n", err);
//       }
//     } else {
//       setErrorMessage("Invalid email address");
//     }
//     setLoading(false);
//   };

//   return (
//     <>
//       <div className="mb-6">
//         <p className="flex w-full items-center justify-center text-xl">
//           {emailMessage}
//         </p>
//         <br />
//         <label htmlFor="email">Email</label>
//         <input
//           type="text"
//           className="mt-3 w-full resize-none rounded-lg border border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//           placeholder="user@example.com"
//           value={email ? email : ""}
//           onChange={(e) => {
//             setEmail(e.target.value);
//           }}
//         />
//       </div>
//       <div className="flex w-full flex-row">
//         {!loading && (
//           <>
//             <div className="flex flex-auto justify-center">
//               <button
//                 className="w-1/2 min-w-min rounded-lg bg-green-300 py-2"
//                 onClick={onSubmit}
//               >
//                 Submit
//               </button>
//             </div>
//             <div className="flex flex-auto justify-center">
//               <button
//                 className="w-1/2 min-w-min rounded-lg bg-red-500 py-2"
//                 onClick={() => {
//                   openCloseFn();
//                 }}
//               >
//                 Cancel
//               </button>
//             </div>
//           </>
//         )}
//         {loading && (
//           <>
//             <div className="flex flex-auto justify-center">
//               <button className="w-1/2 min-w-min rounded-lg bg-green-100 py-2">
//                 Sending email
//               </button>
//             </div>
//             <div className="flex flex-auto justify-center">
//               <button className="w-1/2 min-w-min rounded-lg bg-red-300 py-2">
//                 Cancel
//               </button>
//             </div>
//           </>
//         )}
//       </div>
//     </>
//   );
// };

// export default VerifyEmailModal;
