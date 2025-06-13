"use client";

import React, { useEffect, useState } from "react";
import "./homenews.css";
// import { latestNews } from "./fetch_news";
import Image from "next/image";
import { NewsType } from "@/types";

const HomeNews: React.FC = () => {
  const [newsList, setNewsList] = useState<NewsType[]>([
    {
      title: "Successful USFDA Inspection of Medgel Facility",
      description:
        "Medgel Pvt Ltd is pleased to announce that the US Food and Drug Administration (FDA) has completed a successful inspection of its soft gelatin capsule manufacturing facility, located in SEZ Pharma Zone Pithampur, Indore, India.",
    },
    {
      title: "Successful USFDA Inspection of Medgel Facility",
      description:
        "Medgel Pvt Ltd is pleased to announce that the US Food and Drug Administration (FDA) has completed a successful inspection of its soft gelatin capsule manufacturing facility, located in SEZ Pharma Zone Pithampur, Indore, India.",
    },
    {
      title: "Spreading Worldwide",
      description:
        "MEDGEL is providing a ceaseless supply of the finest quality of soft-gel to markets in virtually every corner of the world....",
    },
    {
      title: "Spreading Worldwide",
      description:
        "MEDGEL is providing a ceaseless supply of the finest quality of soft-gel to markets in virtually every corner of the world....",
    },
    // {
    //   title: "This is a sample title",
    //   description: "This is a sample description",
    // },
    // {
    //   title: "What is Lorem Ipsum?",
    //   description:
    //     "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    // },
  ]);
  // const newsContainerRef = useRef<HTMLDivElement | null>(null);

  // useEffect(() => {
  //   const fetchNews = async () => {
  //     try {
  //       const news = await latestNews();
  //       setNewsList(news || []);
  //     } catch (error) {
  //       console.error("Failed to fetch news:", error);
  //     }
  //   };

  //   fetchNews();
  // }, []);

  // useEffect(() => {
  //   if (newsContainerRef.current && newsList.length > 0) {
  //     const container = newsContainerRef.current;

  //     const interval = setInterval(() => {
  //       if (container) {
  //         container.scrollTop += 4;
  //         if (
  //           container.scrollTop + container.offsetHeight >=
  //           container.scrollHeight
  //         ) {
  //           setNewsList((prevList) => [...prevList.slice(1), prevList[0]]);
  //           container.scrollTop = 0;
  //         }
  //       }
  //     }, 400);

  //     return () => clearInterval(interval);
  //   }
  // }, []);

  return (
    <div className="homelatest-medgel">
      <div className="homecontent">
        <h2 className="text-red-500">LATEST AT MEDGEL</h2>
        <div className="homenews-section">
          {/* <div className="homenews-list" ref={newsContainerRef}> */}
          <div className="homenews-list">
            <div className="homenews-list-title">MedGel Latest News</div>
            <div className="homenews-list-content">
              {newsList.length > 0 ? (
                newsList.map((news, index) => (
                  <div className="homenews-item" key={index}>
                    <h3 className="text-left">{news.title}</h3>
                    <p className="text-left">{news.description}</p>
                    <div className="flex content-start">
                      <a href="#read-more" className="homeread-more">
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
    </div>
  );
};

export default HomeNews;
