"use client";
import React, { useState } from "react";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import "./ContactUs.css";
import Image from "next/image";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="contact-container">
      <h1 className="title">Contact Us</h1>
      <div className="subtitle">Enquiry / Feedback</div>

      <div className="content-grid">
        {/* Contact Form */}
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div className="contact-form">
              <div className="form-field">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name*"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              {/* <div className="form-row"> */}
              <div className="flex h-10 w-11/12 pr-3">
                <input
                  className="w-10/12 px-2 rounded border-2 border-black"
                  type="email"
                  name="email"
                  placeholder="Your Email*"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
                <div className="w-5" />
                <input
                  className="w-10/12 px-2 rounded border-2 border-black"
                  type="text"
                  name="subject"
                  placeholder="Subject*"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-field">
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  required
                />
              </div>
              <button type="submit" className="mx-14 md:mx-24 bg-[#0d9488] w-1/2 h-10 ">
                Contact Us
              </button>
            </div>
          </form>
        </div>

        {/* Map */}
        <a href="https://maps.app.goo.gl/aBVz8BVadZwFfH1f6" target="_blank">
          <div className="flex h-[100%] items-center justify-items-center">
            <div className="map-container">
              <Image
                src={"/google-maps-medgel.png"}
                alt="Medgel Facility Google Maps Photo"
                width={815}
                height={468}
              />
            </div>
          </div>
        </a>
      </div>

      {/* Contact Information */}
      <div className="info-grid">
        <div className="info-card">
          <div className="icon-container">
            <Mail className="icon" />
          </div>
          <h3 className="info-title">EMAIL</h3>
          <p className="info-text">marketing@medgel.net</p>
        </div>

        <div className="info-card">
          <div className="icon-container">
            <Phone className="icon" />
          </div>
          <h3 className="info-title">PHONE</h3>
          <p className="info-text">+91-07292-256205</p>
          <p className="info-text">+91-07292-256206</p>
        </div>

        <a href="https://maps.app.goo.gl/aBVz8BVadZwFfH1f6" target="_blank">
          <div className="info-card">
            <div className="icon-container">
              <MapPin className="icon" />
            </div>
            <h3 className="info-title">OFFICE</h3>
            <p className="info-text">
              Special Economic Zone,
              <br />
              Plot No.-19-20, Pharma Zone
              <br />
              Phase-II, Sector-III,
              <br />
              Pithampur, Dist- Dhar (M.P.)
              <br />
              INDIA
              <br />
              Pincode 454775
            </p>
          </div>
        </a>

        <div className="info-card">
          <div className="icon-container">
            <Clock className="icon" />
          </div>
          <h3 className="info-title">BUSINESS HOURS</h3>
          <p className="info-text">
            Mon-Fir
            <br />
            10:00 AM - 6:00 PM IST
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
