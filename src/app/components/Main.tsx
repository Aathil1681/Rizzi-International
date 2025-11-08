"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Settings } from "lucide-react";
import Image from "next/image"; // ✅ Import Next.js Image component

// Slide data
const slides = [
  {
    image: "/Diamond.jpg",
    title: "Experience Luxury Like Never Before",
    desc: "Discover premium products crafted for elegance and style.",
  },
  {
    image: "/Handbag3.jpg",
    title: "Timeless Designs",
    desc: "Our collection blends timeless design with modern innovation.",
  },
  {
    image: "/Handbag2.jpg",
    title: "Elegance in Every Detail",
    desc: "Luxury is in the details.",
  },
  {
    image: "/Perfume.jpg",
    title: "Fragrance of Prestige",
    desc: "Experience scents that define elegance.",
  },
  {
    image: "/Pampers.jpg",
    title: "Loving Care for Baby and Planet",
    desc: "Leak-proof protection that keeps up with your curious crawler.",
  },
];

const slideCount = slides.length;

// Animation variants
const slideVariants = {
  enter: (direction: number) => ({ x: direction > 0 ? "100%" : "-100%" }),
  center: { zIndex: 1, x: 0 },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? "100%" : "-100%",
  }),
};

// Loading screen
const Loader = () => {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowLoader(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  if (!showLoader) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-white z-50">
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 flex items-center justify-center gear-spin">
          <Settings className="w-16 h-16 text-blue-900" />
        </div>
      </div>

      <style jsx>{`
        .gear-spin {
          animation: spin 3s linear infinite;
          transform-origin: 50% 50%;
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default function Main() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const preloadImages = async () => {
      const promises = slides.map((slide) => {
        return new Promise((resolve, reject) => {
          if (typeof window === "undefined") return resolve(true); // Skip on server

          const img = new window.Image();
          img.src = slide.image;
          img.onload = resolve;
          img.onerror = reject;
        });
      });
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
      {isLoading ? (
        <Loader />
      ) : (
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
              {/* ✅ Replaced <motion.img> with Next.js <Image> */}
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
                  className="object-cover"
                  priority
                />
              </motion.div>

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent sm:from-black/50" />

              {/* Text content */}
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

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-4 sm:left-6 -translate-y-1/2 z-30 text-white hover:text-gray-300 text-3xl sm:text-4xl md:text-5xl"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-4 sm:right-6 -translate-y-1/2 z-30 text-white hover:text-gray-300 text-3xl sm:text-4xl md:text-5xl"
          >
            <FaChevronRight />
          </button>

          {/* Scroll Indicator */}
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

          {/* Navigation Dots */}
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
