import Image from "next/image";
export default async function Section1({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <div className="flex flex-col items-center justify-between p-0 md:flex-row">
        <div className="ml-0 flex flex-col items-start justify-center p-5 md:ml-14 md:p-0">
          <div className="w-fit">
            <h1 className="-mt-0 text-6xl font-bold text-[#1D8892] md:-mt-12">
              Quality Overview
            </h1>
            <main className="m-2 h-2 w-full rounded-lg bg-orange-300"></main>
          </div>

          <div className="mt-10 text-gray-900">
            <h1>
              To strive to attain high level of Quality for all the products
              which shall provide maximum value to its customers by consistent
              supply of quality products and reliable service.
            </h1>

            <h1 className="mt-5">
              To meet the required GMP requirements pertaining to the countries
              where the business is being carried out.
            </h1>

            <h1 className="mt-5">
              Every activity is closely monitored by IPQC Inspectors, to
              evaluate the quality and hence attaining the desired Product
              Quality. Medgel follow various systems in accordance with ISO
              9001:2000 to assure that activity is carried out in a defined way
              as per the system.
            </h1>
          </div>
        </div>
        <div className="hidden md:flex">
          <Image
            src="/qualtiyImg/img1.png"
            alt="Quality Image 1"
            width={800}
            height={800}
          />
        </div>
      </div>
    </>
  );
}
