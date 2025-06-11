import "./Portfolio.css";

const Portfolio = () => {
  return (
    <div className="portfolio-container">
      <h1 className="portfolio-title">OUR PORTFOLIO OF CARE</h1>
      <div className="portfolio-grid">
        {/* Top-left rectangle with text */}
        <div className="portfolio-item text-rectangle text-grid">
          <h3>From Care to Cure</h3>
          <p>
            With our growing scientific understanding of rare diseases, we
            shall continue to introduce groundbreaking therapies to give our
            patients their new beginnings!
          </p>
        </div>

        {/* Other grid items */}
        <div className="portfolio-item respiratory">
          <h3>RESPIRATORY</h3>
        </div>
        <div className="portfolio-item api">
          <h3>API</h3>
        </div>
        <div className="portfolio-item hiv">
          <h3>HIV / AIDS</h3>
        </div>
        <div className="portfolio-item oncology">
          <h3>ONCOLOGY</h3>
        </div>
        <div className="portfolio-item generics">
          <h3>GENERICS</h3>
        </div>        
        <div className="portfolio-item otc">
          <h3>OTC - HEALTH</h3>
        </div>
        <div className="portfolio-item diagnostics">
          <h3>DIAGNOSTICS</h3>
        </div>
        <div className="portfolio-item other-therapies">
          <h3>OTHER THERAPIES</h3>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
