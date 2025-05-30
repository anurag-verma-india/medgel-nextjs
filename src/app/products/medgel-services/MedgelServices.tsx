import "./MedgelServices.css";

const MedgelServices = () => {
    const services = [
        "Formulation Development.",
        "Specification Of Raw And Packing Materials.",
        "Complete Testing Of Raw Material To Finished Product.",
        "Documentation For International Regulatory Authorities.",
        "Lab. Batch To Trial Bat. To Pilot Mfg.And Transfer Of Tech.",
        "Stability Studies As Per ICH Guidelines.",
        "Process, Cleaning And Analytical Method Validation.",
        "Primary And Secondary Atomized Packing Facility Into Bulk Packing, Blister, Jars And Bottles.",
    ];

    return (
        <div className="medgelservices-container">
            <div className="medgelservices-header">
                <h1>MedGel Services</h1>
            </div>
            <div className="medgelservices-cardContainer">
                <div className="medgelservices-card">
                    <h2 className="medgelservices-mission">
                        Medgel Is Dedicated To Provide The Best Services In
                        Contract Manufacturing Space, By Manufacturing
                        Consistently Quality Products Global Buyers.
                    </h2>

                    <div className="medgelservices-services-section">
                        <h3>We Offer The Following Services:-</h3>
                        <div className="medgelservices-services-list">
                            {services.map((service, index) => (
                                <div
                                    key={index}
                                    className="medgelservices-service-item"
                                >
                                    <svg
                                        viewBox="0 0 24 24"
                                        className="medgelservices-checkmark"
                                    >
                                        <path
                                            fill="#FB923C"
                                            d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"
                                        />
                                    </svg>
                                    <span>{service}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {/* <div className="medgelservices-footer">
                    <div className="medgelservices-brochure-text">
                        Services Brochure
                    </div>
                    <button className="medgelservices-download-btn">
                        Download
                        <svg
                            className="medgelservices-arrow"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </button>
                </div> */}
            </div>
        </div>
    );
};

export default MedgelServices;
