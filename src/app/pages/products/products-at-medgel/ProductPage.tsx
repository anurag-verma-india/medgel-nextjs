// pages/index.tsx
"use client";
import { useState } from "react";
import "./ProductPage.css";
import VerifyEmailModal from "./VerifyEmailModal";

export default function ProductsPage() {
    const [activeTab, setActiveTab] = useState("OTC Products");

    const categoryProducts = {
        "OTC Products": [
            { name: "Alka Seltzer Plus Range", count: 4 },
            { name: "Cold & Flu Relief", count: 5 },
            { name: "Mucus Range", count: 5 },
            { name: "Fever Reducer", count: 3 },
            { name: "Anti Allergic", count: 1 },
        ],
        "Nutraceuticals Products": [
            { name: "Vitamin Supplements", count: 3 },
            { name: "Mineral Complexes", count: 4 },
            { name: "Protein Powders", count: 2 },
        ],
        "Food Supplements": [
            { name: "Dietary Fiber", count: 2 },
            { name: "Omega Complex", count: 3 },
            { name: "Probiotics", count: 4 },
        ],
        "Products Under Development": [
            { name: "Research Products", count: 5 },
            { name: "Clinical Trials", count: 2 },
        ],
    };

    return (
        <div className="container">
            <VerifyEmailModal />
            <h1 className="title">Products At MedGel</h1>
            <div className="underline"></div>

            <div className="tabContainer">
                {Object.keys(categoryProducts).map((category) => (
                    <button
                        key={category}
                        className={`tab ${
                            activeTab === category ? "activeTab" : ""
                        }`}
                        onClick={() => setActiveTab(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>

            <div className="productList">
                {categoryProducts[activeTab].map((product, index) => (
                    <div key={index} className="productItem">
                        <span className="productName">{product.name}</span>
                        <div className="productCount">
                            <span>{product.count} Products</span>
                            <span className="arrow">›</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
