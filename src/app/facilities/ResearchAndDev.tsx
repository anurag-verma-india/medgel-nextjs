import "./ResearchAndDev.css";

const ResearchDevelopment = () => {
  return (
    <div className="rd-container">
      <div className="rd-card">
        <div className="rd-image-section">
          <div className="rd-overlay">
            <h1 className="rd-title">
              Research & <br />Development
            </h1>
          </div>
        </div>
        
        <div className="rd-content">
          <h2 className="rd-services-title">We Offer The Following Services:-</h2>
          <ul className="rd-services-list">
            <li>Formulation Development.</li>
            <li>Specification of Raw and packing Materials.</li>
            <li>Complete testing of raw material to finished product.</li>
          </ul>
        </div>
      </div>
      </div>
  );
};

export default ResearchDevelopment;