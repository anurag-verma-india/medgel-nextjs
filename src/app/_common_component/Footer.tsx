import React from "react";
import "./Footer.css";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* <div className="footer-column">
          <Link href={"/"}>
            <h4>Home</h4>
          </Link>JS, CSS and
 JS, CSS anudiv> */}
        <div className="footer-column">
          <div className="footer-logo">
            <img src="/medgel-logo.svg" alt="medgel-logo" />
          </div>
          <h4>Contact Details</h4>
          <ul className="md:text-left">
            {/* <Link href={"/about/life-at-medgel"}>
              <li>Life At Medgel</li>
            </Link> */}
            <Link href={"/about/awards_"}>
              <li>Awards & Accreditation</li>
            </Link>

            <li>
              <span className="pr-3 text-xl font-bold">Phone: </span>
              +91-07292-256205
            </li>
            <li>
              <span className="invisible pr-3 text-xl font-bold">Phone: </span>
              +91-07292-256205
            </li>
            <li>
              <span className="pr-3 text-xl font-bold">Email: </span>
              <span className="text-[15px] md:text-[1.1rem]">
                marketing@medgel.net
              </span>
            </li>
          </ul>
        </div>

        <div className="footer-column pl-5">
          <h4>Quick links</h4>
          <ul className="text-2xl underline">
            <Link href={"/"}>
              <li>Home</li>
            </Link>
            <Link href={"/facilities"}>
              <li>Facilities</li>
            </Link>
            <Link href={"/investor"}>
              <li>Investor Relations</li>
            </Link>
            <Link href={"/quality"}>
              <li>Quality & Compliance</li>
            </Link>
            <Link href={"/careers"}>
              <li>Careers</li>
            </Link>
          </ul>
        </div>

        {/* <div className="footer-column">
          <h4>Products</h4>
          <ul>
            <Link href={"/products/products-at-medgel"}>
              <li>Products at Medgel</li>
            </Link>
            <Link href={"/products/medgel-services"}>
              <li>About Medgel</li>
            </Link>
          </ul>
        </div> */}

        {/* <div className="footer-column">
          <Link href={"/facilities"}>
            <h4>About Us </h4>
          </Link>
        </div>
        <div className="footer-column">
          <Link href={"/contact"}>
            <h4>Contact us</h4>
          </Link>
        </div> */}

        {/* <ul className="text-2xl underline">
            <Link href={"/products/products-at-medgel"}>
              <li>Home</li>
            </Link>
            <Link href={"/products/medgel-services"}>
              <li>Facilities</li>
            </Link>
            <Link href={"/products/medgel-services"}>
              <li>Investor Relations</li>
            </Link>
            <Link href={"/products/medgel-services"}>
              <li>Quality & Compliance</li>
            </Link>
          </ul> */}

        <div className="footer-column">
          <h4>About Us</h4>
          <ul className="list-disc pl-8 underline">
            <Link href={"/about/about-medgel"}>
              <li>About Medgel</li>
            </Link>
            <Link href={"/about/awards_"}>
              <li>Awards and Accrediation</li>
            </Link>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Products</h4>
          <ul className="list-disc pl-8 underline">
            <Link href={"products/products-at-medgel"}>
              <li>Products at Medgel</li>
            </Link>
            <Link href={"/products/medgel-services"}>
              <li>Medgel Services</li>
            </Link>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 Medgel Pvt. Ltd. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
