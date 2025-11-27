"use client";

import { motion } from "framer-motion";
import OurCollective from "./OurCollective";

const LordIcon = "lord-icon" as any;

export default function Services() {
  const services = [
    {
      title: "Luxury Shipping",
      description:
        "Premium luxury shipping designed for global leaders and enterprises.",
      icon: "https://cdn.lordicon.com/qhviklyi.json",
    },
    {
      title: "Private Warehousing",
      description: "Secure private warehousing for maximum control and safety.",
      icon: "https://cdn.lordicon.com/jeuxydnh.json",
    },
    {
      title: "Exclusive Logistics",
      description:
        "Exclusive logistics services crafted for precision and efficiency.",
      icon: "https://cdn.lordicon.com/nocovwne.json",
    },
  ];

  return (
    <>
      <section id="services" className="py-24 px-10 bg-white text-center mt-10">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-4xl mb-12 text-[#0a0f1c] font-bold"
        >
          Our Services
        </motion.h2>

        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-10">
          {services.map((service, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="bg-white border border-gray-200 rounded-[10px] p-8 shadow-[0_4px_20px_rgba(10,15,28,0.1)] text-center"
            >
              <LordIcon
                src={service.icon}
                trigger="hover"
                colors="primary:#0a0f1c,secondary:#3b82f6"
                className="w-15 h-15 mb-5 mx-auto"
              />
              <h3 className="text-xl mb-2 text-[#0a0f1c] font-semibold">
                {service.title}
              </h3>
              <p className="text-gray-500 text-lg leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <OurCollective />
    </>
  );
}
