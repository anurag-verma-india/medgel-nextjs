
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import About from "./_components/AboutUs";
import MissionValues from "./_components/MissionValues";
import ManagementCircleClaude from "./_components/ManagementCircleClaude";
import MediCapsGroup from "./_components/MediCapsGroup";
import WorldWideOperation from "./_components/WorldWideOperation";
import EHSSection from "./_components/EHS";

function AboutUs() {
  return (
    <div>
      <About />
       <MissionValues />
      {/*<ManagementCircleClaude />*/}
      <MediCapsGroup />
      <WorldWideOperation />
      <EHSSection /> 
    </div>
  );
}

export default AboutUs;

