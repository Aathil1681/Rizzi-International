"use client";

import { motion, Variants, useAnimation } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";

const slideInFromLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const slideInFromRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeInOut" },
  },
};

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

// --- Brand Family Data ---
const brandFamily = [
  { name: "Luvnor", logo: "/logos/luvnor.png" },
  { name: "Jewelsmi", logo: "/logos/jewelsmi.png" },
  { name: "Luvra", logo: "/logos/luvra.png" },
  { name: "AirFeri", logo: "/logos/airferi.png" },
];

const duplicatedBrands = [...brandFamily, ...brandFamily];

export default function About() {
  const marqueeControls = useAnimation();

  useEffect(() => {
    marqueeControls.start({
      x: ["0%", "-100%"],
      transition: {
        ease: "linear",
        duration: 70,
        repeat: Infinity,
      },
    });
  }, [marqueeControls]);

  return (
    <div className="overflow-x-hidden font-sans">
      {/* HERO */}
      <section className="relative h-[60vh] flex items-center justify-center text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-gray-800 animate-pulse-slow"></div>
        <div className="relative z-10 px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="text-5xl md:text-7xl font-bold tracking-wider mb-4 bg-clip-text text-transparent !bg-gradient-to-r from-white via-gray-300 to-gray-400 animate-gradient"
          >
            HOUSE OF LUXURY
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-2xl mx-auto text-lg md:text-xl bg-clip-text text-transparent !bg-gradient-to-r from-gray-200 via-gray-300 to-white"
          >
            Rizzi International is a dynamic global enterprise built on luxury,
            lifestyle, and innovation.
          </motion.p>
        </div>
      </section>

      {/* ABOUT DETAILS */}
      <section className="bg-gray-100">
        <motion.div
          className="container mx-auto px-4 sm:px-6 lg:px-20 py-16 lg:py-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-center my-8">
            {/* Image Column */}
            <motion.div
              className="flex justify-center items-center p-2 md:p-4"
              variants={slideInFromLeft}
              initial="hidden"
              animate="visible"
            >
              <div className="relative w-[250px] sm:w-[300px] md:w-[350px] aspect-[4/5]">
                <Image
                  src="/about/banner.jpg"
                  alt="Rizzi Banner image"
                  fill
                  style={{ objectFit: "cover" }}
                  className="grayscale rounded-sm"
                  priority
                />
              </div>
            </motion.div>

            {/* Text Column */}
            <motion.div
              variants={slideInFromRight}
              initial="hidden"
              animate="visible"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 uppercase">
                Our Evolution
              </h2>
              <div className="h-1 w-24 sm:w-32 bg-blue-600 mb-6"></div>
              <p className="text-gray-700 mb-4 leading-relaxed text-sm sm:text-base md:text-lg">
                Rizzi International is a dynamic global enterprise built on the
                foundation of luxury, lifestyle, and innovation. Headquartered
                in Sri Lanka, the company brings together a diverse portfolio
                that spans gold and gems, fine jewelry, watches, perfumes,
                cosmetics, baby care items, fashion, home décor, and premium
                services.
              </p>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base md:text-lg">
                With a vision to redefine modern luxury, Rizzi International
                operates across both wholesale and retail sectors, catering to
                discerning customers and businesses worldwide. Driven by a
                passion for excellence, every division of Rizzi International
                reflects quality, craftsmanship, and elegance, ensuring that the
                brand is synonymous with prestige and trust.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Mission & Vision */}
      <section className="relative">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.pexels.com/photos/3184423/pexels-photo-3184423.jpeg"
            alt="A modern office cityscape background"
            fill
            style={{ objectFit: "cover" }}
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6 py-20 lg:py-24 text-white">
          <motion.div
            className="grid lg:grid-cols-2 gap-12 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.3 } },
            }}
          >
            {/* Mission */}
            <motion.div
              variants={{
                hidden: { opacity: 0, x: -30 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.7 } },
              }}
            >
              <h2 className="text-4xl font-bold mb-4 uppercase tracking-wider border-b-2 border-brand-gold pb-2 inline-block">
                Our Mission
              </h2>
              <p className="text-gray-200 text-lg leading-relaxed mt-4">
                Our journey is about more than just commerce; it&apos;s about
                becoming a trusted name and a staple in modern luxury. We are
                driven by a passion for excellence — ensuring that every
                interaction, every service, and every product echoes our
                commitment to delivering uncompromising quality and enriching
                the lifestyles of our clientele worldwide.
              </p>
            </motion.div>

            {/* Vision */}
            <motion.div
              variants={{
                hidden: { opacity: 0, x: 30 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.7 } },
              }}
            >
              <h2 className="text-4xl font-bold mb-4 uppercase tracking-wider border-b-2 border-brand-gold pb-2 inline-block">
                Our Vision
              </h2>
              <p className="text-gray-200 text-lg leading-relaxed mt-4">
                In our pursuit of growth, we envision an organization committed
                to exceeding every expectation. We aim to be a global leader in
                luxury, recognized for our innovation, elegance, and sustainable
                practices. By providing unparalleled service and exceptional
                value, we forge enduring connections and build a lasting legacy
                of trust and responsibility.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Brand Family */}
      <section className="py-20 lg:py-24">
        <motion.div
          className="text-center mb-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeIn}
        >
          <h2 className="text-4xl font-bold text-brand-blue">
            Our Brand Family
          </h2>
          <div className="w-24 h-0.5 bg-brand-gold mx-auto my-4"></div>
          <p className="text-gray-600 mt-2 px-10">
            Rizzi International is a leading global enterprise specializing in
            the import and export of premium products. From fine jewelry, luxury
            watches, and high-end fashion to cosmetics, baby care essentials,
            and lifestyle goods, we deliver exceptional quality and innovation.
            With excellence, trust, and sophistication at our core, Rizzi
            International continues to expand its legacy as a global hub for
            luxury and essential product distribution.
          </p>
        </motion.div>

        <div
          className="relative overflow-hidden group py-6"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          }}
        >
          <motion.div
            className="flex items-center w-max"
            animate={marqueeControls}
            onHoverStart={() => marqueeControls.stop()}
            onHoverEnd={() =>
              marqueeControls.start({
                x: ["0%", "-100%"],
                transition: { ease: "linear", duration: 40, repeat: Infinity },
              })
            }
          >
            {duplicatedBrands.map((brand, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-64 mx-8 flex justify-center items-center"
              >
                <Image
                  src={brand.logo}
                  alt={`${brand.name} logo`}
                  width={200}
                  height={100}
                  className="object-contain transition-transform duration-300 hover:scale-110 hover:opacity-90 cursor-pointer"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
