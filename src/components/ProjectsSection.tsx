"use client";

import { useState, useRef } from "react";
import { MotionDiv } from "@/components/MotionDiv";

interface Project {
  title: string;
  role: string;
  period: string;
  description: string[];
}

interface ProjectsSectionProps {
  projects: Project[];
  hueRotation: number;
  projectsRef: React.RefObject<HTMLDivElement>;
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects, hueRotation, projectsRef }) => {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const gradientStyle = {
    filter: `hue-rotate(${hueRotation}deg)`,
    transition: "filter 0.5s ease-in-out",
  };

  // Helper function to determine the project link based on its title
  const getProjectLink = (title: string): string => {
    const upperTitle = title.toUpperCase();
    if (upperTitle.includes("NAVXPERT")) return "https://navxpert.anamolkarki.com";
    if (upperTitle.includes("ECONOMITIENS")) return "https://github.com/ajk-5/E-CONOMITIENS";
    if (upperTitle.includes("ESIEACCASION")) return "https://github.com/ajk-5/Accassion";
    if (upperTitle.includes("ASTAVOID")) return "https://astavoid.anamolkarki.com";
    if (upperTitle.includes("WT4Q.com")) return "https://www.wt4q.com";
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
    <section ref={projectsRef} className="py-16 px-3 sm:px-4 md:px-8 lg:px-16 2xl:max-w-[1600px] 2xl:mx-auto z-10">
      <MotionDiv
        className="text-xl sm:text-4xl md:text-5xl lg:text-6xl 2xl:text-6xl font-extrabold text-center mb-8 text-teal-800 uppercase tracking-wide drop-shadow-md transform perspective-1000 translate-z-10"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, type: "spring", stiffness: 50 }}
        style={gradientStyle}
      >
        PROJETS
      </MotionDiv>

      {/* Project Container with Arrows */}
      <div className="relative max-w-4xl mx-auto">
        {/* Left Arrow */}
        <button
          onClick={handlePrev}
          disabled={currentProjectIndex === 0}
          className={`absolute left-0 sm:-left-12 top-1/2 transform -translate-y-1/2 z-20 bg-teal-600/30 text-teal-800 p-2 rounded-full hover:bg-teal-600/50 transition-all duration-300 shadow-lg ${
            currentProjectIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          style={gradientStyle}
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
          className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth w-full touch-pan-x"
          style={{
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch", // Smooth scrolling on iOS
            scrollbarWidth: "none", // Hide scrollbar on Firefox
            msOverflowStyle: "none", // Hide scrollbar on IE/Edge
          }}
        >
          {projects.map((project, index) => {
            const projectLink = getProjectLink(project.title);
            return (
              <MotionDiv
                key={index}
                className="min-w-full w-full backdrop-blur-sm p-4 sm:p-6 rounded-xl shadow-lg transition-all duration-500 border border-teal-400 flex-shrink-0"
                initial={{ opacity: 0, x: 150 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.5, delay: index * 0.3, ease: "easeOut" }}
                style={{ borderColor: `hsl(${(hueRotation + index * 30) % 360}, 80%, 50%)` }}
              >
                <h3
                  className="text-base sm:text-lg md:text-xl lg:text-2xl 2xl:text-2xl font-bold text-teal-800 mb-1 uppercase tracking-tight"
                  style={gradientStyle}
                >
                  {project.title}
                </h3>
                {projectLink && (
                  <a
                    href={projectLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-xs sm:text-sm text-green-200 underline mb-3"
                  >
                    {projectLink}
                  </a>
                )}
                <p className="text-[10px] sm:text-xs md:text-sm lg:text-base 2xl:text-base italic text-indigo-300">
                  {project.role} | {project.period}
                </p>
                <ul className="mt-3 text-[10px] sm:text-xs md:text-sm lg:text-base 2xl:text-base text-violet-300 list-disc list-inside">
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
          className={`absolute right-0 sm:-right-12 top-1/2 transform -translate-y-1/2 z-20 bg-teal-600/30 text-teal-800 p-2 rounded-full hover:bg-teal-600/50 transition-all duration-300 shadow-lg ${
            currentProjectIndex === projects.length - 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          style={gradientStyle}
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
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentProjectIndex === index ? "bg-teal-600 scale-125" : "bg-teal-400/50 hover:bg-teal-400"
              }`}
              style={gradientStyle}
            />
          ))}
        </div>
      </div>

      {/* Hide Scrollbar for Webkit Browsers */}
      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default ProjectsSection;
