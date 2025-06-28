import SliderComponent from "./home/slider";
import CardRow from "./home/CardRow";
import PurposeSection from "./home/PurposeSection";
import Bpurpose from "./home/Bpurpose";
import Cpurpose from "./home/Cpurpose";
// import Header from "./Header";
// import Footer from "./Footer";
import Portfolio from "./home/Portfolio";
import HomeNews from "./home/HomeNews";
import { checkAdminFromCookie } from "@/helpers/checkAdmin";
import fetchPage from "@/helpers/getPage";
import EditModalContainer from "./_common_component/EditModalContainer";
// import dbConnect from "@/lib/dbConnect";

const SliderComponentTitle = "home$slider";
const CardRowTitle = "home$cardrow";

// const PurposeSectionTitle = "home$PurposeSectionTitle";
// const BpurposeTitle = "home$BpurposeTitle";
// const HomeNewsTitle = "home$HomeNewsTitle";
// const PortfolioTitle = "home$PortfolioTitle";
// const CpurposeTitle = "home$CpurposeTitle";

export type CardRowType = {
  value1: string;
  description1: string;
  value2: string;
  description2: string;
  value3: string;
  description3: string;
  value4: string;
  description4: string;
};

export type SliderComponentType = {
  slidertext1: string;
  slidertext2: string;
  slidertext3: string;
  slidertext4: string;
  buttontext: string;
  video_link: string;
  para1: string;
  para2: string;
};

const HomePage = async () => {
  // try {
  //   await dbConnect();
  // } catch (error) {
  //   return (
  //     <div className="flex items-center justify-center h-screen bg-gray-100">
  //       <div className="p-10 bg-white rounded-lg shadow-xl">
  //         <h1 className="text-2xl font-bold text-red-500">
  //           Error connecting to the database
  //         </h1>
  //         <p className="text-gray-600">
  //           There was an issue connecting to the database. Please try again
  //           later.
  //         </p>
  //       </div>
  //     </div>
  //   );
  // }
  let isAdmin = false;
  try {
    isAdmin = await checkAdminFromCookie();
  } catch (error) {
    // console.log("Error in loading about/life-at-medgel page");
    console.log("Error in checking authorization level");
    console.log(error);
  }

  const SliderComponentData =
    await fetchPage<SliderComponentType>(SliderComponentTitle);
  const CardRowData = await fetchPage<CardRowType>(CardRowTitle);

  // console.log("Card Row data: ", CardRowData);

  return (
    <>
      <SliderComponent data={SliderComponentData}>
        {isAdmin && <EditModalContainer title={CardRowTitle} />}
      </SliderComponent>

      <CardRow data={CardRowData}>
        {isAdmin && <EditModalContainer title={CardRowTitle} />}
      </CardRow>
      <PurposeSection>
        {/* {isAdmin && <EditModalContainer title={CardRowTitle} />} */}
      </PurposeSection>
      <Bpurpose>
        {/* {isAdmin && <EditModalContainer title={CardRowTitle} />} */}
      </Bpurpose>
      {/* Will Get checked  */}
      <HomeNews adminCheck={isAdmin} />
      <Portfolio />
      <Cpurpose />
    </>
  );
};

export default HomePage;
