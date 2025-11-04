"use client";

import React from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FileText,
  Shield,
  Globe,
  Package,
  User,
  LucideProps,
  Contact,
} from "lucide-react";

// --- Terms Sections (No changes needed here) ---
const termsSections = [
  {
    icon: FileText,
    title: "Introduction",
    content: `Welcome to Rizzi International. These Terms and Conditions govern your use of our website (www.rizziinternational.com) and the purchase of our luxury products and services. By accessing our website, you agree to be bound by these terms.`,
  },
  {
    icon: User,
    title: "User Obligations",
    content: `You agree to use this website only for lawful purposes. You are responsible for maintaining the confidentiality of your account and for restricting access to your device to prevent unauthorized access.`,
  },
  {
    icon: Package,
    title: "Products & Services",
    content: `Rizzi International offers a curated range of luxury lifestyle products that combine elegance, craftsmanship, and innovation. Product descriptions and pricing may change without notice.`,
  },
  {
    icon: Shield,
    title: "Intellectual Property",
    content: `All content on this site, including text, graphics, and logos, is the property of Rizzi International and protected by international copyright laws.`,
  },
  {
    icon: Globe,
    title: "Governing Law & Jurisdiction",
    content: `These Terms are governed by the laws of the Sri Lanka, applicable in the Emirate of Dubai. Disputes are subject to the exclusive jurisdiction of Dubai courts.`,
  },
  {
    icon: Contact,
    title: "Contact Information",
    content: `For any questions regarding these Terms and Conditions, contact us at info@rizziinternational.com or call +94 77 1527 111.`,
  },
];

// --- Animated Section Component (No changes needed here) ---
interface AnimatedSectionProps {
  icon?: React.ComponentType<LucideProps>;
  title: string;
  content: string;
  index: number;
}

const AnimatedSection = ({
  icon: Icon,
  title,
  content,
  index,
}: AnimatedSectionProps) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut", delay: index * 0.15 },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={sectionVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="flex flex-col md:flex-row items-start gap-6 mb-12 last:mb-0" // Added last:mb-0
    >
      {Icon && (
        <div className="bg-blue-100 p-4 rounded-full border border-blue-300">
          <Icon className="w-8 h-8 text-blue-800" />
        </div>
      )}
      <div className={!Icon ? "md:ml-[88px]" : ""}>
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-3">
          {title}
        </h2>
        <p className="text-gray-600 leading-relaxed">{content}</p>
      </div>
    </motion.div>
  );
};

// --- Main Page (UPDATED) ---
export default function TermsAndConditionsPage() {
  const headerVariants: Variants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] },
    },
  };

  return (
    <AnimatePresence>
      {/* 1. Main container with background image */}
      <div
        className="relative min-h-screen antialiased"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        {/* 2. Dark overlay for better text contrast */}
        <div className="absolute inset-0 bg-black/50" />

        {/* 3. Content container with relative positioning */}
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <motion.header
            variants={headerVariants}
            initial="hidden"
            animate="visible"
            className="text-center mb-16 md:mb-24 relative"
          >
            {/* Header text colors updated for dark background */}
            <h1 className="pt-16 md:pt-0 text-4xl md:text-6xl font-bold tracking-tight text-white leading-tight text-center">
              Terms & <span className="text-blue-600">Conditions</span>
            </h1>
            <div className="flex justify-center items-center">
              <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
                By using our services, you agree to the following terms. Please
                read them carefully.
              </p>
            </div>
            <div className="mt-6 h-1 w-24 bg-blue-500 mx-auto rounded-full"></div>
          </motion.header>

          {/* 4. Main content wrapped in a white card */}
          <motion.main
            initial={{ opacity: 0, y: 50 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { delay: 0.3, duration: 0.7 },
            }}
            className="max-w-4xl mx-auto bg-white/85 backdrop-blur-sm p-8 md:p-12 rounded-2xl shadow-2xl"
          >
            {termsSections.map((section, index) => (
              <AnimatedSection
                key={index}
                icon={section.icon}
                title={section.title}
                content={section.content}
                index={index}
              />
            ))}
          </motion.main>

          {/* Footer text colors updated for dark background */}
          <motion.footer
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: {
                delay: 0.5,
                duration: 1,
              },
            }}
            className="text-center mt-16 md:mt-24 text-gray-400"
          >
            <p>
              &copy; {new Date().getFullYear()} Rizzi International. All rights
              reserved.
            </p>
            <p className="text-sm mt-1">Last Updated: October 15, 2025</p>
          </motion.footer>
        </div>
      </div>
    </AnimatePresence>
  );
}
