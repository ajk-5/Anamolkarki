"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import MagneticButton from "@/components/MagneticButton";

type Project = {
  title: string;
  shortTitle: string;
  role: string;
  period: string;
  stack: string[];
  description: string[];
  caseStudyHref?: string;
  liveUrl?: string;
  gradient: string;
};

const PROJECTS: Project[] = [
  {
    title: "90STIMES.COM — The Nineties Times",
    shortTitle: "90sTimes",
    role: "Chef de projet · Développeur",
    period: "Février 2025 → Juillet 2025",
    stack: ["Next.js", "ASP.NET Web API", "PostgreSQL", "Nginx", "Docker"],
    description: [
      "Site web : 90stimes.com",
      "Frontend Next.js, backend ASP.NET Web API, PostgreSQL, reverse proxy Nginx",
      "Cartes via OpenStreetMap (Leaflet prévu) et météo via API MET Norway (Location Forecast 2.0)",
      "Personnalisation par adresse IP pour les actualités et la météo locale",
      "Contenu : articles tech, géopolitique, recettes de cocktails (18+), jeux en ligne, outils",
      "Authentification via Google OAuth ou inscription classique",
      "Fonctionnalités sociales : likes, commentaires, questions-réponses",
      "Mise en place en cours dans Docker pour le déploiement",
    ],
    caseStudyHref: "/90stimes.com",
    liveUrl: "https://www.90stimes.com",
    gradient: "from-fuchsia-400/40 via-rose-300/30 to-amber-200/20",
  },
  {
    title: "Paris-Guru — Guide intelligent pour Paris",
    shortTitle: "Paris-Guru",
    role: "Chef de projet · Développeur",
    period: "Août 2025 → en cours",
    stack: ["React Native", "ASP.NET", "Python (Django)", "Next.js", "PostgreSQL + PostGIS", "Redis"],
    description: [
      "Application mobile Android et iOS développée en React Native",
      "Backend Web API ASP.NET en C#, modules IA et machine learning en Python (Django)",
      "Interface web Next.js connectée à la plateforme",
      "Base de données PostgreSQL avec extension PostGIS",
      "Cache applicatif Redis pour les notifications contextuelles",
      "Guide intelligent avec alertes sur le patrimoine historique, culturel et artistique à proximité",
      "Suggestions d'événements, restaurants, clubs, jeux et activités touristiques",
      "Billetterie et réservations intégrées pour les utilisateurs",
    ],
    gradient: "from-sky-400/40 via-cyan-300/30 to-emerald-200/20",
  },
  {
    title: "NavXpert — Application web de navigation",
    shortTitle: "NavXpert",
    role: "Développeur",
    period: "Septembre 2024 → Février 2025",
    stack: ["C#", "ASP.NET", "React + TS", "PostgreSQL", "EF Core", "Leaflet", "Nginx"],
    description: [
      "Site web : navxpert.anamolkarki.com",
      "Solution numérique pour le web et le mobile",
      "Stack : C#, ASP.NET, React, TypeScript, PostgreSQL, Entity Framework, Leaflet.js, OpenStreetMap",
      "Reverse proxy Nginx",
      "API Île-de-France Mobilités avec polling temps réel",
      "Détection des perturbations de trajets",
      "Alertes par e-mail et SMS pour les interruptions",
      "Suggestions d'itinéraires alternatifs",
      "Cartes interactives Leaflet.js + OpenStreetMap",
      "Méthodologie Agile",
    ],
    liveUrl: "https://navxpert.anamolkarki.com",
    gradient: "from-emerald-400/40 via-teal-300/30 to-cyan-200/20",
  },
  {
    title: "É-Conomitiens — Suivi de la consommation électrique",
    shortTitle: "É-Conomitiens",
    role: "Développeur",
    period: "Mars 2024 → Juillet 2024",
    stack: ["C#", "WPF (MVVM)", "XAML", "MySQL", "Arduino", "UML"],
    description: [
      "Application desktop de suivi énergétique",
      "Stack : C#, WPF (MVVM), XAML, MySQL, Arduino, UML",
      "Surveillance temps réel de la consommation d'énergie",
      "Gestion agile via la méthode Scrum",
      "Livraison rapide et adaptée aux besoins du client",
    ],
    liveUrl: "https://github.com/ajk-5/E-CONOMITIENS",
    gradient: "from-amber-300/40 via-orange-300/30 to-rose-200/20",
  },
  {
    title: "ESIEAccasion — Marketplace second-hand",
    shortTitle: "ESIEAccasion",
    role: "Chef de projet · Développeur",
    period: "Septembre 2023 → Février 2024",
    stack: ["PHP", "MySQL", "HTML/CSS", "MVC"],
    description: [
      "Plateforme en ligne pour articles d'occasion entre étudiants",
      "Stack : PHP, MySQL, HTML/CSS, modèle MVC",
      "Système de messagerie pour les échanges",
      "Système d'évaluation pour la confiance entre vendeurs et acheteurs",
    ],
    liveUrl: "https://github.com/ajk-5/Accassion",
    gradient: "from-violet-400/40 via-fuchsia-300/30 to-rose-200/20",
  },
  {
    title: "Astavoid — Jeu des mines spatial",
    shortTitle: "Astavoid",
    role: "Chef de projet · Développeur",
    period: "Mars 2023 → Juillet 2023",
    stack: ["JavaScript", "Node.js", "HTML/CSS", "Nunjucks"],
    description: [
      "Jeu interactif sur le web",
      "Stack : JavaScript, Node.js, HTML, CSS, Nunjucks",
      "Thème spatial avec astéroïdes",
      "Expérience immersive avec progression et score",
    ],
    liveUrl: "https://astavoid.anamolkarki.com",
    gradient: "from-lime-300/40 via-emerald-300/30 to-teal-200/20",
  },
];

