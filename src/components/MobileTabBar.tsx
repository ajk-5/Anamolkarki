"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Icon = {
  Home: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path d="M3 10.5L12 3l9 7.5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 10v10h14V10" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Dev: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path d="M8 16l-4-4 4-4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 8l4 4-4 4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Game: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <rect x="3" y="10" width="18" height="8" rx="3" strokeWidth="1.8" />
      <circle cx="9" cy="14" r="1" />
      <circle cx="12" cy="14" r="1" />
      <circle cx="15" cy="14" r="1" />
    </svg>
  ),
  Tools: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path d="M7 7l3 3-6 6-3 1 1-3 6-6z" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 3l7 7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Mail: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" strokeWidth="1.8" />
      <path d="M3 7l9 7 9-7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

const tabs = [
  { href: "/", label: "Home", icon: Icon.Home, startsWith: "/" },
  { href: "/developer", label: "Dev", icon: Icon.Dev, startsWith: "/developer" },
  { href: "/games", label: "Games", icon: Icon.Game, startsWith: "/games" },
  { href: "/tools", label: "Tools", icon: Icon.Tools, startsWith: "/tools" },
  { href: "/contact", label: "Contact", icon: Icon.Mail, startsWith: "/contact" },
];

export default function MobileTabBar() {
  const pathname = usePathname();
  return (
    <nav className="md:hidden fixed bottom-2 left-1/2 -translate-x-1/2 z-[60] w-[min(100%,460px)] px-2" aria-label="Primary">
      <div className="rounded-2xl border border-teal-500/30 bg-white/10 backdrop-blur-xl shadow-2xl">
        <ul className="grid grid-cols-5">
          {tabs.map((t) => {
            const active = pathname === t.href || (t.startsWith !== "/" && pathname.startsWith(t.startsWith)) || (t.startsWith === "/" && pathname === "/");
            const IconEl = t.icon;
            return (
              <li key={t.href} className="">
                <Link
                  href={t.href}
                  aria-current={active ? "page" : undefined}
                  className={[
                    "flex flex-col items-center justify-center gap-1 py-2 rounded-2xl m-1 text-[11px]",
                    active ? "bg-white/15 text-teal-200" : "text-teal-100 hover:bg-white/10",
                  ].join(" ")}
                >
                  <IconEl className="w-5 h-5" />
                  <span>{t.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="h-[calc(8px+var(--safe-bottom,0px))]" />
      </div>
    </nav>
  );
}

