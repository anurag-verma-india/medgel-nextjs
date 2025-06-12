"use client";
import { ReactNode, useState} from "react";
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
export default function AwardsContainer(){
    const [current, setCurrent] = useState(0);
  const [show,setShow]=useState(false);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? certificates.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === certificates.length - 1 ? 0 : prev + 1));
  };
    return(
        <>
        {/* Section 1 */}
      <div className="flex items-center justify-between p-5 md:p-16">
        <div className="w-1/2 mb-5 md:mt-0 mt-16">
  <h1 className="text-[#1D8892] text-xl md:text-4xl">
    Awards & <br /> Accreditations
  </h1>
  <div className="w-4/5 md:w-1/3 rounded-lg h-2 bg-orange-300"></div>
</div>

        <div className="">
          <button className="bg-[#1D8892] rounded-lg p-3 text-white" onClick={()=>setShow(!show)}>{show?'Hide':'View all'}</button>
        </div>
      </div>
      {/* Section 2 */}
      {
        show ? 
        <div className="grid grid-cols-1 md:grid-cols-3 w-full h-full items-center gap-10 justify-center -mt-10 p-16">
       {
        certificates.map((item,index)=>{
          return(
            <img src={item}
            key={index}
       className="w-full h-full p-5 md:p-10 rounded-lg shadow-lg object-cover border-2 transition-transform duration-300 hover:scale-105 cursor-pointer "
            
            />
          )
        })
       }
      </div>
      
      :

      <div className="flex flex-col md:flex-row items-center md:space-y-0 space-y-10 gap-3 justify-center -mt-20 p-16">
       <img
       src="/images/achievements1.png"
       className="w-full md:w-2/12 h-full md:h-1/2 rounded-3xl shadow-lg object-cover transition-transform duration-300 hover:scale-105 cursor-pointer border-[20px] border-[#28939D]"
       />
       <img
       src="/images/achievements2.png"
       className="w-full md:w-3/12 h-full md:h-1/2 rounded-3xl shadow-lg object-cover transition-transform duration-300 hover:scale-105 cursor-pointer border-[20px] border-[#28939D]"
       />
       <img
       src="/images/achievements3.png"
       className="w-full md:w-2/12 h-full md:h-1/2 rounded-3xl shadow-lg object-cover transition-transform duration-300 hover:scale-105 cursor-pointer border-[20px] border-[#28939D]"
       />
      </div>
      
      }
      <div className="flex items-center justify-between  w-full h-full p-5 md:p-16 gap-5">
  {/* Left Arrow */}
  <section className="w-10 cursor-pointer h-10 flex items-center justify-center font-bold text-xl rounded-full bg-blue-300">
    {'<'}
  </section>

  {/* Gradient Bar */}
  <main className="flex-1 h-5 rounded-xl bg-[linear-gradient(to_left,#5E96AD_50%,#75B2C5_50%)]" />

  {/* Right Arrow */}
  <section className="w-10 cursor-pointer h-10 flex items-center justify-center font-bold text-xl rounded-full bg-blue-300">
    {'>'}
  </section>
</div>

      </>
    )
}