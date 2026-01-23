"use client";

import { MotionDiv } from "@/components/MotionDiv";

interface Experience {
  title: string;
  location: string;
  period: string;
  description: string[];
}

interface ExperiencesSectionProps {
  experiences: Experience[];
  experiencesRef: React.RefObject<HTMLDivElement>;
}

const ExperiencesSection: React.FC<ExperiencesSectionProps> = ({ experiences, experiencesRef }) => {
  return (
    <section ref={experiencesRef} className="py-12 px-3 sm:px-4 md:px-8 lg:px-16 2xl:max-w-[1600px] 2xl:mx-auto z-10">
      <MotionDiv
        className="text-2xl sm:text-4xl md:text-5xl font-semibold text-center mb-8 text-slate-100 uppercase tracking-[0.3em] font-display"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        EXPÉRIENCES
      </MotionDiv>
      <div className="space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-10 max-w-4xl mx-auto">
        {experiences.map((exp, index) => (
          <MotionDiv
            key={index}
            className="card-surface p-5 sm:p-6 transition-all duration-300"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            whileHover={{ scale: 1.02, y: -4 }}
          >
            <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-slate-100 mb-3 uppercase tracking-tight">
              {exp.title}
            </h3>
            <p className="text-[10px] sm:text-xs md:text-sm lg:text-base italic text-slate-300">
              {exp.location} {exp.period}
            </p>
            <ul className="mt-3 text-[10px] sm:text-xs md:text-sm lg:text-base text-slate-300 list-disc list-inside">
              {exp.description.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </MotionDiv>
        ))}
      </div>
    </section>
  );
};

export default ExperiencesSection;
