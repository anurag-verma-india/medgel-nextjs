"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { Inter } from "next/font/google";
import { NewsObject } from "@/types";
import { useSearchParams } from 'next/navigation';
const inter = Inter({ subsets: ["latin"] });
import NewsEditPopup from "../home/NewsEditPopup";
import { NextRequest, NextResponse } from "next/server";


export default function page() {
   const searchParams = useSearchParams();
  const id = searchParams?.get('id');
   const [openEditModal,setOpenEditModal]=useState<Boolean>(false)
   const [NewId,setNewId]=useState("")
    const [isAdmin,setIsAdmin]=useState<Boolean>(false)
       const [newsList, setNewsList] = useState<NewsObject>({} as NewsObject);
    const fetchNews = async () => {
      try {
      const newsResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/news?id=${id}`,
      );
      console.log(newsResponse.data)
      if (newsResponse.data) {
        setNewsList(newsResponse.data)
      }
    } catch (error) {
      console.log(error);
    }
    };
    useEffect(() => {
          fetch("/api/check-admin")
            .then((res) => res.json())
            .then((data) => setIsAdmin(data.isAdmin))
            .catch((err) => console.log("Auth check error:", err));
          fetchNews()
        }, []);
       const openModal: (id: string) => void = (id) => {
          setNewId(id)
          setOpenEditModal(true)
        }
  return (
    <div className={`min-h-screen bg-gray-50 ${inter.className}`}>
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <Image
          src="/images/newsHeroImage.jpg" // Replace with your image path
          alt="News Hero Image"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 mx-auto -mt-20 max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Content Card */}
        <div className="rounded-2xl bg-white p-6 shadow-xl sm:p-8 lg:p-12">
          {/* Title */}
          <div className="flex justify-center">
          <h1 className="mb-6 text-3xl text-center font-bold leading-tight text-[#20878c] sm:text-4xl lg:text-5xl">
            {newsList.title}
          </h1>
          {
          isAdmin && 
        <button onClick={()=>openModal(newsList._id)} className="bg-[#1D8892]  w-44 h-10 rounded-lg m-3 ml-auto text-white">Edit</button>
        }
          </div>

          

          {/* Meta Information */}
          <div className="mb-8 flex flex-wrap items-center gap-4 border-b border-gray-200 pb-8">
            {/* <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-blue-600"></div>
              <span className="text-sm text-gray-500">
                Published on March 15, 2024
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-600"></div>
              <span className="text-sm text-gray-500">5 min read</span>
            </div> */}
          </div>

          {/* News Content */}
          <div className="prose prose-lg max-w-none">
            <p className="mb-6 leading-relaxed text-gray-700">
             {newsList.description}
            </p>

            
          </div>

          {/* Call to Action */}
        </div>
      </div>
      {
              openEditModal && <NewsEditPopup
              openEditModal={openEditModal}
              setOpenEditModal={setOpenEditModal}
              NewsId={NewId}
              />
            }

      {/* Bottom Spacing */}
      <div className="h-20"></div>
    </div>
  );
}
