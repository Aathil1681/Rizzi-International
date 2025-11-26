"use client";

import { useEffect, useState } from "react";
import Main from "./components/Main";
import Services from "./components/Services";
import { Settings } from "lucide-react";

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
          <div className="">
            <Main />
          </div>
          <Services />
        </>
      )}
    </div>
  );
}
