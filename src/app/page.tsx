"use client";

import Link from "next/link";
import TealParticles from "@/components/TealParticle";
import MagneticButton from "@/components/MagneticButton";

function DevIcon() {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      className="h-7 w-7 text-teal-300"
    >
      <rect
        x="5"
        y="6"
        width="22"
        height="18"
        rx="3"
        fill="#020617"
        stroke="currentColor"
        strokeWidth={1.4}
      />
      <path
        d="M9 12h4M9 16h6"
        stroke="currentColor"
        strokeWidth={1.4}
        strokeLinecap="round"
      />
      <path
        d="M19 14l3 2-3 2"
        stroke="currentColor"
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ProjectsIcon() {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      className="h-7 w-7 text-sky-300"
    >
      <rect
        x="4"
        y="6"
        width="10"
        height="10"
        rx="2"
        fill="#020617"
        stroke="currentColor"
        strokeWidth={1.4}
      />
      <rect
        x="18"
        y="6"
        width="10"
        height="10"
        rx="2"
        fill="#020617"
        stroke="currentColor"
        strokeWidth={1.4}
      />
      <rect
        x="11"
        y="16"
        width="10"
        height="10"
        rx="2"
        fill="#020617"
        stroke="currentColor"
        strokeWidth={1.4}
      />
    </svg>
  );
}

function GamesIcon() {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      className="h-7 w-7 text-emerald-300"
    >
      <rect
        x="6"
        y="10"
        width="20"
        height="12"
        rx="6"
        fill="#020617"
        stroke="currentColor"
        strokeWidth={1.4}
      />
      <path
        d="M12 13v6M9 16h6"
        stroke="currentColor"
        strokeWidth={1.4}
        strokeLinecap="round"
      />
      <circle cx="20" cy="15" r="1.4" fill="currentColor" />
      <circle cx="22.8" cy="18" r="1.4" fill="currentColor" />
    </svg>
  );
}

function ToolsIcon() {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      className="h-7 w-7 text-teal-200"
    >
      <path
        d="M18.5 6.5a4 4 0 0 1 4.7 5.3L20 9.6l-3.4 3.4 2.2 3.9-3.2 3.2-5-5 3.2-3.2 4 2.2 3.4-3.4-2.2-3.4Z"
        fill="#020617"
        stroke="currentColor"
        strokeWidth={1.3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="10"
        cy="22"
        r="3"
        fill="#020617"
        stroke="currentColor"
        strokeWidth={1.3}
      />
    </svg>
  );
}

function AboutIcon() {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      className="h-7 w-7 text-indigo-300"
    >
      <circle
        cx="16"
        cy="11"
        r="4"
        fill="#020617"
        stroke="currentColor"
        strokeWidth={1.4}
      />
      <path
        d="M9.5 22c1.2-3 3.4-4.5 6.5-4.5S21.8 19 23 22"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.4}
        strokeLinecap="round"
      />
    </svg>
  );
}

function ContactIcon() {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      className="h-7 w-7 text-cyan-300"
    >
      <rect
        x="6"
        y="7"
        width="20"
        height="14"
        rx="3"
        fill="#020617"
        stroke="currentColor"
        strokeWidth={1.4}
      />
      <path
        d="M9 12h10M9 16h6"
        stroke="currentColor"
        strokeWidth={1.4}
        strokeLinecap="round"
      />
      <path
        d="M12 21 10 25"
        stroke="currentColor"
        strokeWidth={1.4}
        strokeLinecap="round"
      />
    </svg>
  );
}

const sections = [
  {
    key: "developer",
    title: "Developer portfolio",
    href: "/developer",
    description:
      "Full overview of my skills, case studies and experience as a full-stack engineer.",
    badge: "Start here",
    icon: DevIcon,
  },
  {
    key: "projects",
    title: "Projects",
    href: "/projects",
    description:
      "Selected real-world apps and experiments, with context on stack and outcomes.",
    badge: "Case studies",
    icon: ProjectsIcon,
  },
  {
    key: "games",
    title: "Games",
    href: "/games",
    description:
      "Small web games and playful experiences you can try directly in the browser.",
    badge: "Play",
    icon: GamesIcon,
  },
  {
    key: "tools",
    title: "Tools",
    href: "/tools",
    description:
      "World clock, invoice generator, QR utilities and more small productivity helpers.",
    badge: "Utilities",
    icon: ToolsIcon,
  },
  {
    key: "about",
    title: "About me",
    href: "/me",
    description:
      "Background, values and how I approach building products and interfaces.",
    badge: "Profile",
    icon: AboutIcon,
  },
  {
    key: "contact",
    title: "Contact",
    href: "/contact",
    description:
      "Ways to reach me for freelance work, collaborations or questions.",
    badge: "Say hi",
    icon: ContactIcon,
  },
];

