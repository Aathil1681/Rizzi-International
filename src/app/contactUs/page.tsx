"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone } from "lucide-react";
import { getNames } from "country-list";
import { toast, Toaster } from "sonner";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    email: "",
    address: "",
    city: "",
    country: "",
    message: "",
  });

  const countries = getNames().sort((a, b) => a.localeCompare(b));

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const loadingToast = toast.loading("Submitting...");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "7592de58-a002-41d1-9278-e2d42c5eb114", // Replace with your Web3Forms API key
          subject: "New Contact Form Submission",
          ...formData,
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.dismiss(loadingToast);
        toast.success("Message sent successfully!", { duration: 4000 });
        setFormData({
          fullName: "",
          mobile: "",
          email: "",
          address: "",
          city: "",
          country: "",
          message: "",
        });
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      console.error(error);
      toast.error("Failed to send message. Please try again.", {
        duration: 4000,
      });
    }
  };

  return (
    <div className="bg-white text-gray-800 font-sans">
      <Toaster position="top-right" richColors />

      {/* Hero Section */}
      <section
        className="relative h-64 md:h-80 bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </section>

      {/* Form Section */}
      <section className="container mx-auto px-6 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
          {/* Intro */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Connect with us
            </h1>
            <p className="text-gray-600 leading-relaxed">
              Whatever your interest with the group, please feel free to contact
              us. Enter the information below and press &quot;Submit&quot;.
            </p>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name*"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
                <input
                  type="text"
                  name="city"
                  placeholder="City*"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
                <input
                  type="tel"
                  name="mobile"
                  placeholder="Mobile No."
                  value={formData.mobile}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                >
                  <option value="">Country*</option>
                  {countries.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <input
                type="email"
                name="email"
                placeholder="Email*"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
              <input
                type="text"
                name="address"
                placeholder="Address*"
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
              <textarea
                name="message"
                placeholder="Message*"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              ></textarea>

              <button
                type="submit"
                className="bg-gray-800 text-white font-semibold py-3 px-8 rounded-md hover:bg-gray-700 transition-colors duration-300"
              >
                Submit
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Map Section */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-16">
            LET&apos;S START A CONVERSATION
          </h2>

          <div className="mt-10 flex flex-col md:flex-row items-center md:items-start justify-center md:justify-between md:space-x-8 space-y-12 md:space-y-0">
            {/* Left Side - Text Content */}
            <div className="flex flex-col items-center md:items-start justify-start lg:pl-20 w-full md:w-1/2 space-y-6 md:space-y-10">
              {/* Meet Us */}
              <div className="text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start mb-4">
                  <MapPin className="text-blue-600 mr-3 size-8" />
                  <div className="mt-4">
                    <h3 className="text-xl font-semibold ">MEET US.</h3>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Rizzi International
                  <br />
                  244/C, KKP Road, Kalmunai-01
                  <br />
                  P.O. BOX 32300 | Sri Lanka
                </p>
              </div>

              {/* Call Us */}
              <div className="text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start mb-4">
                  <Phone className="text-blue-600 size-7 mr-3" />
                  <div className="mt-3">
                    <h3 className="text-xl font-semibold">CALL US.</h3>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Tel: +94 77 152 7111
                </p>
              </div>
            </div>

            {/* Right Side - Map */}
            <div className="w-full md:w-1/2 h-56 md:h-72 lg:h-80 rounded-md overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.5130504188023!2d81.83043157373665!3d7.4083266122516305!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae53f07d9f9610d%3A0x8caae5d0743ed645!2s244%20KKP%20Rd.%2C%20Kalmunai%2032300!5e0!3m2!1sen!2slk!4v1760449676286!5m2!1sen!2slk"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
