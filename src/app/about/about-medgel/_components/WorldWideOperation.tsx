import "./WorldWideOperation.css"; //
//import {fetchWorldWide} from "../fetch";

import fetchPage from "@/helpers/getPage";
import { BasePageContent } from "@/types";
import Image from "next/image";
import { ReactNode } from "react";

interface WorldWideContent extends BasePageContent {
  para1: string;
  para2: string;
  para3: string;
}

const WorldWideOperation = async ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => {
  const fetchedWorldWide = await fetchPage<WorldWideContent>(title);

  const worldWide: WorldWideContent = fetchedWorldWide.content;

  return (
    <div className="WorldWideOperation-container">
      {children}
      <h1 className="WorldWideOperation-title">World Wide Operation</h1>

      <div className="WorldWideOperation-content">
        <div className="WorldWideOperation-map-section">
          <div className="WorldWideOperation-countries-list">
            <h2>
              Targeted Countries where
              <br />
              Product are exported :
            </h2>
            <ul>
              <li>USA</li>
              <li>UK</li>
              <li>Vietnam</li>
              <li>New Zealand</li>
              <li>Iran / Iraq</li>
              <li>Nigeria / Ghana, etc.</li>
            </ul>
          </div>

          {/* <div className="WorldWideOperation-map-container">
                    <img src="/images/map.png" alt="Targeted Countries"> </img>
                    </div> */}
        </div>

        <div className="WorldWideOperation-description">
          <p>{worldWide.para1}</p>

          <p>{worldWide.para2}</p>

          <p>{worldWide.para3}</p>
        </div>
      </div>
    </div>
  );
};
export default WorldWideOperation;
