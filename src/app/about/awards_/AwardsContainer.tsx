"use client";
import { ReactNode, useState,useEffect} from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import React from "react";
import axios from "axios";

export default function AwardsContainer(){
 // ✅ Define a proper type (or interface)
type CertifType = {
  _id:string;
  title: string;
  image: string;
};

const certiftype: CertifType[] = [
  {_id:"8784545884784fejikdk", title: "Award 1", image: "uploads/1.jpg" },
  // ...
];

const [certif, setCertif] = useState<CertifType[]>([]);
const [show, setShow] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAdmin, setIsAdmin] = useState(false);
async function fetchData(){
      try{
        setIsLoading(true);
        const awardResponse= await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/awards`,
        );
        // console.log(awardResponse.data)
        if(awardResponse.data.length>=1){
          setCertif(awardResponse.data)
          setIsLoading(false)
        }
      }catch(error){
      console.log(error)
    }
    }
  useEffect(()=>{
    fetch("/api/check-admin")
      .then((res) => res.json())
      .then((data) => setIsAdmin(data.isAdmin))
      .catch((err) => console.log("Auth check error:", err));
 
    
    fetchData()
  },[])

 const deleteAward = async (id: string, imagePath: string) => {
  try {
    const confirmDelete = window.confirm("Are you sure you want to delete this award?");
    if (!confirmDelete) return;

    const response = await axios.delete(`${process.env.NEXT_PUBLIC_SITE_URL}/api/awards`, {
      data: {
        awardid: id,
        imagePath: imagePath,
      }, // Pass image path to backend for deletion
    });

    if (response.status === 200) {
      alert("Award deleted successfully.");
      fetchData()
      // Optionally refetch or update state
    } else {
      alert("Failed to delete award.");
    }
  } catch (error) {
    console.error("Delete error:", error);
    alert("Something went wrong while deleting.");
  }
};
  
 
    return(
        <>
        {/* Section 1 */}
      <div className="flex items-center justify-between -mt-20 md:-mt-10 p-5 md:p-16">
        <div className="w-1/2 mb-5 md:mt-0 mt-16">
  <h1 className="text-[#1D8892] text-xl md:text-4xl">
    Awards & <br /> Accreditations
  </h1>
  <div className="w-4/5 md:w-1/3 rounded-lg h-2 bg-orange-300"></div>
</div>

        <div className="">
          {
            show?
            <FaEyeSlash
        onClick={()=>setShow(!show)}
        className="w-10 h-10 mb-2   cursor-pointer"/>
            :
            <FaEye 
        onClick={()=>setShow(!show)}
        className="w-10 h-10 mb-2   cursor-pointer"/>
          }
        
        </div>
      </div>
      {/* Section 2 */}
      {
        show ? 
        <div className="grid grid-cols-1 md:grid-cols-3 w-full h-full items-center gap-10 justify-center -mt-10 p-16">
       {
  Array.isArray(certif) && certif.map((item, index) => {
    return (
      isAdmin ? (
        <div className="">
        <MdDelete onClick={()=>deleteAward(item._id,item.image)} className="w-10 h-10 mb-2 text-red-600 cursor-pointer"/>
        <img
          key={index}
          src={`${process.env.NEXT_PUBLIC_SITE_URL}/${item.image}`}
          className="w-full h-full p-5 md:p-10 rounded-lg shadow-lg object-cover border-2 transition-transform duration-300 hover:scale-105 cursor-pointer"
        />
        </div>
      ) : (
        <img
          key={index}
          src={`${process.env.NEXT_PUBLIC_SITE_URL}/${item.image}`}
          className="w-full h-full p-5 md:p-10 rounded-lg shadow-lg object-cover border-2 transition-transform duration-300 hover:scale-105 cursor-pointer"
        />
      )
    );
  })
}

      </div>
      
      :

      <div className="flex flex-col md:flex-row items-center md:space-y-0 space-y-10 gap-3 justify-center -mt-20 p-16">
       <img
       src={`${process.env.NEXT_PUBLIC_SITE_URL}/${certif[0]?.image}`}
       className="w-full md:w-2/12 h-full md:h-1/2 rounded-3xl shadow-lg object-cover transition-transform duration-300 hover:scale-105 cursor-pointer border-[20px] border-[#28939D]"
       />
       <img
       src={`${process.env.NEXT_PUBLIC_SITE_URL}/${certif[1]?.image}`}
       className="w-full md:w-3/12 h-full md:h-1/2 rounded-3xl shadow-lg object-cover transition-transform duration-300 hover:scale-105 cursor-pointer border-[20px] border-[#28939D]"
       />
       <img
       src={`${process.env.NEXT_PUBLIC_SITE_URL}/${certif[2]?.image}`}
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