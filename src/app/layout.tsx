import type { Metadata } from "next";
import "./globals.css";
import { Montserrat } from "next/font/google";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollTopButton from "./components/ScrolltoTop";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Rizzi International | Your Shipping Partner",
  description:
    "Rizzi International provides professional shipping, logistics, and cargo services with trusted global delivery solutions.",
  keywords: [
    "shipping",
    "cargo",
    "logistics",
    "freight services",
    "Rizzi International",
    "Dubai shipping",
  ],

  openGraph: {
    title: "Rizzi International",
    description:
      "Reliable shipping, cargo, and logistics services trusted worldwide.",
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
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Rizzi International",
    description:
      "Reliable shipping, cargo, and logistics services trusted worldwide.",
    images: ["/ogimage.jpg"],
  },

  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <Navbar />
        {children}
        <ScrollTopButton />
        <Footer />
      </body>
    </html>
  );
}
