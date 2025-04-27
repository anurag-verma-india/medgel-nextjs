import './manufacturingchat.css';

const AContractManufacturing = () => {
  return (
    <div className="contract-manufacturing-container">
      <h1 className="contract-manufacturing-title">
        <span>Contract</span> <span className="contract-manufacturing-highlight">Manufacturing</span>
      </h1>
      <div className="contract-manufacturing-content">
        <div className="contract-manufacturing-image-section">
          <img
            src="/images/ContractManufacturing1.png" 
            alt="Machine 1"
            className="contract-manufacturing-image"
          />
          <img
            src="/images/contractmanufacturing2.png"
            alt="Machine 2"
            className="contract-manufacturing-image"
          />
        </div>
        <div className="contract-manufacturing-gears-section">
          <img
            src="/images/gear.png"
            alt="Gears Design"
            className="contract-manufacturing-gears"
          />
        </div>
      </div>
    </div>
  );
};

export default AContractManufacturing;
