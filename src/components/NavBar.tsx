"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

// Dropdown items
const dropdownItems = [
  { href: "/", label: "Développeur" },
  { href: "/Bar", label: "Barman" },
];

// NavBar component
const NavBar: React.FC = () => {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const selectedRole = isMounted ? (pathname === "/Bar" ? "Barman" : "Développeur") : "Développeur";

  return (
    <nav className="fixed top-0 left-0 w-full z-50 p-3 bg-transparent">
      <div className="flex items-center gap-2">
        {/* Logo and Name */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center">
            <Image
              className="w-[60px] md:w-[80px] lg:w-[100px] h-auto"
              src="/images/logo.png"
              alt="Anamol Karki Logo"
              width={100}
              height={100}
            />
            <h1 className="hidden md:inline text-lg md:text-2xl lg:text-3xl font-semibold text-gold">
              ANAMOL JANG KARKI
            </h1>
          </Link>
        </div>

        {/* Navigation */}
        <ul className="flex items-center space-x-4">
          <li className="text-sm md:text-lg lg:text-xl text-gold relative group flex items-center">
            Portfolio en tant que
            <div className="relative ml-2">
              <span
                className="inline-block px-4 py-1 bg-black border-2 border-gold rounded-lg shadow-md text-base md:text-lg lg:text-xl transition duration-300 cursor-pointer"
              >
                {selectedRole}
              </span>

              {/* Dropdown Menu */}
              <ul className="absolute top-full left-0 mt-1 bg-black border border-gray-600 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transform scale-y-0 group-hover:scale-y-100 origin-top transition duration-300">
                {dropdownItems.map((item, index) => (
                  <li key={index} className="text-sm md:text-base text-gold hover:bg-gray-700 p-2">
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
