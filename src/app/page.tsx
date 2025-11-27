"use client";

import { useEffect, useState } from "react";
import Main from "./components/Main";
import Services from "./components/Services";
import { Settings } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rizzi International | Reliable Shipping & Cargo Services",
  description:
    "Rizzi International offers professional shipping, logistics, and cargo services. Trusted for fast and secure international delivery.",
  openGraph: {
    title: "Rizzi International | Reliable Shipping & Cargo Services",
    description:
      "Rizzi International offers professional shipping, logistics, and cargo services worldwide.",
    url: "https://rizziinternational.com",
    siteName: "Rizzi International",
    images: [
      {
        url: "/ogimage.jpg",
        width: 1200,
        height: 630,
        alt: "Rizzi International",
      },
    ],
    type: "website",
  },
};

if (typeof window !== "undefined") {
  const script = document.createElement("script");
  script.src = "https://cdn.lordicon.com/ritcuqlt.js";
  script.async = true;
  document.body.appendChild(script);
}

const Loader = () => {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowLoader(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  if (!showLoader) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 flex items-center justify-center gear-spin">
          <Settings className="w-16 h-16 text-blue-900" />
        </div>
      </div>

      <style jsx>{`
        .gear-spin {
          animation: spin 3s linear infinite;
          transform-origin: 50% 50%;
        }
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#ffffff",
      }}
    >
      {!loaded && <Loader />}

      {loaded && (
        <>
          <Main />
          <Services />

          {/* JSON-LD structured data for services */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Service",
                serviceType: [
                  "Luxury Shipping",
                  "Private Warehousing",
                  "Exclusive Logistics",
                ],
                provider: {
                  "@type": "Organization",
                  name: "Rizzi International",
                  url: "https://rizziinternational.com",
                },
              }),
            }}
          />
        </>
      )}
    </div>
  );
}
