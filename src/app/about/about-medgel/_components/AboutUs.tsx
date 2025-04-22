import Image from "next/image";
import "./About.css";
import fetchOverview from "../fetch_about-medgel";


const About = async() => {

  const overview = await fetchOverview();
    console.log("overview check",overview)
    if (!overview) {
        return (
          <div className="medgel-overview">
            <h1 className="title">Medgel Overview</h1>
            <p>Error loading overview. Please try again later.</p>
          </div>
        );
      }
    return (
        <div className="medgel-overview">
            <h1 className="title">Medgel Overview</h1>
            <div className="quote-section">
                <blockquote className="quote">
                   {overview.overviewQuote}
                </blockquote>
                <cite className="quote-author">— Steven Snell Google</cite>
            </div>
            <div className="content-section">
                <div className="text-section">
                    <h2>{overview.page_title}</h2>
                    <p>
                        {overview.overviewPara1}
                    </p>
                    <p>
                    {overview.overviewPara2}
                    </p>
                </div>
                <div className="icon-section">
                    <Image
                        src= {overview.image1}
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
