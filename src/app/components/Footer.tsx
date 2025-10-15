"use client";

import React from "react";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa6";

export default function Footer() {
  const logoUrl = "/logo.png";

  return (
    <footer className="relative bg-gray-100 text-gray-600 py-6 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 items-center ">
        {/* Column 1: Logo and Copyright */}
        <div className="flex flex-col items-center text-center">
          <img
            src={logoUrl}
            alt="Rizi International Logo"
            className="h-20 mb-2"
          />
          <p className="!text-[10px] text-gray-500 leading-tight">
            © {new Date().getFullYear()} RIZZI INTERNATIONAL. All rights
            reserved.
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
              <a href="#" className="hover:text-gray-900">
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
            <a
              href="#"
              className="w-8 h-8 flex items-center justify-center border border-gray-400 rounded-full text-gray-600 hover:bg-gray-600 hover:text-white transition-colors text-xs"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="w-8 h-8 flex items-center justify-center border border-gray-400 rounded-full text-gray-600 hover:bg-gray-600 hover:text-white transition-colors text-xs"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="absolute bottom-6 right-6 bg-red-500 text-white rounded-full h-10 w-10 flex items-center justify-center shadow-lg hover:bg-red-600 transition-transform transform hover:scale-110"
        aria-label="Scroll to top"
      >
        <FaArrowUp size={14} />
      </button>
    </footer>
  );
}
