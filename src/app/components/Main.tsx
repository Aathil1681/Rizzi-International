"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Image from "next/image";

const slides = [
  {
    image: "/sliders/Jewellery.webp",
    title: "Luxury That Shines Brighter",
    desc: "Discover fine jewellery crafted to perfection for every elegant moment.",
  },
  {
    image: "/sliders/Handbag.webp",
    title: "Redefine Your Style",
    desc: "Premium handbags designed for confidence, class, and everyday elegance.",
  },
  {
    image: "/sliders/perfume1.webp",
    title: "Unforgettable Fragrance",
    desc: "A signature scent that speaks before you do.",
  },
  {
    image: "/sliders/Cosmetic.webp",
    title: "Beauty That Inspires",
    desc: "High-performance cosmetics for a flawless, radiant look.",
  },
  {
    image: "/sliders/Cosmetic1.webp",
    title: "Glow Like Never Before",
    desc: "Skincare essentials made to nourish, protect, and enhance.",
  },
  {
    image: "/sliders/Cosmetic2.webp",
    title: "Bold. Beautiful. You.",
    desc: "Express yourself with premium cosmetics crafted for all skin tones.",
  },
  {
    image: "/sliders/Luvra.webp",
    title: "Gentle Care for Growing Babies",
    desc: "Soft, breathable diapers that keep your baby comfortable all day.",
  },
  {
    image: "/sliders/Luvra1.webp",
    title: "Protection Parents Trust",
    desc: "Leak-proof performance designed for active little explorers.",
  },
];

const slideCount = slides.length;

const slideVariants = {
  enter: (direction: number) => ({ x: direction > 0 ? "100%" : "-100%" }),
  center: { zIndex: 1, x: 0 },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? "100%" : "-100%",
  }),
};

export default function Main() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const preloadImages = async () => {
      const promises = slides.map(
        (slide) =>
          new Promise((resolve, reject) => {
            if (typeof window === "undefined") return resolve(true);
            const img = new window.Image();
            img.src = slide.image;
            img.onload = resolve;
            img.onerror = reject;
          })
      );
      await Promise.all(promises);
      setIsLoading(false);
    };

    preloadImages();
  }, []);

  useEffect(() => {
    if (isLoading) return;
    const interval = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % slideCount);
    }, 5000);
    return () => clearInterval(interval);
  }, [isLoading]);

  const prevSlide = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + slideCount) % slideCount);
  };

  const nextSlide = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % slideCount);
  };

  const goToSlide = (slideIndex: number) => {
    setDirection(slideIndex > current ? 1 : -1);
    setCurrent(slideIndex);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {!isLoading && (
        <>
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={current}
              className="absolute inset-0 w-full h-full"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
              }}
            >
              <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: 1.05 }}
                transition={{ duration: 8 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(e, { offset }) => {
                  if (offset.x < -50) nextSlide();
                  else if (offset.x > 50) prevSlide();
                }}
                className="absolute inset-0"
              >
                <Image
                  src={slides[current].image}
                  alt="Slide Image"
                  fill
                  className="object-cover image-optimize"
                  priority
                  quality={85}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                />
              </motion.div>

              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent sm:from-black/50" />

              <div className="absolute top-1/4 left-4 sm:left-6 px-4 max-w-xl">
                <motion.h1
                  key={current}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -50, opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 lg:pl-8 !text-white"
                >
                  {slides[current].title}
                </motion.h1>

                <motion.p
                  key={current + "desc"}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="text-base sm:text-lg md:text-xl !text-gray-200 lg:pl-8"
                >
                  {slides[current].desc}
                </motion.p>
              </div>
            </motion.div>
          </AnimatePresence>

          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-4 sm:left-6 -translate-y-1/2 z-30 text-white/70 hover:text-gray-300 text-3xl sm:text-3xl md:text-4xl"
          >
            <FaChevronLeft />
          </button>

          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-4 sm:right-6 -translate-y-1/2 z-30 text-white/70 hover:text-gray-300 text-3xl sm:text-3xl md:text-4xl"
          >
            <FaChevronRight />
          </button>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-30 flex flex-col items-center space-y-2"
          >
            <span className="text-white text-sm sm:text-base font-medium tracking-wider">
              Scroll Down
            </span>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-4 h-8 border-2 border-white rounded-full flex justify-center"
            >
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-1 h-3 bg-white rounded-full mt-1"
              />
            </motion.div>
          </motion.div>

          <div className="absolute bottom-10 w-full flex justify-center gap-3 z-30">
            {slides.map((_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full transition-all cursor-pointer ${
                  i === current ? "bg-white scale-125" : "bg-white/50"
                }`}
                onClick={() => goToSlide(i)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
