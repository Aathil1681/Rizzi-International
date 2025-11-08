import type { Metadata } from "next";
import "./globals.css";
import { Montserrat } from "next/font/google";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollTopButton from "./components/ScrolltoTop";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // choose the weights you need
  display: "swap", // ensures faster fallback
  preload: true, // preloads font locally
});

export const metadata: Metadata = {
  title: "Rizzi International",
  description: "Your shipping partner",
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
