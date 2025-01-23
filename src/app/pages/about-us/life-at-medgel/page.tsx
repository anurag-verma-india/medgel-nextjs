import Image from "next/image";
// import Link from "next/link";
// import Header from "app/pages/_common_component/Header";
// import { cookies } from "next/headers";
import EditModalContainer from "./EditModalContainer.tsx";
import fetchPage from "@/helpers/getPage";

const title = "about-us/life-at-medgel";

//! connecting to db
const LifeAtMedgel = async () => {
    // cookies()
    // or headers()
    // const career = await fetchCareer();
    const page = await fetchPage(title);

    return (
        <>
            <div className="min-h-screen bg-white">
                {/* <Header /> */}
                {/* Main Content */}
                <main className="max-w-7xl mx-auto px-4 py-12">
                    <EditModalContainer title={title} page={page} />
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-5xl font-bold text-teal-500 relative inline-block">
                            {/* {page.content.page_title} */}
                            {page.content.page_title}
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-orange-400 -mb-2"></div>
                        </h1>
                    </div>

                    {/* Content Section */}
                    <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
                        <div className="rounded-lg overflow-hidden shadow-lg relative">
                            <div className="relative w-full aspect-[497/269]">
                                <Image
                                    src={`${process.env.NEXT_PUBLIC_API_URL}/${page.content.img}`}
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
                            <p className="text-gray-700 leading-relaxed">
                                {page.content.title1_des_1}
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                                {page.content.title1_des_2}
                            </p>
                        </div>
                    </div>

                    {/* Training Section */}
                    <div className="mt-16">
                        <h2 className="text-3xl font-bold text-orange-500 mb-8 text-center">
                            {page.content.title_2}
                        </h2>
                        <div className="space-y-6">
                            <p className="text-gray-700 leading-relaxed text-center max-w-4xl mx-auto">
                                {page.content.title2_des_1}
                            </p>
                            <p className="text-gray-700 leading-relaxed text-center max-w-4xl mx-auto">
                                {page.content.title2_des_2}
                            </p>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
};

export default LifeAtMedgel;
