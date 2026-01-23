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
}) => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const toggleSidebar = () => setIsSidebarVisible(!isSidebarVisible);

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="btn-icon fixed top-1/2 right-4 z-[100]"
      >
        {isSidebarVisible ? "✖" : "☰"}
      </button>

      <div
        className={`fixed bottom-0 right-0 w-64 h-full bg-slate-950/95 text-slate-100 border-l border-slate-800/70 flex flex-col items-center py-12 transition-transform duration-300 shadow-2xl z-50 ${
          isSidebarVisible ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <MotionDiv
          className="text-lg font-semibold text-slate-100 mb-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
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
          <button onClick={() => scrollToSection(introRef)} className="text-slate-200 hover:text-sky-200 transition-colors">🏠 INTRO</button>
          <button onClick={() => scrollToSection(cvRef)} className="text-slate-200 hover:text-sky-200 transition-colors">🗎 CV</button>
          <button onClick={() => scrollToSection(projectsRef)} className="text-slate-200 hover:text-sky-200 transition-colors">📑 PROJETS</button>
          <button onClick={() => scrollToSection(experiencesRef)} className="text-slate-200 hover:text-sky-200 transition-colors">💼 EXPÉRIENCES</button>
          <button onClick={() => scrollToSection(educationRef)} className="text-slate-200 hover:text-sky-200 transition-colors">🎓 ÉDUCATION</button>
          <button onClick={() => scrollToSection(skillsRef)} className="text-slate-200 hover:text-sky-200 transition-colors">🛠️ COMPÉTENCES</button>
          <button onClick={() => scrollToSection(contactRef)} className="text-slate-200 hover:text-sky-200 transition-colors">📞 CONTACT</button>
        </nav>
      </div>
    </>
  );
};

export default NavSidebar;
