// import Header from "../_common_component/Header";
// import Footer from "../_common_component/Footer";
import { checkAdminFromCookie } from '@/helpers/checkAdmin';
import Achievements from './tts';
import EditModalContainer from '@/app/_common_component/EditModalContainer';
// import AwardsAccreditations from "./tts2";
export const dynamic = "force-dynamic";
const title = "about/awards_$view-all-awards";

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
            <Achievements title={title}>
                {isAdmin && <EditModalContainer title={title} />}
            </Achievements>
            {/* <AwardsAccreditations /> */}
        </div>
    );
}

export default aspr;