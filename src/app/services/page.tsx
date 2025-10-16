"use client";

import { useState, useEffect, useRef } from "react";
import { motion, Variants } from "framer-motion";
import { Globe, Warehouse, ShoppingBag } from "lucide-react";
import Image from "next/image";

type Service = {
  icon: React.ElementType;
  title: string;
  description: string;
  imageUrl: string;
};

const services: Service[] = [
  {
    icon: Globe,
    title: "Global Logistics & Distribution",
    description:
      "We specialize in the seamless import and export of luxury goods. Our expert logistics network ensures your valuable products are handled with precision, security, and care.",
    imageUrl:
      "https://images.pexels.com/photos/20777844/pexels-photo-20777844.jpeg",
  },
  {
    icon: Warehouse,
    title: "Wholesale Solutions",
    description:
      "Partner with Rizzi International to access a curated portfolio of the world's finest luxury products for your business, from fine jewelry to high fashion.",
    imageUrl:
      "https://images.pexels.com/photos/2983364/pexels-photo-2983364.jpeg",
  },
  {
    icon: ShoppingBag,
    title: "Curated Retail Experiences",
    description:
      "We create unforgettable retail experiences. Our platforms offer a world of refined living, showcasing premium products with elegance and quality.",
    imageUrl:
      "https://images.pexels.com/photos/5622859/pexels-photo-5622859.jpeg",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3 },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeInOut" },
  },
};

export default function ServicesPage() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isNestScreen, setIsNestScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsNestScreen(width >= 480 && width <= 600);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      const children = Array.from(el.children);
      let closestIndex = 0;
      let closestDistance = Infinity;

      children.forEach((child, index) => {
        const rect = (child as HTMLElement).getBoundingClientRect();
        const center =
          rect.left + rect.width / 2 - el.getBoundingClientRect().left;
        const distance = Math.abs(center - el.offsetWidth / 2);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });
      setActiveIndex(closestIndex);
    };

    el.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <style jsx global>{`
        /* ===== Custom Screen Fixes ===== */
        @supports (-webkit-touch-callout: none) {
          .ios-fix {
            height: -webkit-fill-available;
          }
        }

        /* iPad Pro 12.9" (1024x1366) */
        @media screen and (device-width: 1024px) and (device-height: 1366px) {
          .custom-screen-fix {
            min-height: 90vh !important;
            padding-top: env(safe-area-inset-top);
            padding-bottom: env(safe-area-inset-bottom);
          }
        }

        /* Small tablets (1024x600) */
        @media screen and (device-width: 1024px) and (device-height: 600px) {
          .custom-screen-fix {
            min-height: 95vh !important;
            zoom: 0.95;
          }
        }

        /* Medium laptops (1280x800) */
        @media screen and (device-width: 1280px) and (device-height: 800px) {
          .custom-screen-fix {
            min-height: 100vh !important;
            padding: 2rem;
          }
        }
      `}</style>

      <div
        className="min-h-screen bg-gray-50 overflow-x-hidden ios-fix custom-screen-fix"
        style={{
          height: "-webkit-fill-available", // ✅ Fix for iPhone Safari content cutoff
          paddingTop: "env(safe-area-inset-top)",
          paddingBottom: "env(safe-area-inset-bottom)",
          WebkitTextSizeAdjust: "100%",
        }}
      >
        {/* --- Hero Section --- */}
        <section className="bg-gray-900 text-white py-20 px-8 md:px-16">
          <div className="max-w-7xl mx-auto text-center mt-10">
            <motion.h1
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              Redefining Luxury Through Service
            </motion.h1>
            <div className="mt-10 flex items-center justify-center">
              <motion.p
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg text-gray-300 max-w-3xl mx-auto"
              >
                From global logistics to curated retail experiences, our
                services are built on a foundation of excellence, trust, and a
                passion for refined living.
              </motion.p>
            </div>
          </div>
        </section>

        {/* --- Services Section --- */}
        <motion.section
          className="relative p-8 md:p-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* --- Mobile Scroll --- */}
          {!isNestScreen && (
            <div className="relative">
              <div
                ref={scrollRef}
                className="flex md:hidden space-x-4 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide overscroll-x-contain"
              >
                {services.map((service, i) => {
                  const isActive = i === activeIndex;
                  return (
                    <motion.div
                      key={service.title}
                      className="relative text-lg min-w-[70%] rounded-lg overflow-hidden shadow-2xl snap-center flex-shrink-0 group"
                      variants={itemVariants}
                    >
                      <Image
                        src={service.imageUrl}
                        alt={service.title}
                        width={600}
                        height={800}
                        className="w-full h-80 object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                        priority
                      />

                      <div className="absolute inset-0 flex flex-col justify-end text-white transition-all duration-500">
                        <div
                          className={`absolute inset-0 transition-opacity duration-500 ${
                            isActive
                              ? "bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-100"
                              : "opacity-0"
                          }`}
                        />
                        <div className="relative z-10 p-6 transition-all duration-500">
                          <service.icon className="w-10 h-10 mb-2 text-blue-200" />
                          <h3 className="text-xl font-bold mb-2">
                            {service.title}
                          </h3>
                          {isActive && (
                            <p className="text-gray-200 !text-sm transition-opacity duration-500">
                              {service.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Gradient fade at right edge (mobile) */}
              <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-white/50 md:hidden pointer-events-none" />
            </div>
          )}

          {/* --- iPad / Other Middle Screens --- */}
          <div className="hidden md:flex lg:hidden flex-col gap-6 mt-10 px-4">
            {services.map((service) => (
              <div
                key={service.title}
                className="relative rounded-lg overflow-hidden shadow-2xl"
              >
                <Image
                  src={service.imageUrl}
                  alt={service.title}
                  width={600}
                  height={500}
                  className="w-full h-[400px] object-cover"
                  priority
                />
                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white bg-gradient-to-t from-black/80 via-black/50 to-transparent">
                  <service.icon className="w-10 h-10 mb-2 text-blue-200" />
                  <h3 className="text-2xl font-bold">{service.title}</h3>
                  <p className="text-gray-200 text-sm mt-2">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* --- Desktop Grid --- */}
          <div className="hidden lg:grid lg:grid-cols-3 gap-10 mt-10 px-4 lg:px-15 lg:p-10">
            {services.map((service) => (
              <motion.div
                key={service.title}
                className="relative rounded-lg overflow-hidden shadow-2xl group"
                variants={itemVariants}
              >
                <Image
                  src={service.imageUrl}
                  alt={service.title}
                  width={600}
                  height={800}
                  className="w-full h-[500px] object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                  priority
                />

                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white transition-all duration-500">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent transition-opacity duration-500 opacity-100 group-hover:from-black/70 group-hover:via-black/40" />
                  <div className="relative z-10 transform transition-all duration-500 ease-in-out group-hover:-translate-y-30">
                    <service.icon className="w-10 h-10 mb-2 text-blue-200" />
                    <div className="-mb-35">
                      <h3 className="text-2xl font-bold">{service.title}</h3>
                    </div>
                  </div>
                  <p className="text-gray-200 text-sm mt-3 opacity-0 group-hover:opacity-80 transition-opacity duration-500">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </>
  );
}
