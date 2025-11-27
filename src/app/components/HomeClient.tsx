"use client";

import { useEffect, useState } from "react";
import Loader from "./Loader";
import Main from "./Main";
import Services from "./Services";

// Lordicon script injection
if (typeof window !== "undefined") {
  const script = document.createElement("script");
  script.src = "https://cdn.lordicon.com/ritcuqlt.js";
  script.async = true;
  document.body.appendChild(script);
}

export default function HomeClient() {
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
