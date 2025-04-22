import './manufacturing.css';

const ManufacturingSection = () => {
  return (
    <div className="manufacturing-container">
      <div className='whitebg'>
        <div className="manufacturing-title-box">
          <img src="/images/Manufacturing.jpg" alt="yabadabidoo" />
        </div>
      </div>

      <div className="content-section">
        <p className="description">
            The plant is equipped with modern high speed machines to get consistent quality. Manufacturing line is equipped with three dedicated encapsulation lines with Inline tumbler drying. Production Capacity of 6.0 billion capsules a year. Main Plant built up area of 80000Sq.Ft. QA, QC, F&D-11000 Sq. Ft. Primary Manufacturing Area is of joint free epoxy flooring and epoxy coving. Area Classification Class 100,000 under controlled temperature and humidity.
        </p>

        <p className="description">
          Utility services are provided without disturbing the primary manufacturing area through walk able ceilings at 3 meters height. Service area is independent for HVAC systems.
        </p>

        <p className="description">
          Additional four Encapsulation machines can be installed, to meet the future demand for any dedicated specific product, products or buyer's requirement. Integrated rotary packaging lines are installed to be cost effective.
        </p>

        <div className="stats-container">
          <div className="stat-item">
            <h2>650+</h2>
            <p>Unique Jwellery Pieces</p>
            <hr/>
          </div>
          <div className="stat-item">
            <h2>47+</h2>
            <p>International Awards</p>
            <hr />
          </div>
          <div className="stat-item">
            <h2>12+</h2>
            <p>Years On The Market</p>
            <hr />
          </div>
          <div className="stat-item">
            <hr />
            <h2>550k</h2>
            <p>Customer's Feedback</p>
          </div>
        </div>

        <p className="description">
          Confirmation of each processing stage with class of cleanliness; viz. 100,000 with respect to room air changes, pressure, particle count, flow direction etc.
        </p>

        <p className="description">
          The area is divided into Primary & Secondary manufacturing as the number of entries will be restricted in the Primary area.
        </p>

        <p className="description">
          Primary area is under microbial count and particulate matters. All systems are periodically checked as per international regulatory standard to comply with the same in latest guidelines issued by WHO.
        </p>
      </div>
      </div>
  );
};

export default ManufacturingSection;