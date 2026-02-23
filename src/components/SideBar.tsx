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
            "h-full rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-[0_22px_70px_rgba(2,6,23,0.55),0_0_90px_rgba(244,114,182,0.1)]",
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
                      ? "bg-gradient-to-r from-sky-300/90 to-emerald-300/80 text-slate-950 font-semibold shadow-lg"
                      : "text-slate-200 hover:bg-white/5 hover:text-white",
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
                    className="flex items-center gap-3 px-2 py-2 rounded-lg text-sm mb-1 text-slate-200 hover:bg-white/5 hover:text-white"
                  >
                    <span className="w-5 h-5 rounded-full border border-slate-600/60" />
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
                    className="flex items-center gap-3 px-2 py-2 rounded-lg text-sm mb-1 text-slate-200 hover:bg-white/5 hover:text-white"
                  >
                    <span className="w-5 h-5 rounded-full border border-slate-600/60" />
                    <span className="truncate hidden group-hover:inline">{s.label}</span>
                  </a>
                ))}
              </div>
            )}
          </div>

          <div className="mt-auto p-2 space-y-2">
            <Link
              href="/contact"
              className="block text-center px-2 py-2 rounded-lg bg-gradient-to-r from-sky-400 to-emerald-300 text-slate-950 font-semibold hover:brightness-110 transition"
            >
              <span className="hidden group-hover:inline">Contact Me</span>
              <Icon.Briefcase className="w-5 h-5 mx-auto group-hover:hidden" />
            </Link>
          </div>
        </nav>
      </div>
    </aside>
  );
}
