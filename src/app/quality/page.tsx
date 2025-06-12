// import img1 from "/qualitImg/img1.png";
// import img2 from "/qualitImg/img2.png";
import Image from "next/image";
import React from "react";

import fetchPage from "@/helpers/getPage";
import { BasePageContent } from "@/types";

interface qualityContent extends BasePageContent {
 
  
  qualtiy_overview_para1: string;
  qualtiy_overview_para2: string;
  qualtiy_overview_para3: string;
  quality_policy_para1: string;
  quality_policy1: string;
  quality_policy2: string;
  quality_policy3: string;
  quality_policy4: string;
  quality_policy5: string;
  quality_policy_para2: string;
    quality_policy_para3: string;
    quality_policy_para4: string;
    
    quality_control: string;
    quality_assurance_para1: string;
    quality_assurance_para2: string;

}


const Qality= async()=>{
    const title = "quality-compliance";

    const fetchedQuality = await fetchPage<qualityContent>(title);

    const quality : qualityContent = fetchedQuality.content;

    return(
        <>
        {/* Section 1 */}
        <div className="flex flex-col md:flex-row  items-center justify-between p-0">
            <div className="flex flex-col items-start justify-center ml-0 p-5 md:p-0 md:ml-14">
                <div className="w-fit">
            <h1 className="text-6xl -mt-0  md:-mt-12 text-[#1D8892] font-bold">Quality Overview</h1>
            <main className="w-full m-2 rounded-lg h-2 bg-orange-300"></main>
            </div>

            <div className="mt-10 text-gray-900 ">
                <h1>{quality.qualtiy_overview_para1}</h1>

                <h1 className="mt-5">{quality.quality_overview_para2
}</h1>

                <h1 className="mt-5">{quality.quality_overview_para3}</h1>
            </div>
            </div>
            <div className="md:flex hidden">
                <Image  src="/qualtiyImg/img1.png" alt="Quality Image 1" width={800} height={800} />
            </div>
        </div>
         {/* Section 1 End*/}

         {/* Section 2 */}
        <div className=" flex flex-col md:flex-row w-full bg-[linear-gradient(to_bottom,_#75B2C5_50%,_#5E96AD_50%)] items-center justify-between px-5 md:px-0 py-10 md:py-20">
        {/* <div className=" flex flex-col md:flex-row w-full bg-[url('/qualtiyImg/bg.png')]  bg-cover bg-no-repeat bg-center  items-center justify-between px-5 md:px-0 py-10 md:py-20"> */}
            
            <div className="order-2 md:order-1 flex w-full md:w-1/2 p-5 rounded-r-2xl border-2 bg-slate-50 flex-col items-start justify-center ">
                <div className="w-fit mx-auto">
            <h1 className="text-4xl  text-[#1D8892] font-bold">Quality Policy</h1>
            <main className="w-full rounded-lg h-2 bg-orange-300"></main>
            

            </div>
            <main className="w-full mt-3 h-1  bg-slate-300"></main>
            <div className="mt-10 px-5">
                <h1>{quality.quality_policy_para1}</h1>
                <ul className="mt-5 px-5">
                    <li className="list-disc ">{quality.quality_policy1}</li>
                    <li className="list-disc ">{quality.quality_policy2}</li>
                    <li className="list-disc ">{quality.quality_policy3}</li>
                    <li className="list-disc ">{quality.quality_policy4}</li>
                    <li className="list-disc ">{quality.quality_policy5}</li>
                </ul>
                <h1 className="mt-3">
                 {quality.quality_policy_para2}
                </h1>
                <h1 className="mt-3">
                    {quality.quality_policy_para3}
                </h1>
                <h1 className="mt-3">
                    {quality.quality_policy_para4}
                </h1>
            </div>
            </div>
            <div className=" order-1 md:order-2 h-full w-full md:w-1/2"> 
                <h1 className="text-4xl md:text-6xl mb-5 md:mb-0 text-white font-bold float-start md:float-end mr-0 md:mr-20 text-center md:text-end">
                    Quality<br className="md:flex hidden"/> Control And <br className="md:flex hidden"/>Assurance
                </h1>
               </div>
        </div>
         {/* Section 2 End*/}
        {/* Section 3 */}
        <div className="flex flex-col md:flex-row w-full h-full items-center justify-between p-0">
            <div className="w-full md:w-5/12">
                <Image  src="/qualtiyImg/img2.png" alt="Quality Image 2" width={800} height={800} />
            </div>
            <div className="flex flex-col w-full md:w-1/2 h-full  items-end justify-center p-5 md:p-0 mr-0 md:mr-20">
                <div className="w-fit">
            <h1 className="text-6xl mt-5 text-[#1D8892] font-bold">Quality Control</h1>
            <main className="w-full m-2 rounded-lg h-2 bg-orange-300"></main>
            </div>

            <div className="mt-5 text-gray-900 ">
                <h1 className="">{quality.quality_control}</h1>
            </div>

            <div className="w-fit mt-10">
            <h1 className="text-6xl mt-5 text-[#1D8892] font-bold">Quality Assurance</h1>
            <main className="w-full m-2 rounded-lg h-2 bg-orange-300"></main>
            </div>

            <div className="mt-5 text-gray-900 mb-10">
                <h1 className="">{quality.quality_assurance_para1}</h1>
                <h1 className="mt-5 ">{quality.quality_assurance_para2}</h1>
            </div>
            </div>
            
        </div>
         {/* Section 3 End*/}

        </>
    )
}
export default Qality