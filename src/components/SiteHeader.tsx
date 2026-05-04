"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";

type NavItem = {
  href: string;
  label: string;
  match?: "exact" | "startsWith";
};

const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Home", match: "exact" },
  { href: "/projects", label: "Projects", match: "startsWith" },
  { href: "/tools", label: "Tools", match: "startsWith" },
  { href: "/games", label: "Games", match: "startsWith" },
  { href: "/contact", label: "Contact", match: "startsWith" },
];

function isActivePath(pathname: string, item: NavItem) {
  if (item.match === "exact") return pathname === item.href;
  if (item.match === "startsWith") return pathname === item.href || pathname.startsWith(`${item.href}/`);
  return pathname === item.href;
}

export default function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const activeLabel = useMemo(() => {
    return NAV_ITEMS.find((item) => isActivePath(pathname, item))?.label ?? "Menu";
  }, [pathname]);

  return (
    <header className="sticky top-0 z-[80] pt-[calc(10px+var(--safe-top))]">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="card-surface px-3 py-3 sm:px-4">
          <div className="flex items-center justify-between gap-3">
            <Link
              href="/"
              className="flex items-center gap-3 rounded-2xl px-2 py-1.5 transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/15 hover:shadow-[0_18px_45px_rgba(15,23,42,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/35"
              aria-label="Go to homepage"
            >
              <Image
                src="/images/ajklogo.svg"
                alt="Anamol Jang Karki"
                width={38}
                height={38}
                className="rounded-full"
                priority
              />
              <div className="leading-tight">
                <div className="text-xs uppercase tracking-[0.22em] text-slate-200/80">
                  Portfolio
                </div>
                <div className="text-sm sm:text-base font-semibold text-white">
                  Anamol Jang Karki
                </div>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-1" aria-label="Primary">
              {NAV_ITEMS.filter((i) => i.href !== "/").map((item) => {
                const active = isActivePath(pathname, item);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={[
                      "rounded-2xl px-3 py-2 text-sm font-semibold transition-all duration-200 border border-transparent hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/35",
                      active
                        ? "border-white/20 bg-gradient-to-r from-sky-300/20 via-white/10 to-emerald-300/20 text-white shadow-[0_18px_45px_rgba(15,23,42,0.28)]"
                        : "text-slate-200/90 hover:border-white/15 hover:bg-white/10 hover:text-white hover:shadow-[0_16px_40px_rgba(15,23,42,0.24)]",
                    ].join(" ")}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="md:hidden flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-200/80">{activeLabel}</span>
              <button
                type="button"
                className="btn-icon"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
                onClick={() => setMobileOpen((v) => !v)}
              >
                <svg
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  {mobileOpen ? (
                    <>
                      <path d="M18 6 6 18" />
                      <path d="M6 6l12 12" />
                    </>
                  ) : (
                    <>
                      <path d="M4 7h16" />
                      <path d="M4 12h16" />
                      <path d="M4 17h16" />
                    </>
                  )}
                </svg>
              </button>
            </div>
          </div>

          {mobileOpen && (
            <div className="mt-3 border-t border-white/10 pt-3 md:hidden">
              <div className="grid grid-cols-2 gap-2">
                {NAV_ITEMS.map((item) => {
                  const active = isActivePath(pathname, item);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      onClick={() => setMobileOpen(false)}
                      className={[
                        "rounded-2xl px-3 py-2 text-sm font-semibold transition-all duration-200 text-center border border-transparent hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/35",
                        active
                          ? "border-white/20 bg-gradient-to-r from-sky-300/20 via-white/10 to-emerald-300/20 text-white shadow-[0_18px_45px_rgba(15,23,42,0.28)]"
                          : "bg-white/5 text-slate-200/90 hover:border-white/15 hover:bg-white/10 hover:text-white hover:shadow-[0_16px_40px_rgba(15,23,42,0.24)]",
                      ].join(" ")}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="h-3" />
    </header>
  );
}
