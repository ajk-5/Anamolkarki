"use client";

import { useEffect, useRef, useState } from "react";
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
  "from-emerald-300/80 via-teal-300/70 to-slate-300/60",
  "from-violet-400/80 via-fuchsia-400/70 to-rose-300/60",
  "from-amber-300/80 via-orange-300/70 to-rose-200/60",
  "from-sky-300/80 via-cyan-300/70 to-teal-200/60",
  "from-lime-300/80 via-emerald-300/70 to-teal-200/60",
  "from-rose-300/80 via-orange-300/70 to-amber-200/60",
];

const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects,
  projectsRef,
  variant = "default",
}) => {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  const slideWidth =
    variant === "compact" ? "clamp(220px, 52vw, 340px)" : "clamp(240px, 60vw, 380px)";
  const slideHeight =
    variant === "compact" ? "clamp(280px, 56vw, 420px)" : "clamp(320px, 72vw, 480px)";
  const scrollPad = `calc((100% - ${slideWidth}) / 2)`;

  const getProjectLink = (title: string): string => {
    const upperTitle = title.toUpperCase();
    if (upperTitle.includes("NAVXPERT")) return "https://navxpert.anamolkarki.com";
    if (upperTitle.includes("ECONOMITIENS")) return "https://github.com/ajk-5/E-CONOMITIENS";
    if (upperTitle.includes("ESIEACCASION")) return "https://github.com/ajk-5/Accassion";
    if (upperTitle.includes("ASTAVOID")) return "https://astavoid.anamolkarki.com";
    if (upperTitle.includes("90STIMES") || upperTitle.includes("NINETIES")) return "https://www.90stimes.com";
    return "";
  };

  const scrollToProject = (index: number) => {
    if (index < 0 || index >= projects.length) return;
    const container = scrollContainerRef.current;
    if (!container) return;
    const slides = container.querySelectorAll<HTMLElement>("[data-slide]");
    const target = slides[index];
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    setCurrentProjectIndex(index);
  };

  const handlePrev = () => scrollToProject(currentProjectIndex - 1);
  const handleNext = () => scrollToProject(currentProjectIndex + 1);

  const updateActiveFromScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const slides = Array.from(container.querySelectorAll<HTMLElement>("[data-slide]"));
    if (!slides.length) return;
    const center = container.scrollLeft + container.clientWidth / 2;
    let nearestIndex = 0;
    let nearestDistance = Number.POSITIVE_INFINITY;
    slides.forEach((slide, index) => {
      const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
      const distance = Math.abs(center - slideCenter);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = index;
      }
    });
    setCurrentProjectIndex((prev) => (prev === nearestIndex ? prev : nearestIndex));
  };

  const handleScroll = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(updateActiveFromScroll);
  };

  useEffect(() => {
    updateActiveFromScroll();
    const handleResize = () => updateActiveFromScroll();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [projects.length]);

  return (
    <section
      ref={projectsRef}
      className={
        variant === "compact"
          ? "py-6 z-10"
          : "py-12 px-3 sm:px-4 md:px-8 lg:px-16 2xl:max-w-[1600px] 2xl:mx-auto z-10"
      }
    >
      {variant === "compact" ? (
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

      <div className={variant === "compact" ? "relative mx-auto max-w-6xl px-4" : "relative mx-auto max-w-6xl"}>
        <div
          className={[
            "relative overflow-hidden border border-white/10 bg-slate-100/90 text-slate-900 shadow-[0_26px_70px_rgba(2,6,23,0.6)]",
            variant === "compact" ? "rounded-3xl p-4 sm:p-6" : "rounded-[2.5rem] p-5 sm:p-8",
          ].join(" ")}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(14,116,144,0.18),transparent_55%),radial-gradient(circle_at_90%_20%,rgba(168,85,247,0.12),transparent_50%)]" />
          <div className="absolute inset-0 opacity-30 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] bg-[linear-gradient(90deg,rgba(148,163,184,0.25)_1px,transparent_1px),linear-gradient(rgba(148,163,184,0.2)_1px,transparent_1px)] bg-[size:28px_28px]" />

          <div className="relative z-10">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-xs uppercase tracking-[0.35em] text-slate-500">
              <span>Projects</span>
              <span className="font-semibold text-slate-700">
                {String(currentProjectIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
              </span>
            </div>
            <div className="mt-3 h-px w-full bg-slate-300/70" />

            <div className={variant === "compact" ? "relative mt-5" : "relative mt-8"}>
              <button
                onClick={handlePrev}
                disabled={currentProjectIndex <= 0}
                aria-label="Previous project"
                type="button"
                className={`absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 inline-flex items-center justify-center rounded-full border border-white/60 bg-white/80 text-slate-700 shadow-[0_12px_30px_rgba(15,23,42,0.2)] transition-all duration-200 hover:-translate-y-1 hover:bg-white hover:border-white/80 hover:shadow-[0_18px_45px_rgba(15,23,42,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/40 ${variant === "compact" ? "h-10 w-10" : "h-11 w-11"} ${
                  currentProjectIndex <= 0 ? "opacity-50 cursor-not-allowed" : ""
                }`}
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
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>

              <div
                ref={scrollContainerRef}
                onScroll={handleScroll}
                data-ignore-page-wheel
                onKeyDown={(event) => {
                  if (event.key === "ArrowLeft") {
                    event.preventDefault();
                    handlePrev();
                  }
                  if (event.key === "ArrowRight") {
                    event.preventDefault();
                    handleNext();
                  }
                }}
                role="region"
                aria-roledescription="carousel"
                aria-label="Project gallery"
                tabIndex={0}
                className={[
                  "no-scrollbar flex overflow-x-auto snap-x snap-mandatory scroll-smooth pb-5 pt-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/40",
                  variant === "compact" ? "gap-4" : "gap-6",
                ].join(" ")}
                style={{
                  scrollSnapType: "x mandatory",
                  WebkitOverflowScrolling: "touch",
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                  paddingLeft: scrollPad,
                  paddingRight: scrollPad,
                  scrollPaddingLeft: scrollPad,
                  scrollPaddingRight: scrollPad,
                }}
              >
                {projects.map((project, index) => {
                  const projectLink = project.liveUrl ?? getProjectLink(project.title);
                  const isActive = index === currentProjectIndex;
                  const accent = palette[index % palette.length];
                  const displayTitle = project.title.split(":")[0].trim();

                  return (
                    <MotionDiv
                      key={index}
                      data-slide
                      style={{ width: slideWidth, height: slideHeight }}
                      className={[
                        "relative flex-shrink-0 snap-center transition-all duration-500 will-change-transform",
                        isActive ? "scale-[1] opacity-100" : "scale-[0.9] opacity-60",
                      ].join(" ")}
                      initial={{ opacity: 0, x: 60 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.35 }}
                      transition={{ duration: 0.7, delay: index * 0.08, ease: "easeOut" }}
                    >
                      <div className="relative h-full overflow-hidden rounded-[2.2rem] shadow-[0_22px_50px_rgba(15,23,42,0.18)]">
                        <div className={`absolute inset-0 bg-gradient-to-br ${accent}`} />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(255,255,255,0.4),transparent_55%),radial-gradient(circle_at_80%_80%,rgba(15,23,42,0.15),transparent_60%)]" />

                        <div className="relative z-10 flex h-full flex-col justify-between p-5 sm:p-6 text-slate-950">
                          <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-slate-950/80">
                            <span className="rounded-full border border-slate-950/15 bg-white/55 px-3 py-1 backdrop-blur">
                              {project.role}
                            </span>
                            <span className="rounded-full border border-slate-950/15 bg-white/55 px-3 py-1 backdrop-blur">
                              {project.period}
                            </span>
                            {project.caseStudyHref && (
                              <span className="rounded-full border border-slate-950/15 bg-white/60 px-3 py-1 backdrop-blur">
                                Website info
                              </span>
                            )}
                          </div>

                          <div className="flex flex-1 items-center justify-center px-2">
                            <h3 className="text-center text-[clamp(24px,4vw,44px)] font-semibold font-display tracking-tight text-slate-950">
                              {displayTitle}
                            </h3>
                          </div>

                          <div className="rounded-2xl bg-white/75 p-3 text-slate-800 shadow-[0_12px_26px_rgba(15,23,42,0.2)] backdrop-blur">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-700">
                              {project.title}
                            </p>
                            <ul className="mt-2 max-h-24 no-scrollbar overflow-y-auto pr-1 text-[11px] text-slate-700 list-disc list-inside space-y-1">
                              {project.description.map((item, idx) => (
                                <li key={idx}>{item}</li>
                              ))}
                            </ul>
                            <div className="mt-3 flex flex-wrap items-center gap-2">
                              {project.caseStudyHref && (
                                <Link
                                  href={project.caseStudyHref}
                                  className="inline-flex items-center rounded-full border border-slate-300/80 bg-white/95 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-700 shadow-[0_10px_22px_rgba(15,23,42,0.12)] transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-400 hover:bg-white hover:text-slate-900 hover:shadow-[0_14px_30px_rgba(15,23,42,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/40 active:scale-[0.99]"
                                >
                                  Website info
                                </Link>
                              )}
                              {projectLink && (
                                <a
                                  href={projectLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center rounded-full border border-slate-300/80 bg-white/95 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-700 shadow-[0_10px_22px_rgba(15,23,42,0.12)] transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-400 hover:bg-white hover:text-slate-900 hover:shadow-[0_14px_30px_rgba(15,23,42,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/40 active:scale-[0.99]"
                                >
                                  Live site
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </MotionDiv>
                  );
                })}
              </div>

              <button
                onClick={handleNext}
                disabled={currentProjectIndex >= projects.length - 1}
                aria-label="Next project"
                type="button"
                className={`absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 inline-flex items-center justify-center rounded-full border border-white/60 bg-white/80 text-slate-700 shadow-[0_12px_30px_rgba(15,23,42,0.2)] transition-all duration-200 hover:-translate-y-1 hover:bg-white hover:border-white/80 hover:shadow-[0_18px_45px_rgba(15,23,42,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/40 ${variant === "compact" ? "h-10 w-10" : "h-11 w-11"} ${
                  currentProjectIndex >= projects.length - 1 ? "opacity-50 cursor-not-allowed" : ""
                }`}
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
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>

            <div className={variant === "compact" ? "mt-4 flex items-center justify-center gap-2" : "mt-6 flex items-center justify-center gap-2"}>
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollToProject(index)}
                  aria-label={`Go to project ${index + 1}`}
                  type="button"
                  className={`h-2.5 w-2.5 rounded-full border transition ${
                    currentProjectIndex === index
                      ? "border-transparent bg-gradient-to-r from-slate-700 via-slate-900 to-slate-700 shadow"
                      : "border-slate-400/80 bg-white"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
