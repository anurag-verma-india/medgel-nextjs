import "./Bpurpose.css";

const Bpurpose = () => {
    const navItems = [
        "Our Purpose",
        "Illness To Wellness",
        "Our People. Our Pride.",
        "BREATH. THINK.",
        "Towards A Sustainable Future",
    ];

    return (
        <div className="purpose-nav">
            {navItems.map((item, index) => (
                <div key={index} className={`nav-item`}>
                    <span className="nav-icon">🌐</span>
                    <p>{item}</p>
                </div>
            ))}
        </div>
    );
};
export default Bpurpose;
