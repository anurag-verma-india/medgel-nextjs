// file_path: "@/app/about/life-at-medgel/page.tsx"

import Image from "next/image";
// import Link from "next/link";
// import Header from "app/pages/_common_component/Header";
// import { cookies } from "next/headers";
// import EditModalContainer from "../../_common_component/EditModalContainer.jsx";
// import EditModalContainer from "../../_common_component/EditModalContainer";
import fetchPage from "@/helpers/getPage";
// import IfAdminShowThis from "@/app/_common_component/IfAdminShowThis";
import { BasePageContent } from "@/types";
import EditModalContainer from "@/app/_common_component/EditModalContainer";
import { checkAdminFromCookie } from "@/helpers/checkAdmin";
import CurrentOpenings from "./currentopenings";
// import { MongooseError } from "mongoose";

const title = "about-us/life-at-medgel";

interface LifeAtMedgelContent extends BasePageContent {
  page_title: string;
  // img: string;
  title_1: string;
  title1_des_1: string;
  title1_des_2: string;
  title_2: string;
  title2_des_1: string;
  title2_des_2: string;
}

export const dynamic = "force-dynamic";

// connecting to db
const LifeAtMedgel = async () => {
  // cookies()
  // or headers()
  // const career = await fetchCareer();
  // const page = await fetchPage(title);
  try {
    const page = await fetchPage<LifeAtMedgelContent>(title);
    // console.log("page fetched:", page);
    const isAdmin = await checkAdminFromCookie();

    return (
      <>
        <div className="min-h-screen bg-white">
          {/* <Header /> */}
          {/* Main Content */}
          <div className="bg-[#EFEFEF]">
          <main className="mx-auto max-w-7xl px-4 py-12">
            {/* <EditModalContainer title={title} page={page} /> */}
            {/* <VerifyAndShowEditButton title={title} /> */}
            {/* <IfAdminShowThis> */}
            {isAdmin && <EditModalContainer title={title} />}
            {/* </IfAdminShowThis> */}
            {/* Header */}
            <div className="mb-12 text-center">
              <h1 className="relative inline-block text-5xl font-bold text-[#1D8892]">
                {/* {page.content["page_title"] || ""} */}
                {page.content.page_title}
                <div className="absolute bottom-0 left-0 right-0 -mb-2 h-1 bg-orange-400"></div>
              </h1>
            </div>

            {/* Content Section */}
            <div className="mb-16 grid items-center gap-12 md:grid-cols-2">
              <div className="relative overflow-hidden rounded-lg shadow-lg">
                <div className="relative aspect-[497/269] w-full">
                  <Image
                    // src={`${process.env.NEXT_PUBLIC_SITE_URL}/${page.content.img}`}
                    src={`${process.env.NEXT_PUBLIC_SITE_URL}/${page.images[0].url}`}
                    alt="Life at Medgel"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-orange-500">
                  {page.content.title_1}
                </h2>
                <p className="leading-relaxed text-gray-900">
                  {page.content.title1_des_1}
                </p>
                <p className="leading-relaxed text-gray-900">
                  {page.content.title1_des_2}
                </p>
              </div>
            </div>

            {/* Training Section */}
            <div className="mt-16">
              <h2 className="mb-8 text-center text-3xl font-bold text-orange-500">
                {page.content.title_2}
              </h2>
              <div className="space-y-6">
                <p className="mx-auto max-w-4xl text-center leading-relaxed text-gray-900">
                  {page.content.title2_des_1}
                </p>
                <p className="mx-auto max-w-4xl text-center leading-relaxed text-gray-900">
                  {page.content.title2_des_2}
                </p>
              </div>
            </div>
          </main>
          </div>
        <CurrentOpenings />
        </div>
      </>
    );
  } catch (error) {
    // return <div>{error.toString()}</div>;
    console.log("Error in loading about/life-at-medgel page");
    console.log(error);
  }
};

export default LifeAtMedgel;
