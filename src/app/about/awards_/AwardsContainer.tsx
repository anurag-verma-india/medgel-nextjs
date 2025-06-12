"use client";
import { ReactNode, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
const certificates = [
  "/images/achievements1.png",
  "/images/achievements2.png",
  "/images/achievements3.png",
  "/images/achievements1.png",
  "/images/achievements2.png",
  "/images/achievements3.png",
  "/images/achievements1.png",
  "/images/achievements2.png",
  "/images/achievements3.png",
];
export default function AwardsContainer() {
  const [current, setCurrent] = useState(0);
  const [show, setShow] = useState(false);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? certificates.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === certificates.length - 1 ? 0 : prev + 1));
  };
  return (
    <>
      {/* Section 1 */}
      <div className="flex items-center justify-between p-5 md:p-16">
        <div className="mb-5 mt-16 w-1/2 md:mt-0">
          <h1 className="text-xl text-[#1D8892] md:text-4xl">
            Awards & <br /> Accreditations
          </h1>
          <div className="h-2 w-4/5 rounded-lg bg-orange-300 md:w-1/3"></div>
        </div>

        <div className="">
          <button
            className="rounded-lg bg-[#1D8892] p-3 text-white"
            onClick={() => setShow(!show)}
          >
            {show ? "Hide" : "View all"}
          </button>
        </div>
      </div>
      {/* Section 2 */}
      {show ? (
        <div className="-mt-10 grid h-full w-full grid-cols-1 items-center justify-center gap-10 p-16 md:grid-cols-3">
          {certificates.map((item, index) => {
            return (
              <img
                src={item}
                key={index}
                className="h-full w-full cursor-pointer rounded-lg border-2 object-cover p-5 shadow-lg transition-transform duration-300 hover:scale-105 md:p-10"
              />
            );
          })}
        </div>
      ) : (
        <div className="-mt-20 flex flex-col items-center justify-center gap-3 space-y-10 p-16 md:flex-row md:space-y-0">
          <img
            src="/images/achievements1.png"
            className="h-full w-full cursor-pointer rounded-3xl border-[20px] border-[#28939D] object-cover shadow-lg transition-transform duration-300 hover:scale-105 md:h-1/2 md:w-2/12"
          />
          <img
            src="/images/achievements2.png"
            className="h-full w-full cursor-pointer rounded-3xl border-[20px] border-[#28939D] object-cover shadow-lg transition-transform duration-300 hover:scale-105 md:h-1/2 md:w-3/12"
          />
          <img
            src="/images/achievements3.png"
            className="h-full w-full cursor-pointer rounded-3xl border-[20px] border-[#28939D] object-cover shadow-lg transition-transform duration-300 hover:scale-105 md:h-1/2 md:w-2/12"
          />
        </div>
      )}
      <div className="flex h-full w-full items-center justify-between gap-5 p-5 md:p-16">
        {/* Left Arrow */}
        <section className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-blue-300 text-xl font-bold">
          {"<"}
        </section>

        {/* Gradient Bar */}
        <main className="h-5 flex-1 rounded-xl bg-[linear-gradient(to_left,#5E96AD_50%,#75B2C5_50%)]" />

        {/* Right Arrow */}
        <section className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-blue-300 text-xl font-bold">
          {">"}
        </section>
      </div>
    </>
  );
}
