import Image from "next/image";
import { CVUploadForm } from "./CVUploadForm";

export default function OpeningsPage() {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-80 w-full">
        <Image
          src="https://images.pexels.com/photos/4963437/pexels-photo-4963437.jpeg"
          alt="Woman listening to music"
          fill
          style={{ objectFit: "cover" }}
          className="w-full h-full"
        />
        <div className="absolute inset-0 bg-black/40 bg-opacity-30" />
      </div>

      {/* Form Section */}
      <div className="container mx-auto px-4 -mt-32 relative z-10">
        <div className="bg-white p-8 md:p-12 rounded-lg shadow-xl">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Explore Our Open Positions
          </h1>
          <p className="text-gray-600 mb-8">
            We may not have openings right now, but we are always looking for
            exceptional talent. Please submit your CV, and we will contact you
            when a suitable position becomes available.
          </p>

          <CVUploadForm />
        </div>
      </div>
    </div>
  );
}
