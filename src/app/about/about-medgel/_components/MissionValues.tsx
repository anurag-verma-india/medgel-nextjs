import React, { ReactNode } from "react";
import "./MissionValues.css";

import fetchPage from "@/helpers/getPage";
import { BasePageContent } from "@/types";

interface missionContent extends BasePageContent {
  // page_title: string;
  // overviewQuote: string;
  // overviewPara1: string;
  // overviewPara2: string;
  // image1: string;
  mission: string;
  vision: string;
  valueHead1: string;
  valueHead2: string;
  valueHead3: string;
  valueHead4: string;
  valuePoint1: string;
  valuePoint2: string;
  valuePoint3: string;
  valuePoint4: string;
  usp1: string;
  usp2: string;
  usp3: string;
  usp4: string;
  usp5: string;
  usp6: string;
}

const MissionValues = async ({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) => {
  // Fetch the data synchronously

  // Handle the case where mission data is not available
  // if (!mission) {
  //   return <div>Error loading data. Please try again later.</div>;
  // }

  const fetchedMission = await fetchPage<missionContent>(title);
  console.log("overview fetched:", fetchedMission);

  const mission: missionContent = fetchedMission.content;

  //   const corevalues = mission.coreValues?.split("@") || [];
  // const coreValuesArray = corevalues.map((value) => {
  //   const [valueHead, ...valuePoints] = value.split("#");
  //   return {
  //     valueHead: valueHead.trim(),
  //     valuePoints: valuePoints.map((point) => point.trim()),
  //   };
  // });
  // const usp = mission.usp?.split("@") || [];
  return (
    <>
      {children}
      <div className="mission-values-container">
         
        {/* Mission and Vision Section */}
        <section className="mission-vision">
          <div className="mission">
            <h2>Our Mission</h2>
            <p>{mission.mission}</p>
          </div>
          <div className="vision">
            <h2>Our Vision</h2>
            <p>{mission.vision}</p>
          </div>
        </section>

        {/* Core Values Section */}
        <div className="core-values">
          <h2>Core Values</h2>
          <div className="values-grid">
            <div className="value-box">
              <h3>{mission.valueHead1}</h3>
              <p>{mission.valuePoint1}</p>
            </div>
            <div className="value-box">
              <h3>{mission.valueHead2}</h3>
              <p>{mission.valuePoint2}</p>
            </div>
            <div className="value-box">
              <h3>{mission.valueHead3}</h3>
              <p>{mission.valuePoint3}</p>
            </div>
            <div className="value-box">
              <h3>{mission.valueHead4}</h3>
              <p>{mission.valuePoint4}</p>
            </div>
          </div>
        </div>

        {/* USP Section */}
        <section className="usp">
          <h2>USP of Medgel</h2>
          <ul>
            <li>{mission.usp1}</li>
            <li>{mission.usp2}</li>
            <li>{mission.usp3}</li>
            <li>{mission.usp4}</li>
            <li>{mission.usp5}</li>
            <li>{mission.usp6}</li>
          </ul>
        </section>
      </div>
    </>
  );
};

export default MissionValues;
