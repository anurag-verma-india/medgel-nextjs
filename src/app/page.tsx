import SliderComponent from "./home/slider";
import CardRow from "./home/CardRow";
import PurposeSection from "./home/PurposeSection";
import Bpurpose from "./home/Bpurpose";
import Cpurpose from "./home/Cpurpose";
// import Header from "./Header";
// import Footer from "./Footer";
import Portfolio from "./home/Portfolio";
import HomeNews from "./home/homenews";
import { checkAdminFromCookie } from "@/helpers/checkAdmin";

const HomePage = async () => {
  const isAdmin = await checkAdminFromCookie();

  return (
    <div>
      <SliderComponent />
      <CardRow />
      <PurposeSection />
      <Bpurpose />
      {/* Will Get checked  */}
      <HomeNews adminCheck={isAdmin} />
      <Portfolio />
      <Cpurpose />
    </div>
  );
};

export default HomePage;
