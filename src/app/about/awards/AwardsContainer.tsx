"use client";
// import { ReactNode, useState, useEffect } from "react";
import { useState, useEffect } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import React from "react";
import axios from "axios";
import Image from "next/image";

export default function AwardsContainer({ isAdmin }: { isAdmin: boolean }) {
  // ✅ Define a proper type (or interface)
  type CertifType = {
    _id: string;
    title: string;
    image: string;
  };

  // const certiftype: CertifType[] = [
  //   { _id: "8784545884784fejikdk", title: "Award 1", image: "uploads/1.jpg" },
  //   // ...
  // ];

  const [certif, setCertif] = useState<CertifType[]>([]);
  const [show, setShow] = useState<boolean>(false);
  // const [isLoading, setIsLoading] = useState<boolean>(true);
  // const [isAdmin, setIsAdmin] = useState(false);
  async function fetchData() {
    try {
      // setIsLoading(true);
      const awardResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/awards`,
      );
      // console.log(awardResponse.data)
      if (awardResponse.data.length >= 1) {
        setCertif(awardResponse.data);
        // setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    // fetch("/api/check-admin")
    //   .then((res) => res.json())
    //   .then((data) => setIsAdmin(data.isAdmin))
    //   .catch((err) => console.log("Auth check error:", err));

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

  // if (isLoading) {
  //   // if (true) {
  //   return (
  //     <>
  //       {/* Section 1 */}
  //       <div className="-mt-20 flex items-center justify-between p-5 md:-mt-10 md:p-16">
  //         <div className="mb-5 mt-16 w-1/2 md:mt-0">
  //           <h1 className="text-xl text-[#1D8892] md:text-4xl">
  //             Awards & <br /> Accreditations
  //           </h1>
  //           <div className="h-2 w-4/5 rounded-lg bg-orange-300 md:w-1/3"></div>
  //         </div>

  //         <div className="">
  //           {show ? (
  //             <FaEyeSlash
  //               onClick={() => setShow(!show)}
  //               className="mb-2 h-10 w-10 cursor-pointer"
  //             />
  //           ) : (
  //             <FaEye
  //               onClick={() => setShow(!show)}
  //               className="mb-2 h-10 w-10 cursor-pointer"
  //             />
  //           )}
  //         </div>
  //       </div>
  //       <div className="flex h-20 justify-center align-middle text-4xl text-[#1D8892]">
  //         Loading Awards...
  //       </div>
  //       <div className="h-96" />
  //     </>
  //   );
  // }

  return (
    <>
      {/* Section 1 */}
      <div className="-mt-20 flex items-center justify-between p-5 md:-mt-10 md:p-16">
        <div
          className="mb-5 mt-16 w-1/2 md:mt-0"
          onClick={() => {
            console.log("Certif: ");
            console.log(certif);
          }}
        >
          <h1 className="text-xl text-[#1D8892] md:text-4xl">
            Awards & <br /> Accreditations
          </h1>
          <div className="h-2 w-4/5 rounded-lg bg-orange-300 md:w-1/3"></div>
        </div>

        <div className="">
          {show ? (
            <div className="flex w-full flex-col justify-center align-middle">
              Show Less
              <FaEyeSlash
                onClick={() => setShow(!show)}
                className="mb-2 h-10 w-full cursor-pointer"
              />
            </div>
          ) : (
            <div className="flex w-full flex-col justify-center align-middle">
              Show All
              <FaEye
                onClick={() => setShow(!show)}
                className="mb-2 h-10 w-full cursor-pointer"
              />
            </div>
          )}
        </div>
      </div>
      {/* Section 2 */}
      {/* {show ? ( */}
      <div className="-mt-10 grid h-full w-full grid-cols-1 items-center justify-center gap-10 p-16 md:grid-cols-3">
        {certif.length === 0 && (
          // {true && (
          <>
            <div
              // alt="Award 2"
              // src={``}
              // className="h-1/2 h-full w-full cursor-pointer rounded-lg border-2 object-cover p-5 shadow-lg transition-transform duration-300 hover:scale-105 md:p-10"
              className="flex h-[750px] w-full cursor-pointer justify-center rounded-lg border-2 p-5 align-middle shadow-lg transition-transform duration-300 hover:scale-105 md:p-10"
              // width={400}
              // height={400}
            >
              Loading...
            </div>
            <div
              // alt="Award 2"
              // src={``}
              // className="h-1/2 h-full w-full cursor-pointer rounded-lg border-2 object-cover p-5 shadow-lg transition-transform duration-300 hover:scale-105 md:p-10"
              className="flex h-[750px] w-full cursor-pointer justify-center rounded-lg border-2 p-5 align-middle shadow-lg transition-transform duration-300 hover:scale-105 md:p-10"
              // width={400}
              // height={400}
            >
              Loading...
            </div>
            <div
              // alt="Award 2"
              // src={``}
              // className="h-1/2 h-full w-full cursor-pointer rounded-lg border-2 object-cover p-5 shadow-lg transition-transform duration-300 hover:scale-105 md:p-10"
              className="flex h-[750px] w-full cursor-pointer justify-center rounded-lg border-2 p-5 align-middle shadow-lg transition-transform duration-300 hover:scale-105 md:p-10"
              // width={400}
              // height={400}
            >
              Loading...
            </div>
            {/* <Image
              alt="Award 2"
              src={``}
              className="h-full w-full cursor-pointer rounded-lg border-2 object-cover p-5 shadow-lg transition-transform duration-300 hover:scale-105 md:p-10"
              width={400}
              height={400}
            />
            <Image
              alt="Award 2"
              src={``}
              className="h-full w-full cursor-pointer rounded-lg border-2 object-cover p-5 shadow-lg transition-transform duration-300 hover:scale-105 md:p-10"
              width={400}
              height={400}
            /> */}
          </>
        )}
        {Array.isArray(certif) &&
          // certif.map((item, index) => {
          certif.map((item) => {
            return isAdmin ? (
              <div className="">
                <MdDelete
                  onClick={() => deleteAward(item._id, item.image)}
                  className="mb-2 h-10 w-10 cursor-pointer text-red-600"
                />
                <Image
                  alt="Award 1"
                  src={`${process.env.NEXT_PUBLIC_SITE_URL}/${item.image}`}
                  className="h-full w-full cursor-pointer rounded-lg border-2 object-cover p-5 shadow-lg transition-transform duration-300 hover:scale-105 md:p-10"
                  width={400}
                  height={400}
                />
                {/* <img
                    key={index}
                    src={`${process.env.NEXT_PUBLIC_SITE_URL}/${item.image}`}
                    className="h-full w-full cursor-pointer rounded-lg border-2 object-cover p-5 shadow-lg transition-transform duration-300 hover:scale-105 md:p-10"
                  /> */}
              </div>
            ) : (
              // <img
              //   key={index}
              //   src={`${process.env.NEXT_PUBLIC_SITE_URL}/${item.image}`}
              //   className="h-full w-full cursor-pointer rounded-lg border-2 object-cover p-5 shadow-lg transition-transform duration-300 hover:scale-105 md:p-10"
              // />
              <Image
                alt="Award 2"
                src={`${process.env.NEXT_PUBLIC_SITE_URL}/${item.image}`}
                className="h-full w-full cursor-pointer rounded-lg border-2 object-cover p-5 shadow-lg transition-transform duration-300 hover:scale-105 md:p-10"
                width={400}
                height={400}
              />
            );
          })}
      </div>
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
