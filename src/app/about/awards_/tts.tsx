"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const certificates = [
  "/images/achievements1.png",
  "/images/achievements2.png",
  "/images/achievements3.png",
  // "/images/achievements1.png",
  // "/images/achievements2.png",
  // "/images/achievements3.png",
  "/images/achievements1.png",
  "/images/achievements2.png",
  "/images/achievements3.png"
];

export default function Achievements() {
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? certificates.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === certificates.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto text-center">
      <h2 className="text-2xl sm:text-3xl font-bold text-teal-900 mb-4 border-b-4 border-orange-400 inline-block">
        Awards & Accreditations
      </h2>
      <div className="flex justify-end mb-4">
        {/* <button className="bg-teal-600 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-lg text-sm sm:text-base">
          View All
        </button> */}
      </div>
      <div className="relative flex justify-center items-center">
        <button 
          onClick={prevSlide} 
          className="absolute left-0 sm:-left-5 z-10 bg-white p-1 sm:p-2 rounded-full shadow-lg hover:bg-gray-100"
        >
          <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
        </button>
        
        <div className="flex overflow-hidden w-full">
          <div 
            className="flex gap-2 sm:gap-4 transition-transform duration-500"
            style={{ 
              transform: `translateX(-${current * 100}%)`,
              width: `${certificates.length * 100}%`
            }}
          >
            {certificates.map((src, index) => (
              <div 
                key={index} 
                className="flex-shrink-0 w-full sm:w-1/3"
              >
                <div className="p-2 bg-white shadow-md rounded-lg">
                  <img
                    src={src}
                    alt={`Certificate ${index + 1}`}
                    className="w-full h-64 object-contain rounded-lg border-4 border-teal-600 transition-transform duration-300 hover:scale-105"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <button 
          onClick={nextSlide} 
          className="absolute right-0 sm:-right-5 z-10 bg-white p-1 sm:p-2 rounded-full shadow-lg hover:bg-gray-100"
        >
          <ChevronRight size={20} className="sm:w-6 sm:h-6" />
        </button>
      </div>
    </div>
  );
}