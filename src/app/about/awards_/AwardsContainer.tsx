"use client";
import { ReactNode, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import React from "react";
import axios from "axios";

export default function AwardsContainer() {
  // ✅ Define a proper type (or interface)
  type CertifType = {
    _id: string;
    title: string;
    image: string;
  };

  const certiftype: CertifType[] = [
    { _id: "8784545884784fejikdk", title: "Award 1", image: "uploads/1.jpg" },
    // ...
  ];

  const [certif, setCertif] = useState<CertifType[]>([]);
  const [show, setShow] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAdmin, setIsAdmin] = useState(false);
  async function fetchData() {
    try {
      setIsLoading(true);
      const awardResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/awards`,
      );
      // console.log(awardResponse.data)
      if (awardResponse.data.length >= 1) {
        setCertif(awardResponse.data);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetch("/api/check-admin")
      .then((res) => res.json())
      .then((data) => setIsAdmin(data.isAdmin))
      .catch((err) => console.log("Auth check error:", err));

    fetchData();
  }, []);

  const deleteAward = async (id: string, imagePath: string) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this award?",
      );
      if (!confirmDelete) return;

      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_SITE_URL}/api/awards`,
        {
          data: {
            awardid: id,
            imagePath: imagePath,
          }, // Pass image path to backend for deletion
        },
      );

      if (response.status === 200) {
        alert("Award deleted successfully.");
        fetchData();
        // Optionally refetch or update state
      } else {
        alert("Failed to delete award.");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Something went wrong while deleting.");
    }
  };

  return (
    <>
      {/* Section 1 */}
      <div className="-mt-20 flex items-center justify-between p-5 md:-mt-10 md:p-16">
        <div className="mb-5 mt-16 w-1/2 md:mt-0">
          <h1 className="text-xl text-[#1D8892] md:text-4xl">
            Awards & <br /> Accreditations
          </h1>
          <div className="h-2 w-4/5 rounded-lg bg-orange-300 md:w-1/3"></div>
        </div>

        <div className="">
          {show ? (
            <FaEyeSlash
              onClick={() => setShow(!show)}
              className="mb-2 h-10 w-10 cursor-pointer"
            />
          ) : (
            <FaEye
              onClick={() => setShow(!show)}
              className="mb-2 h-10 w-10 cursor-pointer"
            />
          )}
        </div>
      </div>
      {/* Section 2 */}
      {show ? (
        <div className="-mt-10 grid h-full w-full grid-cols-1 items-center justify-center gap-10 p-16 md:grid-cols-3">
          {Array.isArray(certif) &&
            certif.map((item, index) => {
              return isAdmin ? (
                <div className="">
                  <MdDelete
                    onClick={() => deleteAward(item._id, item.image)}
                    className="mb-2 h-10 w-10 cursor-pointer text-red-600"
                  />
                  <img
                    key={index}
                    src={`${process.env.NEXT_PUBLIC_SITE_URL}/${item.image}`}
                    className="h-full w-full cursor-pointer rounded-lg border-2 object-cover p-5 shadow-lg transition-transform duration-300 hover:scale-105 md:p-10"
                  />
                </div>
              ) : (
                <img
                  key={index}
                  src={`${process.env.NEXT_PUBLIC_SITE_URL}/${item.image}`}
                  className="h-full w-full cursor-pointer rounded-lg border-2 object-cover p-5 shadow-lg transition-transform duration-300 hover:scale-105 md:p-10"
                />
              );
            })}
        </div>
      ) : (
        <div className="-mt-20 flex flex-col items-center justify-center gap-3 space-y-10 p-16 md:flex-row md:space-y-0">
          <img
            src={`${process.env.NEXT_PUBLIC_SITE_URL}/${certif[0]?.image}`}
            className="h-full w-full cursor-pointer rounded-3xl border-[20px] border-[#28939D] object-cover shadow-lg transition-transform duration-300 hover:scale-105 md:h-1/2 md:w-2/12"
          />
          <img
            src={`${process.env.NEXT_PUBLIC_SITE_URL}/${certif[1]?.image}`}
            className="h-full w-full cursor-pointer rounded-3xl border-[20px] border-[#28939D] object-cover shadow-lg transition-transform duration-300 hover:scale-105 md:h-1/2 md:w-3/12"
          />
          <img
            src={`${process.env.NEXT_PUBLIC_SITE_URL}/${certif[2]?.image}`}
            className="h-full w-full cursor-pointer rounded-3xl border-[20px] border-[#28939D] object-cover shadow-lg transition-transform duration-300 hover:scale-105 md:h-1/2 md:w-2/12"
          />
        </div>
      )}
      {/* Last error */}
      {/* <div className="flex h-full w-full items-center justify-between gap-5 p-5 md:p-16">
        <section className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-blue-300 text-xl font-bold">
          {"<"}
        </section>

        <main className="h-5 flex-1 rounded-xl bg-[linear-gradient(to_left,#5E96AD_50%,#75B2C5_50%)]" />
        <section className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-blue-300 text-xl font-bold">
          {">"}
        </section>
      </div> */}
    </>
  );
}
