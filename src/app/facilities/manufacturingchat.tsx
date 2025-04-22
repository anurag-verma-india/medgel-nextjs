import './manufacturingchat.css';

const aContractManufacturing = () => {
  return (
    <div className="contract-manufacturing-container">
      <h1 className="contract-manufacturing-title">
        <span>Contract</span> <span className="contract-manufacturing-highlight">Manufacturing</span>
      </h1>
      <div className="contract-manufacturing-content">
        <div className="contract-manufacturing-image-section">
          <img
            src="image1.jpg" 
            alt="Machine 1"
            className="contract-manufacturing-image"
          />
          <img
            src="image2.jpg"
            alt="Machine 2"
            className="contract-manufacturing-image"
          />
        </div>
        <div className="contract-manufacturing-gears-section">
          <img
            src="gears.png"
            alt="Gears Design"
            className="contract-manufacturing-gears"
          />
        </div>
      </div>
    </div>
  );
};

export default aContractManufacturing;
