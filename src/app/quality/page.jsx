// import img1 from "/qualitImg/img1.png";
// import img2 from "/qualitImg/img2.png";
import Image from "next/image";
import React from "react";
const Qality=()=>{
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
                <h1>To strive to attain high level of Quality for all the products which shall provide maximum value to its customers by consistent supply of quality products and reliable service.</h1>

<h1 className="mt-5">To meet the required GMP requirements pertaining to the countries where the business is being carried out.</h1>

<h1 className="mt-5">Every activity is closely monitored by IPQC Inspectors, to evaluate the quality and hence attaining the desired Product Quality. Medgel follow various systems in accordance with ISO 9001:2000 to assure that activity is carried out in a defined way as per the system.
                </h1>
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
                <h1>To strive to attain high level of Quality for all the products which shall provide maximum value to its customers by consistent supply of quality products and reliable services.</h1>
                <ul className="mt-5 px-5">
                    <li className="list-disc ">Team Work</li>
                    <li className="list-disc ">Customer Satisfaction</li>
                    <li className="list-disc ">Surpassing Safety and Health norms</li>
                    <li className="list-disc ">Providing Product at Competitive Price</li>
                    <li className="list-disc ">Competent Manpower</li>
                </ul>
                <h1 className="mt-3">
                    To continue our world class manufacturing status, we will ensuer compliance to cGMP and applicable regulatory expectation, We will continue to invest in other related Quality Management Systems
                </h1>
                <h1 className="mt-3">
                    The quality policy and objectives are reviewed periodically for their continuing suitability.
                </h1>
                <h1 className="mt-3">
                    We shall ensure that these are understood, implemented and maintained at all levels in the organization
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
                <h1 className="">The most sophisticated testing machinery at Medgel's laboratory ensures the best quality product of highest & most pure standards. All raw materials from time of entry through in process to finished goods are tested by the stringent & strict methods. Quality Control follows established pharmacopeia methods such as USP, BP, IP & others. A highly automated plant reduces actual material handling & dramatically decreases the possibility of contamination by limiting human contact.</h1>
            </div>

            <div className="w-fit mt-10">
            <h1 className="text-6xl mt-5 text-[#1D8892] font-bold">Quality Assurance</h1>
            <main className="w-full m-2 rounded-lg h-2 bg-orange-300"></main>
            </div>

            <div className="mt-5 text-gray-900 mb-10">
                <h1 className="">Quality Assurance department ensures consistent quality products by maintaining vigil through qa checks at each stage. Medgel have team of qualified, experienced & dedicated professionals. Medgel also makes sure high quality nutraceuticals products are always delivered through our "best in class" infrastructure, world class technology and experienced staf</h1>
                <h1 className="mt-5 ">Quality Assurance & Quality Control staff tries to set advance technology systems in manufacturing plant so that our customers get the best product</h1>
            </div>
            </div>
            
        </div>
         {/* Section 3 End*/}

        </>
    )
}
export default Qality