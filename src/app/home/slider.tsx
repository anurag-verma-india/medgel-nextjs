"use client";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./slider.css";
import React from "react";
import Image from "next/image";

function RightPointerBracketSvg() {
  return (
    <svg
      fill="#ffffff"
      // height="800px"
      // width="800px"
      className="w-6"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 330 330"
      xmlSpace="preserve"
      // {...props}
    >
      <path d="M250.606 154.389l-150-149.996c-5.857-5.858-15.355-5.858-21.213.001-5.857 5.858-5.857 15.355.001 21.213l139.393 139.39L79.393 304.394c-5.857 5.858-5.857 15.355.001 21.213C82.322 328.536 86.161 330 90 330s7.678-1.464 10.607-4.394l149.999-150.004a14.996 14.996 0 000-21.213z" />
    </svg>
  );
}

function LeftPointerBracketSvg() {
  return (
    <svg
      fill="#ffffff"
      className="w-6"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 330 330"
      xmlSpace="preserve"
    >
      <path d="M79.394 154.389l150-149.996c5.857-5.858 15.355-5.858 21.213.001 5.857 5.858 5.857 15.355-.001 21.213L111.213 164.997l139.393 139.397c5.857 5.858 5.857 15.355-.001 21.213C247.678 328.536 243.839 330 240 330s-7.678-1.464-10.607-4.394l-149.999-150.004a14.996 14.996 0 010-21.213z" />
    </svg>
  );
}

const SliderComponent = () => {
  const slides = [
    {
      image: "/images/slider1.png",
      buttonText: "WATCH VIDEO",
    },
    {
      image: "/images/slider2.png",
      buttonText: "WATCH VIDEO",
    },
    {
      image: "/images/slider3.png",
      buttonText: "WATCH VIDEO",
    },
    {
      image: "/images/slider4.png",
      buttonText: "WATCH VIDEO",
    },
  ];

  const sliderRef = React.useRef<Slider>(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const handleNext = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const handlePrev = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  return (
    <div className="homeslider-container">
      <Slider ref={sliderRef} {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="homeslide">
            <img
              src={slide.image}
              alt={`Slide ${index + 1}`}
              className="homeslide-image"
            />
            <div className="homeslide-content">
              <h1>
                WE WELCOME YOU <br />
                AT{" "}
                {/* <Image
                  src={"/medgel-logo.svg"}
                  alt={"MedGel"}
                  height={100}
                  width={400}
                /> */}
                <span
                  style={{
                    color: "#E4961B",
                    fontWeight: "bold",
                  }}
                >
                  MED
                </span>
                <span
                  style={{
                    color: "#005CA6",
                    fontWeight: "bold",
                  }}
                >
                  GEL
                </span>
                <br />
              </h1>
              <p>
                SERVING TO OTC PHARMA AND NUTRACEUTICALS
                {index !== 3 && " IN SOFTGELS."}
                {index === 3 && (
                  <span style={{ color: "white" }}> IN SOFTGELS.</span>
                )}
              </p>
              {slide.buttonText && (
                <button className="homeslide-button">{slide.buttonText}</button>
              )}
            </div>
          </div>
        ))}
      </Slider>

      <button className="homeslider-nav-button prev" onClick={handlePrev}>
        {/* &lt;*/}
        <LeftPointerBracketSvg />
      </button>
      <button className="homeslider-nav-button next" onClick={handleNext}>
        {/* &gt;*/}
        <RightPointerBracketSvg />
      </button>
    </div>
  );
};

export default SliderComponent;
