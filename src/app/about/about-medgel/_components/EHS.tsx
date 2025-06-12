import './EHS.css';
//import Header from "app/pages/_common_component/Header";

//import {fetchEHS} from "../fetch";

import fetchPage from "@/helpers/getPage";
import { BasePageContent } from "@/types";

interface ehsContent extends BasePageContent {
  // page_title: string;
  // overviewQuote: string;
  // overviewPara1: string;
  // overviewPara2: string;
  // image1: string;
  
  description: string;
  para1: string;
  para2: string;
  
}

const EHSSection = async () => {
  const title = "about-us/about-medgel$ehs";
  


  const fetchedehs = await fetchPage<ehsContent>(title);
  console.log("EHS fetched:", fetchedehs);
  const ehs: ehsContent = fetchedehs.content;
  
  return (
    <div className="ehs-container">
      <div className="ehs-content">
        <h1 className="ehs-title">
          Environment, Health & Safety
        </h1>

        <h2 className="ehs-subtitle">
         {ehs.description} 
        </h2>

        <div className="ehs-text">
          <p>
            {ehs.para1}
          </p>

          <p>
            {ehs.para2}
          </p>
        </div>
      </div>
      </div>
  );
};

export default EHSSection;