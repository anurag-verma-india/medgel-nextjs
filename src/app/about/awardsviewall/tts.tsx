"use client";

// import { useState } from "react";

const certificates = [
  "/images/achievements1.png",
  "/images/achievements2.png",
  "/images/achievements3.png",
  "/images/achievements4.png",
  "/images/achievements5.png",
  "/images/achievements6.png"
];

export default function AchievementsViewAll() {
  return (
    <div className="p-6 max-w-6xl mx-auto text-center">
      <h2 className="text-3xl font-bold text-teal-900 mb-4 border-b-4 border-orange-400 inline-block">
        Awards & Accreditations
      </h2>
      <div className="flex justify-end mb-4">
        <button className="bg-teal-600 text-white px-4 py-2 rounded-lg">Close</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center">
        {certificates.map((src, index) => (
          <div key={index} className="flex justify-center">
            <img
              src={src}
              alt={`Certificate ${index + 1}`}
              className="w-48 md:w-64 rounded-lg border-4 border-teal-600 shadow-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
