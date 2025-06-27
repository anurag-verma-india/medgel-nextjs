"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./homenews.css";
// import { latestNews } from "./fetch_news";
import Image from "next/image";
import { NewsObject } from "@/types";
import NewsAddPopup from "./NewsAddPopup";
import { LoaderCircle } from "lucide-react";
const HomeNews = ({ adminCheck }: { adminCheck: boolean }) => {
  const [openNewsModal, setOpenNewsModal] = useState<boolean>(false);
  // const [adminCheck,setIsAdmin]=useState<Boolean>(false)
  const [newsList, setNewsList] = useState<NewsObject[]>([]);
  const [newsError, setNewsError] = useState<string>("");
  const [isLoadingSpinner, setIsLoadingSpinner] = useState<boolean>(false);
  const [isLoadingNews, setIsLoadingNews] = useState<boolean>(true);

  const fetchNews = async () => {
    // setIsLoadingNews(true);
    try {
      const newsResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/news`,
      );
      console.log("newsResponse.data", newsResponse.data.data);
      if (newsResponse.data.success && newsResponse.data.data.length >= 1) {
        setNewsList(newsResponse.data.data);
      } else {
        setNewsList([]);
        setNewsError(
          newsResponse.data.error || "An error occurred while getting news",
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingNews(false);
    }
  };
  useEffect(() => {
    // fetch("/api/check-admin")
    //   .then((res) => res.json())
    //   .then((data) => setIsAdmin(data.isAdmin))
    //   .catch((err) => console.log("Auth check error:", err));
    fetchNews();
  }, []);

  return (
    <div className="homelatest-medgel">
      <div className="homecontent">
        <div className="flex justify-center">
          <h2 className="mx-auto text-red-500">LATEST AT MEDGEL</h2>
        </div>
        {adminCheck && (
          <button
            onClick={() => setOpenNewsModal(true)}
            className="m-3 ml-auto rounded-lg bg-[#1D8892] p-3 text-white"
          >
            Add News
          </button>
        )}
        <div className="homenews-section">
          <div className="homenews-list">
            <div className="homenews-list-content">
              {newsList.length > 0 ? (
                newsList.map((news, index) => (
                  <div className="homenews-item" key={index}>
                    <h3 className="text-left">{news.title.slice(0, 50)}...</h3>
                    <p className="text-left">
                      {news.description.slice(0, 300)}...
                    </p>
                    <div
                      className="flex content-start"
                      onClick={() => setIsLoadingSpinner(true)}
                    >
                      <a
                        href={`/news?id=${news._id}`}
                        className="homeread-more"
                      >
                        Read More ❯
                      </a>
                    </div>
                  </div>
                ))
              ) : (
                <>
                  {newsError && <p>{newsError}</p>}
                  {isLoadingNews && (
                    <>
                      <p>Loading News...</p>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
          <div className="homenews-image">
            <Image
              width={463}
              height={523}
              src="/images/news.png"
              alt="SoftGel Capsules"
            />
          </div>
        </div>
        {/* <div className="homenews-more-stories">
          <button className="homenews-stories-button">More Stories ❯❯ </button>
        </div> */}
      </div>
      {openNewsModal && (
        <NewsAddPopup
          openEditModal={openNewsModal}
          setOpenEditModal={setOpenNewsModal}
        />
      )}
      {isLoadingSpinner && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gray-800 bg-opacity-75 backdrop-blur-sm">
          <LoaderCircle className="h-12 w-12 animate-spin text-[#008080]" />
        </div>
      )}
    </div>
  );
};

export default HomeNews;
