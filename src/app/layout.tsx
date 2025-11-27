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
  metadataBase: new URL("https://rizziinternational.com"),

  title: {
    default: "Rizzi International | Your Shipping Partner",
    template: "%s | Rizzi International",
  },

  description:
    "Rizzi International provides professional shipping, logistics, and cargo solutions with reliable international delivery services.",

  keywords: [
    "Rizzi International",
    "shipping company",
    "logistics company",
    "cargo services",
    "freight forwarding",
    "international shipping",
    "clearing and forwarding",
  ],

  openGraph: {
    title: "Rizzi International | Your Shipping Partner",
    description:
      "Reliable logistics, cargo, and shipping services trusted across global trade routes.",
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

  twitter: {
    card: "summary_large_image",
    title: "Rizzi International | Your Shipping Partner",
    description:
      "Reliable shipping, cargo, and logistics services trusted worldwide.",
    images: ["/ogimage.jpg"],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
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
