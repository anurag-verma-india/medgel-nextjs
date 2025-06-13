"use client";

import { useEffect, useState } from "react";
import AwardsContainer from "./AwardsContainer";
import AwardPopup from "./AwardPopup";

export default function Achievements() {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    fetch("/api/check-admin")
      .then((res) => res.json())
      .then((data) => setIsAdmin(data.isAdmin))
      .catch((err) => console.log("Auth check error:", err));
  }, []);

  return (
    <div>
      {isAdmin && (
        <div className="flex justify-end m-5">
          <button
            className="bg-[#1D8892] rounded-lg p-3  text-white"
            onClick={() => setOpenEditModal(true)}
          >
            Edit
          </button>
        </div>
      )}
      
      <AwardsContainer />
      {openEditModal && (
        <AwardPopup
          openEditModal={openEditModal}
          setOpenEditModal={setOpenEditModal}
        />
      )}
    </div>
  );
}
