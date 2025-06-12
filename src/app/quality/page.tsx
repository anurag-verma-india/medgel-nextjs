// import img1 from "/qualitImg/img1.png";
// import img2 from "/qualitImg/img2.png";
import Image from "next/image";
import React from "react";
import Section1 from "@/app/quality/Section1";
import Section2 from "@/app/quality/Section2";
import Section3 from "@/app/quality/Section3";
import EditModalContainer from "@/app/_common_component/EditModalContainer";
import { checkAdminFromCookie } from "@/helpers/checkAdmin";

export const dynamic = "force-dynamic";
const QualtiyOverviewtitle = "quality/$quality-overview";
const QualtiyPolicytitle = "quality/$quality-policy";
const QualtiyControlAndAssurancetitle = "quality/$quality-control-and-asurance";
const Qality=async()=>{
    let isAdmin = false;
      try {
        isAdmin = await checkAdminFromCookie();
      } catch (error) {
        // console.log("Error in loading about/life-at-medgel page");
        console.log("Error in checking authorization level");
        console.log(error);
      }
    return(
        <>
        <Section1 title={QualtiyOverviewtitle}>
                {isAdmin && <EditModalContainer title={QualtiyOverviewtitle} />}
        </Section1>
         <Section2 title={QualtiyPolicytitle}>
                {isAdmin && <EditModalContainer title={QualtiyPolicytitle} />}

         </Section2>
        <Section3 title={QualtiyControlAndAssurancetitle}>
                {isAdmin && <EditModalContainer title={QualtiyControlAndAssurancetitle} />}

        </Section3>

        </>
    )
}
export default Qality