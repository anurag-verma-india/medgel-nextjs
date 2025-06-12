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
                            Our endeavor is to build a high performance and
                            meritocratic work culture with care as the
                            cornerstone.
                        </p>
                        <div className="faq-divider"></div>
                    </div>
                    <ul className="faq-list">
                        <li className="faq-item">
                            <button className="faq-button">
                                What is MedGel? <span className="arrow">→</span>
                            </button>
                        </li>
                        <li className="faq-item">
                            <button className="faq-button">
                                Life at MedGel <span className="arrow">→</span>
                            </button>
                        </li>
                        <li className="faq-item">
                            <button className="faq-button">
                                Recruitment Fraud{" "}
                                <span className="arrow">→</span>
                            </button>
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
