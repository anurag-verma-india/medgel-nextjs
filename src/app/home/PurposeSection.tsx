import "./PurposeSection.css";

const PurposeSection = () => {
    return (
        <section className="homepurpose">
            <div className="homepurposeimage-container">
                <h1>Our Purpose</h1>
                <p>
                    Our humanitarian approach for healthcare in pursuit of our
                    purpose. Caring for life makes us a partner of choice for
                    global health bodies and stakeholders.
                </p>
                <button className="homepurposeread-more-btn">Read More</button>
            </div>
        </section>
    );
    // return (
    //     <div className="image-containera">
    //         <img
    //             src="images/purpose.png"
    //             alt="Description"
    //             className="imagep"
    //         />
    //         <div className="overlay">
    //             <h1>Our Purpose</h1>
    //             <p>
    //                 Our humanitarian approach for healthcare in pursuit of our
    //                 purpose. Caring for life makes us a partner of choice for
    //                 global health bodies and stakeholders.
    //             </p>
    //             <button className="read-more-btna">Read More</button>
    //         </div>
    //     </div>
    // );
};

export default PurposeSection;
