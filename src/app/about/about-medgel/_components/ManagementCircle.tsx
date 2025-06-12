import React from "react";
import "./ManagementCircle.css";

const topManagement = [
  {
    name: "Mr. R C Mittal",
    title: "Chairman",
    img: "/aboutUsImg/img2.png",
  },
  {
    name: "Mr. Alok K.Garg",
    title: "Vice-Chairman",
    img: "/aboutUsImg/img3.png",
  },
];

const lowerManagement = [
  {
    name: "Dr. Shashi Kant Sharma Verma",
    title: "Director",
    img: "/aboutUsImg/img3.png",
  },
  {
    name: "Mr. Praveen Nalwaya",
    title: "Director",
    img: "/aboutUsImg/img1.png",
  },
];

const ManagementCircle = () => {
  return (
    <div className="management-container">
      <h1 className="title">Management Circle</h1>
      <div className="management-row">
        {topManagement.map((person, index) => (
          <div key={index} className="management-card raised-card">
            <img src={person.img} alt={person.name} />
            <h2>{person.name}</h2>
            <p>{person.title}</p>
          </div>
        ))}
      </div>
      <div className="lower-management">
        {lowerManagement.map((person, index) => (
          <div key={index} className="management-card">
            <img src={person.img} alt={person.name} />
            <h2>{person.name}</h2>
            <p>{person.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManagementCircle;
