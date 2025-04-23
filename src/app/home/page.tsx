import SliderComponent from "./slider";
import CardRow from "./CardRow";
import PurposeSection from "./PurposeSection";
import Bpurpose from "./Bpurpose";
import Cpurpose from "./Cpurpose";
// import Header from "./Header";
// import Footer from "./Footer";
import Portfolio from "./Portfolio";
import HomeNews from "./homenews";


const HomePage = () => {
    return (
        <div>
            {/* <Header /> */}
            <SliderComponent />
            <CardRow />
            <PurposeSection />
            <Bpurpose />
            <HomeNews />
            {/* <LatestAtMedgel2/> */}
            {/* <LatestAtMedgel/> */}
             <Portfolio />
            <Cpurpose />

            {/* <Footer />  */}
        </div>
    );
};

export default HomePage;
