import Image from "next/image";
// import Link from "next/link";
// import Header from "app/pages/_common_component/Header";
// import { cookies } from "next/headers";
import fetchCareer from "./fetchCareer.jsx";
// import EditModalContainer from "./EditModalContainer.jsx";
// import CurrentOpenings from "../life-at-medgel/currentopenings";
import CurrentOpenings from "./currentopenings.jsx";

//! connecting to db
const LifeAtMedgel = async () => {
  // cookies()
  // or headers()

  const career = await fetchCareer();

  return (
    <>
      <div className="min-h-screen bg-white">
        {/* <Header /> */}
        {/* Main Content */}
        <main className="mx-auto max-w-7xl px-4 py-12">
          {/* <div>
            <EditModalContainer className="relative right-0">
              {career}
            </EditModalContainer>
          </div> */}
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="relative inline-block text-5xl font-bold text-teal-500">
              {career.page_title}
              <div className="absolute bottom-0 left-0 right-0 -mb-2 h-1 bg-orange-400"></div>
            </h1>
          </div>

          {/* Content Section */}
          <div className="mb-16 grid items-center gap-12 md:grid-cols-2">
            <div className="relative overflow-hidden rounded-lg shadow-lg">
              <div className="relative aspect-[497/269] w-full">
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}/${career.img}`}
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
                {career.title_1}
              </h2>
              <p className="leading-relaxed text-gray-700">
                {career.title1_des_1}
              </p>
              <p className="leading-relaxed text-gray-700">
                {career.title1_des_2}
              </p>
            </div>
          </div>

          {/* Training Section */}
          <div className="mt-16">
            <h2 className="mb-8 text-center text-3xl font-bold text-orange-500">
              {career.title_2}
            </h2>
            <div className="space-y-6">
              <p className="mx-auto max-w-4xl text-center leading-relaxed text-gray-700">
                {career.title2_des_1}
              </p>
              <p className="mx-auto max-w-4xl text-center leading-relaxed text-gray-700">
                {career.title2_des_2}
              </p>
            </div>
          </div>
        </main>
        <CurrentOpenings />
      </div>
    </>
  );
};

export default LifeAtMedgel;
