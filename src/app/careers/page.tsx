"use client";

import Link from "next/link";

export default function CareerPage() {
  return (
    <div
      className="relative bg-cover bg-center bg-no-repeat text-white min-h-screen"
      style={{
        backgroundImage: `url('/career/banner.webp')`,
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      <main className="relative container mx-auto px-4 py-16 lg:py-24 flex items-center min-h-screen">
        <section className="w-full lg:w-2/3 space-y-6 text-center lg:text-left">
          <div className="mt-10">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight !text-gray-300 ">
              BE A PART OF A LEGACY OF EXCELLENCE AT{" "}
              <span className="text-blue-800">RIZZI INTERNATIONAL</span>
            </h1>
          </div>
          <div className="mt-10">
            <p className="text-lg !text-gray-300 ">
              Embark on a fulfilling journey with Rizzi International, where
              careers transcend the ordinary and flourish into extraordinary
              opportunities. Discover your future with us – where your
              aspirations become our shared mission.
            </p>
          </div>

          <p className="text-lg !text-gray-300"></p>

          <div className="pt-4">
            <Link
              href="/careers/openings"
              className="bg-gray-200 !text-black font-semibold py-3 px-8 rounded-lg hover:bg-black hover:!text-white transition-colors duration-300 shadow-lg"
            >
              Explore Jobs
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
