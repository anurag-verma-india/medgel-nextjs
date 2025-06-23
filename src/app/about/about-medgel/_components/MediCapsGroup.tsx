import React, { ReactNode } from "react";
import "./MediCapsGroup.css";
//import Image from "next/image";

// import fetchPage from "@/helpers/getPage";
// import { BasePageContent } from "@/types";

// interface GroupContent extends BasePageContent {
//   // page_title: string;
//   // overviewQuote: string;
//   // overviewPara1: string;
//   // overviewPara2: string;
//   // image1: string;
//   quote: string;
//   quote_by: string;
//   para1: string;
//   para2: string;
//   page_title: string;
// }

const MediCapsGroup = async ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => {
  // const title = "about-us/about-medgel$medicaps-group";
  // const fetchedGroup = await fetchPage<GroupContent>(title);

  //   const group : GroupContent = fetchedGroup.content;

  // // const fetchedMission = await fetchPage<missionContent>(title);
  // console.log("overview fetched:", fetchedMission);
  console.log("Title about-medgel medicaps group: ", title);

  return (
    <div className="MediCapsGroup-container">
      {children}
      <h1 className="MediCapsGroup-title">Medi-Caps Group</h1>

      <div className="MediCapsGroup-content-wrapper">
        <div className="MediCapsGroup-description-container">
          <div className="MediCapsGroup-text-content">
            <h2>Our Work speak louder than Words.</h2>
            <p>
              {
                "Today the group's activities span manufacturing of Hard Gelatin Capsule Shells, Education, Industrial Packaging & related products, Finance, Real Estate and is a renowned name in central India."
              }
            </p>
            <p>
              {
                "The Flagship Company Medi-Caps Limited has emerged as India's second largest & admired supplier of empty hard gelatin capsules."
              }
            </p>
          </div>
          <div className="MediCapsGroup-image-container">
            <img src="/images/CampusPhoto.png" alt="Medi-Caps Campus"></img>
          </div>
        </div>

        <div className="MediCapsGroup-companies-grid">
          <div className="MediCapsGroup-companies-column">
            <section className="MediCapsGroup-company-section">
              <h2>Pharma Company</h2>
              <ul>
                <li>MedGel Private Limited</li>
                <li>Medi-Caps Limited</li>
              </ul>
            </section>

            <section className="MediCapsGroup-company-section">
              <h2>Investment Companies</h2>
              <ul>
                <li>Medi-Caps Finance Ltd.</li>
                <li>Trapti Investment (P) Lyd.</li>
              </ul>
            </section>

            <section className="MediCapsGroup-company-section">
              <h2>Real Estate Company</h2>
              <ul>
                <li>R. K. Developer</li>
              </ul>
            </section>
          </div>

          <div className="MediCapsGroup-companies-column">
            <section className="MediCapsGroup-company-section">
              <h2>Educational Institutes</h2>
              <ul>
                <li>
                  Medi Caps Institute of Technology & Management (M.I.T.M)
                  (Engineering)
                </li>
                <li>Medi Caps Institute of Science & Technology (M.I.S.T.)</li>
                <li>Medi Caps Institute of Techno Management (MITM)</li>
                <li>
                  Medi Caps Institute of Technology & Management (M.I.T.M)
                  (Management)
                </li>
                <li>
                  International Institute of Foreign Trade & Research (IIFTR)
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediCapsGroup;
