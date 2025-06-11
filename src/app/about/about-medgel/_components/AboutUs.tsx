import Image from "next/image";
import "./About.css";

import fetchPage from "@/helpers/getPage";
import { BasePageContent } from "@/types";

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

const About = async () => {
  const title = "about/about-medgel$overview";

  // Fetching the overview content from the database
  const fetchedOverview = await fetchPage<OverviewContent>(title);
  console.log("overview fetched:", fetchedOverview);
  console.log("image:", fetchedOverview.images[0].url);

  const overview: OverviewContent = fetchedOverview.content;
  return (
    <div className="medgel-overview">
      <h1 className="title">{overview.page_title}</h1>
      <div className="quote-section">
        <blockquote className="quote">{overview.quote}</blockquote>
        <cite className="quote-author">— {overview.quote_by}</cite>
      </div>
      <div className="content-section">
        <div className="text-section">
          {/* <h2>{overview.page_title}</h2> */}
          <p>{overview.para1}</p>
          <p>{overview.para2}</p>
        </div>
        <div className="icon-section">
          <Image
            src={`${process.env.NEXT_PUBLIC_SITE_URL}/${fetchedOverview.images[0].url}`}
            alt="Shield and Hand Icon"
            className="icon"
            width={315}
            height={316}
          />
        </div>
      </div>
    </div>
  );
};

export default About;
