import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <h4>About Us</h4>
          <ul>
            <li>Board of Directors</li>
            <li>Code of Conduct</li>
            <li>Committees of the Board</li>
            <li>Management Council</li>
            <li>Sustainability</li>
            <li>Manufacturing</li>
            <li>Milestones and Awards</li>
            <li>Our Credo</li>
            <li>Our History - Cipla Archives</li>
            <li>Quality</li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Our Therapies</h4>
          <ul>
            <li>Respiratory</li>
            <li>Asthma</li>
            <li>Pediatric Asthma</li>
            <li>COPD</li>
            <li>Nebulization</li>
            <li>HIV/AIDS</li>
            <li>Oncology</li>
            <li>Cipla Generics</li>
            <li>Covid Care</li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Investors</h4>
          <ul>
            <li>Quarterly Results</li>
            <li>Investor Presentation</li>
            <li>Annual Reports</li>
            <li>Corporate Governance</li>
            <li>Shareholding Pattern</li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Careers</h4>
          <ul>
            <li>Life at Cipla</li>
            <li>Business Functions</li>
            <li>Diversity & Inclusion</li>
            <li>Cipla University</li>
            <li>Join Us</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2023 Your Company Name. All Rights Reserved.</p>
        <p>Home | Contact Us | Privacy | Disclaimer | Terms & Conditions</p>
      </div>
    </footer>
  );
};

export default Footer;
