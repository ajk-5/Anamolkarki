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
  skillsRef: React.RefObject<HTMLDivElement>;
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ skills, skillsRef }) => {
  const [selectedSkill, setSelectedSkill] = useState<number | null>(null);

  return (
    <section ref={skillsRef} className="py-12 px-3 sm:px-4 md:px-8 lg:px-16 2xl:max-w-[1600px] 2xl:mx-auto z-10">
      <MotionDiv
        className="text-2xl sm:text-4xl md:text-5xl font-semibold text-center mb-8 text-slate-100 uppercase tracking-[0.3em] font-display"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        COMPÉTENCES
      </MotionDiv>
      <div className="flex flex-col items-center space-y-6">
        {skills.soft.map((skill, index) => (
          <motion.div
            key={index}
            className="card-surface w-full max-w-md cursor-pointer p-4 transition-all duration-300"
            onClick={() => setSelectedSkill(selectedSkill === index ? null : index)}
            onHoverStart={() => setSelectedSkill(selectedSkill === index ? null : index)}
            onHoverEnd={() => setSelectedSkill(null)}
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-full flex items-center justify-between text-slate-100">
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
                  stroke="currentColor"
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
                className="mt-2 text-sm text-slate-300 px-2"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                {skill.description}
              </motion.p>
            )}
          </motion.div>
        ))}
         <MotionDiv className="card-surface w-full max-w-3xl p-6">
          <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-slate-100 mb-3 uppercase tracking-wider text-center">
            OUTILS
          </h3>
          <div className="flex flex-row flex-wrap p-1 items-center gap-3">
            {skills.tools.map((tool, index) => (
              <div key={index} className="rounded-xl border border-slate-800/70 bg-slate-950/70 px-4 py-3 shadow-md flex items-center gap-2 text-slate-200">
                <span dangerouslySetInnerHTML={{ __html: tool.icon }} />
                {tool.name}
              </div>
            ))}
          </div>
        </MotionDiv>
      </div>
    </section>
  );
};

export default SkillsSection;
