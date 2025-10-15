"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineSearch, AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";

export default function Navbar() {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const links = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "About Us", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "Contact Us", href: "/contactUs" },
  ];

  const contactInfo = [
    {
      icon: <FiPhone size={20} color="#636363" />,
      lines: ["Call Us: +94 77 152 7111", "(Mon - Sat)"],
    },
    {
      icon: <FiMail size={20} color="#636363" />,
      lines: ["Mail us for help:", "info@rizziinternational.com"],
    },
    {
      icon: <FiMapPin size={20} color="#636363" />,
      lines: ["244/C,KKP Road,Kalmunai", "Sri Lanka"],
    },
  ];

  // Detect mobile
  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth < 768);
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      setShow(window.scrollY <= lastScrollY);
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <>
      {/* --- Main Navbar --- */}
      <AnimatePresence>
        {show && (
          <motion.nav
            initial={{ y: -80 }}
            animate={{ y: 0 }}
            exit={{ y: -80 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              zIndex: 50,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: isMobile ? "12px 20px" : "12px 60px",
              background: isScrolled
                ? "rgba(255, 255, 255, 0.95)"
                : "transparent",
              backdropFilter: isScrolled ? "blur(10px)" : "none",
              boxShadow: isScrolled
                ? "0 2px 4px rgba(10, 15, 28, 0.05)"
                : "none",
              transition: "all 0.3s ease",
            }}
          >
            {/* Logo */}
            <div
              style={{
                visibility: isMobileMenuOpen && isMobile ? "hidden" : "visible",
              }}
            >
              <Image
                src="/logo.png"
                alt="Logo"
                width={120}
                height={40}
                style={{
                  filter:
                    isScrolled || isMobileMenuOpen
                      ? "none"
                      : "brightness(0) invert(1)",
                }}
              />
            </div>

            {/* Desktop Links */}
            <div
              className="nav-links"
              style={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                gap: "35px",
              }}
            >
              {links.map((link, i) => (
                <Link
                  key={i}
                  href={link.href}
                  style={{
                    color: isScrolled ? "#0a0f1c" : "#ffffff",
                    textDecoration: "none",
                    fontWeight: 600,
                    fontSize: "14px",
                    position: "relative",
                    paddingBottom: "4px",
                    cursor: "pointer",
                    transition: "color 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    const underline = e.currentTarget.querySelector("span");
                    if (underline) underline.style.width = "100%";
                  }}
                  onMouseLeave={(e) => {
                    const underline = e.currentTarget.querySelector("span");
                    if (underline) underline.style.width = "0";
                  }}
                >
                  {link.name}
                  <span
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      width: 0,
                      height: "2px",
                      borderRadius: "2px",
                      background: "linear-gradient(90deg, #2563eb, #0a0f1c)",
                      transition: "width 0.3s ease",
                    }}
                  />
                </Link>
              ))}
            </div>

            {/* Right Icons */}
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <AiOutlineSearch
                size={25}
                color={isScrolled ? "#0a0f1c" : "#ffffff"}
              />
              <button
                onClick={toggleMobileMenu}
                className="mobile-menu-button"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  zIndex: 60,
                  color: isScrolled ? "#0a0f1c" : "#ffffff",
                }}
              >
                {isMobileMenuOpen ? (
                  <AiOutlineClose size={25} color="#0a0f1c" />
                ) : (
                  <AiOutlineMenu size={25} />
                )}
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* --- Mobile Menu --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "rgba(0, 0, 0, 0.5)",
                zIndex: 48,
              }}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.4, ease: "easeInOut" }}
              style={{
                position: "fixed",
                top: 0,
                right: 0,
                bottom: 0,
                width: "85%",
                maxWidth: "320px",
                background: "#ffffff",
                zIndex: 49,
                display: "flex",
                flexDirection: "column",
                fontFamily: "'Montserrat', sans-serif",
                boxShadow: "-5px 0 15px rgba(0,0,0,0.1)",
              }}
            >
              <div
                style={{
                  padding: "12px 20px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderBottom: "1px solid #eee",
                }}
              >
                <Image src="/logo.png" alt="Logo" width={120} height={40} />
              </div>

              <div style={{ padding: "20px", flex: 1 }}>
                {/* Mobile nav */}
                <nav style={{ display: "flex", flexDirection: "column" }}>
                  {links.map((link, i) => (
                    <Link
                      key={i}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      style={{
                        display: "block",
                        color: "#0a0f1c",
                        textDecoration: "none",
                        fontWeight: 600,
                        fontSize: "16px",
                        padding: "15px 0",
                        borderBottom: "1px solid #f0f0f0",
                      }}
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>

                {/* Contact info */}
                <div style={{ marginTop: "auto", paddingTop: "20px" }}>
                  {contactInfo.map((item, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "15px",
                        marginBottom: "20px",
                      }}
                    >
                      {item.icon}
                      <div>
                        <p
                          style={{
                            margin: 0,
                            color: "#0a0f1c",
                            fontSize: "14px",
                            fontWeight: 600,
                          }}
                        >
                          {item.lines[0]}
                        </p>
                        {item.lines[1] && (
                          <p
                            style={{
                              margin: 0,
                              color: "#636363",
                              fontSize: "12px",
                            }}
                          >
                            {item.lines[1]}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style jsx>{`
        @media (max-width: 767px) {
          .nav-links,
          .search-icon {
            display: none !important;
          }
        }
        @media (min-width: 768px) {
          .mobile-menu-button {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
