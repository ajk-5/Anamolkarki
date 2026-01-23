"use client";

import { MotionDiv } from "@/components/MotionDiv";

interface Education {
  title: string;
  institution: string;
  institutionUrl?: string;
  period: string;
  description: string[];
}

interface EducationSectionProps {
  education: Education[];
  educationRef: React.RefObject<HTMLDivElement>;
}

const EducationSection: React.FC<EducationSectionProps> = ({ education, educationRef }) => {
  return (
    <section ref={educationRef} className="py-12 px-3 sm:px-4 md:px-8 lg:px-16 2xl:max-w-[1600px] 2xl:mx-auto z-10">
      <MotionDiv
        className="text-2xl sm:text-4xl md:text-5xl font-semibold text-center mb-8 text-slate-100 uppercase tracking-[0.3em] font-display"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        ÉDUCATION
      </MotionDiv>
      <div className="space-y-6 sm:space-y-8 md:space-y-10 max-w-4xl mx-auto">
        {education.map((edu, index) => (
          <MotionDiv
            key={index}
            className="card-surface p-5 sm:p-6 transition-all duration-300"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            whileHover={{ scale: 1.02, y: -4 }}
          >
            <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-slate-100 mb-3 uppercase tracking-wider text-center">
              {edu.title}
            </h3>
            <p className="text-xs sm:text-sm md:text-base italic text-slate-300 text-center">
              {edu.institutionUrl ? (
                <a
                  href={edu.institutionUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-sky-200 underline decoration-sky-300/70 underline-offset-4 transition hover:text-sky-100"
                >
                  {edu.institution}
                </a>
              ) : (
                <span>{edu.institution}</span>
              )}
              <span className="text-slate-400"> | {edu.period}</span>
            </p>
            <ul className="mt-3 text-sm sm:text-base text-slate-300 list-disc list-inside text-center">
              {edu.description.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </MotionDiv>
        ))}
      </div>
    </section>
  );
};

export default EducationSection;
