import React from "react";
import Link from "next/link";
import Image from "next/image";

const navItems = [

  { href: "/", label: "Bar" },
  { href: "/user", label: <Image
    src="/images/menu.svg"
    alt="menu"
    width={40}
    height={40}
  /> },
 
  
];

const NavBar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 p-1 ">
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "0.5rem",
        }}>
            <div className="inline-flex items-center gap-2">
<Link href="/">
  <Image
    className="inline-flex items-center w-[60px] md:w-[100px] h-auto"
    src="/images/logo.png"
    alt="Anamol Karki Logo"
    width={60}
    height={100}
   
  />
  <h1 className="text-[2rem] font-semibold text-gold  hidden md:inline">ANAMOL JANG KARKI</h1>
</Link>

</div>
      <ul
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "0rem",
        }}
      >
        {navItems.map((item, index) => (
          <li
          className="text-sm md:text-base lg:text-md text-gold"
            key={index}
            style={{
              display: "inline-flex",
              width: "auto",     
              padding: "0.5rem",
              color: "#dfcea8",
            }}
          >
            <Link
              href={item.href}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
        </div>
    </nav>
  );
};

export default NavBar;
