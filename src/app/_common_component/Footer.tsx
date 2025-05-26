import React from "react";
import "./Footer.css";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <Link href={"/"}>
            <h4>Home</h4>
          </Link>
          <ul>
            <li></li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>About Us</h4>
          <ul>
            <Link href={"/about/life-at-medgel"}>
              <li>Life At Medgel</li>
            </Link>
            <Link href={"/about/awards_"}>
              <li>Awards & Accreditation</li>
            </Link>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Products</h4>
          <ul>
            <Link href={"/products/products-at-medgel"}>
              <li>Products at Medgel</li>
            </Link>
            <Link href={"/products/medgel-services"}>
              <li>About Medgel</li>
            </Link>
          </ul>
        </div>

        <div className="footer-column">
          <Link href={"/facilities"}>
            <h4>Facilities</h4>
          </Link>
        </div>
        <div className="footer-column">
          <Link href={"/contact"}>
            <h4>Contact us</h4>
          </Link>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 Medgel Pvt. Ltd. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
