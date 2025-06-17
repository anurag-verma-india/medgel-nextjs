import Image from "next/image";
import "./About.css";

import fetchPage from "@/helpers/getPage";
import { BasePageContent } from "@/types";
import { ReactNode } from "react";

interface OverviewContent extends BasePageContent {
  // page_title: string;
  // overviewQuote: string;
  // overviewPara1: string;
  // overviewPara2: string;
  // image1: string;

  quote: string;
  quote_by: string;
  para1: string;
  para2: string;
  page_title: string;
}

const About = async ({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) => {
  // Fetching the overview content from the database
  const fetchedOverview = await fetchPage<OverviewContent>(title);
  // console.log("overview fetched:", fetchedOverview);
  // console.log("image:", fetchedOverview.images[0].url);

  const overview: OverviewContent = fetchedOverview.content;
  return (
    <>
      {children}
      <div className="medgel-overview">
        <h1 className="medgel-overview-title">{overview.page_title}</h1>
        <div className="medgel-overview-quote-section">
          <blockquote className="medgel-overview-quote">
            {overview.quote}
          </blockquote>
          <cite className="medgel-overview-quote-author">
            — {overview.quote_by}
          </cite>
        </div>
        <div className="medgel-overview-content-section">
          <div className="medgel-overview-text-section">
            {/* <h2>{overview.page_title}</h2> */}
            <p>{overview.para1}</p>
            <p>{overview.para2}</p>
          </div>
          <div className="medgel-overview-icon-section">
            <Image
              src={`${process.env.NEXT_PUBLIC_SITE_URL}/${fetchedOverview.images[0].url}`}
              alt="Shield and Hand Icon"
              className="medgel-overview-icon"
              width={315}
              height={316}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
