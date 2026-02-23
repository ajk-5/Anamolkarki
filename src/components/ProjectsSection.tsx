"use client";

import { useState, useRef } from "react";
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
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects, projectsRef }) => {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Helper function to determine the project link based on its title
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
    if (index >= 0 && index < projects.length) {
      setCurrentProjectIndex(index);
      if (scrollContainerRef.current) {
        const scrollWidth = scrollContainerRef.current.scrollWidth / projects.length;
        scrollContainerRef.current.scrollTo({
          left: scrollWidth * index,
          behavior: "smooth",
        });
      }
    }
  };

  const handlePrev = () => scrollToProject(currentProjectIndex - 1);
  const handleNext = () => scrollToProject(currentProjectIndex + 1);

  return (
    <section ref={projectsRef} className="py-12 px-3 sm:px-4 md:px-8 lg:px-16 2xl:max-w-[1600px] 2xl:mx-auto z-10">
      <MotionDiv
        className="text-2xl sm:text-4xl md:text-5xl font-semibold text-center mb-8 text-slate-100 uppercase tracking-[0.3em] font-display"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        PROJETS
      </MotionDiv>

      {/* Project Container with Arrows */}
      <div className="relative max-w-4xl mx-auto">
        {/* Left Arrow */}
        <button
          onClick={handlePrev}
          disabled={currentProjectIndex === 0}
          aria-label="Previous project"
          type="button"
          className={`btn-icon absolute left-0 sm:-left-12 top-1/2 -translate-y-1/2 z-20 ${
            currentProjectIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
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

        {/* Scrollable Container */}
        <div
          ref={scrollContainerRef}
          className="no-scrollbar flex overflow-x-auto snap-x snap-mandatory scroll-smooth w-full touch-pan-x"
          style={{
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch", // Smooth scrolling on iOS
            scrollbarWidth: "none", // Hide scrollbar on Firefox
            msOverflowStyle: "none", // Hide scrollbar on IE/Edge
          }}
        >
          {projects.map((project, index) => {
            const projectLink = project.liveUrl ?? getProjectLink(project.title);
            return (
              <MotionDiv
                key={index}
                className="min-w-full w-full rounded-2xl border border-slate-800/70 bg-slate-950/70 p-4 sm:p-6 shadow-2xl transition-all duration-500 flex-shrink-0"
                initial={{ opacity: 0, x: 120 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.8, delay: index * 0.15, ease: "easeOut" }}
              >
                <h3
                  className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-slate-100 mb-1 uppercase tracking-tight"
                >
                  {project.caseStudyHref ? (
                    <Link
                      href={project.caseStudyHref}
                      className="hover:text-sky-100 transition-colors"
                    >
                      {project.title}
                    </Link>
                  ) : (
                    project.title
                  )}
                </h3>
                {projectLink && (
                  <a
                    href={projectLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-xs sm:text-sm text-sky-200 hover:text-sky-100 underline mb-3"
                  >
                    Live site: {projectLink}
                  </a>
                )}
                <p className="text-[10px] sm:text-xs md:text-sm lg:text-base italic text-slate-300">
                  {project.role} | {project.period}
                </p>
                <ul className="mt-3 text-[10px] sm:text-xs md:text-sm lg:text-base text-slate-300 list-disc list-inside">
                  {project.description.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </MotionDiv>
            );
          })}
        </div>

        {/* Right Arrow */}
        <button
          onClick={handleNext}
          disabled={currentProjectIndex === projects.length - 1}
          aria-label="Next project"
          type="button"
          className={`btn-icon absolute right-0 sm:-right-12 top-1/2 -translate-y-1/2 z-20 ${
            currentProjectIndex === projects.length - 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
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

        {/* Navigation Dots */}
        <div className="flex justify-center mt-6 gap-2">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToProject(index)}
              aria-label={`Go to project ${index + 1}`}
              type="button"
              className={`btn-dot ${currentProjectIndex === index ? "btn-dot-active scale-125" : "hover:border-sky-300/60 hover:bg-slate-700/60"}`}
            />
          ))}
        </div>
      </div>

    </section>
  );
};

export default ProjectsSection;
