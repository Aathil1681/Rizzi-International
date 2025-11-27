import type { Metadata } from "next";
import HomeClient from "./components/HomeClient";

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

export default function Home() {
  return <HomeClient />;
}
