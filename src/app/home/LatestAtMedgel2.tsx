"use client";

import React, { useEffect, useRef, useState } from "react";
import "./LatestAtMedgel2.css"; 
import { latestNews } from "./fetch_latestnews"; 

const LatestAtMedgel2: React.FC = () => {
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
                    container.scrollTop += 1; // Increment scroll position

                    // Check if we've reached the bottom
                    if (container.scrollTop + container.offsetHeight >= container.scrollHeight) {
                        // Append the first item to the end
                        setNewsList((prevList) => [...prevList.slice(1), prevList[0]]);
                        container.scrollTop = 0;
                    }
                }
            }, 9999); // Adjust interval for smoother scrolling

            return () => clearInterval(interval); // Cleanup on unmount
        }
    }, [newsList]);

    return (
        <div className="homelatest-medgel">
            <div className="homecontent">
                <h2>LATEST AT MEDGEL</h2>
                <div className="homenews-section">
                    <div className="homenews-image">
                        <img src="/images/news.png" alt="SoftGel Capsules" />
                    </div>
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
                </div>
            </div>
        </div>
    );
};

export default LatestAtMedgel2;
