"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

// Dropdown items
const dropdownItems = [
  { href: "/developer", label: "Développeur" },
  { href: "/Bar", label: "Barman" },
];

// NavBar component
const NavBar: React.FC = () => {
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const selectedRole = pathname === "/Bar" ? "Barman" : "Développeur";

  return (
    <nav className="fixed top-0 left-0 w-full z-50 p-2">
      <div className="relative flex items-center justify-between backdrop-blur-xl p-2 rounded-xl shadow-lg border border-slate-700/70 bg-slate-950/70 max-w-full mx-auto">
        <div className="flex items-center gap-2">
          <button className="md:hidden" onClick={toggleMenu} aria-label="Menu">
            <Image src="/images/menu.svg" alt="menu" width={24} height={24} />
          </button>
          <Link href="/" className="flex items-center mx-auto md:mx-0">
            <Image
              className="w-[40px] md:w-[50px] lg:w-[60px] h-auto"
              src="/images/ajklogo.svg"
              alt="Anamol Karki Logo"
              width={50}
              height={50}
            />
            <h1 className="hidden md:inline text-base md:text-xl lg:text-4xl font-semibold text-slate-100">
              ANAMOL JANG KARKI
            </h1>
          </Link>
        </div>

        <ul className="hidden md:flex items-center space-x-4 mx-auto">
          <li
            className="text-xs md:text-sm lg:text-base text-slate-300 relative flex items-center"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            Portfolio en tant que
            <div className="relative ml-2">
              <span
                className="inline-flex items-center justify-between gap-2 px-2 py-1 bg-slate-950/70 border border-slate-700/70 rounded-lg shadow-md text-xs md:text-sm lg:text-base text-slate-200 transition duration-300 cursor-pointer"
              >
                {selectedRole}
                <motion.div
                  animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </motion.div>
              </span>

              {/* Dropdown Menu */}
              <ul
                className={`absolute top-full left-0 mt-1 bg-slate-950/90 backdrop-blur-sm border border-slate-700/70 rounded-md shadow-lg transition-all duration-300 ${
                  isDropdownOpen ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0"
                } origin-top`}
              >
                {dropdownItems.map((item, index) => (
                  <li key={index} className="text-xs md:text-sm text-slate-200 hover:bg-white/5 p-1">
                    <Link href={item.href} className="block w-full text-center">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </li>
          <li>
            <Link
              href="/tools"
              className="btn-outline"
            >
              Tools
            </Link>
          </li>
          <li>
            <Link
              href="/games"
              className="btn-outline"
            >
              Games
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="btn-primary"
            >
              Contact Me
            </Link>
          </li>
        </ul>

        
      </div>

      {/* Mobile menu placeholder */}
    </nav>
  );
};

export default NavBar;
