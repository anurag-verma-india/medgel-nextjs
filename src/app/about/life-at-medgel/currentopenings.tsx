"use client";
import "./currentopenings.css";

import React, { useState } from "react";

const CurrentOpenings = () => {
  // const [qcDepartmentOpen, setQcDepartmentOpen] = useState(false);
  const [qcDepartmentOpen, setQcDepartmentOpen] = useState(true);
  // const [qualityAssuranceDepartmentOpen, setQualityAssuranceDepartmentOpen] = useState(false);
  const [qualityAssuranceDepartmentOpen, setQualityAssuranceDepartmentOpen] =
    useState(true);

  const qcDepartmentOpenings = [
    {
      designation: "Executive",
      experience: "More than 5 yrs.",
      qualification: "M.sc.",
      jobDescription:
        "Should have exposure in Analytics method validation activity by HPLC",
      requirement: 1,
    },
    {
      designation: "Executive",
      experience: "More than 5 yrs.",
      qualification: "M.sc.",
      jobDescription:
        "Should have exposure in Analytics method validation activity by HPLC",
      requirement: 1,
    },
    {
      designation: "Executive",
      experience: "More than 5 yrs.",
      qualification: "M.sc.",
      jobDescription:
        "Should have exposure in Analytics method validation activity by HPLC",
      requirement: 1,
    },
    {
      designation: "Executive",
      experience: "More than 5 yrs.",
      qualification: "M.sc.",
      jobDescription:
        "Should have exposure in Analytics method validation activity by HPLC",
      requirement: 1,
    },
    {
      designation: "Executive",
      experience: "More than 5 yrs.",
      qualification: "M.sc.",
      jobDescription:
        "Should have exposure in Analytics method validation activity by HPLC",
      requirement: 1,
    },
  ];

  const qualityAssuranceDepartmentOpenings = [
    {
      designation: "Executive",
      experience: "More than 5 yrs.",
      qualification: "M.sc.",
      jobDescription:
        "Should have exposure in Analytics method validation activity by HPLC",
      requirement: 1,
    },
    {
      designation: "Executive",
      experience: "More than 5 yrs.",
      qualification: "M.sc.",
      jobDescription:
        "Should have exposure in Analytics method validation activity by HPLC",
      requirement: 1,
    },
    {
      designation: "Executive",
      experience: "More than 5 yrs.",
      qualification: "M.sc.",
      jobDescription:
        "Should have exposure in Analytics method validation activity by HPLC",
      requirement: 1,
    },
    {
      designation: "Executive",
      experience: "More than 5 yrs.",
      qualification: "M.sc.",
      jobDescription:
        "Should have exposure in Analytics method validation activity by HPLC",
      requirement: 1,
    },
    {
      designation: "Executive",
      experience: "More than 5 yrs.",
      qualification: "M.sc.",
      jobDescription:
        "Should have exposure in Analytics method validation activity by HPLC",
      requirement: 1,
    },
  ];

  const toggleQcDepartment = () => {
    setQcDepartmentOpen(!qcDepartmentOpen);
  };

  const toggleQualityAssuranceDepartment = () => {
    setQualityAssuranceDepartmentOpen(!qualityAssuranceDepartmentOpen);
  };

  return (
    <div className="current-openings-container">
      <h1 className="current-openings-title">Current Openings
        <div className="current-openings-underline"></div>

      </h1>
      <p className="current-openings-subtitle">
        What Inspires You, Inspires Us</p>
        <p className="current-openings-subtitle-description">
        {/* Added {"string"} because of ' (apostrophe) */}
        
        "Are you inspired to lead, learn, grow, and make a difference? You've come to the right place."
        
      </p>

      <div className="department-section">
        <div className="department-header" onClick={toggleQcDepartment}>
          <h2>QC Department</h2>
          <div className="department-header-underline"></div>
          <svg
            style={{ transform: 'translateX(-1rem)' }}
            className={`department-toggle-icon ${qcDepartmentOpen ? "rotate" : ""}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fb923c"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
        {qcDepartmentOpen && (
          <div className="department-openings">
            {qcDepartmentOpenings.map((opening, index) => (
              <div key={index} className="opening-card">
                <div className="opening-info">
                  <p className="opening-title"><span className="opening-bold">Designation :  </span>{opening.designation}</p>
                  <p className="opening-experience">
                    <span className="opening-bold">Experience :</span> {opening.experience}
                  </p>
                  <p className="opening-qualification">
                    <span className="opening-bold">Qualification :</span> {opening.qualification}
                  </p>
                  <p className="opening-description">
                    <span className="opening-bold">Job Description :</span> {opening.jobDescription}
                  </p>
                  <p className="opening-requirement">
                    <span className="opening-bold">Requirement : </span>{opening.requirement}
                  </p>
                </div>
                <button className="apply-btn">Apply Now</button>
              </div>
            ))}
          </div>
        )}
      </div>

      

      <div className="department-section">
        <div
          className="department-header"
          onClick={toggleQualityAssuranceDepartment}
        >
          <h2>Quality Assurance Department</h2>
          {/* <div className="department-header-underline"></div> */}
          <svg
            style={{ transform: 'translateX(-1rem)' }}
            className={`department-toggle-icon ${qualityAssuranceDepartmentOpen ? "rotate" : ""}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="#F9AD42"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
        {qualityAssuranceDepartmentOpen && (
          <div className="department-openings">
            {qualityAssuranceDepartmentOpenings.map((opening, index) => (
              <div key={index} className="opening-card">
                <div className="opening-info">
                  <h3 className="opening-title">{opening.designation}</h3>
                  <p className="opening-experience">
                    Experience: {opening.experience}
                  </p>
                  <p className="opening-qualification">
                    Qualification: {opening.qualification}
                  </p>
                  <p className="opening-description">
                    Job Description: {opening.jobDescription}
                  </p>
                  <p className="opening-requirement">
                    Requirement: {opening.requirement}
                  </p>
                </div>
                <button className="apply-btn">Apply Now</button>
              </div>
            ))}
          </div>
        )}
      </div>

      
    </div>
  );
};

export default CurrentOpenings;
