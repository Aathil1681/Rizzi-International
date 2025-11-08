"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import { AiOutlineArrowRight } from "react-icons/ai";
import Image from "next/image";

// Hook to detect screen size
const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);
    const listener = () => setMatches(media.matches);
    window.addEventListener("resize", listener);
    return () => window.removeEventListener("resize", listener);
  }, [query]);
  return matches;
};

type ImageCardProps = {
  src: string;
  title: string;
  className?: string;
};

const paragraphVariants: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const gridItemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const gridContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

function ImageCard({ src, title, className }: ImageCardProps) {
  return (
    <motion.div
      variants={gridItemVariants}
      className={`relative overflow-hidden group rounded-lg flex-shrink-0 ${className}`}
    >
      <Image
        src={src}
        alt={title}
        fill
        style={{ objectFit: "cover" }}
        className="absolute inset-0 transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      <div className="absolute inset-0 flex items-end p-4">
        <h3 className="text-white text-2xl font-bold uppercase tracking-wider">
          {title}
        </h3>
      </div>
    </motion.div>
  );
}

const collectiveItems = [
  {
    src: "https://images.pexels.com/photos/336372/pexels-photo-336372.jpeg?auto=compress&cs=tinysrgb&w=800",
    title: "RETAIL",
  },
  {
    src: "https://images.pexels.com/photos/2800121/pexels-photo-2800121.jpeg?auto=compress&cs=tinysrgb&w=800",
    title: "DISTRIBUTION",
  },
  {
    src: "https://images.pexels.com/photos/135620/pexels-photo-135620.jpeg?auto=compress&cs=tinysrgb&w=800",
    title: "FMCG",
  },
  {
    src: "https://images.pexels.com/photos/28251935/pexels-photo-28251935.jpeg?auto=compress&cs=tinysrgb&w=800",
    title: "MALLS",
  },
  {
    src: "https://images.pexels.com/photos/1028599/pexels-photo-1028599.jpeg?auto=compress&cs=tinysrgb&w=800",
    title: "HEALTH & LEISURE",
  },
  {
    src: "https://images.pexels.com/photos/3184416/pexels-photo-3184416.jpeg?auto=compress&cs=tinysrgb&w=800",
    title: "ASSOCIATES & JVs",
  },
];

export default function OurCollective() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const carouselRef = useRef<HTMLDivElement>(null);
  const [dragConstraints, setDragConstraints] = useState(0);

  useEffect(() => {
    if (isMobile && carouselRef.current) {
      const scrollWidth = carouselRef.current.scrollWidth;
      const clientWidth = carouselRef.current.clientWidth;
      setDragConstraints(scrollWidth - clientWidth);
    }
  }, [isMobile]);

  return (
    <section className="bg-gray-100 font-sans py-16 lg:py-24 overflow-x-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Top Section */}
        <motion.div
          className="grid sm:grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-16 lg:mb-24"
          initial="hidden"
          animate="visible"
          variants={gridContainer}
        >
          <div>
            <motion.h2
              className="text-2xl sm:text-3xl font-bold text-gray-800 uppercase tracking-widest mb-4"
              variants={paragraphVariants}
            >
              Our Collective
            </motion.h2>
            <div className="w-16 h-0.5 bg-blue-600 mb-6"></div>
            <motion.p
              className="text-gray-600 leading-relaxed text-sm sm:text-base"
              variants={paragraphVariants}
            >
              We’re more than a collective of brands. We are a dynamic hub
              driven by design excellence and innovation, crafting premium
              products that elevate every customer experience.
            </motion.p>
          </div>
          <motion.div
            className="relative w-full aspect-video rounded-lg overflow-hidden"
            variants={gridItemVariants}
          >
            <Image
              src="https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg"
              alt="Business professionals in a meeting"
              fill
              loading="lazy"
              style={{ objectFit: "cover" }}
            />
          </motion.div>
        </motion.div>

        {/* Bottom Section */}
        {isMobile ? (
          <div className="relative">
            {/* Right fade overlay */}
            <div className="absolute top-0 right-0 h-full w-16 bg-gradient-to-l from-white/80 to-transparent pointer-events-none z-20" />

            {/* Swiper */}
            <motion.div
              className="overflow-x-hidden cursor-grab"
              whileTap={{ cursor: "grabbing" }}
            >
              <motion.div
                ref={carouselRef}
                className="flex gap-4"
                drag="x"
                dragConstraints={{ left: -dragConstraints, right: 0 }}
                initial="hidden"
                animate="visible"
                variants={gridContainer}
              >
                {collectiveItems.map((item, index) => (
                  <div key={index} className="flex-none w-[80vw]">
                    <ImageCard
                      src={item.src}
                      title={item.title}
                      className="aspect-[4/3]"
                    />
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Swipe arrow hint */}
            <div className="absolute top-1/2 right-2 transform -translate-y-1/2 z-30">
              <AiOutlineArrowRight className="text-gray-400 text-3xl animate-bounce opacity-70" />
            </div>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-3 gap-4"
            initial="hidden"
            animate="visible"
            variants={gridContainer}
          >
            {collectiveItems.map((item, index) => (
              <ImageCard
                key={index}
                src={item.src}
                title={item.title}
                className="aspect-[4/3]"
              />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
