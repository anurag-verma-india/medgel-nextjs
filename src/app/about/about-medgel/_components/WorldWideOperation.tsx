import "./WorldWideOperation.css";
import Header from "app/pages/_common_component/Header";
import {fetchWorldWide} from "../fetch";


const WorldWideOperation = async () => {
    const world = await fetchWorldWide();
    return (
        <div className="WorldWideOperation-container">
            <h1 className="WorldWideOperation-title">World Wide Operation</h1>

            <div className="WorldWideOperation-content">
                <div className="WorldWideOperation-map-section">
                    <div className="WorldWideOperation-countries-list">
                        <h2>
                            Targeted Countries where
                            <br />
                            Product are exported :
                        </h2>
                        <ul>
                            <li>USA</li>
                            <li>UK</li>
                            <li>Vietnam</li>
                            <li>New Zealand</li>
                            <li>Iran / Iraq</li>
                            <li>Nigeria / Ghana, etc.</li>
                        </ul>
                    </div>

                    <div className="WorldWideOperation-map-container">
                        <img src="/images/map.png" alt="Targeted Countries" />
                    </div>
                </div>

                <div className="WorldWideOperation-description">
                    <p>
                        {world.para1}
                    
                    </p>

                    <p>
                       {world.para2} 
                    </p>

                    <p>
                        {world.para3}
                        
                    </p>
                </div>
            </div>
        </div>
    );
};
export default WorldWideOperation;