const SLIDE_COUNT = PROJECTS.length + 1; // +1 for intro slide

export default function ProjectsPage() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const ratio = max > 0 ? el.scrollLeft / max : 0;
    setProgress(ratio);
    const idx = Math.round(el.scrollLeft / el.clientWidth);
    setActive(Math.max(0, Math.min(SLIDE_COUNT - 1, idx)));
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      const el = scrollRef.current;
      if (!el) return;
      const target = e.target as HTMLElement | null;
      const inner = target?.closest<HTMLElement>("[data-project-scroll]");
      if (inner) {
        const canScrollY = inner.scrollHeight > inner.clientHeight + 1;
        const atTop = inner.scrollTop <= 0;
        const atBottom =
          Math.ceil(inner.scrollTop + inner.clientHeight) >= inner.scrollHeight;
        if (canScrollY && ((e.deltaY < 0 && !atTop) || (e.deltaY > 0 && !atBottom))) {
          return;
        }
      }
      const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      if (delta === 0) return;
      el.scrollLeft += delta;
      e.preventDefault();
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, []);

  // Mouse drag-to-pan (so a regular mouse can scroll horizontally too)
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let down = false;
    let startX = 0;
    let startScroll = 0;
    let moved = false;

    const onDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      const target = e.target as HTMLElement | null;
      if (target?.closest("[data-project-scroll]")) return;
      if (target?.closest("a,button,input,textarea,select,label")) return;
      down = true;
      moved = false;
      startX = e.clientX;
      startScroll = el.scrollLeft;
      el.setPointerCapture?.(e.pointerId);
      el.style.cursor = "grabbing";
    };
    const onMove = (e: PointerEvent) => {
      if (!down) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 4) moved = true;
      if (moved) {
        el.scrollLeft = startScroll - dx;
        e.preventDefault();
      }
    };
    const onUp = (e: PointerEvent) => {
      if (!down) return;
      down = false;
      el.releasePointerCapture?.(e.pointerId);
      el.style.cursor = "";
      if (moved) {
        const w = el.clientWidth;
        const idx = Math.round(el.scrollLeft / w);
        el.scrollTo({ left: idx * w, behavior: "smooth" });
      }
    };

    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);
    return () => {
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = scrollRef.current;
      if (!el) return;
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
      if (e.key === "ArrowRight" || e.key === "PageDown") {
        el.scrollBy({ left: el.clientWidth, behavior: "smooth" });
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        el.scrollBy({ left: -el.clientWidth, behavior: "smooth" });
      } else if (e.key === "Home") {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else if (e.key === "End") {
        el.scrollTo({ left: el.scrollWidth, behavior: "smooth" });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const goTo = useCallback((i: number) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
  }, []);

  return (
    <main className="relative h-stage w-full overflow-hidden text-slate-100">
      <div className="mesh-bg pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />

      {/* Top progress */}
      <div className="absolute left-0 right-0 top-0 z-30 h-[2px] bg-white/5">
        <div
          className="h-full bg-gradient-to-r from-sky-400 via-fuchsia-400 to-amber-300 shadow-[0_0_10px_rgba(56,189,248,0.6)] transition-[width] duration-150 ease-out"
          style={{ width: `${Math.max(6, progress * 100)}%` }}
        />
      </div>

      {/* Counter + label */}
      <div className="pointer-events-none absolute left-4 top-4 z-20 hidden items-center gap-2 rounded-full border border-white/15 bg-black/25 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-200/80 backdrop-blur sm:inline-flex">
        <span>Projects</span>
        <span className="text-slate-400">·</span>
        <span>
          {String(active).padStart(2, "0")}
          <span className="text-slate-400"> / </span>
          {String(SLIDE_COUNT - 1).padStart(2, "0")}
        </span>
      </div>

      {/* Hint */}
      <div className="pointer-events-none absolute right-4 top-4 z-20 hidden items-center gap-2 rounded-full border border-white/15 bg-black/25 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-200/80 backdrop-blur md:inline-flex">
        <span>Scroll</span>
        <span aria-hidden="true">{"→"}</span>
      </div>

      {/* Bottom dot nav */}
      <nav
        aria-label="Projects"
        className="pointer-events-auto absolute bottom-4 left-1/2 z-30 -translate-x-1/2"
      >
        <ul className="flex items-center gap-2 rounded-full border border-white/15 bg-black/35 px-3 py-2 backdrop-blur">
          <li>
            <button
              type="button"
              onClick={() => goTo(0)}
              aria-label="Intro"
              aria-current={active === 0 ? "true" : undefined}
              className={`btn-dot ${active === 0 ? "btn-dot-active" : ""}`}
            />
          </li>
          {PROJECTS.map((p, i) => {
            const idx = i + 1;
            return (
              <li key={p.shortTitle}>
                <button
                  type="button"
                  onClick={() => goTo(idx)}
                  aria-label={`Go to ${p.shortTitle}`}
                  aria-current={active === idx ? "true" : undefined}
                  className={`btn-dot ${active === idx ? "btn-dot-active" : ""}`}
                />
              </li>
            );
          })}
        </ul>
      </nav>

      <div
        ref={scrollRef}
        className="no-scrollbar flex h-full w-full cursor-grab snap-x snap-mandatory overflow-x-auto overflow-y-hidden scroll-smooth select-none touch-pan-x"
      >
        {/* INTRO */}
        <section
          aria-label="Introduction"
          className="relative flex h-full w-screen shrink-0 snap-center items-center px-4 sm:px-10 lg:px-16"
        >
          <div className="mx-auto grid w-full max-w-6xl items-center gap-6 sm:gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.4 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="space-y-6"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-200/80">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-sky-300 shadow-[0_0_14px_rgba(140,201,240,0.7)]" />
                {PROJECTS.length} projects {"·"} 2023–today
              </span>
              <h1 className="font-display text-5xl font-semibold leading-[1.05] sm:text-6xl lg:text-7xl">
                Projects.
              </h1>
              <p className="max-w-xl text-base text-slate-300/90 sm:text-lg">
                Selected work — products I&apos;ve led or shipped end-to-end. Scroll, swipe, or
                use the arrow keys to flip through. Each card has the full stack, scope, and
                links.
              </p>
              <div className="flex flex-wrap gap-3">
                <MagneticButton size="lg" onClick={() => goTo(1)}>
                  Start the tour
                </MagneticButton>
                <Link href="/contact">
                  <MagneticButton size="lg" variant="outline">
                    Talk to me
                  </MagneticButton>
                </Link>
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                {PROJECTS.slice(0, 5).map((p, i) => (
                  <button
                    key={p.shortTitle}
                    type="button"
                    onClick={() => goTo(i + 1)}
                    className="footer-link gap-2"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-sky-200" />
                    {p.shortTitle}
                  </button>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, amount: 0.4 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="relative mx-auto aspect-square w-full max-w-md"
              aria-hidden="true"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-sky-400/30 via-fuchsia-400/30 to-amber-300/30 blur-3xl" />
              <div className="relative h-full w-full">
                <div className="orb-spin-slow absolute inset-0">
                  <div className="orb-ring absolute inset-2 rounded-full border border-sky-300/40" />
                </div>
                <div className="orb-spin-rev absolute inset-0">
                  <div className="orb-ring absolute inset-10 rounded-full border border-fuchsia-300/35" />
                </div>
                <div className="orb-spin-slow absolute inset-0">
                  <div className="orb-ring absolute inset-20 rounded-full border border-amber-200/30" />
                </div>
                <div className="absolute inset-[35%] rounded-full bg-gradient-to-br from-sky-300/30 via-white/5 to-fuchsia-300/30 shadow-[0_30px_120px_rgba(56,189,248,0.25)] backdrop-blur" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* ONE SLIDE PER PROJECT */}
        {PROJECTS.map((p, i) => {
          const num = String(i + 1).padStart(2, "0");
          return (
            <section
              key={p.shortTitle}
              aria-label={p.shortTitle}
              className="relative flex h-full w-screen shrink-0 snap-center items-center px-3 sm:px-6 md:px-10 lg:px-16"
            >
              <motion.article
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="card-surface relative mx-auto flex h-[min(86%,640px)] w-full max-w-6xl flex-col gap-3 overflow-hidden p-3.5 sm:gap-5 sm:p-7 md:p-9 lg:h-[min(78%,640px)] lg:flex-row"
              >
                <div
                  className={`pointer-events-none absolute -inset-24 bg-gradient-to-br ${p.gradient} blur-2xl`}
                  aria-hidden="true"
                />
                <div
                  className="pointer-events-none absolute right-2 top-2 select-none font-display text-[clamp(80px,16vw,220px)] font-semibold leading-none tracking-tighter text-white/[0.05]"
                  aria-hidden="true"
                >
                  {num}
                </div>

                <div className="relative z-10 flex min-w-0 flex-col gap-2.5 sm:gap-4 lg:flex-1 lg:max-w-[55%]">
                  <div className="flex flex-wrap items-center gap-1.5 text-[10px] uppercase tracking-[0.25em]">
                    <span className="rounded-full border border-white/20 bg-white/5 px-2.5 py-0.5 text-slate-200/85 sm:px-3 sm:py-1">
                      {p.period}
                    </span>
                    <span className="rounded-full border border-white/20 bg-white/5 px-2.5 py-0.5 text-slate-200/85 sm:px-3 sm:py-1">
                      {p.role}
                    </span>
                  </div>

                  <h2 className="font-display text-xl font-semibold leading-tight text-white sm:text-3xl md:text-4xl">
                    {p.title}
                  </h2>

                  <div className="flex flex-wrap gap-1.5">
                    {p.stack.map((s) => (
                      <span
                        key={s}
                        className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-2.5 py-0.5 text-[11px] font-semibold text-slate-200/90"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 pt-1 lg:mt-auto lg:pt-2">
                    {p.caseStudyHref && (
                      <Link href={p.caseStudyHref}>
                        <MagneticButton size="sm">Case study</MagneticButton>
                      </Link>
                    )}
                    {p.liveUrl && (
                      <a href={p.liveUrl} target="_blank" rel="noopener noreferrer">
                        <MagneticButton size="sm" variant="outline">
                          Live site
                        </MagneticButton>
                      </a>
                    )}
                  </div>
                </div>

                <div className="relative z-10 flex min-h-0 min-w-0 flex-1 flex-col rounded-2xl border border-white/15 bg-black/25 p-3 backdrop-blur sm:p-5">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-300/80">
                    Scope
                  </div>
                  <ul
                    data-project-scroll
                    className="no-scrollbar mt-2 flex-1 space-y-1.5 overflow-y-auto pr-2 text-[13px] text-slate-200/90 sm:space-y-2 sm:text-sm"
                  >
                    {p.description.map((line, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-sky-300 to-fuchsia-300 sm:mt-2" />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            </section>
          );
        })}
      </div>
    </main>
  );
}
