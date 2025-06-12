import SliderComponent from "./home/slider";
import CardRow from "./home/CardRow";
import PurposeSection from "./home/PurposeSection";
import Bpurpose from "./home/Bpurpose";
import Cpurpose from "./home/Cpurpose";
// import Header from "./Header";
// import Footer from "./Footer";
import Portfolio from "./home/Portfolio";
import HomeNews from "./home/homenews";

const HomePage = () => {
  return (
    <div>
      {/* <Header /> */}
      <SliderComponent />
      <CardRow />
      <PurposeSection />
      <Bpurpose />
      <HomeNews />
      <Portfolio />
      <Cpurpose />

      {/* <Footer />  */}
    </div>
  );
};

export default HomePage;
