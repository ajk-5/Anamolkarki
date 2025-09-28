"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// Simple SVG icon set
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
  Bar: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path d="M4 3h16l-6 7v7l2 2H8l2-2v-7L4 3z" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
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
  Briefcase: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <rect x="3" y="7" width="18" height="12" rx="2" strokeWidth="1.8" />
      <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" strokeWidth="1.8" />
    </svg>
  ),
};

const links = [
  { href: "/", label: "Home", icon: Icon.Home },
  { href: "/developer", label: "Developer", icon: Icon.Dev },
  { href: "/games", label: "Games", icon: Icon.Game },
  { href: "/tools", label: "Tools", icon: Icon.Tools },
  // Contact is only shown as the CTA at the bottom to avoid duplicates
];

export default function SideBar() {
  const pathname = usePathname();

  const widthClass = "w-14 group-hover:w-56"; // hover to expand, no button

  return (
    <aside className="group fixed left-3 top-24 bottom-6 z-40 hidden md:block">
      <div className="h-full flex">
        {/* Bar */}
        <nav
          className={[
            "h-full rounded-2xl border border-teal-500/30 bg-white/10 backdrop-blur-xl shadow-xl",
            "transition-all duration-300 flex flex-col items-stretch overflow-hidden",
            widthClass,
          ].join(" ")}
        >
          <div className="px-2 py-3 overflow-auto no-scrollbar">
            {links.map((l) => {
              const active = pathname === l.href;
              const Label = l.icon;
              const labelClass = "hidden group-hover:inline";
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={[
                    "flex items-center gap-3 px-2 py-2 rounded-lg text-sm mb-1",
                    active
                      ? "bg-teal-500/80 text-slate-900 font-semibold"
                      : "text-teal-100 hover:bg-white/10",
                  ].join(" ")}
                >
                  <Label className="w-5 h-5" />
                  <span className={["truncate", labelClass].join(" ")}>{l.label}</span>
                </Link>
              );
            })}

            {pathname.startsWith("/developer") && (
              <div className="mt-2 pt-2 border-t border-white/10">
                {[
                  { href: "#intro", label: "Intro" },
                  { href: "#cv", label: "CV" },
                  { href: "#projects", label: "Projects" },
                  { href: "#experiences", label: "Experiences" },
                  { href: "#education", label: "Education" },
                  { href: "#skills", label: "Skills" },
                  { href: "#contact", label: "Contact" },
                ].map((s) => (
                  <a
                    key={s.href}
                    href={s.href}
                    className="flex items-center gap-3 px-2 py-2 rounded-lg text-sm mb-1 text-teal-100 hover:bg-white/10"
                  >
                    <span className="w-5 h-5 rounded-full border border-teal-400/60" />
                    <span className="truncate hidden group-hover:inline">{s.label}</span>
                  </a>
                ))}
              </div>
            )}

            {pathname.startsWith("/Bar") && (
              <div className="mt-2 pt-2 border-t border-white/10">
                {[
                  { href: "#intro", label: "Intro" },
                  { href: "#qualifications", label: "Qualifications" },
                  { href: "#skills", label: "Skills" },
                  { href: "#languages", label: "Languages" },
                  { href: "#experiences", label: "Experiences" },
                  { href: "#contact", label: "Contact" },
                ].map((s) => (
                  <a
                    key={s.href}
                    href={s.href}
                    className="flex items-center gap-3 px-2 py-2 rounded-lg text-sm mb-1 text-teal-100 hover:bg-white/10"
                  >
                    <span className="w-5 h-5 rounded-full border border-teal-400/60" />
                    <span className="truncate hidden group-hover:inline">{s.label}</span>
                  </a>
                ))}
              </div>
            )}
          </div>

          <div className="mt-auto p-2 space-y-2">
            <Link
              href="/contact"
              className="block text-center px-2 py-2 rounded-lg bg-teal-400/90 text-slate-900 font-semibold hover:bg-teal-300 transition"
            >
              <span className="hidden group-hover:inline">Contact Me</span>
              <Icon.Briefcase className="w-5 h-5 mx-auto group-hover:hidden" />
            </Link>
            <Link
              href="/Bar"
              className="flex items-center justify-center gap-2 px-2 py-2 rounded-lg bg-white/10 text-teal-100 hover:bg-white/20 transition"
            >
              <Icon.Bar className="w-5 h-5" />
              <span className="hidden group-hover:inline">Portfolio as Barman</span>
            </Link>
          </div>
        </nav>
      </div>
    </aside>
  );
}
