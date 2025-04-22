"use client"

import React, { useState } from "react";
import "./Header.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <a href="#">MEDGEL</a>
        </div>
        <nav className="navbar">
          <ul className={menuOpen ? "show" : ""}>
            <li><a href="#about">About Us</a></li>
            <li><a href="#products">Products</a></li>
            <li><a href="#quality">Quality & Compliance</a></li>
            <li><a href="#facilities">Facilities</a></li>
            <li><a href="#investor">Investor Relations</a></li>
            <li><a href="#contact">Contact Us</a></li>
          </ul>
        </nav>
        <div className="auth-buttons">
          <button className="signup">Sign Up</button>
          <button className="signin">Sign In</button>
        </div>
        <div className="hamburger-menu" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </header>
  );
};

export default Header;
