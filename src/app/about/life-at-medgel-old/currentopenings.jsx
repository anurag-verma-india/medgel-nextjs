"use client";

import React, { useState } from 'react';

const CurrentOpenings = () => {
  const [qcDepartmentOpen, setQcDepartmentOpen] = useState(false);
  const [qualityAssuranceDepartmentOpen, setQualityAssuranceDepartmentOpen] = useState(false);

  const qcDepartmentOpenings = [
    {
      designation: 'Executive',
      experience: 'More than 5 yrs.',
      qualification: 'M.sc.',
      jobDescription: 'Should have exposure in Analytics method validation activity by HPLC',
      requirement: 1,
    },
    {
      designation: 'Executive', 
      experience: 'More than 5 yrs.',
      qualification: 'M.sc.',
      jobDescription: 'Should have exposure in Analytics method validation activity by HPLC',
      requirement: 1,
    },
    {
      designation: 'Executive',
      experience: 'More than 5 yrs.',
      qualification: 'M.sc.',
      jobDescription: 'Should have exposure in Analytics method validation activity by HPLC',
      requirement: 1,
    },
    {
      designation: 'Executive',
      experience: 'More than 5 yrs.',
      qualification: 'M.sc.',
      jobDescription: 'Should have exposure in Analytics method validation activity by HPLC',
      requirement: 1,
    },
    {
      designation: 'Executive',
      experience: 'More than 5 yrs.',
      qualification: 'M.sc.',
      jobDescription: 'Should have exposure in Analytics method validation activity by HPLC',
      requirement: 1,
    },
  ];

  const qualityAssuranceDepartmentOpenings = [
    {
      designation: 'Executive',
      experience: 'More than 5 yrs.',
      qualification: 'M.sc.',
      jobDescription: 'Should have exposure in Analytics method validation activity by HPLC',
      requirement: 1,
    },
    {
      designation: 'Executive',
      experience: 'More than 5 yrs.',
      qualification: 'M.sc.',
      jobDescription: 'Should have exposure in Analytics method validation activity by HPLC',
      requirement: 1,
    },
    {
      designation: 'Executive',
      experience: 'More than 5 yrs.',
      qualification: 'M.sc.',
      jobDescription: 'Should have exposure in Analytics method validation activity by HPLC',
      requirement: 1,
    },
    {
      designation: 'Executive',
      experience: 'More than 5 yrs.',
      qualification: 'M.sc.',
      jobDescription: 'Should have exposure in Analytics method validation activity by HPLC',
      requirement: 1,
    },
    {
      designation: 'Executive',
      experience: 'More than 5 yrs.',
      qualification: 'M.sc.',
      jobDescription: 'Should have exposure in Analytics method validation activity by HPLC',
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
      <h1 className="current-openings-title">Current Openings</h1>
      <p className="current-openings-subtitle">
        What Inspires You Inspires Us<br />
        Are you inspired to lead, learn, grow, and make a difference? You've come to the right place.
      </p>

      <div className="department-section">
        <div className="department-header" onClick={toggleQcDepartment}>
          <h2>QC Department</h2>
          <div className="department-header-underline"></div>
          <svg
            className={`department-toggle-icon ${qcDepartmentOpen ? 'rotate' : ''}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
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
                  <h3 className="opening-title">{opening.designation}</h3>
                  <p className="opening-experience">Experience: {opening.experience}</p>
                  <p className="opening-qualification">Qualification: {opening.qualification}</p>
                  <p className="opening-description">Job Description: {opening.jobDescription}</p>
                  <p className="opening-requirement">Requirement: {opening.requirement}</p>
                </div>
                <button className="apply-btn">Apply Now</button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="department-section">
        <div className="department-header" onClick={toggleQualityAssuranceDepartment}>
          <h2>Quality Assurance Department</h2>
          <div className="department-header-underline"></div>
          <svg
            className={`department-toggle-icon ${qualityAssuranceDepartmentOpen ? 'rotate' : ''}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
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
                  <p className="opening-experience">Experience: {opening.experience}</p>
                  <p className="opening-qualification">Qualification: {opening.qualification}</p>
                  <p className="opening-description">Job Description: {opening.jobDescription}</p>
                  <p className="opening-requirement">Requirement: {opening.requirement}</p>
                </div>
                <button className="apply-btn">Apply Now</button>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>
        {`
        .current-openings-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 20px;
        }

        .current-openings-title {
          font-size: 2.5rem;
          color: #0D9488;
          text-align: center;
          margin-bottom: 16px;
        }

        .current-openings-subtitle {
          font-size: 1.25rem;
          text-align: center;
          color: #333;
          margin-bottom: 32px;
        }

        .department-section {
          margin-bottom: 40px;
        }

        .department-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          cursor: pointer;
        }

        .department-header h2 {
          font-size: 1.75rem;
          color: #0D9488;
          margin-bottom: 8px;
        }

        .department-header-underline {
          width: 128px;
          height: 4px;
          background-color: #FB923C;
        }

        .department-toggle-icon {
          width: 24px;
          height: 24px;
          transition: transform 0.3s;
        }

        .department-toggle-icon.rotate {
          transform: rotate(180deg);
        }

        .department-openings {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          grid-gap: 24px;
        }

        .opening-card {
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          padding: 24px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .opening-title {
          font-size: 1.25rem;
          color: #0D9488;
          margin-bottom: 8px;
        }

        .opening-experience,
        .opening-qualification,
        .opening-description,
        .opening-requirement {
          font-size: 0.95rem;
          color: #333;
          margin-bottom: 8px;
        }

        .apply-btn {
          background-color: #0D9488;
          color: white;
          border: none;
          border-radius: 4px;
          padding: 8px 16px;
          font-size: 1rem;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .apply-btn:hover {
          background-color: #0F766E;
        }

        @media (max-width: 768px) {
          .current-openings-title {
            font-size: 2rem;
          }

          .current-openings-subtitle {
            font-size: 1.1rem;
          }

          .department-header h2 {
            font-size: 1.5rem;
          }

          .opening-card {
            padding: 20px;
          }

          .opening-title {
            font-size: 1.1rem;
          }

          .opening-experience,
          .opening-qualification,
          .opening-description,
          .opening-requirement {
            font-size: 0.9rem;
          }

          .apply-btn {
            font-size: 0.95rem;
          }
        }

        @media (max-width: 480px) {
          .current-openings-title {
            font-size: 1.75rem;
          }

          .current-openings-subtitle {
            font-size: 1rem;
          }

          .department-header h2 {
            font-size: 1.25rem;
          }

          .opening-card {
            padding: 16px;
          }

          .opening-title {
            font-size: 1rem;
          }

          .opening-experience,
          .opening-qualification,
          .opening-description,
          .opening-requirement {
            font-size: 0.85rem;
          }

          .apply-btn {
            font-size: 0.9rem;
          }
        }
        `}
      </style>
    </div>
  );
};

export default CurrentOpenings;