"use client";
import React, { ReactNode } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuilding,
  faBoxes,
  faCogs,
  faToggleOn,
} from "@fortawesome/free-solid-svg-icons";
import "./CardRow.css";
import { CardRowType } from "../page";
import { PageObject } from "@/types";

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

const CardRow = ({
  children,
  data,
}: {
  children: ReactNode;
  data: PageObject<CardRowType>;
}) => {
  const cards = [
    {
      id: 1,
      icon: <ResponsiveIcon icon={faBuilding} />,
      // value: "11033",
      // description: "SITE AREA SQ.M",
      value: data.content.value1,
      description: data.content.description1,
    },
    {
      id: 2,
      icon: <ResponsiveIcon icon={faBoxes} />,
      // value: "3140",
      // description: "BUILT-UP AREA SQ.M",
      value: data.content.value2,
      description: data.content.description2,
    },
    {
      id: 3,
      icon: <ResponsiveIcon icon={faCogs} />,
      // value: "1619",
      // description: "MANUFACTURING AREA SQ.M",
      value: data.content.value3,
      description: data.content.description3,
    },
    {
      id: 4,
      icon: <ResponsiveIcon icon={faToggleOn} />,
      // value: "2500",
      // description: "MILLIONS PRODUCTION CAPACITY",
      value: data.content.value4,
      description: data.content.description4,
    },
  ];

  return (
    <>
      {children}
      <div className="homecard-row">
        {cards.map((card) => (
          <div key={card.id} className="homecard">
            <div className="homecardicon">{card.icon}</div>
            <div className="homecardvalue">{card.value}</div>
            <div className="homecarddescription">{card.description}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CardRow;
