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
    <section ref={skillsRef} className="py-16 px-3 sm:px-4 md:px-8 lg:px-16 2xl:max-w-[1600px] 2xl:mx-auto z-10 bg-black text-white font-[Futura, sans-serif]">
      <MotionDiv
        className="text-xl sm:text-4xl md:text-5xl lg:text-6xl 2xl:text-6xl font-extrabold text-center mb-8 uppercase tracking-wide drop-shadow-md transform perspective-1000 translate-z-10"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, type: "spring", stiffness: 50 }}
        style={gradientStyle}
      >
        COMPÉTENCES
      </MotionDiv>
      <div className="flex flex-col items-center space-y-6">
        {skills.soft.map((skill, index) => (
          <motion.div
            key={index}
            className={`relative flex flex-col items-center p-4 w- md:w-80  shadow-md cursor-pointer transition-all duration-300`}
            onClick={() => setSelectedSkill(selectedSkill === index ? null : index)}
            onHoverStart={() => setSelectedSkill(selectedSkill === index ? null : index)}
            onHoverEnd={() => setSelectedSkill(null)}
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-full flex items-center justify-between text-white">
              <div className="text-lg flex items-center gap-2">
                <span dangerouslySetInnerHTML={{ __html: skill.icon }} />
                {skill.name}
              </div>
              <motion.div animate={{ rotate: selectedSkill === index ? 180 : 0 }} transition={{ duration: 0.3 }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
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
                className="mt-2 text-sm text-gray-300 px-2"
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
    </section>
  );
};

export default SkillsSection;
