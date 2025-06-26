// import { Weight } from "lucide-react";
import "./Tech.css";

const TechnologySection = () => {
  return (
    <div className="tech-container">
      <h1 className="tech-title">Technology</h1>

      <div className="intro-text">
        As a dedicated contract manufacturer of Soft gelatin Capsules MedGel is
        capable to produce any product which falls in the following category :-
      </div>

      <section className="category-section">
        <h2 className="category-title">Therapeutic:-</h2>
        <p>
          Cardiac drug, Bronchodilator, Antioxidant, Anti Histamine, Anti
          Hypertensive, Analgesic and Antipyretic, Anti Inflammatory,
          Decongestant, erectile Dysfunction.
        </p>
      </section>

      <section className="category-section">
        <h2 className="category-title">Nutraceutical:-</h2>
        <p>
          Multivitamin Multimineral Capsules and various other combination of
          Aloe-vera, Ginseng Q10,Evening Primrose oil, Lycopene, leutin,
          GlucoamineSulphate, Carotenoid, Quercetin, Soya Iso flavonoid, Rutin.
        </p>
        <ul className="product-list">
          <li>Herbal Product</li>
          <li>Cosmetic Product</li>
        </ul>
      </section>

      <div className="equipment-grid">

        <div className="equipment-item">
          <img
            src="/images/CapsuleSortingM.png"
            alt="Capsule Sorting Machine"
            className="equipment-image"
          />
          <div className="equipment-details">
            <h3>Automatic Bottle Packing Line</h3>
            <p>
              <span className="boldClass">Capacity:</span> 15
              Bottles Per Minute.
            </p>
            <p><span className="boldClass">Bottle Type:</span> Glass/HDPE</p>
            <p><span className="boldClass">Bottle Size:</span> 30ml to 1000ml</p>
          </div>
        </div>

        <div className="equipment-item">
          <img
            src="/images/CapsuleSortingM.png"
            alt="Capsule Sorting Machine"
            className="equipment-image"
          />
          <div className="equipment-details">
            <h3>Automatic Capsule Sorting Machine</h3>
            <p>
              <span className="boldClass">Sorting Capacity:</span> 100,000
              capsules per hour.
            </p>
            <p><span className="boldClass">Sorting limit size:</span> 3 to 20mm.</p>
          </div>
        </div>

        <div className="equipment-item">
          <img
            src="/images/BlisterPackagingM.png"
            alt="Blister Packaging Machine"
            className="equipment-image"
          />
          <div className="equipment-details">
            <h3>Blister Packaging Machine</h3>
            <ul>
              <li>ROTOVAC 210</li>
              <li>1 HP, ROTOVAC 210V, 1600(cap)</li>
              <li>
                230 XT Three lines of blister Packaging with packing capacity of
                329 million blisters per annum.
              </li>
            </ul>
          </div>
        </div>

        <div className="equipment-item">
          <img
            src="/images/ChillerM.png"
            alt="Chiller"
            className="Chiller Machine"
          />
          <div className="equipment-details">
            <h3>Chiller</h3>
            <p><span className="boldClass">Chillers:</span> 2 Nos</p>
            <p><span className="boldClass">Chiller1:</span> 128 TR</p>
            <p><span className="boldClass">Chiller2:</span> 210 TR</p>
          </div>
        </div>

        

        <div className="equipment-item">
          <img
            src="/images/DGSet.png"
            alt="DG Set"
            className="equipment-image"
          />
          <div className="equipment-details">
            <h3>DG Set</h3>
            <p>
              DG Sets 600 KVA – 2 Nos Provides Continuous power supply for
              smooth running of organization.
            </p>
          </div>
        </div>

        <div className="equipment-item">
          <img
            src="/images/FuelSource.png"
            alt="Fuel Source"
            className="equipment-image"
          />
          <div className="equipment-details">
            <h3>Fuel Source</h3>
            <p>Furnace & Diesel Oil Tank: 15 KL</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnologySection;
