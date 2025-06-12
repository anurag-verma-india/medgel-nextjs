import "./Cpurpose.css";

const Cpurpose = () => {
  return (
    <section className="purpose-section">
      <h2 className="purpose-title">ARE YOU DRIVEN BY PURPOSE?</h2>
      <div className="purpose-content">
        <div className="faq-card">
          <div className="faq-header">
            <div className="faq-icon">🔍</div>
            <h3 className="faq-title">FAQs</h3>
            <p className="faq-description">
              Our endeavor is to build a high performance and meritocratic work
              culture with care as the cornerstone.
            </p>
            <div className="faq-divider"></div>
          </div>
          <ul className="faq-list">
            <li className="faq-item">
              <a href="about/about-medgel" target="_">
                <button className="faq-button">
                  What is MedGel?
                  <div className="mr-3" />
                  <span className="arrow"> →</span>
                </button>
              </a>
            </li>
            <li className="faq-item">
              <a href="quality" target="_">
                <button className="faq-button">
                  Quality and Compliance
                  <div className="mr-3" />
                  <span className="arrow">→</span>
                </button>
              </a>
            </li>
            <li className="faq-item">
              <a href="facilities" target="_">
                <button className="faq-button">
                  Medgel Facilities
                  <div className="mr-3" />
                  <span className="arrow">→</span>
                </button>
              </a>
            </li>
          </ul>
        </div>

        <div className="image-containerc">
          <img
            src="/images/Cpurpose.png"
            alt="Team collaboration"
            className="purpose-imagec"
          />
        </div>
      </div>
    </section>
  );
};

export default Cpurpose;
