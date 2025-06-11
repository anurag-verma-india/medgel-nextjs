// import Header from "./_components/Header";
// import Footer from "./_components/Footer";
import About from "./_components/AboutUs";
import MissionValues from "./_components/MissionValues";
// import ManagementCircleClaude from "./_components/ManagementCircleClaude";
import ManagementCircle from "./_components/ManagementCircle";
import MediCapsGroup from "./_components/MediCapsGroup";
import WorldWideOperation from "./_components/WorldWideOperation";
import EHSSection from "./_components/EHS";

import EditModalContainer from "@/app/_common_component/EditModalContainer";
import { checkAdminFromCookie } from "@/helpers/checkAdmin";

export const dynamic = "force-dynamic";
const AboutTitle = "about/about-medgel$overview";
const MissionValuesTitle = "about-us/about-medgel$mission-values";

async function AboutUs() {
  let isAdmin = false;
  try {
    isAdmin = await checkAdminFromCookie();
  } catch (error) {
    // console.log("Error in loading about/life-at-medgel page");
    console.log("Error in checking authorization level");
    console.log(error);
  }

  return (
    <>
      <About title={AboutTitle}>
        {isAdmin && <EditModalContainer title={AboutTitle} />}
      </About>
      <MissionValues title={MissionValuesTitle}>
        {isAdmin && <EditModalContainer title={MissionValuesTitle} />}
      </MissionValues>
      <ManagementCircle />
      <MediCapsGroup />
      <WorldWideOperation />
      <EHSSection />
    </>
  );
}

export default AboutUs;
