"use client";

import React, { useEffect, useState } from "react";
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
  const [isMounted, setIsMounted] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [temperature, setTemperature] = useState<number | null>(null);

  useEffect(() => {
    setIsMounted(true);
    fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=48.8566&longitude=2.3522&current=temperature_2m&timezone=Europe%2FParis"
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.current && typeof data.current.temperature_2m === "number") {
          setTemperature(Math.round(data.current.temperature_2m));
        }
      })
      .catch(() => {});
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  const selectedRole = isMounted ? (pathname === "/Bar" ? "Barman" : "Développeur") : "Développeur";

  return (
    <nav className="fixed top-0 left-0 w-full z-50 p-2">
      <div className="relative flex items-center justify-between backdrop-blur-sm p-2 rounded-xl shadow-lg border border-yellow-900 max-w-full mx-auto">
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
            <h1 className="hidden md:inline text-base md:text-xl lg:text-4xl font-semibold text-blue-300">
              ANAMOL JANG KARKI
            </h1>
          </Link>
        </div>

        <ul className="hidden md:flex items-center space-x-2 mx-auto">
          <li
            className="text-xs md:text-sm lg:text-base text-teal-800 relative flex items-center"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            Portfolio en tant que
            <div className="relative ml-2">
              <span
                className="inline-flex items-center justify-between gap-2 px-2 py-1 bg-teal-600/10 border-2 border-teal-400 rounded-lg shadow-md text-xs md:text-sm lg:text-base text-teal-800 transition duration-300 cursor-pointer"
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
              <ul
                className={`absolute top-full left-0 mt-1 bg-white/70 backdrop-blur-sm border border-teal-400 rounded-md shadow-lg transition-all duration-300 ${
                  isDropdownOpen ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0"
                } origin-top`}
              >
                {dropdownItems.map((item, index) => (
                  <li key={index} className="text-xs md:text-sm text-teal-800 hover:bg-teal-600/30 p-1">
                    <Link href={item.href} className="block w-full text-center">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        </ul>

        <div className="flex items-center gap-2">
          <button onClick={toggleSearch} aria-label="Search">
            <Image src="/images/search.svg" alt="search" width={20} height={20} />
          </button>
          <div className="flex items-center text-xs md:text-sm text-teal-800">
            <Image src="/images/weather.svg" alt="weather" width={20} height={20} />
            {temperature !== null && <span className="ml-1">{temperature}°C</span>}
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <ul className="md:hidden absolute top-full left-0 w-full bg-white/90 backdrop-blur-sm border border-yellow-900 rounded-b-xl shadow">
          {dropdownItems.map((item, index) => (
            <li key={index} className="p-2 text-teal-800 text-center hover:bg-teal-600/30">
              <Link href={item.href} onClick={() => setIsMenuOpen(false)}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      )}

      {isSearchOpen && (
        <div className="absolute top-full right-2 mt-1 bg-white/90 backdrop-blur-sm p-1 rounded shadow-md">
          <input type="text" placeholder="Search..." className="text-sm p-1 text-black outline-none" />
        </div>
      )}
    </nav>
  );
};

export default NavBar;
