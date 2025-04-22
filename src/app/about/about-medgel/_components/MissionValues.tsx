import React from "react";
import "./MissionValues.css";

import {fetchMission} from "../fetch_about-medgel";


const MissionValues = async () => {
  // Fetch the data synchronously
  const mission = await fetchMission();

  // Handle the case where mission data is not available
  if (!mission) {
    return <div>Error loading data. Please try again later.</div>;
  }

  return (
    <>
      
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
              {mission.coreValues.map((value, index) => (
                <div className="value-box" key={index}>
                  <h3>{value.valueHead}</h3>
                  {value.valuePoints.map((point, idx) => (
                    <p key={idx}>{point}</p>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* USP Section */}
          <section className="usp">
            <h2>USP of Medgel</h2>
            <ul>
              {mission.usp.map((usp, index) => (
                <li key={index}>{usp}</li>
              ))}
            </ul>
          </section>
        </div>
      
    </>
  );
};

export default MissionValues;
