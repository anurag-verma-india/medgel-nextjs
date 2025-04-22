import './EHS.css';
import Header from "app/pages/_common_component/Header";

import {fetchEHS} from "../fetch";

const EHSSection = async () => {

  const ehs = await fetchEHS();

  return (
    <div className="ehs-container">
      <div className="ehs-content">
        <h1 className="ehs-title">
          Environment, Health & Safety
        </h1>

        <h2 className="ehs-subtitle">
         {ehs.title} 
        </h2>

        <div className="ehs-text">
          <p>
            {ehs.description}
          </p>

          <p>
            {ehs.description_1}
          </p>
        </div>
      </div>
      </div>
  );
};

export default EHSSection;