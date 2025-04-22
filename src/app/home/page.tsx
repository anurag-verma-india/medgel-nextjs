import SliderComponent from "./slider";
import CardRow from "./CardRow";
import PurposeSection from "./PurposeSection";
import Bpurpose from "./Bpurpose";
import Cpurpose from "./Cpurpose";
import Header from "./Header";
import Footer from "./Footer";
import Portfolio from "./Portfolio";
import LatestAtMedgel2 from "./LatestAtMedgel2";
import CurrentOpenings from "./currentopenings";
import Header2 from "../_common_component/Header2";

const HomePage = () => {
    return (
        <div>
            <Header2 />
            <Header />
            {/* <Header />
            <SliderComponent />
            <CardRow />

            <PurposeSection />
            <Bpurpose />
            <LatestAtMedgel2/>

            {/* <Portfolio />

            <Cpurpose />
            <CurrentOpenings/>

            <Footer /> */}
        </div>
    );
};

export default HomePage;
