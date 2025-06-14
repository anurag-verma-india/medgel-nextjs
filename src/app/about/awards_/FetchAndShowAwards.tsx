"use client";

import { useEffect, useState } from "react";
import AwardsContainer from "./AwardsContainer";
import AwardPopup from "./AwardPopup";

export default function FetchAndShowAwards() {
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
        <div className="m-5 flex justify-end">
          <button
            className="rounded-lg bg-[#1D8892] p-3 text-white"
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
