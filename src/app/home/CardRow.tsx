  import React from "react";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import { faBuilding, faBoxes, faCogs, faToggleOn } from "@fortawesome/free-solid-svg-icons";
  import "./CardRow.css";

  const CardRow = () => {
    const cards = [
      {
        id: 1,
        icon: <FontAwesomeIcon icon={faBuilding} style={{ color: "#333", fontSize: "2rem" }} />,
        value: "11033",
        description: "SITE AREA SQ.M",
      },
      {
        id: 2,
        icon: <FontAwesomeIcon icon={faBoxes} style={{ color: "#333", fontSize: "2rem" }} />,
        value: "3140",
        description: "BUILT-UP AREA SQ.M",
      },
      {
        id: 3,
        icon: <FontAwesomeIcon icon={faCogs} style={{ color: "#333", fontSize: "2rem" }} />,
        value: "1619",
        description: "MANUFACTURING AREA SQ.M",
      },
      {
        id: 4,
        icon: <FontAwesomeIcon icon={faToggleOn} style={{ color: "#333", fontSize: "2rem" }} />,
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
