// import img1 from "/qualitImg/img1.png";
// import img2 from "/qualitImg/img2.png";
// import Image from "next/image";
import React from "react";
import { checkAdminFromCookie } from "@/helpers/checkAdmin";
import EditModalContainer from "@/app/_common_component/EditModalContainer";
import QualityOverview from "@/app/quality/QualityOverview";
import QualityControlAndAssurance from "@/app/quality/QualityControlAndAssurance";
import QualityPolicy from "@/app/quality/QualityPolicy";

export const dynamic = "force-dynamic";
const QualityOverviewTitle = "quality/$quality-overview";
const QualityPolicyTitle = "quality/$quality-policy";
const QualityControlAndAssuranceTitle = "quality/$quality-control-and-assurance";

const Quality = async () => {
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
      <QualityOverview title={QualityOverviewTitle}>
        {isAdmin && <EditModalContainer title={QualityOverviewTitle} />}
      </QualityOverview>
      <QualityPolicy title={QualityPolicyTitle}>
        {isAdmin && <EditModalContainer title={QualityPolicyTitle} />}
      </QualityPolicy>
      <QualityControlAndAssurance title={QualityControlAndAssuranceTitle}>
        {isAdmin && (
          <EditModalContainer title={QualityControlAndAssuranceTitle} />
        )}
      </QualityControlAndAssurance>
    </>
  );
};
export default Quality;
