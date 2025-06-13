import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function page() {
  return (
    <div className={`min-h-screen bg-gray-50 ${inter.className}`}>
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <Image
          src="/images/newsHeroImage.jpg" // Replace with your image path
          alt="News Hero Image"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 mx-auto -mt-20 max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Content Card */}
        <div className="rounded-2xl bg-white p-6 shadow-xl sm:p-8 lg:p-12">
          {/* Title */}
          <h1 className="mb-6 text-3xl font-bold leading-tight text-[#20878c] sm:text-4xl lg:text-5xl">
            Breaking: Revolutionary Technology Transforms Industry Standards
          </h1>

          {/* Subtitle */}
          <p className="mb-2 text-lg font-medium leading-relaxed text-black sm:text-xl">
            Industry experts predict this breakthrough will reshape how
            businesses operate, setting new benchmarks for efficiency and
            innovation across multiple sectors.
          </p>

          {/* Meta Information */}
          <div className="mb-8 flex flex-wrap items-center gap-4 border-b border-gray-200 pb-8">
            {/* <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-blue-600"></div>
              <span className="text-sm text-gray-500">
                Published on March 15, 2024
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-600"></div>
              <span className="text-sm text-gray-500">5 min read</span>
            </div> */}
          </div>

          {/* News Content */}
          <div className="prose prose-lg max-w-none">
            <p className="mb-6 leading-relaxed text-gray-700">
              In a groundbreaking development that has sent ripples through the
              technology sector, researchers have unveiled a revolutionary
              approach that promises to redefine industry standards. This
              innovative solution addresses long-standing challenges that have
              plagued businesses for decades, offering unprecedented levels of
              efficiency and scalability.
            </p>

            <p className="mb-6 leading-relaxed text-gray-700">
              The breakthrough technology, developed over three years of
              intensive research, combines cutting-edge algorithms with
              practical applications that can be immediately implemented across
              various industries. Early adopters report significant improvements
              in operational efficiency, with some organizations seeing up to
              40% reduction in processing times.
            </p>

            <p className="mb-6 leading-relaxed text-gray-700">
              "This represents a paradigm shift in how we approach complex
              problems," said Dr. Sarah Johnson, lead researcher on the project.
              "We're not just optimizing existing processes; we're fundamentally
              reimagining what's possible."
            </p>

            <p className="mb-6 leading-relaxed text-gray-700">
              The implications extend far beyond immediate applications.
              Industry analysts predict that this technology will create new
              market opportunities worth billions of dollars over the next
              decade. Companies that adopt these innovations early are
              positioned to gain significant competitive advantages in their
              respective markets.
            </p>

            <p className="mb-6 leading-relaxed text-gray-700">
              Key features of the new technology include enhanced data
              processing capabilities, improved security protocols, and seamless
              integration with existing infrastructure. The solution is designed
              to be scalable, making it suitable for both small businesses and
              large enterprises.
            </p>

            <p className="mb-6 leading-relaxed text-gray-700">
              Looking ahead, the development team plans to expand the
              technology's capabilities further, with several major updates
              scheduled for release throughout the year. These enhancements will
              introduce additional features that address emerging market needs
              and technological trends.
            </p>

            <p className="leading-relaxed text-gray-700">
              As organizations worldwide begin to recognize the potential of
              this breakthrough, the technology sector stands on the brink of a
              transformation that could reshape the competitive landscape for
              years to come. The question is no longer whether this technology
              will be adopted, but how quickly businesses can integrate it into
              their operations to stay ahead of the curve.
            </p>
          </div>

          {/* Call to Action */}
        </div>
      </div>

      {/* Bottom Spacing */}
      <div className="h-20"></div>
    </div>
  );
}
