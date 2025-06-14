import fetchPage from "@/helpers/getPage";
import Image from "next/image";

type QualtiyControlAndAssuranceType = {
  control_title: string;
  assurance_title: string;
  quality_control: string;
  quality_assurance_para1: string;
  quality_assurance_para2: string;
};

export default async function Section1({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const fetchedQuality = await fetchPage<QualtiyControlAndAssuranceType>(title);
  const quality: QualtiyControlAndAssuranceType = fetchedQuality.content;

  return (
    <>
      {children}

      {/* Section 3 */}
      <div className="flex h-full w-full flex-col items-center justify-between p-0 md:flex-row">
        <div className="w-full md:w-5/12">
          <Image
            src={`${process.env.NEXT_PUBLIC_SITE_URL}/${fetchedQuality.images[0].url}`}
            alt="Quality Image 2"
            width={800}
            height={800}
          />
        </div>
        <div className="mr-0 flex h-full w-full flex-col items-end justify-center p-5 md:mr-20 md:w-1/2 md:p-0">
          <div className="w-fit">
            <h1 className="mt-5 text-6xl font-bold text-[#1D8892]">
              {quality.control_title}
            </h1>
            <main className="m-2 h-2 w-full rounded-lg bg-orange-300"></main>
          </div>

          <div className="mt-5 text-gray-900">
            <h1 className="">{quality.quality_control}</h1>
          </div>

          <div className="mt-10 w-fit">
            <h1 className="mt-5 text-6xl font-bold text-[#1D8892]">
              {quality.assurance_title}
            </h1>
            <main className="m-2 h-2 w-full rounded-lg bg-orange-300"></main>
          </div>

          <div className="mb-10 mt-5 text-gray-900">
            <h1 className="">{quality.quality_assurance_para1}</h1>
            <h1 className="mt-5">{quality.quality_assurance_para2}</h1>
          </div>
        </div>
      </div>
      {/* Section 3 End*/}

      {/* <div className="flex h-full w-full flex-col items-center justify-between p-0 md:flex-row">
        <div className="w-full md:w-5/12">
          <Image
            src="/qualtiyImg/img2.png"
            alt="Quality Image 2"
            width={800}
            height={800}
          />
        </div>
        <div className="mr-0 flex h-full w-full flex-col items-end justify-center p-5 md:mr-20 md:w-1/2 md:p-0">
          <div className="w-fit">
            <h1 className="mt-5 text-6xl font-bold text-[#1D8892]">
              Quality Control
            </h1>
            <main className="m-2 h-2 w-full rounded-lg bg-orange-300"></main>
          </div>

          <div className="mt-5 text-gray-900">
            <h1 className="">
              {
                "The most sophisticated testing machinery at Medgel's laboratory ensures the best quality product of highest & most pure standards. All raw materials from time of entry through in process to finished goods are tested by the stringent & strict methods. Quality Control follows established pharmacopeia methods such as USP, BP, IP & others. A highly automated plant reduces actual material handling & dramatically decreases the possibility of contamination by limiting human contact."
              }
            </h1>
          </div>

          <div className="mt-10 w-fit">
            <h1 className="mt-5 text-6xl font-bold text-[#1D8892]">
              Quality Assurance
            </h1>
            <main className="m-2 h-2 w-full rounded-lg bg-orange-300"></main>
          </div>

          <div className="mb-10 mt-5 text-gray-900">
            <h1 className="">
              {
                'Quality Assurance department ensures consistent quality products by maintaining vigil through qa checks at each stage. Medgel have team of qualified, experienced & dedicated professionals. Medgel also makes sure high quality nutraceuticals products are always delivered through our "best in class" infrastructure, world class technology and experienced staf'
              }
            </h1>
            <h1 className="mt-5">
              Quality Assurance & Quality Control staff tries to set advance
              technology systems in manufacturing plant so that our customers
              get the best product
            </h1>
          </div>
        </div>
      </div> */}
    </>
  );
}
