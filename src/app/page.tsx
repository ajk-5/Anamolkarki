"use client";

import Link from "next/link";
import MagneticButton from "@/components/MagneticButton";

function DevIcon() {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      className="h-7 w-7 text-sky-300"
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
      className="h-7 w-7 text-emerald-300"
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
      className="h-7 w-7 text-cyan-300"
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
      className="h-7 w-7 text-amber-300"
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
      className="h-7 w-7 text-slate-200"
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
      className="h-7 w-7 text-sky-200"
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
      "Case studies, architecture notes, and end-to-end product stories.",
    badge: "Start here",
    icon: DevIcon,
  },
  {
    key: "projects",
    title: "Projects",
    href: "/projects",
    description:
      "Selected apps and experiments with context on stack and outcomes.",
    badge: "Case studies",
    icon: ProjectsIcon,
  },
  {
    key: "games",
    title: "Games",
    href: "/games",
    description:
      "Playable micro-experiences and interaction studies you can try now.",
    badge: "Play",
    icon: GamesIcon,
  },
  {
    key: "tools",
    title: "Tools",
    href: "/tools",
    description:
      "Utility apps and helpers that remove friction from daily work.",
    badge: "Utilities",
    icon: ToolsIcon,
  },
  {
    key: "about",
    title: "About me",
    href: "/me",
    description:
      "Background, values, and how I build products with teams.",
    badge: "Profile",
    icon: AboutIcon,
  },
  {
    key: "contact",
    title: "Contact",
    href: "/contact",
    description:
      "Start a project, hire me, or just say hello.",
    badge: "Say hi",
    icon: ContactIcon,
  },
];

export default function Home() {
  return (
    <main className="relative min-h-[calc(100vh-5rem)] overflow-hidden text-slate-100">
      <section className="relative z-10 mx-auto flex max-w-6xl flex-col gap-16 px-5 pb-20 pt-14 lg:px-8">
        <div className="grid items-center gap-10">
          <div className="space-y-6">
            <div className="reveal inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-200/80">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-200 shadow-[0_0_14px_rgba(140,201,240,0.6)]" />
              developper Web/ Mobile and AI
            </div>
            <h1 className="reveal reveal-delay-1 text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl font-display">
              Hi I am Anamol Jang Karki.
            </h1>
            <p className="reveal reveal-delay-2 max-w-xl text-base text-slate-200/90 sm:text-lg">
              I am currently studying 3rd year of bachelor in software engineering: web and AI at EFREI. Please view my{" "}
              <Link
                href="/developer"
                className="font-semibold text-sky-200 underline decoration-sky-300/70 underline-offset-4 transition hover:text-sky-100"
              >
                developer portfolio
              </Link>{" "}
              for more info.
            </p>
            <div className="reveal reveal-delay-3 flex flex-wrap gap-3">
              <Link href="/developer">
                <MagneticButton size="lg">
                  View developer portfolio
                </MagneticButton>
              </Link>
              <Link href="/projects">
                <MagneticButton size="lg" variant="outline">
                  Explore projects
                </MagneticButton>
              </Link>
            </div>
            <div className="reveal reveal-delay-4 flex flex-wrap gap-2">
              {[
                { href: "/games", label: "Games" },
                { href: "/tools", label: "Tools" },
                { href: "/me", label: "About" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="footer-link gap-2"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-sky-200" />
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
              Portfolio map
            </p>
            <h2 className="mt-2 text-2xl font-semibold font-display text-slate-100">
              Explore the work and stories
            </h2>
          </div>
          <Link
            href="/developer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-sky-200 transition hover:text-sky-100"
          >
            Start with the developer portfolio
            <svg
              viewBox="0 0 20 20"
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
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <Link
                key={section.key}
                href={section.href}
                className={`group reveal reveal-delay-${(index % 3) + 1} card-surface flex h-full flex-col justify-between p-5 transition-all duration-200 hover:-translate-y-1 hover:border-white/45 hover:shadow-[0_30px_80px_rgba(15,23,42,0.55),0_0_140px_rgba(244,114,182,0.16)]`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.25em] text-slate-400">
                        {section.badge}
                      </div>
                      <h3 className="mt-1 text-lg font-semibold text-white">
                        {section.title}
                      </h3>
                    </div>
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/20 bg-white/10 backdrop-blur">
                      <Icon />
                    </span>
                  </div>
                  <p className="text-sm text-slate-300">
                    {section.description}
                  </p>
                </div>
                <div className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-sky-200">
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

        <div className="card-surface relative overflow-hidden p-6 sm:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(56,189,248,0.18),transparent_55%),radial-gradient(circle_at_80%_20%,rgba(20,184,166,0.12),transparent_50%)]" />
          <div className="relative z-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
                Start a build
              </p>
              <h2 className="text-2xl font-semibold font-display text-white sm:text-3xl">
                Design a product people love to use.
              </h2>
              <p className="text-sm text-slate-200/80 sm:text-base">
                Tell me about the product, the audience, and the outcome. I will
                help you shape the UX, ship clean code, and deliver a polished
                experience.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-start">
              <Link href="/contact">
                <MagneticButton size="md">Contact me</MagneticButton>
              </Link>
              <Link
                href="/developer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-200 transition hover:text-sky-100"
              >
                View the full portfolio
                <svg
                  viewBox="0 0 20 20"
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
            </div>
          </div>
        </div>

      </section>
    </main>
  );
}
