import fetchPage from "@/helpers/getPage";
import Image from "next/image";

type QualityOverviewType = {
  quality_overview_title: string;
  quality_overview_para1: string;
  quality_overview_para2: string;
  quality_overview_para3: string;
};

export default async function Section1({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const fetchedQuality = await fetchPage<QualityOverviewType>(title);
  const quality = fetchedQuality.content;
  console.log("Fetched quality: ");
  console.log(fetchedQuality);

  return (
    <>
      {children}
      {/* Section 1 */}
      <div className="flex flex-col items-center justify-between p-0 md:flex-row">
        <div className="ml-0 flex flex-col items-start justify-center p-5 md:ml-14 md:p-0">
          <div className="w-fit">
            <h1 className="-mt-0 text-6xl font-bold text-[#1D8892] md:-mt-12">
              {quality.quality_overview_title}
            </h1>
            <main className="m-2 h-2 w-full rounded-lg bg-orange-300"></main>
          </div>

          <div className="mt-10 text-gray-900">
            <h1>{quality.quality_overview_para1}</h1>

            <h1 className="mt-5">{quality.quality_overview_para2}</h1>

            <h1 className="mt-5">{quality.quality_overview_para3}</h1>
          </div>
        </div>
        <div className="hidden md:flex">
          <Image
            // src="/qualtiyImg/img1.png"
            src={`${process.env.NEXT_PUBLIC_SITE_URL}/${fetchedQuality.images[0].url}`}
            alt="Quality Image 1"
            width={800}
            height={800}
          />
        </div>
      </div>
      {/* Section 1 End*/}
    </>
  );
}
