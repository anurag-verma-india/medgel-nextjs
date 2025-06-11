import Header from "../_common_component/Header";
import Footer from "../_common_component/Footer";
import ManufacturingSection from "./manufacturing";
import ContractManufacturing from "./ContractManufacturing";
import ResearchDevelopment from "./ResearchAndDev";
import TechnologySection from "./Tech";
import AContractManufacturing from "./manufacturingchat";

function facilities() {
    return (
        <div>
            <ManufacturingSection />
            {/* <AContractManufacturing/> */}
            <ContractManufacturing />

            <TechnologySection/>
        </div>
    )
}

export default facilities;