"use client";

import { useState } from "react";
import { MotionDiv } from "@/components/MotionDiv";


interface NavSidebarProps {
  scrollToSection: (ref: React.RefObject<HTMLDivElement>) => void;
  introRef: React.RefObject<HTMLDivElement>;
  projectsRef: React.RefObject<HTMLDivElement>;
  experiencesRef: React.RefObject<HTMLDivElement>;
  educationRef: React.RefObject<HTMLDivElement>;
  skillsRef: React.RefObject<HTMLDivElement>;
  contactRef: React.RefObject<HTMLDivElement>;
  cvRef: React.RefObject<HTMLDivElement>;
  hueRotation: number;
}

const NavSidebar: React.FC<NavSidebarProps> = ({
  scrollToSection,
  introRef,
  projectsRef,
  experiencesRef,
  educationRef,
  skillsRef,
  contactRef,
  cvRef,
  hueRotation,
}) => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const toggleSidebar = () => setIsSidebarVisible(!isSidebarVisible);

  const gradientStyle = {
    filter: `hue-rotate(${hueRotation}deg)`,
    transition: "filter 0.5s ease-in-out",
  };

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="fixed top-1/2 right-4 transform -translate-y-1/2 z-50 bg-teal-600/30 text-teal-800 p-2 rounded-full hover:bg-teal-600/50 transition-all duration-300 shadow-lg"
        style={gradientStyle}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-transform duration-300 ${isSidebarVisible ? "rotate-[-45]" : "rotate-90"}`}
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      <div
        className={`fixed z-40 right-0 w-48 h-full bg-gradient-to-r from-teal-500 via-emerald-400 to-indigo-500 animate-movingGradient backdrop-blur-sm border-r border-teal-400 flex flex-col items-center py-6 transition-transform duration-300 shadow-lg ${
          isSidebarVisible ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <MotionDiv
          className="text-xl font-bold text-teal-800 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          style={gradientStyle}
        >
          Portfolio
        </MotionDiv>
        <nav className="space-y-4 text-sm">
          <button onClick={() => scrollToSection(introRef)} className="text-teal-800 hover:text-teal-900 transition-colors flex items-center" style={gradientStyle}>
            <span className="mr-2">🏠</span> Intro
          </button>
          <button onClick={() => scrollToSection(projectsRef)} className="text-teal-800 hover:text-teal-900 transition-colors flex items-center" style={gradientStyle}>
            <span className="mr-2">📑</span> Projets
          </button>
          <button onClick={() => scrollToSection(experiencesRef)} className="text-teal-800 hover:text-teal-900 transition-colors flex items-center" style={gradientStyle}>
            <span className="mr-2">💼</span> Expériences
          </button>
          <button onClick={() => scrollToSection(educationRef)} className="text-teal-800 hover:text-teal-900 transition-colors flex items-center" style={gradientStyle}>
            <span className="mr-2">🎓</span> Éducation
          </button>
          <button onClick={() => scrollToSection(skillsRef)} className="text-teal-800 hover:text-teal-900 transition-colors flex items-center" style={gradientStyle}>
            <span className="mr-2">🛠️</span> Compétences
          </button>
          <button onClick={() => scrollToSection(contactRef)} className="text-teal-800 hover:text-teal-900 transition-colors flex items-center" style={gradientStyle}>
            <span className="mr-2">📞</span> Contact
          </button>
          <button onClick={() => scrollToSection(cvRef)} className="text-teal-800 hover:text-teal-900 transition-colors flex items-center" style={gradientStyle}>
            <span className="mr-2">CV</span> CV
          </button>
        </nav>
      </div>
    </>
  );
};

export default NavSidebar;