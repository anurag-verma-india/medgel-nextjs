import "./manufacturing.css";

{
  /* <img src="/images/Manufacturing.jpg" alt="yabadabidoo"  className='manufacturing-title-box-image'/> */
}

const ManufacturingSection = () => {
  return (
    <div className="manufacturing-container">
      <div className="manufacturing-whitebg">
        <div className="manufacturing-title-box">
          <div className="transparent-col"></div>
        </div>

        <div className="manufacturing-title">
          <h1>Manufacturing</h1>
        </div>
      </div>

      <div className="manufacturing-content-section">
        <p className="manufacturing-description">
          The plant is equipped with modern high speed machines to get
          consistent quality. Manufacturing line is equipped with three
          dedicated encapsulation lines with Inline tumbler drying. Production
          Capacity of 6.0 billion capsules a year. Main Plant built up area of
          80000Sq.Ft. QA, QC, F&D-11000 Sq. Ft. Primary Manufacturing Area is of
          joint free epoxy flooring and epoxy coving. Area Classification Class
          100,000 under controlled temperature and humidity.
        </p>

        <p className="manufacturing-description">
          Utility services are provided without disturbing the primary
          manufacturing area through walk able ceilings at 3 meters height.
          Service area is independent for HVAC systems.
        </p>

        <p className="manufacturing-description">
          Additional four Encapsulation machines can be installed, to meet the
          future demand for any dedicated specific product, products or
          buyer&#39;s requirement. Integrated rotary packaging lines are
          installed to be cost effective.
        </p>

        <div className="manufacturing-stats-container">
          <div className="manufacturing-stat-item">
            <h2>650+</h2>
            <p>Unique Jwellery Pieces</p>
            {/* <hr/> */}
          </div>
          <div className="manufacturing-stat-item vl">
            <h2>47+</h2>
            <p>International Awards</p>
            {/* <hr /> */}
          </div>
          <div className="manufacturing-stat-item vl">
            <h2>12+</h2>
            <p>Years On The Market</p>
            {/* <hr /> */}
          </div>
          <div className="manufacturing-stat-item vl">
            <h2>550k</h2>
            <p>Customer&#39;s Feedback</p>
            {/* <hr /> */}
          </div>
        </div>

        <p className="manufacturing-description">
          Confirmation of each processing stage with class of cleanliness; viz.
          100,000 with respect to room air changes, pressure, particle count,
          flow direction etc.
        </p>

        <p className="manufacturing-description">
          The area is divided into Primary & Secondary manufacturing as the
          number of entries will be restricted in the Primary area.
        </p>

        <p className="manufacturing-description">
          Primary area is under microbial count and particulate matters. All
          systems are periodically checked as per international regulatory
          standard to comply with the same in latest guidelines issued by WHO.
        </p>
      </div>
    </div>
  );
};

export default ManufacturingSection;
