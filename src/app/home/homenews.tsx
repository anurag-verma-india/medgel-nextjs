"use client";

import React, { useEffect, useRef, useState } from "react";
import "./homenews.css"; 
import { latestNews } from "./fetch_latestnews"; 

const HomeNews: React.FC = () => {
    const [newsList, setNewsList] = useState<any[]>([]); 
    const newsContainerRef = useRef<HTMLDivElement | null >( null );

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const data = await latestNews();
                setNewsList(data.latestnews || []);
            } catch (error) {
                console.error("Failed to fetch news:", error);
            }
        };

        fetchNews();
    }, []);

    useEffect(() => {
        if (newsContainerRef.current && newsList.length > 0) {
            const container = newsContainerRef.current;

            const interval = setInterval(() => {
                if (container) {
                    container.scrollTop += 4;
                    if (container.scrollTop + container.offsetHeight >= container.scrollHeight) {
                        setNewsList((prevList) => [...prevList.slice(1), prevList[0]]);
                        container.scrollTop = 0;
                    }
                }
            }, 400); 

            return () => clearInterval(interval);
        }
    }, [newsList]);

    return (
        <div className="homelatest-medgel">
            <div className="homecontent">
                <h2>LATEST AT MEDGEL</h2>
                <div className="homenews-section">
                    
                    <div
                        className="homenews-list"
                        ref={newsContainerRef}
                    >
                        {newsList.length > 0 ? (
                            newsList.map((news, index) => (
                                <div className="homenews-item" key={index}>
                                    <h3>{news.news_title}</h3>
                                    <p>{news.news_description}</p>
                                    <a href="#read-more" className="homeread-more">
                                        Read More
                                    </a>
                                    <div className="homehalf-line"></div>
                                </div>
                            ))
                        ) : (
                            <p>No latest news available</p>
                        )}
                    </div>
                    <div className="homenews-image">
                        <img src="/images/news.png" alt="SoftGel Capsules" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeNews;
