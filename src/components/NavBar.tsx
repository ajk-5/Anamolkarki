"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

// Dropdown items
const dropdownItems = [
  { href: "/", label: "Développeur" },
  { href: "/Bar", label: "Barman" },
];

// NavBar component
const NavBar: React.FC = () => {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const selectedRole = isMounted ? (pathname === "/Bar" ? "Barman" : "Développeur") : "Développeur";

  return (
    <nav className="fixed top-0 left-0 w-full  p-3  z-30">
      {/* Moving Gradient Background */}
      <div className="absolute inset-0 bg-transparent "></div>
      <div className="relative flex items-center gap-2 backdrop-blur-sm p-3 rounded-xl shadow-lg border border-teal-400 max-w-4xl mx-auto">
        {/* Logo and Name */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center">
            <Image
              className="w-[50px] md:w-[60px] lg:w-[80px] h-auto"
              src="/images/ajklogo.svg"
              alt="Anamol Karki Logo"
              width={60}
              height={60}
            />
            <h1 className="hidden md:inline text-lg md:text-2xl lg:text-3xl font-semibold text-teal-800">
              ANAMOL JANG KARKI
            </h1>
          </Link>
        </div>

        {/* Navigation */}
        <ul className="flex items-center space-x-4 ml-auto">
          <li 
            className="text-sm md:text-lg lg:text-xl text-teal-800 relative flex items-center"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            Portfolio en tant que
            <div className="relative ml-2">
              <span
                className="inline-flex items-center justify-between gap-2 px-4 py-1 bg-teal-600/10 border-2 border-teal-400 rounded-lg shadow-md text-base md:text-lg lg:text-xl text-teal-800 transition duration-300 cursor-pointer"
              >
                {selectedRole}
                <motion.div
                  animate={{ 
                    rotate: isDropdownOpen ? 180 : 0
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="#0f766e" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </motion.div>
              </span>

              {/* Dropdown Menu */}
              <ul className={`absolute top-full left-0 mt-1 bg-white/70 backdrop-blur-sm border border-teal-400 rounded-md shadow-lg transition-all duration-300 ${
                isDropdownOpen ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0"
              } origin-top`}>
                {dropdownItems.map((item, index) => (
                  <li key={index} className="text-sm md:text-base text-teal-800 hover:bg-teal-600/30 p-2">
                    <Link href={item.href} className="block w-full text-center">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;