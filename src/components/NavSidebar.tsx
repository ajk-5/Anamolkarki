"use client";

import { useState } from "react";
import { MotionDiv } from "@/components/MotionDiv";
import Image from "next/image";

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
        className="fixed top-1/2 right-4 z-[100] bg-purple-600 text-white p-2  hover:bg-purple-700 transition-all duration-300 shadow-lg"
      >
        {isSidebarVisible ? "✖" : "☰"}
      </button>

      <div
        className={`fixed   botom-0 right-0 w-64 h-full bg-black text-white flex flex-col items-center py-12 transition-transform duration-300 shadow-lg z-50 ${
          isSidebarVisible ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <MotionDiv
          className="text-lg font-bold text-purple-400 mb-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          style={gradientStyle}
        >
               <Image
                 className="w-[40px] md:w-[50px] lg:w-[60px] h-auto"
                 src="/images/ajklogo.svg"
                 alt="Anamol Karki Logo"
                 width={50}
                 height={50}
               />
          <div className="text-2xl">ANAMOL JANG KARKI</div>
        </MotionDiv>

        <nav className="flex flex-col space-y-6 text-lg text-center">
          <button onClick={() => scrollToSection(introRef)} className="text-white hover:text-purple-400 transition-colors">🏠 INTRO</button>
          <button onClick={() => scrollToSection(cvRef)} className="text-white hover:text-purple-400 transition-colors">🗎 CV</button>
          <button onClick={() => scrollToSection(projectsRef)} className="text-white hover:text-purple-400 transition-colors">📑 PROJETS</button>
          <button onClick={() => scrollToSection(experiencesRef)} className="text-white hover:text-purple-400 transition-colors">💼 EXPÉRIENCES</button>
          <button onClick={() => scrollToSection(educationRef)} className="text-white hover:text-purple-400 transition-colors">🎓 ÉDUCATION</button>
          <button onClick={() => scrollToSection(skillsRef)} className="text-white hover:text-purple-400 transition-colors">🛠️ COMPÉTENCES</button>
          <button onClick={() => scrollToSection(contactRef)} className="text-white hover:text-purple-400 transition-colors">📞 CONTACT</button>
        </nav>
      </div>
    </>
  );
};

export default NavSidebar;
