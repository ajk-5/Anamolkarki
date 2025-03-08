"use client";

import { MotionDiv } from "@/components/MotionDiv";
import { motion } from "framer-motion";
import { useState } from "react";

interface Skill {
  name: string;
  icon: string;
  description: string;
}

interface Skills {
  soft: Skill[];
  tools: { name: string; icon: string }[];
}

interface SkillsSectionProps {
  skills: Skills;
  hueRotation: number;
  skillsRef: React.RefObject<HTMLDivElement>;
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ skills, hueRotation, skillsRef }) => {
  const [selectedSkill, setSelectedSkill] = useState<number | null>(null);

  const gradientStyle = {
    filter: `hue-rotate(${hueRotation}deg)`,
    transition: "filter 0.5s ease-in-out",
  };

  return (
    <section ref={skillsRef} className="py-16 px-3 sm:px-4 md:px-8 lg:px-16 2xl:max-w-[1600px] 2xl:mx-auto z-10">
      <MotionDiv
        className="text-xl sm:text-4xl md:text-5xl lg:text-6xl 2xl:text-6xl font-extrabold text-center mb-8 text-teal-800 uppercase tracking-wide drop-shadow-md transform perspective-1000 translate-z-10"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, type: "spring", stiffness: 50 }}
        style={gradientStyle}
      >
        COMPÉTENCES
      </MotionDiv>
      <div className="space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-10 max-w-4xl mx-auto">
        <MotionDiv
          className=" backdrop-blur-sm p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 border border-teal-400"
          initial={{ opacity: 0, y: 150 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          whileHover={{ scale: 1.05, y: -8 }}
          style={{ borderColor: `hsl(${(hueRotation + 0) % 360}, 80%, 50%)` }}
        >
          <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl 2xl:text-2xl font-bold text-teal-800 mb-3 uppercase tracking-tight" style={gradientStyle}>
            SOFT SKILLS
          </h3>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 lg:gap-8">
            {skills.soft.map((skill, index) => (
              <motion.div
                key={index}
                className={`relative flex flex-col items-center p-4 w-64 md:w-80 rounded-xl shadow-md cursor-pointer transition-all duration-300 ${
                  selectedSkill === index ? "bg-teal-600/30" : "bg-teal-600/10"
                }`}
                onClick={() => setSelectedSkill(selectedSkill === index ? null : index)}
                onHoverStart={() => setSelectedSkill(selectedSkill === index ? null : index)}
                onHoverEnd={() => setSelectedSkill(null)}
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-full flex items-center justify-between">
                  <div className="text-teal-800 text-sm sm:text-base md:text-lg lg:text-xl flex items-center gap-2">
                    <span dangerouslySetInnerHTML={{ __html: skill.icon.replace("#164e63", "#0f766e") }} />
                    {skill.name}
                  </div>
                  <motion.div animate={{ rotate: selectedSkill === index ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#0f766e"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </motion.div>
                </div>
                {selectedSkill === index && (
                  <motion.p
                    className="mt-2 text-sm md:text-base text-slate-700 px-2"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    {skill.description}
                  </motion.p>
                )}
              </motion.div>
            ))}
          </div>
        </MotionDiv>

        <MotionDiv
          className="backdrop-blur-sm p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 border border-teal-400"
          initial={{ opacity: 0, y: 150 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
          whileHover={{ scale: 1.05, y: -8 }}
          style={{ borderColor: `hsl(${(hueRotation + 30) % 360}, 80%, 50%)` }}
        >
          <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl 2xl:text-2xl font-bold text-teal-800 mb-3 uppercase tracking-tight" style={gradientStyle}>
            OUTILS
          </h3>
          <div className="flex flex-wrap gap-3">
            {skills.tools.map((tool, index) => (
              <span
                key={index}
                className="bg-white/70 backdrop-blur-sm p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden border border-teal-400 flex items-center gap-2"
              >
                <span dangerouslySetInnerHTML={{ __html: tool.icon }} />
                {tool.name}
              </span>
            ))}
          </div>
        </MotionDiv>
      </div>
    </section>
  );
};

export default SkillsSection;