"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { MotionDiv } from "@/components/MotionDiv";

interface Project {
  title: string;
  role: string;
  period: string;
  description: string[];
  caseStudyHref?: string;
  liveUrl?: string;
}

interface ProjectsSectionProps {
  projects: Project[];
  projectsRef: React.RefObject<HTMLDivElement>;
  variant?: "default" | "compact";
}

const palette = [
  "from-emerald-300 via-teal-300 to-slate-300",
  "from-violet-400 via-fuchsia-400 to-rose-300",
  "from-amber-300 via-orange-300 to-rose-200",
  "from-sky-300 via-cyan-300 to-teal-200",
  "from-lime-300 via-emerald-300 to-teal-200",
  "from-rose-300 via-orange-300 to-amber-200",
];

function getProjectLink(title: string): string {
  const upperTitle = title.toUpperCase();
  if (upperTitle.includes("NAVXPERT")) return "https://navxpert.anamolkarki.com";
  if (upperTitle.includes("ECONOMITIENS")) return "https://github.com/ajk-5/E-CONOMITIENS";
  if (upperTitle.includes("ESIEACCASION")) return "https://github.com/ajk-5/Accassion";
  if (upperTitle.includes("ASTAVOID")) return "https://astavoid.anamolkarki.com";
  if (upperTitle.includes("90STIMES") || upperTitle.includes("NINETIES"))
    return "https://www.90stimes.com";
  return "";
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects,
  projectsRef,
  variant = "default",
}) => {
  const isCompact = variant === "compact";

  const carouselWrapperRef = useRef<HTMLDivElement>(null);
  const carouselTrackRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const activeProjectIndexRef = useRef(0);
  activeProjectIndexRef.current = activeProjectIndex;

  const [trackOffset, setTrackOffset] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const swipeRef = useRef<{
    pointerId: number | null;
    startX: number;
    startY: number;
    active: boolean;
  }>({
    pointerId: null,
    startX: 0,
    startY: 0,
    active: false,
  });

  const clampIndex = (index: number) => Math.max(0, Math.min(index, projects.length - 1));

  const scrollToProjectIndex = (index: number) => {
    setActiveProjectIndex(clampIndex(index));
  };

  const goPrev = () => setActiveProjectIndex((prev) => clampIndex(prev - 1));
  const goNext = () => setActiveProjectIndex((prev) => clampIndex(prev + 1));

  const handleCarouselKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (projects.length <= 1) return;
    if (e.key === "ArrowRight" || e.key === "PageDown") {
      e.preventDefault();
      goNext();
    }
    if (e.key === "ArrowLeft" || e.key === "PageUp") {
      e.preventDefault();
      goPrev();
    }
    if (e.key === "Home") {
      e.preventDefault();
      setActiveProjectIndex(0);
    }
    if (e.key === "End") {
      e.preventDefault();
      setActiveProjectIndex(projects.length - 1);
    }
  };

  const updateCarousel = () => {
    const wrapper = carouselWrapperRef.current;
    const track = carouselTrackRef.current;
    if (!wrapper || !track) return;

    const cards = track.querySelectorAll<HTMLElement>("[data-project-card]");
    const activeCard = cards[activeProjectIndexRef.current];
    if (!activeCard) return;

    const cardWidth = activeCard.offsetWidth;
    const offset = activeCard.offsetLeft - (wrapper.clientWidth / 2 - cardWidth / 2);
    setTrackOffset(offset);
  };

  const scheduleCarouselUpdate = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(updateCarousel);
  };

  useLayoutEffect(() => {
    updateCarousel();
  }, [activeProjectIndex, projects.length]);

  useEffect(() => {
    setActiveProjectIndex((prev) => clampIndex(prev));
  }, [projects.length]);

  useEffect(() => {
    scheduleCarouselUpdate();

    const handleResize = () => scheduleCarouselUpdate();
    window.addEventListener("resize", handleResize);
    const wrapper = carouselWrapperRef.current;
    const ro =
      wrapper && "ResizeObserver" in window ? new ResizeObserver(handleResize) : null;
    if (wrapper && ro) ro.observe(wrapper);

    return () => {
      window.removeEventListener("resize", handleResize);
      ro?.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const cardWidth = isCompact
    ? "clamp(240px, 76vw, 420px)"
    : "clamp(260px, 62vw, 540px)";
  const cardHeight = isCompact
    ? "clamp(320px, 70vw, 460px)"
    : "clamp(340px, 58vw, 560px)";
  const cardGap = isCompact ? "clamp(12px, 3.2vw, 26px)" : "clamp(14px, 3.4vw, 30px)";

  const navBtnClassName = [
    "absolute top-1/2 -translate-y-1/2 z-20 inline-flex items-center justify-center rounded-full border border-white/60 bg-white/80 text-slate-700 shadow-[0_12px_30px_rgba(15,23,42,0.2)] transition-all duration-200",
    "hover:-translate-y-1 hover:bg-white hover:border-white/80 hover:shadow-[0_18px_45px_rgba(15,23,42,0.28)]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/40",
    isCompact ? "h-10 w-10" : "h-11 w-11",
  ].join(" ");

  return (
    <section
      ref={projectsRef}
      className={
        isCompact
          ? "py-0 z-10"
          : "py-12 px-3 sm:px-4 md:px-8 lg:px-16 2xl:max-w-[1600px] 2xl:mx-auto z-10"
      }
    >
      {isCompact ? (
        <h2 className="sr-only">Projets</h2>
      ) : (
        <MotionDiv
          className="text-2xl sm:text-4xl md:text-5xl font-semibold text-center mb-8 text-slate-100 uppercase tracking-[0.3em] font-display"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          PROJETS
        </MotionDiv>
      )}

      <div className={isCompact ? "relative mx-auto w-full max-w-5xl" : "relative mx-auto w-full max-w-6xl"}>
        <div
          data-nested-carousel
          ref={carouselWrapperRef}
          onKeyDown={handleCarouselKeyDown}
          onPointerDown={(event) => {
            if (projects.length <= 1) return;
            if (event.pointerType === "mouse" && event.button !== 0) return;

            const target = event.target as HTMLElement | null;
            if (!target) return;
            if (target.closest("[data-project-scroll]")) return;
            if (target.closest("a,button,input,textarea,select,label")) return;

            swipeRef.current = {
              pointerId: event.pointerId,
              startX: event.clientX,
              startY: event.clientY,
              active: false,
            };
            setIsDragging(false);
            setDragX(0);
            event.currentTarget.setPointerCapture(event.pointerId);
          }}
          onPointerMove={(event) => {
            const state = swipeRef.current;
            if (state.pointerId !== event.pointerId) return;

            const dx = event.clientX - state.startX;
            const dy = event.clientY - state.startY;

            if (!state.active) {
              const absX = Math.abs(dx);
              const absY = Math.abs(dy);
              if (absX < 10 || absX < absY) return;
              state.active = true;
              setIsDragging(true);
            }

            event.preventDefault();
            setDragX(Math.max(-360, Math.min(360, dx)));
          }}
          onPointerUp={(event) => {
            const state = swipeRef.current;
            if (state.pointerId !== event.pointerId) return;

            const dx = event.clientX - state.startX;
            if (state.active) {
              if (dx < -70) goNext();
              if (dx > 70) goPrev();
            }

            swipeRef.current = { pointerId: null, startX: 0, startY: 0, active: false };
            setDragX(0);
            setIsDragging(false);
          }}
          onPointerCancel={(event) => {
            const state = swipeRef.current;
            if (state.pointerId !== event.pointerId) return;
            swipeRef.current = { pointerId: null, startX: 0, startY: 0, active: false };
            setDragX(0);
            setIsDragging(false);
          }}
          tabIndex={0}
          role="region"
          aria-roledescription="carousel"
          aria-label="Projects carousel"
          style={
            {
              "--project-card-w": cardWidth,
              "--project-card-h": cardHeight,
              "--project-gap": cardGap,
              touchAction: "pan-y",
            } as React.CSSProperties
          }
          className="relative w-full overflow-hidden flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/40"
        >
          <button
            type="button"
            onClick={goPrev}
            disabled={activeProjectIndex <= 0}
            aria-label="Previous project"
            className={[navBtnClassName, "left-2 sm:left-4", activeProjectIndex <= 0 ? "opacity-50 cursor-not-allowed" : ""].join(" ")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <div
            ref={carouselTrackRef}
            className={[
              "flex items-center gap-[var(--project-gap)] will-change-transform",
              isDragging
                ? ""
                : "transition-transform duration-500 [transition-timing-function:cubic-bezier(.4,0,.2,1)]",
            ].join(" ")}
            style={{ transform: `translateX(${-(trackOffset) + dragX}px)` }}
          >
            {projects.map((project, index) => {
              const active = index === activeProjectIndex;
              const accent = palette[index % palette.length];
              const projectLink = project.liveUrl ?? getProjectLink(project.title);
              const displayTitle = project.title.split(":")[0].trim();

              return (
                <div
                  key={`${project.title}-${index}`}
                  data-project-card
                  onClick={() => scrollToProjectIndex(index)}
                  className={[
                    "group relative flex-none w-[var(--project-card-w)] h-[var(--project-card-h)] overflow-hidden rounded-[28px] select-none transform-gpu",
                    "transition-[transform,opacity,filter] duration-500 [transition-timing-function:cubic-bezier(.4,0,.2,1)]",
                    active
                      ? "cursor-default opacity-100 scale-[1.02] sm:scale-[1.08] saturate-[1.05]"
                      : "cursor-pointer opacity-75 sm:opacity-50 scale-[0.9] sm:scale-[0.8] saturate-[0.95] hover:opacity-85 hover:scale-[0.94] sm:hover:opacity-65 sm:hover:scale-[0.88]",
                    active
                      ? "shadow-[0_26px_80px_rgba(2,6,23,0.35)]"
                      : "shadow-[0_18px_55px_rgba(2,6,23,0.22)]",
                  ].join(" ")}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${accent}`} />
                  <div className="absolute inset-0 bg-gradient-to-b from-white/15 via-white/0 to-transparent" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(255,255,255,0.35),transparent_55%),radial-gradient(circle_at_85%_75%,rgba(15,23,42,0.12),transparent_60%)]" />
                  <div className="absolute inset-0 opacity-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] bg-[linear-gradient(90deg,rgba(255,255,255,0.28)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.22)_1px,transparent_1px)] bg-[size:28px_28px]" />
                  <div className="absolute inset-0 ring-1 ring-white/25" />
                  <div className="pointer-events-none absolute -inset-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_30%_0%,rgba(255,255,255,0.22),transparent_55%)]" />

                  <div className="pointer-events-none absolute -bottom-10 -right-6 rotate-[-8deg] font-display text-[clamp(64px,9vw,132px)] font-semibold tracking-tight text-slate-950/15 mix-blend-multiply">
                    {displayTitle}
                  </div>

                  <div className="relative z-10 flex h-full flex-col justify-between p-4 sm:p-6 text-slate-950">
                    <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-slate-950/80">
                      <span className="rounded-full border border-slate-950/15 bg-white/55 px-3 py-1 backdrop-blur">
                        {project.role}
                      </span>
                      <span className="rounded-full border border-slate-950/15 bg-white/55 px-3 py-1 backdrop-blur">
                        {project.period}
                      </span>
                      {project.caseStudyHref && (
                        <span className="rounded-full border border-slate-950/15 bg-white/55 px-3 py-1 backdrop-blur">
                          Website info
                        </span>
                      )}
                    </div>

                    <div className="flex flex-1 items-center justify-center px-2">
                      <h3 className="text-center text-[clamp(22px,4vw,44px)] font-semibold font-display tracking-tight text-slate-950">
                        {displayTitle}
                      </h3>
                    </div>

                    <div className="rounded-2xl bg-white/60 p-3 text-slate-800 shadow-[0_12px_26px_rgba(15,23,42,0.2)] backdrop-blur">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-700">
                        {project.title}
                      </p>
                      <ul
                        data-project-scroll
                        className="mt-2 max-h-20 sm:max-h-24 no-scrollbar overflow-y-auto break-words pr-1 text-[11px] text-slate-700 list-disc list-inside space-y-1"
                      >
                        {project.description.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        {project.caseStudyHref && (
                          <Link
                            href={project.caseStudyHref}
                            className="inline-flex items-center rounded-full border border-slate-300/80 bg-white/85 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-700 shadow-[0_10px_22px_rgba(15,23,42,0.12)] transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-400 hover:bg-white hover:text-slate-900 hover:shadow-[0_14px_30px_rgba(15,23,42,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/40 active:scale-[0.99]"
                          >
                            Website info
                          </Link>
                        )}
                        {projectLink && (
                          <a
                            href={projectLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center rounded-full border border-slate-300/80 bg-white/85 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-700 shadow-[0_10px_22px_rgba(15,23,42,0.12)] transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-400 hover:bg-white hover:text-slate-900 hover:shadow-[0_14px_30px_rgba(15,23,42,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/40 active:scale-[0.99]"
                          >
                            Live site
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            type="button"
            onClick={goNext}
            disabled={activeProjectIndex >= projects.length - 1}
            aria-label="Next project"
            className={[
              navBtnClassName,
              "right-2 sm:right-4",
              activeProjectIndex >= projects.length - 1 ? "opacity-50 cursor-not-allowed" : "",
            ].join(" ")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        <div className={isCompact ? "mt-3 flex items-center justify-center gap-2" : "mt-6 flex items-center justify-center gap-2"}>
          {projects.map((_, index) => {
            const active = index === activeProjectIndex;
            return (
              <button
                key={index}
                onClick={() => scrollToProjectIndex(index)}
                aria-label={`Go to project ${index + 1}`}
                aria-current={active ? "true" : undefined}
                type="button"
                className={active ? "btn-dot btn-dot-active" : "btn-dot"}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
