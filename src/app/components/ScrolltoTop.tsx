"use client";

import { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

const ScrollTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after user scrolls down 100px
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return isVisible ? (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 bg-blue-900 text-white rounded-full h-12 w-12 flex items-center justify-center shadow-lg hover:bg-blue-800 transition-transform transform hover:scale-110 z-50"
      aria-label="Scroll to top"
    >
      <FaArrowUp size={16} />
    </button>
  ) : null;
};

export default ScrollTopButton;
