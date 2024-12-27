"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Keyboard,
  Cpu,
  CheckCircle,
  ArrowRight,
  Scan,
  MapPin,
  Globe,
  Zap,
} from "lucide-react";
import { motion, useAnimation } from "framer-motion";
import Header from "@/components/ui/header";

export default function LandingPage() {
  const [address, setAddress] = useState("");
  const [verifiedAddress, setVerifiedAddress] = useState("");
  const [placeholderAddress, setPlaceholderAddress] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const addressInputRef = useRef(null);

  const handleVerify = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setVerifiedAddress("123 Verified St, City, State, 12345");
      setIsVerifying(false);
    }, 2000);
  };

  const placeholders = [
    "Enter your address",
    "e.g. 123 Main St, City",
    "e.g. 45 Avenue, District",
    "e.g. 678 State Rd, Region",
  ];

  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
      setPlaceholderAddress(placeholders[placeholderIndex]);
    }, 3000);

    return () => clearInterval(interval);
  }, [placeholderIndex, placeholders]);

  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      y: [0, -10, 0],
      transition: { duration: 2, repeat: Infinity },
    });
  }, [controls]);

  return (
    <div className="bg-black">
      <div className="max-w-screen-2xl mx-auto w-full bg-black px-3 lg:px-14">
        <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
          <Header />
          <main>
            <section className="relative bg-black container mx-auto px-4 py-20 text-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-100/0 via-purple-400/10 to-purple-100/0 blur-[60px] z-0"></div>
              <div className="relative z-10">
                <motion.h1
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-5xl md:text-6xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-20% bg-clip-text text-transparent from-purple-500 to-purple-200"
                >
                  AI-Powered Address Verification
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-2xl lg:text-3xl mb-6 bg-gradient-to-r from-purple-300 via-purple-200 to-purple-100 bg-clip-text text-transparent font-semibold"
                >
                  Accuracy at Scale
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-base md:text-lg lg:text-xl mb-10 text-white/60 max-w-2xl mx-auto"
                >
                  Achieve unparalleled accuracy at scale with our cutting-edge
                  address verification service.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="max-w-lg mx-auto p-7 rounded-lg shadow-lg bg-white/5 backdrop-blur border-purple-700 border"
                >
                  <div className="relative">
                    <Input
                      ref={addressInputRef}
                      type="text"
                      placeholder={placeholderAddress}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="mb-4 bg-transparent focus:bg-transparent hover:bg-transparent placeholder-purple-600 transition-colors duration-300 pr-10 py-5"
                    />
                    <motion.div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-400">
                      <ArrowRight size={20} />
                    </motion.div>
                  </div>
                  <Button
                    onClick={handleVerify}
                    disabled={isVerifying}
                    className="w-full bg-gradient-to-br from-purple-500 to-purple-700 text-gray-200 hover:opacity-80 transition-colors duration-300 relative overflow-hidden py-5 text-base tracking-wider"
                  >
                    {isVerifying ? (
                      <span className="flex items-center justify-center">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="mr-2"
                        >
                          <Cpu size={20} />
                        </motion.div>
                        Verifying...
                      </span>
                    ) : (
                      "Verify Address"
                    )}
                  </Button>
                  {verifiedAddress && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="mt-4 p-3 bg-white/20 rounded backdrop-blur-md"
                    >
                      <p className="font-semibold">Verified Address:</p>
                      <p>{verifiedAddress}</p>
                    </motion.div>
                  )}
                </motion.div>
              </div>
            </section>

            {/* How It Works section */}
            <section className="py-20 relative overflow-hidden bg-black">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-100/0 via-purple-400/10 to-purple-100/0 blur-[60px] z-0"></div>
              <div className="container mx-auto px-4 relative z-10">
                <h2 className="text-4xl font-bold mb-10 text-center bg-gradient-to-r from-purple-400 via-purple-300 to-purple-200 bg-clip-text text-transparent">
                  How It Works
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    { title: "Input", icon: Keyboard },
                    { title: "Process", icon: Cpu },
                    { title: "Output", icon: CheckCircle },
                  ].map((step, index) => (
                    <motion.div
                      key={step.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.2 }}
                      className="text-center bg-white/5 backdrop-blur p-6 rounded-lg transition-all duration-300 relative group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-purple-400/20 to-purple-300/20 opacity-0 transition-opacity duration-300 rounded-lg -z-10"></div>
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 360 }}
                        transition={{ duration: 0.3 }}
                        className="bg-purple-500 text-black rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4"
                      >
                        <step.icon size={24} />
                      </motion.div>
                      <h3 className="text-xl font-semibold mb-2">
                        {step.title}
                      </h3>
                      <p>
                        Brief explanation of the {step.title.toLowerCase()} step
                        in the verification process.
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Key Features section */}
            <section className="py-20 relative overflow-hidden bg-black">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-100/0 via-purple-400/10 to-purple-100/0 blur-[60px] z-0"></div>
              <div className="container mx-auto px-4 relative z-10">
                <h2 className="text-4xl font-bold mb-10 text-center bg-gradient-to-r from-purple-400 to-purple-300 bg-clip-text text-transparent">
                  Key Features
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[
                    {
                      title: "OCR for Handwritten Addresses",
                      description:
                        "Accurately digitize handwritten addresses using advanced OCR technology.",
                      icon: Scan,
                    },
                    {
                      title: "Address Correction",
                      description:
                        "Automatically correct and standardize addresses to ensure accuracy.",
                      icon: CheckCircle,
                    },
                    {
                      title: "Pincode Prediction",
                      description:
                        "Predict and validate pincodes based on address components.",
                      icon: MapPin,
                    },
                    {
                      title: "Geolocation Services",
                      description:
                        "Enhance addresses with precise latitude and longitude coordinates.",
                      icon: Globe,
                    },
                  ].map((feature, index) => (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-white/5 backdrop-blur border border-purple-500/20 rounded-lg p-6 shadow-lg transition-all duration-300 group"
                    >
                      <div className="flex items-center mb-4">
                        <div className="bg-purple-500 rounded-full p-3 mr-4">
                          <feature.icon className="w-6 h-6 text-black" />
                        </div>
                        <h3 className="text-xl font-semibold text-purple-400 group-hover:text-purple-300 transition-colors duration-300">
                          {feature.title}
                        </h3>
                      </div>
                      <p className="text-white/80">{feature.description}</p>
                      <motion.div
                        className="mt-4 flex items-center text-purple-400 cursor-pointer"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <span className="mr-2">Learn more</span>
                        <ArrowRight className="w-4 h-4" />
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
                <motion.div
                  className="mt-12 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <Button className="bg-gradient-to-r from-purple-400 to-purple-600 text-black hover:from-purple-500 hover:to-purple-700 transition-all duration-300 text-lg px-8 py-5">
                    <Zap className="w-5 h-5 mr-2" />
                    Explore All Features
                  </Button>
                </motion.div>
              </div>
            </section>

            {/* Call to Action section */}
            <section className="py-20 relative overflow-hidden bg-black">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-100/0 via-purple-400/10 to-purple-100/0 blur-[60px] z-0"></div>
              <div className="container mx-auto px-4 text-center relative z-10">
                <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-purple-300 to-purple-200 bg-clip-text text-transparent">
                  Ready to Get Started?
                </h2>
                <p className="text-xl mb-10">
                  Experience the power of AI-driven address verification today.
                </p>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button className="bg-gradient-to-r from-purple-400 to-purple-700 text-black hover:opacity-80 text-lg px-8 py-5 transition-colors duration-300">
                    Sign Up for Free Trial
                  </Button>
                </motion.div>
              </div>
            </section>

            <div className="h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
          </main>

          <footer className="bg-black py-10">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-purple-400">
                    Product
                  </h3>
                  <ul className="space-y-2">
                    <li>
                      <Link
                        href="/features"
                        className="text-gray-300 hover:text-purple-400 transition-colors duration-300"
                      >
                        Features
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/pricing"
                        className="text-gray-300 hover:text-purple-400 transition-colors duration-300"
                      >
                        Pricing
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/documentation"
                        className="text-gray-300 hover:text-purple-400 transition-colors duration-300"
                      >
                        Documentation
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-purple-400">
                    Company
                  </h3>
                  <ul className="space-y-2">
                    <li>
                      <Link
                        href="/about"
                        className="text-gray-300 hover:text-purple-400 transition-colors duration-300"
                      >
                        About Us
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/contact"
                        className="text-gray-300 hover:text-purple-400 transition-colors duration-300"
                      >
                        Contact
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/careers"
                        className="text-gray-300 hover:text-purple-400 transition-colors duration-300"
                      >
                        Careers
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-purple-400">
                    Legal
                  </h3>
                  <ul className="space-y-2">
                    <li>
                      <Link
                        href="/privacy"
                        className="text-gray-300 hover:text-purple-400 transition-colors duration-300"
                      >
                        Privacy Policy
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/terms"
                        className="text-gray-300 hover:text-purple-400 transition-colors duration-300"
                      >
                        Terms of Service
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-purple-400">
                    Connect
                  </h3>
                  <ul className="space-y-2">
                    <li>
                      <a
                        href="#"
                        className="text-gray-300 hover:text-purple-400 transition-colors duration-300"
                      >
                        Twitter
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-gray-300 hover:text-purple-400 transition-colors duration-300"
                      >
                        LinkedIn
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-gray-300 hover:text-purple-400 transition-colors duration-300"
                      >
                        GitHub
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-gray-800 text-center">
                <p className="text-gray-400">
                  &copy; 2024 AddressAI. All rights reserved.
                </p>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