export default function Home() {
  return (
    <main className="relative min-h-[calc(100vh-5rem)] overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none fixed inset-0 -z-20 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.08),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(168,85,247,0.08),transparent_30%),radial-gradient(circle_at_50%_80%,rgba(249,115,22,0.07),transparent_40%)]" />
      <div className="pointer-events-none fixed inset-0 -z-10 opacity-20 bg-[linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(180deg,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:60px_60px]" />
      <div className="pointer-events-none fixed inset-0 -z-30 mix-blend-soft-light">
        <TealParticles particleCount={80} />
      </div>

      <section className="relative z-10 mx-auto flex max-w-6xl flex-col gap-12 px-5 pb-16 pt-16 lg:px-8">
        {/* Hero */}
        <div className="relative overflow-hidden rounded-3xl border border-slate-800/60 bg-gradient-to-br from-slate-900/80 via-slate-950 to-slate-950 p-6 shadow-2xl ring-1 ring-slate-900/60 lg:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(45,212,191,0.18),transparent_55%),radial-gradient(circle_at_80%_20%,rgba(129,140,248,0.15),transparent_50%)]" />
          <div className="relative z-10 grid gap-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-teal-500/50 bg-slate-900/60 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-teal-200">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                Developer portfolio
              </div>
              <h1 className="text-3xl font-black leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                Building playful products, tools{" "}
                <span className="block text-teal-300">
                  and interfaces that feel alive.
                </span>
              </h1>
              <p className="max-w-xl text-sm text-slate-200/90 sm:text-base">
                I&apos;m Anamol Jang Karki, a full-stack developer who enjoys
                shipping real products, crafting tiny games, and designing small
                utilities that actually get used.
              </p>
              <div className="flex flex-wrap gap-3 pt-1">
                <Link href="/developer">
                  <MagneticButton size="md">
                    View developer portfolio
                  </MagneticButton>
                </Link>
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-700/70 bg-slate-900/70 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:-translate-y-0.5 hover:border-teal-400/60"
                >
                  Browse projects
                  <svg
                    viewBox="0 0 20 20"
                    fill="none"
                    className="h-4 w-4"
                    aria-hidden="true"
                  >
                    <path
                      d="M6 5h8v8"
                      stroke="currentColor"
                      strokeWidth={1.6}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6 13L14 5"
                      stroke="currentColor"
                      strokeWidth={1.6}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
                <div className="flex flex-wrap gap-2 text-xs text-slate-400">
                  <Link
                    href="/games"
                    className="inline-flex items-center gap-1 rounded-full bg-slate-900/60 px-3 py-1 transition hover:bg-slate-800/80 hover:text-teal-300"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
                    Games
                  </Link>
                  <Link
                    href="/tools"
                    className="inline-flex items-center gap-1 rounded-full bg-slate-900/60 px-3 py-1 transition hover:bg-slate-800/80 hover:text-teal-300"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
                    Tools
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Portfolio sections */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <Link
                key={section.key}
                href={section.href}
                className="group flex h-full flex-col justify-between rounded-2xl border border-slate-800/70 bg-gradient-to-br from-slate-950/90 via-slate-950 to-slate-900/80 p-5 shadow-[0_12px_48px_rgba(0,0,0,0.45)] transition hover:-translate-y-1 hover:border-teal-400/60"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.18em] text-slate-400">
                        {section.badge}
                      </div>
                      <h3 className="mt-1 text-lg font-semibold text-white">
                        {section.title}
                      </h3>
                    </div>
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl border border-slate-700/60 bg-slate-900/80 text-teal-300">
                      <Icon />
                    </span>
                  </div>
                  <p className="text-sm text-slate-300">
                    {section.description}
                  </p>
                </div>
                <div className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-teal-200">
                  Open
                  <svg
                    viewBox="0 0 20 20"
                    className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-1"
                    aria-hidden="true"
                  >
                    <path
                      d="M6 5h8v8"
                      stroke="currentColor"
                      strokeWidth={1.6}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6 13L14 5"
                      stroke="currentColor"
                      strokeWidth={1.6}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </Link>
            );
          })}
        </div>

        <footer className="pt-4 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} Anamol Jang Karki · Developer portfolio
        </footer>
      </section>
    </main>
  );
}
