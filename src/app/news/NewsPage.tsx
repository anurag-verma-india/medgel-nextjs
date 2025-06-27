"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { Inter } from "next/font/google";
import { NewsObject } from "@/types";
import { useSearchParams } from "next/navigation";
const inter = Inter({ subsets: ["latin"] });
import NewsEditPopup from "./NewsEditPopup";
// import { NextRequest, NextResponse } from "next/server";
export default function NewsPage({ checkAdmin }: { checkAdmin: boolean }) {
  const searchParams = useSearchParams();
  const id = searchParams?.get("id");
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [NewId, setNewId] = useState("");
  // const [isAdmin,setIsAdmin]=useState<Boolean>(false)
  const emptyNewsObject = {
    _id: "",
    title: "",
    description: "",
  };
  const [fetchedNews, setNewsList] = useState<NewsObject>(emptyNewsObject);
  const [newsError, setNewsError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const fetchNews = async () => {
    try {
      const newsResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/news?id=${id}`,
      );
      // console.log("newsResponse news page", newsResponse);
      // console.log("newsResponse.data news page", newsResponse.data);
      if (newsResponse.data.success && newsResponse.data.data) {
        setNewsList(newsResponse.data.data);
      } else {
        // setNewsList({} as NewsObject);
        setNewsList(emptyNewsObject);
        setNewsError(
          newsResponse.data.error || "An error occurred while getting news",
        );
      }
    } catch (error) {
      // } catch  {
      console.log("error", error);
      // console.log(error.response.data);
      setNewsList(emptyNewsObject);
      setNewsError("An error occurred while getting news");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    // fetch("/api/check-admin")
    //   .then((res) => res.json())
    //   .then((data) => setIsAdmin(data.isAdmin))
    //   .catch((err) => console.log("Auth check error:", err));
    fetchNews();
  }, []);
  const openModal: (id: string) => void = (id) => {
    setNewId(id);
    setOpenEditModal(true);
  };
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
            <h1 className="mb-6 text-center text-3xl font-bold leading-tight text-[#20878c] sm:text-4xl lg:text-5xl">
              {fetchedNews && fetchedNews.title}
              {isLoading && <>Loading...</>}
            </h1>
            {
              // isAdmin &&
              checkAdmin && (
                <button
                  onClick={() => openModal(fetchedNews._id)}
                  className="m-3 ml-auto h-10 w-44 rounded-lg bg-[#1D8892] text-white"
                >
                  Edit
                </button>
              )
            }
          </div>
          {/* News Content */}
          <div className="prose prose-lg max-w-none">
            <p className="mb-6 leading-relaxed text-gray-700">
              {fetchedNews.description || newsError}
              {isLoading && <>Loading...</>}
            </p>
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

          {/* Call to Action */}
        </div>
      </div>
      {openEditModal && (
        <NewsEditPopup
          openEditModal={openEditModal}
          setOpenEditModal={setOpenEditModal}
          NewsId={NewId}
        />
      )}

      {/* Bottom Spacing */}
      <div className="h-20"></div>
    </div>
  );
}
