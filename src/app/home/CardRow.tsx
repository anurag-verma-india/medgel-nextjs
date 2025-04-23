  "use client";
  import React from "react";
  import styled from "styled-components";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import { faBuilding, faBoxes, faCogs, faToggleOn } from "@fortawesome/free-solid-svg-icons";
  import "./CardRow.css";

  const ResponsiveIcon = styled(FontAwesomeIcon)`
  color: #333;
  width: 10rem;
  height: 5rem;
  

  @media (max-width: 768px) {
    width: 5rem;
    height: 2.5rem;
    padding-top: 1.5rem;
  }
`;

  const CardRow = () => {
    const cards = [
      {
        id: 1,
        icon: <ResponsiveIcon icon={faBuilding} />,
        value: "11033",
        description: "SITE AREA SQ.M",
      },
      {
        id: 2,
        icon: <ResponsiveIcon icon={faBoxes} />,
        value: "3140",
        description: "BUILT-UP AREA SQ.M",
      },
      {
        id: 3,
        icon: <ResponsiveIcon icon={faCogs} />,
        value: "1619",
        description: "MANUFACTURING AREA SQ.M",
      },
      {
        id: 4,
        icon: <ResponsiveIcon icon={faToggleOn} />,
        value: "2500",
        description: "MILLIONS PRODUCTION CAPACITY",
      },
    ];

    return (
      
      <div className="homecard-row">
        {cards.map((card) => (
          <div key={card.id} className="homecard">
            <div className="homecardicon">{card.icon}</div>
            <div className="homecardvalue">{card.value}</div>
            
            <div className="homecarddescription">{card.description}</div>
            
          </div>
        ))}
      </div>
    );
  };

  export default CardRow;
