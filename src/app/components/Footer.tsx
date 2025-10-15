"use client";

import React from "react";
import Image from "next/image";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  const logoUrl = "/logo.png";

  // Dynamic year rendered only on client to avoid hydration errors
  const [year, setYear] = React.useState<number | null>(null);
  React.useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  const socialLinks = [
    {
      href: "https://www.facebook.com/share/17DCgiUddC/",
      icon: <FaFacebookF />,
    },
    {
      href: "https://www.linkedin.com/company/rizziinternational",
      icon: <FaLinkedinIn />,
    },
    {
      href: "https://www.instagram.com/rizziinternational/",
      icon: <FaInstagram />,
    },
  ];

  return (
    <footer className="relative bg-gray-100 text-gray-600 py-6 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
        {/* Column 1: Logo and Copyright */}
        <div className="flex flex-col items-center text-center">
          <Image
            src={logoUrl}
            alt="Rizi International Logo"
            width={80}
            height={80}
            className="mb-2"
          />
          <p className="!text-[10px] text-gray-500 leading-tight">
            © {year ?? ""} RIZZI INTERNATIONAL. All rights reserved.
          </p>
          <p className="!text-[10px] text-gray-500 leading-tight">
            Rizzi International
          </p>
        </div>

        {/* Column 2: Who We Are */}
        <div>
          <h3 className="font-semibold text-gray-800 uppercase tracking-wider mb-3 text-sm">
            Who We Are
          </h3>
          <ul className="space-y-1 text-sm">
            <li>
              <a href="/" className="hover:text-gray-900">
                Home
              </a>
            </li>
            <li>
              <a href="/services" className="hover:text-gray-900">
                Services
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-gray-900">
                About Us
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3: Quick Links */}
        <div>
          <h3 className="font-semibold text-gray-800 uppercase tracking-wider mb-3 text-sm">
            Quick Links
          </h3>
          <ul className="space-y-1 text-sm">
            <li>
              <a href="/careers" className="hover:text-gray-900">
                Careers
              </a>
            </li>
            <li>
              <a href="/contactUs" className="hover:text-gray-900">
                Contact Us
              </a>
            </li>
            <li>
              <a href="/terms-and-conditions" className="hover:text-gray-900">
                Terms & Conditions
              </a>
            </li>
          </ul>
        </div>

        {/* Column 4: Stay in Touch */}
        <div>
          <h3 className="font-semibold text-gray-800 uppercase tracking-wider mb-3 text-sm text-center">
            Stay in touch with us
          </h3>
          <div className="flex justify-center gap-3">
            {socialLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center border border-gray-400 rounded-full text-gray-600 hover:bg-gray-600 hover:text-white transition-colors text-xs"
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
