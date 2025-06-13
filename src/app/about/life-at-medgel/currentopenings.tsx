"use client";
import { JobDepartmentTypeDB } from "@/types";
import "./currentopenings.css";

import React, { useEffect, useState } from "react";
import JobApplyPopup from "./JobApplyPopup";
// import DepartmentsEditPopup from "./DepartmentsEditPopup";
// import DepartmentsEditPopup from "./CDepartmentsEditPopup";
import DepartmentsEditPopup from "./C2DepartmentsEditPopup";

/*
Validate types on frontend as well as backend
string is valid string
number is valid number

If error occurred all errors array to user from backend
If error received from request Show that on the UI

Get resume file too in apply 
(Require email verification in job application)
Send resume and job details to a designated user email
(And save that in the database too (applications received) 
  - Make this page in a non blocking manner each operation (email, db save, console log, file log) in its separate try-catch so that one of them must happen
  - Make a folder and save resume there
  - Make sure that you console log job details received
  - Log applications received in a log file
)


---
Display opening dynamically from js obj

Make api to handle operations

*/
/*
Apply now button displays job information of the given job opening
Has fields for name, email, phone number, and resume upload
Calls an API to submit the application

Make an API to handle job applications


*/
const CurrentOpenings = () => {
  // Fetch job openings from an API or database
  const [jobOpenings, setJobOpenings] = useState<JobDepartmentTypeDB[]>([]);
  const [masterPopupVisible, setMasterPopupVisible] = useState(false);

  const openCloseMasterPopup = () => {
    setMasterPopupVisible(!masterPopupVisible);
  };

  useEffect(() => {
    const fetchJobOpenings = async () => {
      try {
        const response = await fetch("/api/job_openings");
        if (!response.ok) {
          throw new Error("Failed to fetch job openings");
        }
        const data = await response.json();

        console.log("Fetched job opening departments:", data.departments);

        setJobOpenings(data.departments || []);
      } catch (error) {
        console.error("Error fetching job openings:", error);
      }
    };
    fetchJobOpenings();
  }, [masterPopupVisible]);
  // Return an empty fragment if no job openings are available
  // This can be replaced with a message or a loading state
  if (!jobOpenings || jobOpenings.length === 0) {
    return (
      <div className="current-openings-container">
        <h1 className="current-openings-title">
          Current Openings
          <div className="current-openings-underline"></div>
        </h1>
        <p className="current-openings-subtitle-description">
          No current openings available.
        </p>
      </div>
    );
  }
  return (
    <>
      {/* <JobApplyPopup /> */}
      {/* <DepartmentsEditPopup /> */}
      <DepartmentsEditPopup
        popupState={masterPopupVisible}
        popupOpenFn={openCloseMasterPopup}
      />

      <div className="current-openings-container">
        <h1 className="current-openings-title">
          Current Openings
          <div className="current-openings-underline"></div>
        </h1>
        <p className="current-openings-subtitle">
          What Inspires You, Inspires Us
        </p>
        <p className="current-openings-subtitle-description">
          {
            "Are you inspired to lead, learn, grow, and make a difference? You've come to the right place."
          }
        </p>
        <div className="department-section">
          {jobOpenings.map((department) => (
            <div
              key={department.department_name}
              className="department-section"
            >
              <div className="department-header">
                <h2>{department.department_name}</h2>
                <div className="department-header-underline"></div>
              </div>
              <div className="department-openings">
                {department.jobs.map((job) => (
                  <div key={job._id} className="opening-card">
                    <div className="opening-info">
                      <p className="opening-title">
                        <span className="opening-bold">Designation: </span>
                        {job.designation}
                      </p>
                      <p className="opening-experience">
                        <span className="opening-bold">Experience: </span>
                        {job.experience}
                      </p>
                      <p className="opening-qualification">
                        <span className="opening-bold">Qualification: </span>
                        {job.qualification}
                      </p>
                      <p className="opening-description">
                        <span className="opening-bold">Job Description: </span>
                        {job.job_description}
                      </p>
                      <p className="opening-requirement">
                        <span className="opening-bold">Requirement: </span>
                        {job.requirement}
                      </p>
                    </div>
                    <button className="apply-btn">Apply Now</button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default CurrentOpenings;
