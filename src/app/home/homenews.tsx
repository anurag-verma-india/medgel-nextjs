"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./homenews.css";
// import { latestNews } from "./fetch_news";
import Image from "next/image";
import { NewsType } from "@/types";
import NewsPopup from "./NewsPopup";
const HomeNews = ({ adminCheck }: { adminCheck: boolean }) => {
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  // const [adminCheck,setIsAdmin]=useState<Boolean>(false)
  const [newsList, setNewsList] = useState<NewsType[]>([]);
  const fetchNews = async () => {
    try {
      const newsResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/news`,
      );
      console.log(newsResponse.data);
      if (newsResponse.data.length >= 1) {
        setNewsList(newsResponse.data);
      }
    } catch (error) {
      console.log(error);
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
          {adminCheck && (
            <button
              onClick={() => setOpenEditModal(true)}
              className="m-3 ml-auto rounded-lg bg-[#1D8892] p-3 text-white"
            >
              Add News
            </button>
          )}
        </div>
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
                    <div className="flex content-start">
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
                <p>No latest news available</p>
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
      {openEditModal && (
        <NewsPopup
          openEditModal={openEditModal}
          setOpenEditModal={setOpenEditModal}
        />
      )}
    </div>
  );
};

export default HomeNews;
