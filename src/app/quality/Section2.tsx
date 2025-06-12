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
      <div className="flex w-full flex-col items-center justify-between bg-[linear-gradient(to_bottom,_#75B2C5_50%,_#5E96AD_50%)] px-5 py-10 md:flex-row md:px-0 md:py-20">
        {/* <div className=" flex flex-col md:flex-row w-full bg-[url('/qualtiyImg/bg.png')]  bg-cover bg-no-repeat bg-center  items-center justify-between px-5 md:px-0 py-10 md:py-20"> */}

        <div className="order-2 flex w-full flex-col items-start justify-center rounded-r-2xl border-2 bg-slate-50 p-5 md:order-1 md:w-1/2">
          <div className="mx-auto w-fit">
            <h1 className="text-4xl font-bold text-[#1D8892]">
              Quality Policy
            </h1>
            <main className="h-2 w-full rounded-lg bg-orange-300"></main>
          </div>
          <main className="mt-3 h-1 w-full bg-slate-300"></main>
          <div className="mt-10 px-5">
            <h1>
              To strive to attain high level of Quality for all the products
              which shall provide maximum value to its customers by consistent
              supply of quality products and reliable services.
            </h1>
            <ul className="mt-5 px-5">
              <li className="list-disc">Team Work</li>
              <li className="list-disc">Customer Satisfaction</li>
              <li className="list-disc">Surpassing Safety and Health norms</li>
              <li className="list-disc">
                Providing Product at Competitive Price
              </li>
              <li className="list-disc">Competent Manpower</li>
            </ul>
            <h1 className="mt-3">
              To continue our world class manufacturing status, we will ensuer
              compliance to cGMP and applicable regulatory expectation, We will
              continue to invest in other related Quality Management Systems
            </h1>
            <h1 className="mt-3">
              The quality policy and objectives are reviewed periodically for
              their continuing suitability.
            </h1>
            <h1 className="mt-3">
              We shall ensure that these are understood, implemented and
              maintained at all levels in the organization
            </h1>
          </div>
        </div>
        <div className="order-1 h-full w-full md:order-2 md:w-1/2">
          <h1 className="float-start mb-5 mr-0 text-center text-4xl font-bold text-white md:float-end md:mb-0 md:mr-20 md:text-end md:text-6xl">
            Quality
            <br className="hidden md:flex" /> Control And{" "}
            <br className="hidden md:flex" />
            Assurance
          </h1>
        </div>
      </div>
    </>
  );
}
