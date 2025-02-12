// "use client";
// import React, { useState } from "react";

const UserNotVerifiedShowEmailPopup = () => {
  //   const [notVerified, setNotVerified] = useState(true);
  let notVerified = true;

  return <>{notVerified && <div>UserNotVerifiedShowEmailPopup</div>}</>;
};

export default UserNotVerifiedShowEmailPopup;
