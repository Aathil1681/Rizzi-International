"use client";
import Main from "./components/Main";
import Services from "./components/Services";

if (typeof window !== "undefined") {
  const script = document.createElement("script");
  script.src = "https://cdn.lordicon.com/ritcuqlt.js";
  script.async = true;
  document.body.appendChild(script);
}

export default function Home() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#ffffff",
      }}
    >
      <div className="">
        <Main />
      </div>
      <Services />
    </div>
  );
}
