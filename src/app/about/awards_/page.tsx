// import Header from "../_common_component/Header";
// import Footer from "../_common_component/Footer";
import { checkAdminFromCookie } from "@/helpers/checkAdmin";
import FetchAndShowAwards from "./FetchAndShowAwards";
import EditModalContainer from "@/app/_common_component/EditModalContainer";
export const dynamic = "force-dynamic";
const title = "about/awards_$view-all-awards";
import AwardPopup from "./AwardPopup.tsx";
import { set } from "mongoose";

async function aspr() {
  let isAdmin = false;
  try {
    isAdmin = await checkAdminFromCookie();
  } catch (error) {
    // console.log("Error in loading about/life-at-medgel page");
    console.log("Error in checking authorization level");
    console.log(error);
  }
  return (
    <div>
      <FetchAndShowAwards />
      {/* <AwardsAccreditations /> */}
    </div>
  );
}

export default aspr;
