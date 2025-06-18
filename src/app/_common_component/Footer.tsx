// src/app/_common_component/Footer.tsx
"use client"
import React, { useEffect, useState } from "react";
import "./Footer.css";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X, LoaderCircle } from "lucide-react"; // Added LoaderCircle for loading spinner

const Footer = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
  const pathname = usePathname();

   // Effect to reset isLoading when pathname changes (i.e., page navigation completes)
    useEffect(() => {
      setIsLoading(false);
    }, [pathname]);
    const handleLinkClick = () => {
    setIsLoading(true); // Show loading spinner
    // No need to explicitly navigate here, Next.js <Link> handles it
  };
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
            <Link onClick={handleLinkClick} href={"/about/awards_"}>
              <li >Awards & Accreditation</li>
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
            <Link onClick={handleLinkClick} href={"/"}>
              <li>Home</li>
            </Link>
            <Link onClick={handleLinkClick} href={"/facilities"}>
              <li>Facilities</li>
            </Link>
            <Link onClick={handleLinkClick} href={"/investor"}>
              <li>Investor Relations</li>
            </Link>
            <Link onClick={handleLinkClick} href={"/quality"}>
              <li>Quality & Compliance</li>
            </Link>
            <Link onClick={handleLinkClick} href={"/careers"}>
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
            <Link onClick={handleLinkClick} href={"/about/about-medgel"}>
              <li>About Medgel</li>
            </Link>
            <Link onClick={handleLinkClick} href={"/about/awards_"}>
              <li>Awards and Accrediation</li>
            </Link>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Products</h4>
          <ul className="list-disc pl-8 underline">
            <Link onClick={handleLinkClick} href={"/products/products-at-medgel"}>
              <li>Products at Medgel</li>
            </Link>
            <Link onClick={handleLinkClick} href={"/products/medgel-services"}>
              <li>Medgel Services</li>
            </Link>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 Medgel Pvt. Ltd. All Rights Reserved.</p>
      </div>
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gray-800 bg-opacity-75 backdrop-blur-sm">
          <LoaderCircle className="h-12 w-12 animate-spin text-[#008080]" />
        </div>
      )}
    </footer>
  );
};

export default Footer;
