import "./ContractManufacturing.css";

const ContractManufacturing = () => {
  const services = [
    "Formulation Development.",
    "Specification of Raw and packing Materials.",
    "Complete testing of raw material to finished product.",
    "Documentation for international regulatory authorities.",
    "Lab. batch to trial bat. to pilot mfg.and transfer of tech.",
    "Stability studies as per ICH guidelines.",
    "Process, cleaning and Analytical method validation.",
    "Primary and secondary atomized packing facility into bulk Packing, blister, jars and bottles."
  ];

  const usp = [
    "Inline drying technology for the first time in Asia.",
    "Facility complying to meet the US cGMP regulation.",
    "Built on strong R&D, ARD and F&D infrastructure.",
    "Unilateral flow of raw material and packing material.",
    "Dedicated Air handling system.",
    "Well designed utilities like purified water, compressed air etc."
  ];

  return (
    <div className="CM-container">
      <div className="CM-tri">
        <header className="CM-header">
          <h1 className="CM-title">Contract<br /> Manufacturing</h1>
        </header>

        <div className="CM-image-grid">
          <img src='/images/ContractManufacturing1.png' alt='manufacturing-image1' />
          <img
            src="/images/gear.png"
            alt="Gear Icon"
            className="gear-icon"
          />
        </div>
        <div className="overlay-image">
          <img src="/images/contractmanufacturing2.png" alt="manufacturing-image2" />
        </div>
      </div>

      <p className="CM-description">
        Medgel is dedicated to provide the best services in contract manufacturing space, by manufacturing
        consistently quality products Global buyers. The manufacturing facility is equipped with best of the
        machinery and technology available in the market. The manufacturing facility is also backed with our
        esteemed QA/QC team which is responsible for all the quality tests of material from the time of entry
        through production till it reaches finish good stores and sold.
      </p>

      <div className="CM-services-container">
        <div className="CM-service-section">
          <h2 className="CM-section-title">We Offer The Following Services:-</h2>
          <ul className="CM-service-list">
            {services.map((service, index) => (
              <li key={index} className="CM-service-item">
                <span className="CM-checkmark">✓</span>
                {service}
              </li>
            ))}
          </ul>
        </div>

        <div className="CM-service-section">
          <h2 className="CM-section-title">USP Of Medgel:-</h2>
          <ul className="CM-service-list">
            {usp.map((item, index) => (
              <li key={index} className="CM-service-item">
                <span className="CM-checkmark">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ContractManufacturing;